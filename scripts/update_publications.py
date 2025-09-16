"""Fetch publications from Google Scholar and update data.js.

This script scrapes Dr. Vinit Katariya's Google Scholar profile and rewrites the
`const publications = [...]` block inside data.js so the website always reflects
the latest papers. It is intended to run locally or from CI (see the scheduled
GitHub Action) and keeps a curated selection of recent items visible on the site.
Each entry receives a monotonically increasing ``order`` value so the frontend
can break ties when multiple papers share the same year.
"""

from __future__ import annotations

import random
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

SCHOLAR_PROFILE_URL = (
    "https://scholar.google.com/citations"
    "?hl=en&user=jMPHBZMAAAAJ&view_op=list_works&sortby=pubdate"
)
BASE_URL = "https://scholar.google.com"
DATA_FILE = Path(__file__).resolve().parent.parent / "data.js"
FEATURED_COUNT = 6  # Number of items surfaced in the primary list
USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)
REQUEST_TIMEOUT = 30
MAX_ATTEMPTS = 6
INITIAL_BACKOFF = 2


@dataclass
class Publication:
    title: str
    url: str
    year: int | None
    venue: str | None
    pub_type: str
    visible: bool
    order: int


def fetch_publications() -> list[Publication]:
    """Scrape the profile page and convert rows to Publication instances."""
    session = _build_session()
    response = None
    for attempt in range(1, MAX_ATTEMPTS + 1):
        response = session.get(SCHOLAR_PROFILE_URL, timeout=REQUEST_TIMEOUT)
        if response.status_code == 200:
            break
        if response.status_code == 429:
            wait_seconds = _calculate_backoff(attempt, response.headers.get("Retry-After"))
            print(
                f"Received HTTP 429 from Google Scholar; backing off for {wait_seconds:.1f}s",
                file=sys.stderr,
            )
            time.sleep(wait_seconds)
            continue
        response.raise_for_status()
    else:
        raise RuntimeError(
            "Exceeded maximum retries due to repeated 429 responses from Google Scholar."
        )

    soup = BeautifulSoup(response.text, "html.parser")
    publications: list[Publication] = []
    for index, row in enumerate(soup.select("tr.gsc_a_tr")):
        title_tag = row.select_one("a.gsc_a_at")
        if not title_tag:
            continue
        title = title_tag.get_text(strip=True)
        href = title_tag.get("href", "")
        url = urljoin(BASE_URL, href) if href else BASE_URL

        year_text = row.select_one("td.gsc_a_y span")
        year: int | None = None
        if year_text:
            value = year_text.get_text(strip=True)
            if value.isdigit():
                year = int(value)

        venue_tag = row.select_one("td.gsc_a_t div.gs_gray:nth-of-type(2)")
        venue = venue_tag.get_text(strip=True) if venue_tag else None

        pub_type = infer_publication_type(venue)
        visible = index < FEATURED_COUNT

        publications.append(
            Publication(
                title=title,
                url=url,
                year=year,
                venue=venue,
                pub_type=pub_type,
                visible=visible,
                order=index,
            )
        )

    if not publications:
        raise RuntimeError("No publications were parsed from Google Scholar.")

    return publications


def _build_session() -> requests.Session:
    """Create a requests session that mimics a standard browser."""
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})
    return session


def _calculate_backoff(attempt: int, retry_after_header: str | None) -> float:
    """Determine how long to sleep before retrying a throttled request."""
    if retry_after_header:
        try:
            return float(retry_after_header)
        except ValueError:
            pass
    jitter = random.uniform(0, 1)
    return INITIAL_BACKOFF * (2 ** (attempt - 1)) + jitter


def infer_publication_type(venue: str | None) -> str:
    """Heuristic classification used for the publication badge on the site."""
    if not venue:
        return "article"

    normalized = venue.lower()
    if "arxiv" in normalized or "preprint" in normalized:
        return "preprint"
    if any(keyword in normalized for keyword in ("proc.", "conference", "symposium", "workshop", "workshops")):
        return "conference"
    if any(keyword in normalized for keyword in ("journal", "trans.", "transactions", "letters", "ieee", "nature", "science")):
        return "journal"
    return "article"


def js_repr(value: object) -> str:
    """Render Python primitives as JavaScript literals."""
    if isinstance(value, str):
        escaped = value.replace("\\", "\\\\").replace("\"", "\\\"")
        return f'"{escaped}"'
    if isinstance(value, bool):
        return "true" if value else "false"
    if value is None:
        return "null"
    return str(value)


def build_publications_block(publications: Iterable[Publication]) -> str:
    """Serialize the publications list in the same style as data.js."""
    objects = []
    for item in publications:
        fields = [
            ("title", item.title),
            ("url", item.url),
        ]
        if item.venue:
            fields.append(("venue", item.venue))
        fields.extend(
            [
                ("type", item.pub_type),
                ("year", item.year),
                ("visible", item.visible),
                ("order", item.order),
            ]
        )
        field_lines = [f"        {key}: {js_repr(value)}" for key, value in fields]
        objects.append("    {\n" + ",\n".join(field_lines) + "\n    }")

    if not objects:
        return "const publications = []\n"  # Should never happen due to earlier guard.

    object_block = ",\n\n".join(objects)
    header = "const publications = [\n    // NOTE: Auto-generated by scripts/update_publications.py\n"
    return f"{header}{object_block}\n];"


def update_data_js(publications: list[Publication]) -> None:
    """Replace the publications block in data.js with freshly scraped data."""
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"Could not locate data.js at {DATA_FILE}")

    original = DATA_FILE.read_text(encoding="utf-8")
    pattern = re.compile(r"const publications = \[\s*[\s\S]*?\];", re.MULTILINE)
    replacement = build_publications_block(publications)

    if not pattern.search(original):
        raise RuntimeError("Failed to find the publications block in data.js")

    updated = pattern.sub(replacement, original, count=1)
    DATA_FILE.write_text(updated, encoding="utf-8")


if __name__ == "__main__":
    try:
        publications = fetch_publications()
        update_data_js(publications)
        print(f"Updated data.js with {len(publications)} publications from Google Scholar.")
    except Exception as exc:  # pragma: no cover - surfaced in CI logs.
        print(f"Error updating publications: {exc}", file=sys.stderr)
        raise

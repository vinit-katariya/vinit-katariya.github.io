# Dr. Vinit Katariya - Academic Website

A modern, responsive academic website built with clean HTML, CSS, and JavaScript.

## Project Structure

```
academic-website/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with custom styles
├── script.js           # Main JavaScript functionality
├── data.js             # Data configuration and content
├── pictures/           # Image directory
│   ├── vinit_katariya_bio.png
│   └── ICMLA.png
└── README.md           # This file
```

## Features

- **Responsive Design**: Optimized for all device sizes
- **Single Page Application**: Smooth navigation between sections
- **Modern UI**: Clean, professional design with subtle animations
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Performance Optimized**: Fast loading with minimal dependencies
- **SEO Friendly**: Proper meta tags and semantic HTML

## Sections

1. **Home**: Welcome message and featured news
2. **About**: Professional biography and background
3. **Publications**: Complete list of research publications
4. **News**: Latest updates and announcements
5. **Contact**: Contact form and professional information

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Custom styles with Tailwind CSS framework
- **JavaScript (ES6+)**: Interactive functionality
- **Google Fonts**: Inter font family for typography
- **Responsive Images**: Optimized for different screen sizes

## Setup Instructions

1. **Clone or download** the project files
2. **Ensure all files** are in the same directory
3. **Create a `pictures` folder** and add the required images:
  - `vinit_katariya_bio.png` (profile photo)
   - `ICMLA.png` (conference logo)
4. **Open `index.html`** in a web browser
5. **For development**: Use a local server (Live Server, Python SimpleHTTPServer, etc.)

## File Descriptions

### index.html
The main HTML structure containing all page sections and navigation. Links to external stylesheets and scripts.

### styles.css
Custom CSS styles including:
- Typography and layout enhancements
- Responsive design rules
- Animation definitions
- Print styles
- Accessibility improvements

### script.js
Main JavaScript functionality:
- Tab navigation system
- Dynamic content rendering
- Interactive toggles (publications, news details)
- Smooth scrolling
- Keyboard accessibility
- Responsive features

### data.js
Centralized data configuration:
- Personal information
- Social media links
- Publications database
- News articles
- Research areas
- Site configuration

## Customization

### Adding New Publications
Edit the `publications` array in `data.js`:

```javascript
{
    title: "Your Paper Title",
    url: "https://link-to-paper.com",
    type: "journal", // or "conference", "preprint"
    year: 2025,
    visible: true // false for "See More" section
}
```

### Adding News Items
Edit the `newsData` array in `data.js`:

```javascript
{
    id: "unique-id",
    title: "News Title",
    date: "2025-01-01",
    description: "Brief description",
    extendedDescription: "Optional extended text",
    image: "path/to/image.jpg",
    category: "publication", // or "speaking", "funding", etc.
    featured: true // for homepage display
}
```

### Styling Changes
Modify `styles.css` or add Tailwind classes in the HTML for visual customizations.

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Considerations

- Images are optimized and use appropriate formats
- CSS and JavaScript are minified in production
- External dependencies are loaded from CDNs
- Lazy loading is implemented for news images

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly
- Focus indicators

## SEO Optimization

- Proper meta tags
- Structured data markup
- Semantic HTML5 elements
- Clean URL structure
- Image alt attributes

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Blog section integration
- [ ] Advanced search functionality
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] Content management system
- [ ] Progressive Web App features

## Development Workflow

1. **Edit content** in `data.js`
2. **Style changes** in `styles.css`
3. **Functionality updates** in `script.js`
4. **Test across browsers** and devices
5. **Validate HTML/CSS** using online tools
6. **Deploy** to web server

## Support and Maintenance

For issues or feature requests, please review the code structure and modify accordingly. The modular design makes it easy to update individual components without affecting others.

## License

This project is created for academic purposes. Feel free to adapt and modify for your own academic website needs.

---

**Last Updated**: September 2025  
**Version**: 2.0.0  
**Author**: Vinit Katariya

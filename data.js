// Data configuration file for Dr. Vinit's academic website

// Personal Information
const personalInfo = {
    name: "Dr. Vinit Katariya",
    title: "Assistant Professor",
    institution: "University of Wyoming",
    email: "vkatariy@uwyo.edu",
    facultyPage: "https://www.uwyo.edu/eecs/faculty-staff/faculty/vinit-katariya.html",
    profileImage: "pictures/Vinit_Katariya_bio.jpg",
    bio: "Dr. Vinit Katariya is an assistant professor at the University of Wyoming. His research focuses on developing efficient and scalable machine learning algorithms for real-time applications. He holds a Ph.D. in Computer Science from a reputable university and has published numerous papers in top-tier conferences and journals. His work is primarily centered on vehicle trajectory prediction, anomaly detection in video surveillance, and edge AI for cyber-physical systems."
};

// Social Media Links
const socialLinks = {
    linkedin: "https://www.linkedin.com/in/vinitkatariya/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    googleScholar: "https://scholar.google.com/citations?user=jMPHBZMAAAAJ&hl=en",
    orcid: "https://orcid.org/0009-0003-9922-6041",
    github: "https://github.com/vinit-katariya"
};

// Publications Data
const publications = [
    {
        title: "Deeptrack: Lightweight deep learning for vehicle trajectory prediction in highways",
        url: "https://ieeexplore.ieee.org/abstract/document/9770480",
        type: "journal",
        year: 2022,
        visible: true
    },
    {
        title: "Understanding the challenges and opportunities of pose-based anomaly detection",
        url: "https://dl.acm.org/doi/abs/10.1145/3615834.3615844",
        type: "conference",
        year: 2023,
        visible: true
    },
    {
        title: "Exploring Public's perception of safety and video surveillance technology: A survey approach",
        url: "https://www.sciencedirect.com/science/article/abs/pii/S0160791X24001891",
        type: "journal",
        year: 2024,
        visible: true
    },
    {
        title: "Pishgu: Universal path prediction network architecture for real-time cyber-physical edge systems",
        url: "https://dl.acm.org/doi/abs/10.1145/3576841.3585933",
        type: "conference",
        year: 2023,
        visible: true
    },
    {
        title: "Enhancing automatic modulation recognition for iot applications using transformers",
        url: "https://www.mdpi.com/2624-831X/5/2/11",
        type: "journal",
        year: 2024,
        visible: true
    },
    {
        title: "Vt-former: An exploratory study on vehicle trajectory prediction for highway surveillance through graph isomorphism and transformer",
        url: "https://openaccess.thecvf.com/content/CVPR2024W/PRECOGNITION/html/Pazho_VT-Former_An_Exploratory_Study_on_Vehicle_Trajectory_Prediction_for_Highway_CVPRW_2024_paper.html",
        type: "conference",
        year: 2024,
        visible: false
    },
    {
        title: "A pov-based highway vehicle trajectory dataset and prediction architecture",
        url: "https://ieeexplore.ieee.org/abstract/document/10623849",
        type: "journal",
        year: 2024,
        visible: false
    },
    {
        title: "Pishgu: Universal path prediction architecture through graph isomorphism and attentive convolution",
        url: "https://arxiv.org/pdf/2210.08057",
        type: "preprint",
        year: 2022,
        visible: false
    },
    {
        title: "VegaEdge: Edge AI confluence for real-time IoT-applications in highway safety",
        url: "https://www.sciencedirect.com/science/article/abs/pii/S2542660524002099",
        type: "journal",
        year: 2024,
        visible: false
    },
    {
        title: "Distributed learning for automatic modulation recognition in bandwidth-limited networks",
        url: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13057/130570X/Distributed-learning-for-automatic-modulation-recognition-in-bandwidth-limited-networks/10.1117/12.3013532.short",
        type: "conference",
        year: 2024,
        visible: false
    }
];

// News Data
const newsData = [
    {
        id: "icmla-2025",
        title: "New Publication Accepted (ICMLA) 2025",
        date: "2025-09-14",
        description: "Our paper \"Adversarially-Refined VQ-GAN with Dense Motion Tokenization for Spatio-Temporal Heatmaps\" has been accepted at the IEEE International Conference on Machine Learning and Applications (ICMLA) 2025.",
        extendedDescription: "This work addresses continuous human motion understanding through an adversarially-refined VQ-GAN framework that compresses spatio-temporal heatmaps while preserving fine-grained motion traces.",
        image: "pictures/ICMLA.png",
        category: "publication",
        featured: true
    },
    {
        id: "speaking-engagement-2025",
        title: "EECS Advisory Board Presentation",
        date: "2025-09-12",
        description: "I was honoured to present my research and discuss future directions and plans to the Advisory board of EECS department at University of Wyoming",
        image: "pictures/eecs_uwyo_logo.jpg",
        category: "speaking",
        featured: true
    },
    {
        id: "Uwyo-joining-19Aug2025",
        title: "Joined University of Wyoming",
        date: "2025-08-19",
        description: "Joined the University of Wyoming as an Assistant Professor with a joint appointment in the Department of Electrical Engineering and Computer Science (EECS) and the School of Computing (SoC).",
        image: "https://www.uwyo.edu/eecs/_files/images/eerb.jpg",
        category: "news",
        featured: true
    },
    // {
    //     id: "conference-talk-2025",
    //     title: "Invited Talk at National Conference",
    //     date: "2025-02-28",
    //     description: "Dr. Katariya gave an invited talk on his work at the annual conference of the American Association for Science.",
    //     image: "https://placehold.co/200x120/E5E7EB/4B5563?text=Conference+Talk",
    //     category: "speaking",
    //     featured: false
    // },
    // {
    //     id: "funding-2024",
    //     title: "New Funding for Sustainable Energy Project",
    //     date: "2024-11-01",
    //     description: "The team secured a new grant to study sustainable energy solutions for the next three years.",
    //     image: "https://placehold.co/200x120/E5E7EB/4B5563?text=Funding+Grant",
    //     category: "funding",
    //     featured: false
    // },
];

// Research Areas
const researchAreas = [
    "Artificial Intelligence",
    "Computer Vision",
    "IoT Systems",
    "Public Safety",
    "Community Engagement",
    "Public Perception of AI for Safety",
    "Vehicle Trajectory Prediction",
    "Anomaly Detection",
    "Edge AI",
    "Cyber-Physical Systems",
    "Machine Learning",
    "Deep Learning"
];

// Website Configuration
const siteConfig = {
    title: "Dr. Vinit - Academic Website",
    description: "Official academic website of Dr. Vinit Katariya, Assistant Professor at the University of Wyoming",
    author: "Dr. Vinit Katariya",
    keywords: "artificial intelligence, computer vision, IoT, machine learning, University of Wyoming",
    version: "2.0.0"
};

// CV Data
const cvData = {
    introduction: "A detailed overview of Dr. Katariya's academic background, research portfolio, teaching, and service.",
    education: [
        {
            degree: "Ph.D. in Electrical Engineering",
            institution: "University of North Carolina at Charlotte",
            location: "Charlotte, NC, USA",
            year: "December 2023",
            details: "Dissertation: Advancing Highway Safety: Embedded-edge AI for Real-time Applications"
        },
        {
            degree: "M.S. in Electrical Engineering",
            institution: "University of North Carolina at Charlotte",
            location: "Charlotte, NC, USA",
            year: "May 2016",
            details: "Project: A Novel RF (XBEE) and IR LOS Collaborative V2V Navigation Technique"
        },
        {
            degree: "B.E. in Electronics",
            institution: "Savitribai Phule Pune University",
            location: "Pune, Maharashtra, India",
            year: "May 2012",
            details: "Project: Auto-switching of Devices Using Brain Waves"
        }
    ],
    academicPositions: [
        {
            title: "Assistant Professor (Joint Appointment)",
            organization: "Department of Electrical Engineering and Computer Science & School of Computing, University of Wyoming",
            period: "August 2025 – Present",
            bullets: [
                "Establishing a nationally recognized research program in embedded edge-based computer vision and deep learning.",
                "Supervising graduate and undergraduate researchers and leading externally funded projects.",
                "Publishing in top-tier venues while expanding cross-disciplinary collaborations."
            ]
        },
        {
            title: "Postdoctoral Researcher",
            organization: "Department of Electrical and Computer Engineering, UNC Charlotte",
            period: "October 2023 – August 2025",
            bullets: [
                "Led AI development for MnDOT intersection safety initiatives with multi-institutional teams.",
                "Designed pipelines for trajectory prediction, anomaly detection, and sensor fusion across RGB, WiFi, and depth data.",
                "Supervised 3 Ph.D. and 6 M.S. students while contributing to multi-hundred-thousand-dollar grants."
            ]
        },
        {
            title: "Graduate Research Assistant",
            organization: "Department of Electrical and Computer Engineering, UNC Charlotte",
            period: "January 2018 – October 2023",
            bullets: [
                "Developed lightweight ML/DL algorithms for real-time video analysis and highway safety applications.",
                "Built context-aware trajectory prediction models such as Pishgu and PishguVe for cyber-physical systems.",
                "Integrated AI pipelines with VR/AR and wearable alerts while mentoring graduate students."
            ]
        }
    ],
    teachingExperience: [
        {
            role: "Instructor / Guest Lecturer",
            organization: "UNC Charlotte",
            period: "Spring 2024",
            courses: ["Perceptron and Vectorization – contemporary AI applications"]
        },
        {
            role: "Teaching Assistant",
            organization: "UNC Charlotte",
            period: "2018 – 2021",
            courses: [
                "Electromagnetic and Electronic Devices (ECGR 3156)",
                "Computer Engineering Programming II (ECGR 2104)",
                "Logic System Design (ECGR 2181)",
                "Digital Signal Processing (ECGR 4124/5124)"
            ]
        }
    ],
    industryExperience: [
        {
            role: "Software Engineer",
            organization: "Sears Holdings Management Corporation",
            period: "June 2016 – May 2017",
            bullets: [
                "Built Python-based sensor systems to monitor store traffic with ~80% accuracy and integrated SQL analytics.",
                "Implemented image-comparison workflows within a Meteor JavaScript application for low-resolution camera feeds."
            ]
        },
        {
            role: "Software Engineer Intern",
            organization: "Sears Holdings Management Corporation",
            period: "May 2015 – August 2015",
            bullets: [
                "Developed MQTT-based client solutions enabling OTA updates for ARM Cortex-M4 IoT devices."
            ]
        }
    ],
    awards: [
        "Best Demo Award – ICCPS (2023)",
        "UNC Charlotte Graduate School Summer Scholarship (2022)",
        "Ph.D. Mentor, Mentor Collective (2021 – 2023)",
        "IEEE Member #93133990 (2014 – Present)"
    ],
    professionalService: [
        "Program Committee / Reviewer: IEEE ICMLA, CVPR, ICCV",
        "Reviewer: IEEE Access, IEEE Transactions on Intelligent Transportation Systems, IEEE Wireless Communications Letters",
        "Reviewer: International Journal of Cognitive Computing in Engineering; Springer AI, Cluster Computing, Operations Research Forum",
        "Artifact Evaluation Committee Member: IEEE ICCPS"
    ],
    downloadUrl: "pictures/files/Curriculum%20Vitae_Vinit_Katariya.pdf"
};

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        personalInfo,
        socialLinks,
        publications,
        newsData,
        researchAreas,
        siteConfig,
        cvData
    };
}

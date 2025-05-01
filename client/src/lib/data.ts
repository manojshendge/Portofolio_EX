import {
  Code,
  BarChart3,
  ShoppingCart,
  Server,
  Cpu,
  FileCode,
  Database,
  Smartphone,
} from "lucide-react";

// Career data
export const data = {
  career: [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      responsibilities: [
        "Led development of company's flagship SaaS platform using React and TypeScript",
        "Implemented 3D visualizations using Three.js that increased user engagement by 40%",
        "Optimized application performance reducing load time by 60%",
        "Mentored junior developers and established frontend best practices"
      ]
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions LLC",
      period: "2019 - 2021",
      responsibilities: [
        "Built responsive web applications with React and Redux",
        "Collaborated with UX/UI designers to implement pixel-perfect interfaces",
        "Created reusable component libraries that improved development efficiency",
        "Integrated third-party APIs and services into web applications"
      ]
    },
    {
      title: "Web Developer",
      company: "Creative Agency",
      period: "2017 - 2019",
      responsibilities: [
        "Developed interactive websites for clients across various industries",
        "Worked with JavaScript, HTML, CSS and jQuery to create engaging user interfaces",
        "Optimized websites for search engines and performance",
        "Maintained existing client websites and implemented new features"
      ]
    },
    {
      title: "Intern Developer",
      company: "Startup Incubator",
      period: "2016 - 2017",
      responsibilities: [
        "Assisted in developing MVP for early-stage startups",
        "Learned modern web development practices and tools",
        "Participated in code reviews and agile development processes",
        "Contributed to open source projects"
      ]
    }
  ],
  
  projects: [
    {
      title: "3D Product Configurator",
      description: "An interactive 3D product customization tool that allows users to visualize products in real-time with different options and configurations.",
      technologies: ["React", "Three.js", "WebGL", "Node.js"],
      github: "https://github.com/johndoe/3d-configurator",
      live: "https://3d-configurator.example.com"
    },
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment integration.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      github: "https://github.com/johndoe/ecommerce-platform",
      live: "https://ecommerce.example.com"
    },
    {
      title: "Real-time Dashboard",
      description: "A data visualization dashboard that displays real-time analytics and metrics with interactive charts and filterable data views.",
      technologies: ["React", "D3.js", "Firebase", "WebSockets"],
      github: "https://github.com/johndoe/realtime-dashboard",
      live: "https://dashboard.example.com"
    },
    {
      title: "Task Management App",
      description: "A productivity application for managing tasks with features like drag-and-drop organization, reminders, and team collaboration.",
      technologies: ["React", "Redux", "Node.js", "MongoDB"],
      github: "https://github.com/johndoe/task-manager",
      live: "https://tasks.example.com"
    },
    {
      title: "Portfolio Website",
      description: "An interactive 3D portfolio website showcasing projects and skills with immersive user experience.",
      technologies: ["React", "Three.js", "GSAP", "Framer Motion"],
      github: "https://github.com/johndoe/3d-portfolio",
      live: "#"
    },
    {
      title: "Weather Application",
      description: "A weather forecasting app that displays current conditions and forecasts with beautiful visualizations and animations.",
      technologies: ["React", "Weather API", "CSS Animations"],
      github: "https://github.com/johndoe/weather-app",
      live: "https://weather.example.com"
    }
  ],
  
  testimonials: [
    {
      name: "Sarah Johnson",
      position: "CEO",
      company: "Startup X",
      quote: "Great attention to detail. Built our product dashboard with pixel perfection and added interactive elements that our users love."
    },
    {
      name: "Michael Chen",
      position: "CTO",
      company: "Tech Innovations",
      quote: "John delivered our project ahead of schedule and exceeded our expectations. His technical skills and problem-solving abilities are impressive."
    },
    {
      name: "Emma Davis",
      position: "Product Manager",
      company: "Digital Solutions",
      quote: "Working with John was a pleasure. He understood our requirements quickly and implemented features that we didn't even know were possible."
    },
    {
      name: "Robert Wilson",
      position: "Marketing Director",
      company: "Creative Agency",
      quote: "Our website traffic increased by 200% after John redesigned our site. The modern UI and fast performance have significantly improved user engagement."
    }
  ],
  
  services: [
    {
      name: "Websites",
      icon: { type: FileCode, props: { size: 24, className: "text-primary" } }
    },
    {
      name: "Dashboards",
      icon: { type: BarChart3, props: { size: 24, className: "text-primary" } }
    },
    {
      name: "E-commerce",
      icon: { type: ShoppingCart, props: { size: 24, className: "text-primary" } }
    },
    {
      name: "APIs",
      icon: { type: Server, props: { size: 24, className: "text-primary" } }
    },
    {
      name: "Admin Panels",
      icon: { type: Cpu, props: { size: 24, className: "text-primary" } }
    },
    {
      name: "Mobile Apps",
      icon: { type: Smartphone, props: { size: 24, className: "text-primary" } }
    },
    {
      name: "3D Graphics",
      icon: { type: Code, props: { size: 24, className: "text-primary" } }
    },
    {
      name: "Databases",
      icon: { type: Database, props: { size: 24, className: "text-primary" } }
    }
  ]
};

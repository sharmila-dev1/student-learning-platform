const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Course = require("./models/Course");
const connectDB = require("./config/db");

dotenv.config();

const courses = [
  {
    title: "JavaScript Fundamentals",
    description:
      "Learn the core concepts of JavaScript and build a strong foundation for modern web development.",
    instructor: "Arun Kumar",
    category: "Web Development",
    level: "Beginner",
    duration: "6 Weeks",
    thumbnail: "",
    price: 0,

    learningOutcomes: [
      "Understand variables, data types, and operators",
      "Work with functions, arrays, and objects",
      "Understand DOM manipulation and events",
      "Use modern JavaScript features",
      "Work with asynchronous JavaScript",
    ],

    prerequisites: [
      "Basic HTML knowledge",
      "Basic CSS knowledge",
      "A computer with a code editor",
    ],

    modules: [
      {
        title: "JavaScript Basics",
        lessons: [
          "Introduction to JavaScript",
          "Variables and Data Types",
          "Operators",
          "Conditional Statements",
          "Loops",
        ],
      },
      {
        title: "Functions and Objects",
        lessons: [
          "Functions",
          "Arrow Functions",
          "Scope",
          "Objects",
          "Object Methods",
        ],
      },
      {
        title: "Arrays and Modern JavaScript",
        lessons: [
          "Arrays",
          "Array Methods",
          "Destructuring",
          "Spread and Rest Operators",
          "Template Literals",
        ],
      },
      {
        title: "DOM and Events",
        lessons: [
          "DOM Introduction",
          "Selecting Elements",
          "Changing HTML and CSS",
          "Event Handling",
          "Form Events",
        ],
      },
      {
        title: "Asynchronous JavaScript",
        lessons: [
          "Callbacks",
          "Promises",
          "Async and Await",
          "Fetch API",
          "Working with APIs",
        ],
      },
    ],
  },

  {
    title: "React.js Development",
    description:
      "Learn React.js from the fundamentals and build reusable, interactive, and responsive web applications.",
    instructor: "Priya Sharma",
    category: "Web Development",
    level: "Intermediate",
    duration: "8 Weeks",
    thumbnail: "",
    price: 0,

    learningOutcomes: [
      "Understand React components and JSX",
      "Manage state using React Hooks",
      "Work with props and reusable components",
      "Implement routing in React applications",
      "Fetch and display API data",
    ],

    prerequisites: [
      "Basic HTML and CSS",
      "JavaScript fundamentals",
      "Basic understanding of ES6",
    ],

    modules: [
      {
        title: "React Fundamentals",
        lessons: [
          "Introduction to React",
          "Creating a React Project",
          "JSX",
          "Components",
          "Props",
        ],
      },
      {
        title: "State and Events",
        lessons: [
          "Understanding State",
          "useState Hook",
          "Event Handling",
          "Conditional Rendering",
          "Forms in React",
        ],
      },
      {
        title: "React Hooks",
        lessons: [
          "Introduction to Hooks",
          "useEffect",
          "useRef",
          "useMemo",
          "Custom Hooks",
        ],
      },
      {
        title: "Routing and APIs",
        lessons: [
          "React Router",
          "Dynamic Routes",
          "Navigation",
          "Axios",
          "Fetching API Data",
        ],
      },
      {
        title: "Building a React Project",
        lessons: [
          "Project Structure",
          "Reusable Components",
          "State Management",
          "Error Handling",
          "Project Deployment",
        ],
      },
    ],
  },

  {
    title: "Node.js and Express.js",
    description:
      "Learn backend development with Node.js and Express.js by building RESTful APIs and server-side applications.",
    instructor: "Rahul Dev",
    category: "Backend Development",
    level: "Intermediate",
    duration: "7 Weeks",
    thumbnail: "",
    price: 0,

    learningOutcomes: [
      "Understand Node.js fundamentals",
      "Build servers using Express.js",
      "Create RESTful APIs",
      "Implement middleware and error handling",
      "Connect backend applications with databases",
    ],

    prerequisites: [
      "Basic JavaScript",
      "Understanding of HTTP basics",
      "Basic command-line knowledge",
    ],

    modules: [
      {
        title: "Node.js Fundamentals",
        lessons: [
          "Introduction to Node.js",
          "Node.js Runtime",
          "Modules",
          "NPM",
          "File System",
        ],
      },
      {
        title: "Express.js",
        lessons: [
          "Introduction to Express",
          "Creating an Express Server",
          "Routes",
          "Request and Response",
          "Middleware",
        ],
      },
      {
        title: "RESTful APIs",
        lessons: [
          "REST API Concepts",
          "GET Requests",
          "POST Requests",
          "PUT and PATCH Requests",
          "DELETE Requests",
        ],
      },
      {
        title: "Authentication and Security",
        lessons: [
          "User Authentication",
          "Password Hashing",
          "JWT Authentication",
          "Authorization",
          "API Security",
        ],
      },
      {
        title: "Error Handling and Testing",
        lessons: [
          "Error Handling",
          "Validation",
          "API Testing",
          "Postman",
          "Production Best Practices",
        ],
      },
    ],
  },

  {
    title: "MongoDB and Mongoose",
    description:
      "Learn MongoDB and Mongoose to design, store, query, and manage data for modern web applications.",
    instructor: "Karthik Raj",
    category: "Database",
    level: "Intermediate",
    duration: "5 Weeks",
    thumbnail: "",
    price: 0,

    learningOutcomes: [
      "Understand NoSQL databases",
      "Create and manage MongoDB collections",
      "Perform CRUD operations",
      "Design schemas using Mongoose",
      "Connect MongoDB with Node.js applications",
    ],

    prerequisites: [
      "Basic JavaScript",
      "Basic Node.js knowledge",
      "Basic understanding of databases",
    ],

    modules: [
      {
        title: "MongoDB Fundamentals",
        lessons: [
          "Introduction to MongoDB",
          "NoSQL Databases",
          "Databases and Collections",
          "Documents",
          "MongoDB Atlas",
        ],
      },
      {
        title: "CRUD Operations",
        lessons: [
          "Create Documents",
          "Read Documents",
          "Update Documents",
          "Delete Documents",
          "MongoDB Queries",
        ],
      },
      {
        title: "Mongoose",
        lessons: [
          "Introduction to Mongoose",
          "Schemas",
          "Models",
          "Validation",
          "Timestamps",
        ],
      },
      {
        title: "Relationships and Queries",
        lessons: [
          "References",
          "ObjectId",
          "Population",
          "Filtering",
          "Sorting and Pagination",
        ],
      },
    ],
  },

  {
    title: "MERN Stack Development",
    description:
      "Build complete full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
    instructor: "Vikram Singh",
    category: "Full Stack Development",
    level: "Advanced",
    duration: "12 Weeks",
    thumbnail: "",
    price: 0,

    learningOutcomes: [
      "Build complete MERN stack applications",
      "Create RESTful APIs with Node.js and Express",
      "Connect React applications with backend APIs",
      "Implement authentication and authorization",
      "Deploy full-stack applications",
    ],

    prerequisites: [
      "HTML and CSS",
      "JavaScript fundamentals",
      "Basic React knowledge",
      "Basic Node.js knowledge",
    ],

    modules: [
      {
        title: "MERN Stack Overview",
        lessons: [
          "Introduction to MERN",
          "Application Architecture",
          "Frontend and Backend",
          "REST APIs",
          "Project Setup",
        ],
      },
      {
        title: "React Frontend",
        lessons: [
          "React Components",
          "Hooks",
          "React Router",
          "Forms",
          "API Integration",
        ],
      },
      {
        title: "Node and Express Backend",
        lessons: [
          "Node.js",
          "Express.js",
          "REST APIs",
          "Middleware",
          "Error Handling",
        ],
      },
      {
        title: "MongoDB Database",
        lessons: [
          "MongoDB",
          "Mongoose",
          "Schemas",
          "CRUD Operations",
          "Database Relationships",
        ],
      },
      {
        title: "Authentication",
        lessons: [
          "User Registration",
          "Login",
          "Password Hashing",
          "JWT",
          "Role-Based Authorization",
        ],
      },
      {
        title: "Full Stack Project",
        lessons: [
          "Project Architecture",
          "Frontend Integration",
          "Backend Integration",
          "Testing",
          "Deployment",
        ],
      },
    ],
  },

  {
    title: "UI/UX Fundamentals for Developers",
    description:
      "Learn practical UI/UX principles to design clean, accessible, and user-friendly web interfaces.",
    instructor: "Meena Krishnan",
    category: "Design",
    level: "Beginner",
    duration: "4 Weeks",
    thumbnail: "",
    price: 0,

    learningOutcomes: [
      "Understand UI and UX principles",
      "Create user-friendly layouts",
      "Apply typography and spacing principles",
      "Design responsive interfaces",
      "Improve accessibility and usability",
    ],

    prerequisites: [
      "Basic computer knowledge",
      "Basic understanding of websites",
    ],

    modules: [
      {
        title: "Introduction to UI/UX",
        lessons: [
          "What is UI?",
          "What is UX?",
          "User-Centered Design",
          "Design Thinking",
        ],
      },
      {
        title: "Visual Design",
        lessons: [
          "Color Theory",
          "Typography",
          "Spacing",
          "Layout",
          "Visual Hierarchy",
        ],
      },
      {
        title: "Responsive Design",
        lessons: [
          "Responsive Layouts",
          "Mobile-First Design",
          "Breakpoints",
          "Grid Systems",
          "Designing for Different Screens",
        ],
      },
      {
        title: "Accessibility and Usability",
        lessons: [
          "Web Accessibility",
          "Accessible Forms",
          "Keyboard Navigation",
          "Usability Principles",
          "Design Evaluation",
        ],
      },
    ],
  },
];

const seedCourses = async () => {
  try {
    await connectDB();

    for (const course of courses) {
      await Course.findOneAndUpdate({ title: course.title }, course, {
        upsert: true,
        returnDocument: "after",
        setDefaultsOnInsert: true,
      });

      console.log(`Course added/updated: ${course.title}`);
    }

    console.log("All courses added successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error adding courses:", error.message);
    process.exit(1);
  }
};

seedCourses();

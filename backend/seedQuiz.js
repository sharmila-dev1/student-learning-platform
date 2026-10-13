const dotenv = require("dotenv");

const mongoose = require("mongoose");
const Quiz = require("./models/Quiz");
const Course = require("./models/Course");

dotenv.config();

const quizData = [
  {
    title: "JavaScript Fundamentals Quiz",
    courseTitle: "JavaScript Fundamentals",
    questions: [
      {
        question: "Which technology is used to creates the interactive and dynamic webpage?",
        options: ["CSS", "HTML", "JavaScript", "MongoDB"],
        answer: "JavaScript",
      },
      {
        question: "Which datatype represents true or false?",
        options: ["String", "Number", "Boolean", "Integer"],
        answer: "Boolean",
      },
      {
        question: "Which operator checks both value and data type?",
        options: ["=", "==", "!=", "==="],
        answer: "===",
      },
      {
        question: "Which keyword declares a block-scoped variable that can be reassigned?",
        options: ["const", "let", "static", "final"],
        answer: "let",
      },
      {
        question: "Which method adds an element to the end of an array?",
        options: ["pop()", "shift()", "push()", "slice()"],
        answer: "push()",
      },
    ],
  },
  {
    title: "React.js Development Quiz",
    courseTitle: "React.js Development",
    questions: [
      {
        question: "What is React primarily used for?",
        options: [
          "Building user interfaces",
          "Managing databases",
          "Creating server hardware",
          "Configuring networks",
        ],
        answer: "Building user interfaces",
      },
      {
        question: "Which React Hook manages local component state?",
        options: ["useRoute", "useState", "useServer", "useStyle"],
        answer: "useState",
      },
      {
        question: "What are props used for in React?",
        options: [
          "Passing data to components",
          "Connecting directly to MongoDB",
          "Starting an Express server",
          "Installing dependencies",
        ],
        answer: "Passing data to components",
      },
      {
        question: "Which syntax is commonly used to describe UI in React?",
        options: ["JSX", "SQL", "BSON", "XML Schema"],
        answer: "JSX",
      },
      {
        question: "Why are keys used when rendering lists in React?",
        options: [
          "To help identify list items",
          "To encrypt component data",
          "To create database tables",
          "To define CSS colors",
        ],
        answer: "To help identify list items",
      },
    ],
  },
  {
    title: "Node.js and Express.js Quiz",
    courseTitle: "Node.js and Express.js",
    questions: [
      {
        question: "What is Node.js?",
        options: [
          "A JavaScript runtime",
          "A relational database",
          "A CSS framework",
          "A browser extension",
        ],
        answer: "A JavaScript runtime",
      },
      {
        question: "What is Express.js commonly used for?",
        options: [
          "Building web servers and APIs",
          "Designing image files",
          "Styling React components",
          "Managing computer hardware",
        ],
        answer: "Building web servers and APIs",
      },
      {
        question: "Which HTTP method is commonly used to create a resource?",
        options: ["GET", "POST", "DELETE", "HEAD"],
        answer: "POST",
      },
      {
        question: "Which object contains route parameters in Express?",
        options: ["req.params", "req.styles", "res.files", "app.colors"],
        answer: "req.params",
      },
      {
        question: "Which method sends a JSON response in Express?",
        options: ["res.json()", "req.renderCSS()", "app.database()", "res.install()"],
        answer: "res.json()",
      },
    ],
  },
  {
    title: "MongoDB and Mongoose Quiz",
    courseTitle: "MongoDB and Mongoose",
    questions: [
      {
        question: "What type of database is MongoDB?",
        options: [
          "Document-oriented NoSQL",
          "Relational SQL only",
          "Graph-only",
          "Spreadsheet-only",
        ],
        answer: "Document-oriented NoSQL",
      },
      {
        question: "What format is commonly used to represent MongoDB documents?",
        options: ["BSON", "CSS", "CSV only", "SVG"],
        answer: "BSON",
      },
      {
        question: "What is Mongoose used for in a Node.js application?",
        options: [
          "Modeling MongoDB data",
          "Styling webpages",
          "Rendering browser graphics",
          "Replacing JavaScript",
        ],
        answer: "Modeling MongoDB data",
      },
      {
        question: "Which method finds multiple matching documents?",
        options: ["find()", "findOneOnly()", "style()", "renderCSS()"],
        answer: "find()",
      },
      {
        question: "Which method can create a new Mongoose document?",
        options: ["Model.create()", "Model.paint()", "Model.route()", "Model.listen()"],
        answer: "Model.create()",
      },
    ],
  },
  {
    title: "MERN Stack Development Quiz",
    courseTitle: "MERN Stack Development",
    questions: [
      {
        question: "Which library is used for building the user interface in MERN?",
        options: ["React", "Express", "MongoDB", "Node.js"],
        answer: "React",
      },
      {
        question: "Which MERN technology provides the JavaScript runtime?",
        options: ["Node.js", "MongoDB", "React", "CSS"],
        answer: "Node.js",
      },
      {
        question: "Which technology commonly handles server-side routes in MERN?",
        options: ["Express.js", "Bootstrap", "Chart.js", "HTML"],
        answer: "Express.js",
      },
      {
        question: "Which database is included in MERN?",
        options: ["MongoDB", "MySQL", "Oracle", "SQLite"],
        answer: "MongoDB",
      },
      {
        question: "What is the usual purpose of an API between React and Express?",
        options: [
          "Allowing the frontend and backend to exchange data",
          "Automatically designing page layouts",
          "Replacing all database storage",
          "Compiling CSS into HTML",
        ],
        answer: "Allowing the frontend and backend to exchange data",
      },
    ],
  },
  {
    title: "UI/UX Fundamentals Quiz",
    courseTitle: "UI/UX Fundamentals for Developers",
    questions: [
      {
        question: "What does UI stand for?",
        options: [
          "User Interface",
          "Universal Internet",
          "Unified Installation",
          "User Integration",
        ],
        answer: "User Interface",
      },
      {
        question: "What does UX primarily focus on?",
        options: [
          "The user's overall experience",
          "Database indexing only",
          "Server configuration only",
          "Programming language syntax only",
        ],
        answer: "The user's overall experience",
      },
      {
        question: "Why is color contrast important in interface design?",
        options: [
          "It helps make content readable",
          "It automatically speeds up the server",
          "It replaces responsive layouts",
          "It removes the need for navigation",
        ],
        answer: "It helps make content readable",
      },
      {
        question: "What is responsive design?",
        options: [
          "A layout that adapts to different screen sizes",
          "A database backup method",
          "A JavaScript testing library",
          "A server authentication method",
        ],
        answer: "A layout that adapts to different screen sizes",
      },
      {
        question: "What is a wireframe commonly used for?",
        options: [
          "Planning a page's structure",
          "Storing user passwords",
          "Deploying a backend server",
          "Querying a database",
        ],
        answer: "Planning a page's structure",
      },
    ],
  },
];

async function seedQuizzes() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from the backend .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    for (const data of quizData) {
      const course = await Course.findOne({
        title: data.courseTitle,
      });

      if (!course) {
        console.log(`Course not found; skipping: ${data.courseTitle}`);
        continue;
      }

      const existingQuiz = await Quiz.findOne({
        course: course._id,
        title: data.title,
      });

      if (existingQuiz) {
        console.log(`Quiz already exists: ${data.title}`);
        continue;
      }

      const quiz = await Quiz.create({
        title: data.title,
        course: course._id,
        questions: data.questions,
      });

      console.log(`Created: ${quiz.title} | ID: ${quiz._id}`);
    }

    console.log("Quiz seeding finished");
  } catch (error) {
    console.error("Quiz seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seedQuizzes();

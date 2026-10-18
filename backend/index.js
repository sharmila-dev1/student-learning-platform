const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

let dbConnectionPromise;

module.exports = async (req, res) => {
  try {
    if (!dbConnectionPromise) {
      dbConnectionPromise = connectDB();
    }

    await dbConnectionPromise;

    return app(req, res);
  } catch (error) {
    console.error("Vercel database connection failed:", error.message);
    dbConnectionPromise = null;

    return res.status(500).json({
      message: "Database connection failed",
    });
  }
};

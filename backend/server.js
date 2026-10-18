const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Database connection failed:", error.message);
      process.exit(1);
    });
}

module.exports = app;

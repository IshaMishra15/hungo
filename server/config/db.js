const mongoose = require("mongoose"); // Object Data Modeling (ODM) library for MongoDB and Node.js
const dotenv = require("dotenv");
const cron = require("node-cron");
dotenv.config();
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hungo";
    //console.log(process.env.PORT); //"mongodb://127.0.0.1:27017/hungo";
    if (!uri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");

    // Schedule the cron job to run every hour
    cron.schedule("0 * * * *", async () => {
      try {
        console.log("Running the deleteOldOrders job...");
        const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
        const result = await Order.deleteMany({
          createdAt: { $lt: twelveHoursAgo },
        });
        console.log(`${result.deletedCount} old orders deleted successfully`);
      } catch (error) {
        console.error("Error deleting old orders:", error);
      }
    });
  });
};

module.exports = connectDB;

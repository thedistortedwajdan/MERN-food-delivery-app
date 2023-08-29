const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const uri = process.env.uri;

const connect_to_db = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");

    const usersCollection = await mongoose.connection.db.collection("users");
    global.food_items = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();
    global.food_category = await mongoose.connection.db
      .collection("food_category")
      .find({})
      .toArray();

    // console.log("Data retrieved:", food_items, food_category);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connect_to_db;

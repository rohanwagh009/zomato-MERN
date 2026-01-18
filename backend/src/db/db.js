// logic for connecting server to database
// server connection is done in server.js

const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb://localhost:27017/food-view").then(() => {
    console.log("MongoDB connected");
  })
  .catch((error)=> {
    console.log("MongoDB connection error: ", error);
    
  })
}

module.exports = connectDB

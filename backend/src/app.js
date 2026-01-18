// create server

const express = require("express");
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')

const app = express();
app.use(cookieParser())     // used as middleware
app.use(express.json())    // used as middleware

app.get("/", (req, res) => {
  res.send("Hello world");
})
app.use('/api/auth', authRoutes)



module.exports = app;

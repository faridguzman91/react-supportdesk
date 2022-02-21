// console.log('Server object...')

const express = require("express");
const colors = require('colors')
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require ('./config/db')
const {errorHandler}  = require('./middleware/errorMiddleware')

//connect to database
connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  res.json({ message: "welcome to the support desk api" });
});

//routes, connect url to routes file
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

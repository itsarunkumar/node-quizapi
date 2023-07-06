const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const testRoute = require("./routes/test.route");
const userRoute = require("./routes/userRoute");
const quizRoute = require("./routes/quizRoute");
const authenticateToken = require('./middlewares/authMiddleware')
const morgan = require('morgan');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.use(morgan('dev'));

// Routes
app.use("/test", authenticateToken, testRoute);
app.use("/user", userRoute);
app.use("/quiz", authenticateToken, quizRoute);


module.exports = app;

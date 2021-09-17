const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi"); // return class
const express = require("express");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const app = express();

// console.log(`Node_env: ${process.env.NODE_ENV}`); // return undefined if enviroment is not set
// console.log(app.get('env')); // return development by default if enviroment is not set

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // req.body
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);

// configuration
console.log("App name: " + config.get("name"));
console.log("Mail server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("morgan enabled..."); //console.log("morgan enabledd...");
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("hello rawan!!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listing on port ${port}...`));

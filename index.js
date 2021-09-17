const Joi = require("joi"); // return class
const express = require("express");
const app = express();

app.use(express.json()); // ??

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("hello rawan!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// /api/courses/id

app.get("/api/courses/:id", (req, res) => {
  let course = courses.find((crs) => crs.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given id was invalid");
  res.send(course);
});

// add
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(newCourse);
  res.send(newCourse);
});

// update
app.put("/api/courses/:id", (req, res) => {
  // look up the course
  // if not existing return 404
  let course = courses.find((crs) => crs.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given id was invalid");

  // validate
  // if valid, return 400 - bad request
  const { error } = validateCourse(req.body); // {error} => resul t.error , result => validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message);
  // update course
  course.name = req.body.name;
  // return the updated course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(course, schema);
  return result;
}

app.delete("/api/courses/:id", (req, res) => {
  // look up the course
  // not existing, return 404
  const course = courses.find((crs) => crs.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("This is invalid course");

  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // return the same course
  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listing on port ${port}...`));

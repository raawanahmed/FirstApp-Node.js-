const express = require("express");
const router = express.Router();
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

// /api/courses/id

router.get("/:id", (req, res) => {
  let course = courses.find((crs) => crs.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given id was invalid");
  res.send(course);
});

// add
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

module.exports = router;

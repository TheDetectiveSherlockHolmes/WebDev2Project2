const express = require("express");
const router = express.Router();

const students = require("../data/students");

// GET /students - Get all students
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// GET /students/:id - Get one student
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      message: "Student ID must be a number"
    });
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// POST /students - Add a student
router.post("/", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: "Name and course are required"
    });
  }

  const newId = students.length > 0
    ? Math.max(...students.map((student) => student.id)) + 1
    : 1;

  const newStudent = {
    id: newId,
    name: String(name).trim(),
    course: String(course).trim()
  };

  if (!newStudent.name || !newStudent.course) {
    return res.status(400).json({
      success: false,
      message: "Name and course cannot be empty"
    });
  }

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent
  });
});

// PUT /students/:id - Update a student
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      message: "Student ID must be a number"
    });
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: "Name and course are required"
    });
  }

  const updatedName = String(name).trim();
  const updatedCourse = String(course).trim();

  if (!updatedName || !updatedCourse) {
    return res.status(400).json({
      success: false,
      message: "Name and course cannot be empty"
    });
  }

  student.name = updatedName;
  student.course = updatedCourse;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student
  });
});

// DELETE /students/:id - Delete a student
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      message: "Student ID must be a number"
    });
  }

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent
  });
});

module.exports = router;

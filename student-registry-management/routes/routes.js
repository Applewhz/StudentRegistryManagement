const express = require("express");
const router = express.Router();

const {
   registerStudents,
   getStudentsUnderTeacherList,
   suspendStudent,
   getStudentListForNotifications,
} = require("../controllers/controller");

router.route("/commonstudents").get(getStudentsUnderTeacherList);
router.route("/retrievefornotifications").get(getStudentListForNotifications);
router.route("/register").post(registerStudents);
router.route("/suspend").post(suspendStudent);

module.exports = router;

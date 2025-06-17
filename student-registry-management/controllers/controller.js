const mysql = require("mysql");
const uuid = require("uuid");

const db = mysql.createConnection({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
});

exports.registerStudents = async (req, res) => {
   const { teacher, students } = req.body;
   const registerStudent =
      "INSERT INTO studentregistrymanagement.studentstable (createdAt, updatedAt, id, email, teachersAssigned) VALUES (?,?,?,?,?)";
   if (students.length < 1) {
      res.json({
         codeStatus: "501",
         Message: "Unable to register students",
      });
   }
   for (let x = 0; x < students.length; x++) {
      try {
         db.query(
            registerStudent,
            [
               new Date(Date.now()),
               new Date(Date.now()),
               uuid.v4().toString(),
               students[x],
               teacher,
            ],
            (err) => {
               if (err)
                  return res.json({
                     something: console.log(err),
                     codeStatus: "501",
                     Message: "Error when registering students",
                  });
            }
         );
      } catch (err) {
         console.log(err);
      }
   }
   return res.json({
      codeStatus: "204",
   });
};

exports.getStudentsUnderTeacherList = async (req, res) => {
   const { teacher } = req.query;
   console.log(teacher);
   const retrieveStudents =
      "SELECT email FROM studentregistrymanagement.studentstable WHERE teachersAssigned IN (?)";
   db.query(retrieveStudents, [teacher], (err, result) => {
      if (err)
         return res.json({
            codeStatus: "501",
            Message: "Unable to retrieve Students",
         });
      const formatResult = result.map((element) => element.email);
      return res.json({ codeStatus: "200", students: formatResult });
   });
};

exports.suspendStudent = async (req, res) => {
   const { student } = req.body;
   const suspendStudent =
      "UPDATE studentregistrymanagement.studentstable SET isActive = 0 WHERE email = ?";
   db.query(suspendStudent, [student], (err) => {
      if (err)
         return res.json({
            codeStatus: "501",
            Message: "Unable to Suspend Student",
         });
      return res.json({ codeStatus: "204" });
   });
};

exports.getStudentListForNotifications = async (req, res) => {
   const { teacher, notification } = req.body;
   const retrieveStudentList =
      "SELECT email FROM studentregistrymanagement.studentstable WHERE teachersAssigned = ? OR email IN (?)";
   const listOfMentionedStudents = notification
      .split(" ")
      .filter((mentionedStudent) => mentionedStudent.includes("@"));
   const formattedMentionedStudentList = listOfMentionedStudents.map(
      (student) => student.replace("@", "")
   );
   db.query(
      retrieveStudentList,
      [teacher, formattedMentionedStudentList],
      (err, result) => {
         if (err) {
            return res.json({
               codeStatus: "501",
               Message: "Unable to retrieve",
            });
         }
         const formatResult = result.map((element) => element.email);
         return res.json({ codeStatus: "200", recipients: formatResult });
      }
   );
};

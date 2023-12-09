const {
  authLogin,
  addStudentdetails,
} = require("../services/dbservices");

async function RegisterStudent(details) {
  const { name, city, seatno, emailid, password } = details;
  try {
    await addStudentdetails(
      name,
      city,
      seatno,
      emailid,
      password
    )
      .then((createdStudent) => {
        console.log("Created student:", createdStudent.toJSON());
      })
      .catch((err) => {
        console.error("Error:", err.message);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function LoginStudent(details) {
  const { emailid, password } = details;
  try {
    let token = await authLogin(emailid, password);
    if (!token) {
      return false;
    } else {
      return token;
    }
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

module.exports = {
  RegisterStudent,
  LoginStudent,
};

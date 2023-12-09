const client = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validCity } = require("../utils/helpers");
const Student = require("../model/student.model");
const ExamCenter = require("../model/ExamCenter");
const sequelize = require("../config/db.config");

// async function addstudent(name,city,seatno,emailid,password) {
// 	let result=await validCity(city)
// 	const hashedPassword = await bcrypt.hash(password,10);
// 	if (!result) {
// 		return false;
// 	  } else {
// 		try {
// 			await client.query(
// 			  "INSERT INTO students (name,city,seatno,emailid,password) VALUES ($1,$2,$3,$4,$5)",
// 			  [name,city,seatno,emailid,hashedPassword]
// 			);
// 			return true;
// 		  } catch (err) {
// 			return err;
// 		  }
// 	  }
// }

async function addStudentdetails(name, city, seatno, emailid, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = await Student.create({
      name: name,
      city: city,
      seatno: seatno,
      emailid: emailid,
      password: hashedPassword,
    });
    return newStudent;
  } catch (error) {
    throw new Error("Error creating student");
  }
}

// async function authLogin(emailid, password) {
//   const result = await client.query(
//     "SELECT * FROM students WHERE emailid = $1",
//     [emailid]
//   );
//   if (result != null && result.rowCount) {
//     const hashedPassword = result.rows[0].password;
//     const isValidPassword = await bcrypt.compare(password, hashedPassword);
//     if (isValidPassword) {
//       const token = jwt.sign(
//         { id: result.rows[0].id, emailid: result.rows[0].emailid },
//         process.env.secretKey
//       );
//       return token;
//     }
//   }
//   return null;
// }

async function authLogin(emailid, password) {
  try {
    const student = await Student.findOne({
      where: { emailid: emailid },
    });
    console.log("student---->", student);
    if (student) {
      const hashedPassword = student.password;
      const isValidPassword = await bcrypt.compare(password, hashedPassword);
      if (isValidPassword) {
        const token = jwt.sign(
          { id: student.id, emailid: student.emailid },
          process.env.secretKey
        );
        return token;
      }
    }
    return null;
  } catch (error) {
    throw new Error("Error authenticating");
  }
}

async function deleteStudentByEmail(email) {
  try {
    const deletedStudent = await Student.destroy({
      where: { emailid: email },
    });
    if (deletedStudent) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error while deleting student");
  }
}

// async function getStudent(id) {
//   try {
//     const result = await client.query("SELECT * FROM students WHERE id = $1", [
//       id,
//     ]);
//     if (result != null && result.rowCount) {
//       console.log("city",result.rows[0].city)
//       return result.rows[0].city;
//     } else {
//       return null;
//     }
//   } catch (err) {
//     console.log("error while getting details", err);
//     return err;
//   }
// }

async function getStudent(id) {
  try {
    const student = await Student.findOne({ where: { id } });
    if (student) {
      console.log("city:", student.city);
      return student.city;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error while getting details:", error);
    return error;
  }
}

async function getCenter(coordinates) {
  const { latitude, longitude } = coordinates;
  try {
    const result = await ExamCenter.findOne({
      attributes: ["city"],
      order: [
        [
          sequelize.literal(
            `((lat - ${latitude}) * (lat - ${latitude}) + (lon - ${longitude}) * (lon - ${longitude})) ASC`
          ),
        ],
      ],
    });
    if (result) {
      return result.city;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  addStudentdetails,
  authLogin,
  getCenter,
  getStudent,
  deleteStudentByEmail,
};

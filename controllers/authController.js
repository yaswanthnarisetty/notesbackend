import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
const jwtKey = "yash";

//check user in the db  if found match password

// export const log = async (req, res) => {
//   if (req.body.email && req.body.password) {
//     let user = await User.findOne(req.body);
//     console.log(user);
//     if (user) {
//       Jwt.sign(
//         { _id: user._id, email: user.email, role: user.role },
//         jwtKey,
//         (err, token) => {
//           if (err) {
//             res.send({ result: "something went wrong" });
//           }
//           res.send({ user, auth: token });
//         }
//       );
//     } else {
//       res.send({ result: "no user found" });
//     }
//   } else {
//     res.send({ result: "no user found" });
//   }
// };

const securePassword = async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

function isEmail(email) {
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== "" && email.match(emailFormat)) {
    return true;
  }

  return false;
}

export const login = async (req, res) => {
  if (req.body.email) {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let userPassword = await bcrypt.compare(req.body.password, user.password);
      if (userPassword) {
        Jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          jwtKey,
          (err, token) => {
            if (err) {
              res.jsonp({
                message: "something went wrong",
                statusCode: 400,
              });
            }
            res.jsonp({ name: user.name, email: user.email, auth: token });
          }
        );
      } else {
        res.jsonp({
          message: "incorrect password",
          statusCode: 406,
          status: true,
        });
      }
    } else {
      if (isEmail(req.body.email)) {
        res.jsonp({
          message: "you are not registered",
          statusCode: 404,
          status: true,
        });
      } else {
        res.jsonp({
          message: "enter valid email",
          statusCode: "406",
          status: true,
        });
      }

      // res.send({ result: "enter valid email" });
    }
  }
};

//check in the db for user first

export const register = async (req, res) => {
  if (req.body.email) {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.jsonp({
        message: "user already found",
        statusCode: 403,
        status: true,
      });
      // res.send("user already found");
    } else {
      if (isEmail(req.body.email)) {
        if (req.body.password) {
          req.body.password = await securePassword(req.body.password);
          console.log(req.body.password);
          user = new User(req.body);
          const result = await user.save();
          Jwt.sign({ result }, jwtKey, (err, token) => {
            if (err) {
              // res.send({ result: "something went wrong" });
              res.jsonp({
                message: "something went wrong",
                statusCode: 403,
                status: true,
              });
            }
            res.send({
              name: result.name,
              email: result.email,
              role: result.role,
              auth: token,
            });
          });
        } else {
          res.jsonp({
            message: "please provide the  password",
            statusCode: 406,
            status: true,
          });
        }
      } else {
        res.jsonp({
          message: "enter valid email",
          statusCode: 406,
          status: true,
        });
      }
    }
  }
};

export function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.send("please enter a valid token");
      } else {
        req.role = valid.role;
        req.userId = valid._id;
        next();
      }
    });
  } else {
    res.send("please add a token");
  }
}

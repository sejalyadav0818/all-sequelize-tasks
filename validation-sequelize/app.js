const express = require("express");
const joi = require("joi");
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swagerUi = require('swagger-ui-express');
app.use(express.json());

const signupSchema = joi.object({
  userName: joi.string().alphanum().min(3).max(25).trim(true).required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().min(8).trim(true).alphanum().required(),
  confirmpassword: joi.ref("password"),
  mobileNumber: joi.string().length(10).required(),
  birthYear: joi.number().integer().min(1920).max(2023),
  gender: joi.string().valid("male", "female", "transger", "others"),
  is_active: joi.boolean().default(true).required(),
});

app.post("/signup", (req, res) => {
  const { error, value } = signupSchema.validate(req.body);
  if (error) {
    console.log("invalid request ");
    return res.send(error.details);
  }
  res.send("sign up");
});


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  
};

 const specs = swaggerJsdoc(options);
// app.use("/api-docs", swagerUi.serve, swagerUi.setup(specs));



app.use(
  "/api-docs",
  swagerUi.serve,
  swagerUi.setup(specs, { explorer: true })
);

app.listen(4000, () => {
  console.log("server is listening ");
});

// //req.body
// {
//    "userName" : "sejal",
//    "email" : "sejalyadav122@gmail.com",
//    "password" : "BUl123ahbyt",
//    "confirmpassword" : "BUl123ahbyt",
//     "mobileNumber" : "7069122988",
//    "birthYear" : "2022",
//    "gender" : "male",
//    "is_active" : "false"

// }

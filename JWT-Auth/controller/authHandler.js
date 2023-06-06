const { sequelize, Customer } = require("../models");
const bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

// const loginHandler async (req,res)=>{
//         return res.send('loginHandler called')
// })

async function loginHandler(req, res) {
  let { email, password } = req.body;
  let isAvaliable = await Customer.findOne({
    where: {
      email: email,
    },
  });
//check user avaliable or not
  if (!isAvaliable) 
  {
    return res.status(400).send({ message: "user is not avaliable" });
  } else {
    return res.status(200).send({ message: "user is  avaliable" });
  }
  //check password 
  let passMatch = bcrypt.compare(password,isAvaliable.password);
  
  if (!passMatch) {
    return res.status(400).send({ message: " password not is match" });
  } else {
    return res.status(200).send({ message: "password is  match" });
  }


}


async function signupHandler(req, res) {
  const { email, password, fname, lname } = req.body;
  //encrypt password
  var passwordHash = bcrypt.hashSync(password, salt);

  const isAvaliable = await Customer.findOne({
    where: { email: email },
  });

  //check user is Avaliable or not
  if (isAvaliable) {
    return res.send("User is already Avaliable");
  }
  //   return res.send("signupHandler called");
  //insert user

  const newUser = await Customer.create({
    email: email,
    password: passwordHash,
    fname: fname,
    lname: lname,
  });
  return res.status(400).send({ message: "User Created successfully" });
}

module.exports = { signupHandler, loginHandler };

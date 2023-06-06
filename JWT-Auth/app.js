const express = require('express');
const cores = require('cors');
const customerRoute = require('./route/index');
const bcrypt = require('bcryptjs');
const sequelize = require('./models/index');
const Customer = require('./models/customer');
const Task = require('./models/task');
const indexRoute = require('./route/index');
const db= require('./models')
 // import models
db.sequelize.sync({ force: false }).then(() => {
  console.log("re sync");
});

var salt = bcrypt.genSaltSync(10);
let app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// let user = [];

//middleware 
app.use(cores());
app.use((req,res,next)=>{
        next();
});
app.use("/api", indexRoute);

app.get('/',(res,req)=>{
    res.send(`<h1>express app</h1>`);
})

app.listen(7000,()=>{
    console.log("port runing on 7000");
})


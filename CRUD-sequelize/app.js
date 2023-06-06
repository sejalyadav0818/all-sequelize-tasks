const express= require('express');
const Sequelize = require('sequelize');
const body = require('body-parser');
const app= express();
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
const PORT = 4000;



app.get('/', (req,res)=>{
    console.log("get api call");
})



app.post("/users",async(req,res)=>{
    const {firstName,lastName,email } = req.body;
    console.log(firstName,lastName,email);

    try {
        const user = await User.create(data);
        res.send(user);
      } catch (err) {
        res.send(err);
      }
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
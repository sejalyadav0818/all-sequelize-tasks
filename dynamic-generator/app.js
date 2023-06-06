const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const { json } = require("sequelize");
const selection_master= db.selection_master;
const option_master = db.option_master;

db.sequelize.sync();
//craete 
app.get("/getAlldata", async (req, res) => {
  try {
    let data = await selection_master.findAll({
      inculde: ["option_master"],
    });
    return res.status(200).json({
      success: "true",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      err: err,
    });
  }
});

//insert 
app.post("/addData" , async (req, res) => {
  try {
    const data = await selection_master.create(
      {
        selection_master: req.body.selection_master,
        option_master: req.body.option_master,
      },
      {
        include: [db.selectionOption],
      }
    );

    return res.send(data);
  } catch (err) {
    return res.send(err);
  }
});


//update 

//delete 

app.listen(4000, ()=>{
        console.log(("server on"));
});


// app.post("/addData", async (req, res) => {
//   try {
//     const data = await selection_master.create(
//       {
//         select_values: req.body.select_values,
//         option_value: req.body.option_value,
//       },
//       {
//         include: [option_master],
//       }
//     );

//     return res.send(data);
//   } catch (err) {
//     return res.send(err);
//   }
// });
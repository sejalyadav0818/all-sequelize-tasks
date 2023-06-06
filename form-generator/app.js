const express = require("express");
const app = express();
const db = require("./models/index");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");

const from = require("./models").form;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

db.sequelize.sync();

app.use(express.json());

app.get("/", function (req, res, next) {
  res.render("index");
});
//insert data

app.post("/insert", async (req, res) => {
  console.log(req.body);
  console.log(JSON.stringify(req.body.form_filds));
  try {
    const data = await from.create({
      form_name: req.body.form_name,
      form_filds: JSON.stringify(req.body.form_filds),
    });
    console.log(data);
    res.render("index", {
      data: data,
    });
  } catch (err) {
    return res.send(err);
  }
});

// //update data for option master
// app.put("/updateData", async (req, res) => {
//   let option_namee = req.query.option_namee;
//   console.log(option_namee);
//   const bodydata = req.body;
//   const option_name = bodydata.option_name;
//   console.log(option_name);
//   const updatedRows = await country.update(
//     {
//       option_name: option_name,
//     },
//     {
//       where: { option_name: option_namee },
//     }
//   );
//   console.log(updatedRows); // [ 3 ]
// });

// //delete data of option master
// app.put("/deleteData", async (req, res) => {
//   let option_name = req.query.option_name;

//   const data = await country.destroy({
//     where: {
//       option_name: option_name,
//     },
//   });
//   return res.json({
//     message: "data deleted successfully",
//   });
// });

// //delete data of selection master--not working
// app.delete("/deleteDatase", async (req, res) => {
//   let selection_name = req.query.selection_name;

//   const data = await selection_master.destroy({
//     where: {
//       selection_name: selection_name,
//     },
//   });
//   return res.json({
//     message: "first delete child rows of respative parent data",
//   });
// });

// //control generator
// app.get("/getControls", async (req, res) => {
//   try {
//     const type = req.query.type || "combo";
//     const selection_id = req.query.selection_id || 17;
//     const multiple = req.query.multiple;
//     const boostapclass = req.query.boostapclass;
//     console.log(type, selection_id, multiple);
//     const data = await selection_master.findOne({
//       where: {
//         id: selection_id,
//       },
//       include: [db.selectionOption],
//     });

//     if (type == "radio") {
//       var html = `<label for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br>`;

//       for (var i = 0; i < data.country.length; i++) {
//         html += `<input type="radio" class="${boostapclass}"  name=${data.selection_name} id=${data.country[i].option_name} value=${data.country[i].option_name}> ${data.country[i].option_name}<br>`;
//       }
//     } else if (type == "checkbox") {
//       var html = `<label  for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br>`;

//       for (var i = 0; i < data.country.length; i++) {
//         html += `<input type="checkbox" name=${data.country[i].option_name} id=${data.country[i].option_name} value=${data.country[i].option_name} class="${boostapclass}"> ${data.country[i].option_name}`;
//       }
//     } else if (type == "combo") {
//       var html = `<label for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br><select name="${data.selection_name}" id="${data.selection_name}" ${multiple}><br>`;

//       for (var i = 0; i < data.country.length; i++) {
//         html += `<option value=${data.country[i].option_name} class="${boostapclass}">${data.country[i].option_name}</option>`;
//       }
//       html += `</select>`;
//     }

//     return res.send(html);
//   } catch (err) {
//     return res.send(err);
//   }
// });

// //getdata-from country usimg key
// app.get("/getControlss", async (req, res) => {
//   try {
//     const type = req.query.type || "combo";
//     const id = req.query.id;
//     const multiple = req.query.multiple;
//     const boostapclass = req.query.boostapclass;

//     const data = await selection_master.findOne({
//       where: {
//         id: id,
//       },
//       include: [db.selectionOption],
//     });

//     if (type == "radio") {
//       var html = `<label for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br>`;

//       for (var i = 0; i < data.country.length; i++) {
//         html += `<input type="radio" class="${boostapclass}"  name=${data.selection_name} id=${data.country[i].option_name} value=${data.country[i].option_name}> ${data.country[i].option_name}<br>`;
//       }
//     } else if (type == "checkbox") {
//       var html = `<label  for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br>`;

//       for (var i = 0; i < data.country.length; i++) {
//         html += `<input type="checkbox" name=${data.country[i].option_name} id=${data.country[i].option_name} value=${data.country[i].option_name} class="${boostapclass}"> ${data.country[i].option_name}`;
//       }
//     } else if (type == "combo") {
//       var html = `<label for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br><select name="${data.selection_name}" id="${data.selection_name}" ${multiple}><br>`;

//       for (var i = 0; i < data.country.length; i++) {
//         html += `<option value=${data.country[i].option_name} class="${boostapclass}">${data.country[i].option_name}</option>`;
//       }
//       html += `</select>`;
//     }

//     return res.send(html);
//   } catch (err) {
//     return res.send(err);
//   }
// });

//google from control generator
// app.get("/getfrom", async (req, res) => {
//   try {
//     //const lable = req.query.lable;
//     const selection_id = req.query.selection_id || 17;
//     const multiple = req.query.multiple;
//     const boostapclass = req.query.boostapclass;
//     console.log(type, selection_id, multiple);
//     const data = await selection_master.findOne({
//       where: {
//         id: selection_id,
//       },
//       include: [db.selectionOption],
//     });

//     if (type == "radio") {
//       var html = `<label for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br>`;

//       for (var i = 0; i < data.country.length; i++) {
//         html += `<input type="radio" class="${boostapclass}"  name=${data.selection_name} id=${data.country[i].option_name} value=${data.country[i].option_name}> ${data.country[i].option_name}<br>`;
//       }
//     } else if (type == "checkbox") {
//       var html = `<label  for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br>`;

//       for (var i = 0; i < data.country.length; i++) {
//         html += `<input type="checkbox" name=${data.country[i].option_name} id=${data.country[i].option_name} value=${data.country[i].option_name} class="${boostapclass}"> ${data.country[i].option_name}`;
//       }
//     } else if (type == "combo") {
//       var html = `<label for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br><select name="${data.selection_name}" id="${data.selection_name}" ${multiple}><br>`;

//       for (var i = 0; i < data.country.length; i++) {
//         html += `<option value=${data.country[i].option_name} class="${boostapclass}">${data.country[i].option_name}</option>`;
//       }
//       html += `</select>`;
//     } else if (type == "lable") {
//       var html = `<label for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br><select name="${data.selection_name}" id="${data.selection_name}" ${multiple}><br>`;

//       for (var i = 0; i < data.country.length; i++) {
//         html += `<option value=${data.country[i].option_name} class="${boostapclass}">${data.country[i].option_name}</option>`;
//       }
//       html += `</select>`;
//     }

//     return res.send(html);
//   } catch (err) {
//     return res.send(err);
//   }
// });

app.listen(5000, () => {
  console.log("Server started on port 3007");
});
//change coountry to option_master

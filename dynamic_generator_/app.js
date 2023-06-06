const express = require("express");
const app = express();
const db = require("./models");
app.use(express.json());
app.set("view engine", "ejs");
const selection_master = db.selection_master;
const option_master = db.option_master;

//insert data
app.post("/addData", async (req, res) => {
  try {
    const data = await selection_master.create(
      {
        selection_name: req.body.selection_name,
        option_master: req.body.option_master,
      },
      {
        include: [option_master],
      }
    );

    return res.send(data);
  } catch (err) {
    return res.send(err);
  }
});

//show data
app.get("/showData", async (req, res) => {
  try {
    const data = await selection_master.findAll({
      include: [db.selectionOption],
    });

    return res.send(data);
    // res.render('index',{menu:data});
  } catch (err) {
    return res.send(err);
  }
});

//update data for option master
app.put("/updateData", async (req, res) => {
  let option_namee = req.query.option_namee;
  console.log(option_namee);
  const bodydata = req.body;
  const option_name = bodydata.option_name;
  console.log(option_name);
  const updatedRows = await option_master.update(
    {
      option_name: option_name,
    },
    {
      where: { option_name: option_namee },
    }
  );
  console.log(updatedRows); // [ 3 ]
});

//delete data of option master
app.put("/deleteData", async (req, res) => {
  let option_name = req.query.option_name;

  const data = await option_master.destroy({
    where: {
      option_name: option_name,
    },
  });
  return res.json({
    message: "data deleted successfully",
  });
});

//delete data of selection master--not working
app.delete("/deleteDatase", async (req, res) => {
  let selection_name = req.query.selection_name;

  const data = await selection_master.destroy({
    where: {
      selection_name: selection_name,
    },
  });
  return res.json({
    message: "first delete child rows of respative parent data",
  });
});

//control generator
app.get("/getControls", async (req, res) => {
  try {
    const type = req.query.type || "combo";
    const selection_id = req.query.selection_id || 1;
    const multiple = req.query.multiple;
    const boostapclass = req.query.boostapclass;

    const data = await selection_master.findOne({
      where: {
        id: selection_id,
      },
      include: [db.selectionOption],
    });

    if (type == "radio") {
      var html = `<label for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br>`;

      for (var i = 0; i < data.option_master.length; i++) {
        html += `<input type="radio" class="${boostapclass}"  name=${data.selection_name} id=${data.option_master[i].option_name} value=${data.option_master[i].option_name}> ${data.option_master[i].option_name}<br>`;
      }
    } else if (type == "checkbox") {
      var html = `<label  for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br>`;

      for (var i = 0; i < data.option_master.length; i++) {
        html += `<input type="checkbox" name=${data.option_master[i].option_name} id=${data.option_master[i].option_name} value=${data.option_master[i].option_name} class="${boostapclass}"> ${data.option_master[i].option_name}`;
      }
    } else if (type == "combo") {
      var html = `<label for ="${data.selection_name}" class="${boostapclass}"> ${data.selection_name} </label><br><select name="${data.selection_name}" id="${data.selection_name}" ${multiple}><br>`;

      for (var i = 0; i < data.option_master.length; i++) {
        html += `<option value=${data.option_master[i].option_name} class="${boostapclass}">${data.option_master[i].option_name}</option>`;
      }
      html += `</select>`;
    }

    return res.send(html);
  } catch (err) {
    return res.send(err);
  }
});

app.listen(6000, () => {
  console.log("Server started on port 6000");
});

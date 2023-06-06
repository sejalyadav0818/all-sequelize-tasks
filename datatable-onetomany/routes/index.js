var express = require("express");
var router = express.Router();

const db = require("../models");
const { Op } = require("sequelize");
const users = db.users;
const posts = db.posts;

db.sequelize.sync();
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/getdata", async (req, res) => {
  try {
    const { draw, search, order } = req.query;
    const offset = req.query.start || 0;
    const limit = req.query.length || 10;

    console.log("offset", typeof offset);

    const columns = [
      "firstName",
      "lastName",
    ];
    const { dir, column } = order[0];
    const columnOrder = columns[column];
    const orderDirection = dir.toUpperCase();

    const query = {
      where: {},
      offset: +offset,
      limit: +limit,
      order: [[columnOrder, orderDirection]],
    };

    if (search.value) {
      query.where[Op.or] = columns.map((column) => ({
        [column]: { [Op.like]: `%${search.value}%` },
      }));
    }

    const data = await users.findAndCountAll(query);

    return res.json({
      draw: parseInt(draw),
      recordsTotal: data.count,
      recordsFiltered: data.count,
      data: data.rows,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).send(err);
  }
});

module.exports = router;

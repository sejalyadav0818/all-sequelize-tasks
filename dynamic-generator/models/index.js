'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.selection_master = require("./selection_master")(sequelize, Sequelize);
db.option_master = require("./option_master")(sequelize, Sequelize);



db.sequelize = sequelize;
db.Sequelize = Sequelize;



db.selectionOption = db.selection_master.hasMany(db.option_master, {
  foreignKey: "select_id",
  as: "option_master"
});
db.option_master.belongsTo(db.selection_master, {
  foreignKey: "select_id",
  as: "option_master"
});


db.sequelize.sync({ force: false }).then(() => {
  console.log("re sync");
});


// db.selectionOption = db.selection_master.hasMany(db.option_master, {
//   foreignKey: "selection_id",
//   as: "option_master",
// });
// db.option_master.belongsTo(db.selection_master, {
//   foreignKey: "selection_id",
//   as: "option_master",
// });

module.exports = db;

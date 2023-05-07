const dbConfig = require("../../config/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database.database, dbConfig.database.username, dbConfig.database.password, {
    host: dbConfig.database.host,
    dialect: dbConfig.database.dialect,
    pool: {
        max: dbConfig.database.pool.max,
        min: dbConfig.database.pool.min,
        acquire: dbConfig.database.pool.acquire,
        idle: dbConfig.database.pool.idle
    },
    logging: true
});


sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection has been established successfully.",
      dbConfig.database.database
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, Sequelize);
db.membership_master = require("./membership_master")(sequelize, Sequelize);
db.guests = require("./guests")(sequelize, Sequelize);
db.rooms = require("./rooms")(sequelize, Sequelize);
db.room_reservation= require("./room_reservation")(sequelize, Sequelize);
db.categories= require("./categories")(sequelize, Sequelize);
db.items= require("./items")(sequelize, Sequelize);
db.food_order= require("./food_order")(sequelize, Sequelize);
db.order_items= require("./order_items")(sequelize, Sequelize);
db.messages= require("./messages")(sequelize, Sequelize);
db.wallet_trans= require("./wallet_trans")(sequelize, Sequelize);
db.machines= require("./machine")(sequelize, Sequelize);
db.membership_transaction = require("./membership_transaction")(sequelize, Sequelize);


sequelize.sync() 
module.exports = db;
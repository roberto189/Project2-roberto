const sequelize = require('../config/connection');
const {List, User, Item} = require("../models")


// sync model schema into table schemas
sequelize.sync({ force: true }).then(() => {
    User.findAll()
    Item.findAll()
    List.findAll()

    console.log("tables created")
    process.exit()
});

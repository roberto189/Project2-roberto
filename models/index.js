const list = require("./list");
const user = require("./user");
const item = require("./items");

user.hasMany(list)
list.belongsTo(user)

list.hasMany(item)
item.belongsTo(list)

module.exports = {list, user, item}
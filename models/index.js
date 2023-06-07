const Shoe = require("./Shoe")
const Trait = require("./Trait")
const Retailer = require("./Retailer")
const Customer = require("./Customer")

Shoe.belongsToMany(Trait, {through: "ShoeTraits"}) // many-to-many
Trait.belongsToMany(Shoe, {through: "ShoeTraits"})

Retailer.hasMany(Shoe) // one-to-many
Shoe.belongsTo(Retailer)


Customer.hasMany(Shoe) // one-to-many
Shoe.belongsTo(Customer)


module.exports = {Shoe,Trait, Customer, Retailer}
const router = require("express").Router()
const shoeRoutes = require("./shoeRoutes")
const traitRoutes = require("./traitRoutes")
const retailerRoutes = require("./retailerRoutes")
const customerRoutes = require("./customerRoutes")

router.use("/Shoes", shoeRoutes)
router.use("/traits", traitRoutes)
router.use("/Retailers", retailerRoutes)
router.use("/customers", customerRoutes)


module.exports = router
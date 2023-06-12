const router = require("express").Router()
const {Shoe, Customer, Retailer, Trait} = require("../models")

router.get("/", async (req,res) => {
  try {
    const ShoeData = await Shoe.findAll()
    const Shoes = ShoeData.map((Shoe) => Shoe.get({ plain: true }));
    console.log(Shoes)
    res.render("home", {Shoes: Shoes, userId: req.session.userId, isRetailer: req.session.isRetailer})
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get("/login", async (req,res) => {
  try {
    if (req.session.userId) {
      res.redirect("/")
    } else {
      res.render("login")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get("/signup", async (req,res) => {
  try {
    if (req.session.userId) {
      return res.redirect("/dashboard")
    } else {
      res.render("signup")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get("/dashboard", async (req,res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login")
    }
    if (req.session.isRetailer) {
      const RetailerData = await Retailer.findByPk(req.session.userId, {
        include: {
          all: true,
          nested: true
        }
      })
      const Retailer = RetailerData.get({plain: true})
      console.log(RetailerData)
      return res.render("dashboard", {user: Retailer, isRetailer: true})
    } else {
      const customerData = await Customer.findByPk(req.session.userId, {
        include: {
          all: true,
          nested: true
        }
      })
      const customer = customerData.get({plain: true})

      return res.render("dashboard", {user: customer, isRetailer: false})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get("/new-Shoe", (req,res) => {
  try {
    if (!req.session.userId) {
      res.redirect("/login")
    }
    res.render("newshoe", {user: req.session.userId, isRetailer: req.session.isRetailer})
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
    
  }
})

module.exports = router
const router = require("express").Router()
const {Retailer, Shoe} = require("../../models")
const bcrypt = require("bcrypt")


router.get("/", async (req, res) => {
  try {
    const Retailers = await Retailer.findAll({
      include: [{model: Shoe}]
    })
    res.status(200).json(Retailers)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

})

// signup
router.post("/", async (req, res) => {
  try {
    const newRetailer = await Retailer.create(req.body);
    // sign this person in
    req.session.RetailerId = newRetailer.id
    req.session.username = newRetailer.username
    res.status(200).json(newRetailer)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/session", async (req,res) => {
  res.json(req.session)
})


// req.body {username: "something", password: "somethingelse"}
// api/Retailers/login
router.post("/login", async (req,res) => {
  console.log(req.body)
  try {
    // try to find user with inputted username
    const foundRetailer = await Retailer.findOne({
      where: {username: req.body.username}
    })
    if (!foundRetailer) {
      console.log("no Retailer with this username!")
      res.status(403).json({msg: "No Retailer with this username"})
      // if found, check password
    } else {
      // if password matches, log them in!
      if (bcrypt.compareSync(req.body.password, foundRetailer.password)) {
        req.session.userId = foundRetailer.id
        req.session.username = foundRetailer.username
        req.session.isRetailer = true
        res.status(200).json(foundRetailer)
      } else {
        res.status(403).json({msg: "wrong password buddy"})
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.delete('/logout', (req,res) => {
  try {
    req.session.destroy()
    res.status(200).json({msg:"logged out successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
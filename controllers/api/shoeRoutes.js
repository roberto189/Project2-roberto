const router = require("express").Router()
const {Shoe, Customer, Retailer, Trait} = require("../../models")

router.get("/", async (req, res) => {
  try {
    const Shoes = await Shoe.findAll({
      include: {all: true, nested: true}
    })
    res.status(200).json(Shoes)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

})

router.get("/:id", async (req, res) => {
  try {
    const Shoe = await Shoe.findByPk(req.params.id, {
      include: {all: true, nested: true}
    })
    res.status(200).json(Shoe)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

})

router.post("/", async (req, res) => {
  try {
    const newShoe = await Shoe.create(req.body);
    // check if the user added any initial traits
    // if they did, add those trait(s) to this specific Shoe
    if (req.body.traitIds) {
      newShoe.addTraits(req.body.traitIds)
    }
    res.status(200).json(newShoe)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// only for updating traits
router.put("/changetraits/:id", async (req, res) => {
  try {
    const foundShoe = await Shoe.findByPk(req.params.id)
    console.log(foundShoe)
    // check if the user added any initial traits
    // if they did, add those trait(s) to this specific Shoe
    if (req.body.traitIds) {
      foundShoe.setTraits(req.body.traitIds)
    }
    res.status(200).json(foundShoe)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});




module.exports = router
const router = require('express').Router()
const {Item} = require('../../models')

router.get("/", (req, res) => {
  Item.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.post("/", async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(200).json(newItem)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

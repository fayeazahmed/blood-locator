const { Router } = require("express");
const Donor = require("../models/donor");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const entries = await Donor.find().select("-password");
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const bloodEntry = new Donor(req.body);
    const createdEntry = await bloodEntry.save();
    res.json(createdEntry);
  } catch (error) {
    next(error);
  }
  console.log(req.body);
});

router.post("/delete/:id", async (req, res, next) => {
  try {
    const bloodEntry = await Donor.findById(req.params.id);
    if (req.body.password === bloodEntry.password) {
	  await bloodEntry.remove();
	  res.json("Entry deleted")
    } else return res.status(401).json("Invalid Password!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

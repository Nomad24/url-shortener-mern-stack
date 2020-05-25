const { Router } = require("express");
const shortid = require("shortid");
const Link = require("../models/Link");
const Link_guest = require("../models/Link-guest");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = "https://short-ad.herokuapp.com";
    const { from } = req.body;

    const code = shortid.generate();

    const exist = await Link.findOne({ from });

    if (exist._id == req.user.userId) {
      return res.json({
        message: `This link "${exist.from}" already exists in the system`,
      });
    };

    const to = baseUrl + "/t/" + code;

    const link = new Link({
      from,
      to,
      code,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link, message: "Link created" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.post("/generate-guest", async (req, res) => {
  try {
    const baseUrl = "https://short-ad.herokuapp.com";
    const { from } = req.body;

    const code = shortid.generate();

    const to = baseUrl + "/t/" + code;

    const link = new Link_guest({
      from,
      to,
      code
    });

    await link.save();

    res.status(201).json({link, message: "Link created" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;

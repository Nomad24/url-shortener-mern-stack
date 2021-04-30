const { Router } = require("express");
const shortid = require("shortid");
const Link = require("../database/models/Link");
const Link_guest = require("../database/models/Link-guest");
const Link_brand_link = require("../database/models/Link-brand");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = "https://short-an.herokuapp.com";
    const { from } = req.body;

    const code = shortid.generate();

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

router.get("/brand-name", auth, async (req, res) => {
  try {
    const links = await Link_brand_link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link1 = await Link.findById(req.params.id);
    const link2 = await Link_brand_link.findById(req.params.id);

    if (link1) {
      res.json(link1);
    }

    if (link2) {
      res.json(link2);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.post("/generate-guest", async (req, res) => {
  try {
    const baseUrl = "https://short-an.herokuapp.com";
    const { from } = req.body;

    const code = shortid.generate();

    const to = baseUrl + "/t/" + code;

    const link = new Link_guest({
      from,
      to,
      code,
    });

    await link.save();

    res.status(201).json({ link, message: "Link created" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.post("/generate-brand-link", auth, async (req, res) => {
  try {
    const baseUrl = "https://short-an.herokuapp.com";
    const { from, name } = req.body;

    const exist = await Link_brand_link.findOne({ name });

    if (exist) {
      res
        .status(201)
        .json({
          info: "Exist",
          message: "The Brand Link already exists in the system",
        });
    }

    const to = baseUrl + "/t/" + name;

    const link = new Link_brand_link({
      from,
      to,
      name,
      owner: req.user.userId,
    });

    await link.save();

    res
      .status(201)
      .json({ link, info: "Created", message: "Brand link created" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const link1 = await Link.findByIdAndDelete(req.params.id);
    const link2 = await Link_brand_link.findByIdAndDelete(req.params.id);

    if (link1) {
      res.status(200).json({ message: "Link was deleted" });
    }
    if (link2) {
      res.status(200).json({ message: "Link was deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.put("/update/:id", auth, async (req, res) => {
  try {
    const {from, name} = req.body;

    if(from) {
      const link = await Link_brand_link.findByIdAndUpdate(req.params.id, {from: from, clicks: 0, date: new Date()});
      res.status(200).json({ message: "Link was updated" });
    }
    if(name) {
      const link = await Link_brand_link.findByIdAndUpdate(req.params.id, {name: name, clicks: 0, to: `https://short-an.herokuapp.com/t/${name}`, date: new Date()});
      res.status(200).json({ message: "Link was updated" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;

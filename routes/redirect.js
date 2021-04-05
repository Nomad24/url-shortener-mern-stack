const { Router } = require("express");
const Link = require("../database/models/Link");
const Link_guest = require("../database/models/Link-guest");
const Link_brand_link = require("../database/models/Link-brand");
const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });
    const link_guest = await Link_guest.findOne({code: req.params.code })
    const link_brand_link = await Link_brand_link.findOne({ name: req.params.code })

    //Link user
    if (link) {
      link.clicks++;
      await link.save();
      return res.redirect(link.from);
    }

    // Link guest
    if (link_guest) {
      return res.redirect(link_guest.from);
    }

    // Brand link
    if (link_brand_link) {
      link_brand_link.clicks++;
      await link_brand_link.save();
      return res.redirect(link_brand_link.from);
    }

    res.status(404).json("Link not found");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});


module.exports = router;

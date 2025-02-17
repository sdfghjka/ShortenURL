const express = require("express");
const router = express.Router();
const UrlService = require("../Services/UrlService");
const { generateShortURL } = require("../helpers/shortUrlHelper");

router.get("/", async (req, res) => {
  UrlService.getUrlLatest(5)
    .then((urls) => {
      const data = urls.map((url) => {
        return `http://localhost:3000/${url.shortUrl}`;
      });
      return data;
    })
    .then((data) => {
      return res.render("index", { urls: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/submit", async (req, res) => {
  if (!req.body.inputURL) {
    return res.status(400).json({ message: "Missing inputURL" });
  }
  const shortUrl = generateShortURL(8);
  console.log({ shortUrl: shortUrl, fullUrl: req.body.inputURL });
  try {
    await UrlService.setUrl(shortUrl, req.body.inputURL);
    // urls.push(`http://localhost:3000/${shortUrl}`);
    // if (urls.length > 5) urls.pop();
    res.json({ shortUrl: `http://localhost:3000/${shortUrl}` });
  } catch (error) {
    console.error("MongoDB Save Error:", error);
    res.status(500).json({ message: error.message });
  }
});
router.get("/:shorturl", async (req, res) => {
  try {
    console.log(req.params.shorturl);
    const fullUrl = await UrlService.getFullUrl(req.params.shorturl);

    if (!fullUrl) {
      return res.status(404).send("URL Not Found");
    }

    res.redirect(fullUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     await UrlService.deleteUrlById(req.params.id);
//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.status(500).send(error.message);
//   }
// });
module.exports = router;

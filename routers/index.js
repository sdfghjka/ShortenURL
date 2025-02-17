const express = require("express");
const router = express.Router();
const UrlService = require("../Services/UrlService");
const { generateShortURL } = require("../helpers/shortUrlHelper");

router.get("/", async (req, res) => {
    try {
        const latestUrls = await UrlService.getLatestUrls(5);
        res.render("index", { urls: latestUrls });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/submit", async (req, res) => {
    const { inputURL } = req.body;
    if (!inputURL) {
        return res.status(400).send("Missing inputURL");
    }
    const shortCode = generateShortURL(8);  
    const shortUrl = `http://localhost:3000/${shortCode}`; 
    try {
        await UrlService.setUrl(shortCode, inputURL); 
        const latestUrls = await UrlService.getLatestUrls(5);
        res.render("index", { urls: latestUrls });
    } catch (error) {
        console.error("MongoDB Save Error:", error);
        res.status(500).send(error.message);
    }
});

router.get("/:shortCode", async (req, res) => {
    const { shortCode } = req.params;

    try {
        const fullUrl = await UrlService.getFullUrl(shortCode);
        if (!fullUrl) return res.status(404).send("URL not found");
        res.redirect(fullUrl);
    } catch (error) {
        console.error("MongoDB Fetch Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

// router.delete("/:id", async (req, res) => {
//   try {
//     await UrlService.deleteUrlById(req.params.id);
//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.status(500).send(error.message);
//   }
// });
module.exports = router;

const URLsModel = require("../models/UrlsModel");

module.exports = class UrlService {
  static async setUrl(shortUrl, fullUrl) {
    try {
      const newUrl = new URLsModel({ shortUrl, fullUrl });
      await newUrl.save();
      return newUrl;
    } catch (error) {
      throw new Error("MongoDB Save Error: " + error.message);
    }
  }

  static async getFullUrl(shortUrl) {
    const urlEntry = await URLsModel.findOne({ shortUrl });
    return urlEntry ? urlEntry.fullUrl : null;
  }
  static async viewAllUrl() {
    const urlEntry = await URLsModel.find({});
    return urlEntry;
  }

  static async getUrlLatest(count) {
    return await URLsModel.find().sort({ createdAt: -1 }).limit(count);
  }

  static async getUrlCount() {
    return await URLsModel.countDocuments();
  }

  static async deleteUrlById(id) {
    await URLsModel.findByIdAndDelete(id);
    return 1;
  }
  static async setUrl(shortCode, fullUrl) {
    return URLsModel.create({ shortCode, fullUrl });
  }


  static async getFullUrl(shortCode) {
    const urlData = await URLsModel.findOne({ shortCode });
    return urlData ? urlData.fullUrl : null;
  }


  static async getLatestUrls(count) {
    return URLsModel.find().sort({ createdAt: -1 }).limit(count);
  }
};

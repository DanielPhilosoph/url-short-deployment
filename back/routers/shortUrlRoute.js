const express = require("express");
const router = express.Router();
const DataBase = require("../database");
const DB = new DataBase();

/**
 * *This route routes to:
 * ? /api/shorturl/
 */

/**
 * * Sends back shorter URL Custom (shorturl_Name)
 */
router.post("/custom", (req, res, next) => {
  let url = req.body.url;
  let custom = req.body.custom;
  let generateResponse = DB.generateCustomShortUrl(url, custom);

  if (typeof generateResponse == "string") {
    res.json({ custom: generateResponse });
  } else {
    next(generateResponse);
  }
});

/**
 *  * Returns url short info
 */
router.get("/info/:urlid", (req, res, next) => {
  try {
    let urlInfo = DB.getInfo(req.params.urlid);
    if (urlInfo.error === undefined) {
      res.json(urlInfo);
    } else {
      throw urlInfo;
    }
  } catch (error) {
    next(error);
  }
});

/**
 * * Redirect base on short url ID
 */
router.get("/:urlid", (req, res, next) => {
  try {
    let urlInfo = DB.getInfo(req.params.urlid);
    if (urlInfo.error === undefined) {
      DB.urlRedirectEntry(req.params.urlid);
      return res.redirect(urlInfo.originalUrl);
    } else {
      throw urlInfo;
    }
  } catch (error) {
    next(error);
  }
});

/**
 * * Sends back shorter URL (shorturl_ID)
 */
router.post("/", (req, res, next) => {
  try {
    let url = req.body.url;
    let shorturl_ID = DB.generateShortUrl(url);
    if (typeof shorturl_ID !== "object") {
      res.json({ shorturlId: shorturl_ID });
    } else {
      throw shorturl_ID;
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const robotsMap = require("../data/data.js");

const mapPassing = function (req, res, next) {
  try {
    req.robotsMap = robotsMap;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = mapPassing;

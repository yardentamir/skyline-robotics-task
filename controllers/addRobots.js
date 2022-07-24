const Robot = require("../models/robot.js");

const addRobotsController = (req, res) => {
  const { timestamp, ...robots } = req.body;
  try {
    const alertsArray = Object.entries(robots);
    req.robotsMap.set(timestamp, new Robot(alertsArray));
    res
      .status(201)
      .send(`robots added successfully for timestamp ${timestamp}`);
    console.log(req.robotsMap);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = addRobotsController;

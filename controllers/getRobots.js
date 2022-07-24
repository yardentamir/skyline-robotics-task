const getRobotsController = (req, res) => {
  try {
    const reqMapToObject = {};
    const robotsMapToObject = {};
    [...req.robotsMap].forEach(([k, robotsMap]) => {
      [...robotsMap].forEach(([k2, v]) => {
        robotsMapToObject[k2] = v;
      });
      reqMapToObject[k] = robotsMapToObject;
    });
    res
      .status(200)
      .send(
        Object.keys(reqMapToObject).length > 0
          ? reqMapToObject
          : "please add robots"
      );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = getRobotsController;

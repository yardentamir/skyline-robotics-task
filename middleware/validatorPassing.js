const validatorPassing = function (req, res, next) {
  const { timestamp, ...robots } = req.body;
  const robotsArray = Object.entries(robots);
  let isCustomError = false;
  try {
    if (!isValidTimestamp(timestamp)) {
      isCustomError = true;
      res.status(400).send("Invalid timestamp");
    }

    for (const [robotId, alerts] of robotsArray) {
      if (validateRobotIdConditions(robotId)) {
        isCustomError = true;
        res.status(400).send("Robot id must be a number and 4 digits");
      }
      if (typeof alerts !== "number") {
        isCustomError = true;
        res.status(400).send("Alerts must be a number");
      }
      if (isCustomError) {
        break;
      }
    }

    if (!isCustomError) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = validatorPassing;

// functions to validate

const validateRobotIdConditions = (robotId) => {
  return !isRobotIdHasOnlyDigits(robotId) || robotId.length !== 4;
};

const isRobotIdHasOnlyDigits = (robotId) => {
  return /^\d+$/.test(robotId);
};

const isValidTimestamp = (timestamp) => {
  return new Date(timestamp).getTime() > 0;
};

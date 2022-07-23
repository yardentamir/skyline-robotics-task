const validatorPassing = function (req, res, next) {
  const { timestamp, ...robots } = req.body;
  const robotsArray = Object.entries(robots);
  try {
    if (!isValidTimestamp(timestamp)) {
      throw new Error("Invalid timestamp");
    }

    robotsArray.forEach(([robotId, alerts]) => {
      if (validateRobotIdConditions(robotId)) {
        throw new Error("Robot id must be a number and 4 digits");
      }
      req.robotsMap.forEach((robotsInMap, timestampInMap) => {
        if (isDuplicatedRobot(robotsInMap, robotId)) {
          throw new Error("Robot already exists");
        }
      });
    });

    next();
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

// const isDuplicatedRobot = (robotsInMap, robotId, timestampInMap, timestamp) => {
//   return robotsInMap.has(robotId) && timestampInMap === timestamp;
// };

const isDuplicatedRobot = (robotsInMap, robotId) => {
  return robotsInMap.has(robotId);
};

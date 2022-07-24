const statisticsController = (req, res) => {
  const response = {
    top10LastMinuteMostAlerts: [],
    top10LastHourMostAlerts: [],
    crashedLast24Hours: {},
  };

  try {
    response.top10LastMinuteMostAlerts = getTopTenRobotsMostAlertsLastTime(
      req.robotsMap,
      1,
      "minute"
    );
    response.top10LastHourMostAlerts = getTopTenRobotsMostAlertsLastTime(
      req.robotsMap,
      1,
      "hour"
    );
    response.crashedLast24Hours = getAllCrashedRobots(req.robotsMap, 1, "day");

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const inTheLastTime = (currentDate, time, timeType) => {
  switch (timeType) {
    case "day":
      return currentDate.setDate(currentDate.getDate() - time) / 1000;

    case "hour":
      return (
        currentDate.setMinutes(currentDate.getMinutes() - time * 60) / 1000
      );

    case "minute":
      return currentDate.setMinutes(currentDate.getMinutes() - time) / 1000;

    default:
      return currentDate;
  }
};

const getTopTenRobotsMostAlertsLastTime = (robots, time, timeType) => {
  const currentDate = new Date();
  const fromTime = inTheLastTime(currentDate, time, timeType);
  const robotsMapSortedTimestamp = getRobotsFilteredMapByTimestamp(
    robots,
    fromTime
  );

  const requiredRobotsMap = [];
  robotsMapSortedTimestamp.forEach(([k, v]) => {
    requiredRobotsMap.push(Object.entries(Object.fromEntries(v)));
  });

  const sorted = requiredRobotsMap.flat().sort((a, b) => b[1] - a[1]);
  return sorted.map((arr) => arr[0]).slice(0, 10);
};

const getAllCrashedRobots = (robotsMap, time, timeType) => {
  const currentDate = new Date();
  const fromTime = inTheLastTime(currentDate, time, timeType);

  const requiredRobotsMap = new Map();
  getRobotsFilteredMapByTimestamp(robotsMap, fromTime).forEach(([k, v]) => {
    requiredRobotsMap.set(k, Object.fromEntries(v));
  });

  const crashedRobots = new Map();
  [...requiredRobotsMap].forEach(([k, v]) => {
    const valuesToSetMap = new Map(
      Object.entries(v).filter(([id, state]) => state === -1)
    );
    if (valuesToSetMap.size > 0) {
      crashedRobots.set(k, [...valuesToSetMap.keys()]);
    }
  });

  return Object.fromEntries(crashedRobots);
};

function getRobotsFilteredMapByTimestamp(robots, fromTime) {
  return [...robots]
    .sort((a, b) => b[0] - a[0])
    .filter(([k, v]) => k >= fromTime);
}

module.exports = statisticsController;

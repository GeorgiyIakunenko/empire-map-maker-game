import { BorderlandsMission } from "./borderlandsMission.js";
import { EdgeOfTheForestMission } from "./edgeOfTheForestMission.js";
import { SleepyValleyMission } from "./sleepyValleyMission.js";

export const borderlandsMission = new BorderlandsMission(
  "Borderlands",
  "borderlands",
  "For each full row or column, you get six points.",
);

export const edgeForestMission = new EdgeOfTheForestMission(
  "Edge of the forest",
  "edgeForest",
  "You get one point for each forest field adjacent to the edge of your map.",
);

export const sleepyValleyMission = new SleepyValleyMission(
  "Sleepy valley",
  "sleepyValley",
  "For every row with three forest fields, you get four points.",
);

export const missionsDefined = [
  borderlandsMission,
  edgeForestMission,
  sleepyValleyMission,
];

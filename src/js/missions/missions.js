import { BorderlandsMission } from "./borderlandsMission.js";
import { EdgeOfTheForestMission } from "./edgeOfTheForestMission.js";
import { SleepyValleyMission } from "./sleepyValleyMission.js";
import { WateringPotatoMission } from "./wateringPotatoMission.js";
import { SurroundedMountainMission } from "./surroundedMountainMission.js";
import { TreeLineMission } from "./treeLineMission.js";

export const surroundedMountainMission = new SurroundedMountainMission(
  "Surrounded mountain",
  "surroundedMountain",
  "You get one point for each mountain field surrounded by four base fields.",
);

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

export const waterPotatoMission = new WateringPotatoMission(
  "Watering potatoes",
  "wateringPotatoes",
  "You get two points for each water field adjacent to your farm fields.",
);

export const treeLineMission = new TreeLineMission(
  "Tree line",
  "treeLine",
  "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.",
);

export const missionsDefined = [
  borderlandsMission,
  edgeForestMission,
  sleepyValleyMission,
  waterPotatoMission,
  treeLineMission,
];

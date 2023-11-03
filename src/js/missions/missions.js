import { BorderlandsMission } from "./borderlandsMission.js";
import { EdgeOfTheForestMission } from "./edgeOfTheForestMission.js";
import { SleepyValleyMission } from "./sleepyValleyMission.js";
import { WateringPotatoMission } from "./wateringPotatoMission.js";
import { SurroundedMountainMission } from "./surroundedMountainMission.js";
import { TreeLineMission } from "./treeLineMission.js";
import { WateringCanalMission } from "./wateringCanalMission.js";
import { WealthyTownMission } from "./wealthyTownMission.js";
import { MagiciansValleyMission } from "./magiciansValleyMission.js";

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

export const waterCanalMission = new WateringCanalMission(
  "Watering canal",
  "wateringCanal",
  "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points.",
);

export const wealthyTownMission = new WealthyTownMission(
  "Wealthy town",
  "wealthyTown",
  "You get three points for each of your village fields adjacent to at least three different terrain types.",
);

export const magiciansValleyMission = new MagiciansValleyMission(
  "Magicians valley",
  "magiciansValley",
  "You get three points for your water fields adjacent to your mountain fields.",
);

export const missionsDefined = [
  borderlandsMission,
  edgeForestMission,
  sleepyValleyMission,
  waterPotatoMission,
  treeLineMission,
  waterCanalMission,
  wealthyTownMission,
  magiciansValleyMission,
];

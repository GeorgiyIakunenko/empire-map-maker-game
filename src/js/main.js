import { missionsData } from "./data/missionsData.js";
import { elementsData } from "./data/elementsData.js";
import { shuffle } from "./utils/shuffleArray.js";
import { Game } from "./game/gameClass.js";

import { missionsDefined } from "./missions/missions.js";

// todo create a start button for game

const newGame = new Game(shuffle(elementsData), missionsDefined);
newGame.defineGameTable();
newGame.defineListeners();
newGame.getNextElement();
newGame.defineNextElement();
newGame.defineSeasons();
newGame.defineMissions();

import { elementsData } from "./data/elementsData.js";
import { shuffle } from "./utils/shuffleArray.js";
import { defineModal } from "./utils/modal.js";
import { Game } from "./game/gameClass.js";

import { missionsDefined } from "./missions/missions.js";

// todo create a start button for game

defineModal();
const testGame = new Game(shuffle(elementsData), missionsDefined);
testGame.start();

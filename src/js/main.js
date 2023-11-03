import { defineModal } from "./utils/modal.js";
import { Game } from "./game/gameClass.js";

defineModal();
const testGame = new Game();
testGame.start();

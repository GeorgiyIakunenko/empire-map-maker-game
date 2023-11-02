import { shuffle } from "./utils/shuffleArray.js";
import { missionsData } from "./data.js";
const missionDiv = document.querySelector(".missions");

export class Missions {
  constructor(missions) {
    console.log(missions);
    this.missions = missions;
  }

  defineMission() {
    let missionsElement = "";
    let letters = ["A", "B", "C", "D"];
    letters.forEach((letter) => {
      let currentMission = this.missions.pop();
      console.log(currentMission);
      missionsElement += `<div
              class="mission w-fit flex items-center gap-3 rounded-lg px-2 text-white"
            >
              <img
                class="mission_img h-28 w-28"
                src="images/missions/78.png"
                alt="mission"
              />
              <div>
                <h3 class="mission_title mb-4">${currentMission.title}</h3>
                <p class="mission_description w-40 mb-3 ">
                  ${currentMission.description}
                </p>
                <div class="flex text-sm justify-between pr-10">
                  <div class="points">
                    (<span class="points_value">0</span>
                    Points)
                  </div>
                  <div>
                    <div class="mission_season_later  font-bold">${letter}</div>
                  </div>
                </div>
              </div>
            </div>`;
    });

    missionDiv.innerHTML = missionsElement;
  }
}

let missions = new Missions(shuffle(missionsData));

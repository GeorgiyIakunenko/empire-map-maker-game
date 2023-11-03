export class Mission {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.points = 0;
  }

  getLayout(latter = "A") {
    return `<div
              class="mission w-fit flex items-center gap-2 rounded-lg px-2 text-white"
            >
              <img
                class="mission_img h-24 w-24"
                src="images/missions/78.png"
                alt="mission"
              />
              <div>
                <h3 class="mission_title mb-4">${this.title}</h3>
                <p class="mission_description w-40 mb-3 ">
                  ${this.description}
                </p>
                <div class="flex text-sm justify-between pr-10">
                  <div class="points">
                    (<span class="points_value">${this.points}</span>
                    Points)
                  </div>
                  <div>
                    <div class="mission_season_later  font-bold">${latter}</div>
                  </div>
                </div>
              </div>
            </div>`;
  }

  evaluateMission(gameTable) {}
}

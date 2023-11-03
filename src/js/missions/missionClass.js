export class Mission {
  constructor(title, img, description) {
    this.season = "A";
    this.img = `images/missions/${img}.png`;
    this.title = title;
    this.description = description;
    this.points = 0;
  }

  setSeason(season) {
    this.season = season;
  }

  getLayout(currentSeason) {
    let border = "border-4 border-neutral-500";
    if (currentSeason.missionsLatters.includes(this.season)) {
      border = "border-4 border-green-500";
    }

    return `<div
              class="mission ${border} w-fit flex items-center py-1  gap-2 rounded-lg px-2 text-white"
            >
              <img
                class="mission_img h-24 w-24"
                src="${this.img}"
                alt="mission"
              />
              <div>
                <h3 class="mission_title mb-2">${this.title}</h3>
                <p class="mission_description w-40 mb-3 ">
                  ${this.description}
                </p>
                <div class="flex text-sm justify-between pr-10">
                  <div class="points">
                    (<span class="points_value">${this.points}</span>
                    Points)
                  </div>
                  <div>
                    <div class="mission_season_later  font-bold">${this.season}</div>
                  </div>
                </div>
              </div>
            </div>`;
  }

  evaluateMission(gameTable) {}
}

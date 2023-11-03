const modalFull = document.querySelector(".modal-full");
const closeModalBtn = document.querySelector(".close-modal-btn");

export function defineModal() {
  modalFull.addEventListener("click", (event) => {
    console.log(event.target.classList);
    if (event.target.classList.contains("modal-full")) {
      modalFull.classList.add("hidden");
    }
  });

  closeModalBtn.addEventListener("click", () => {
    modalFull.classList.add("hidden");
  });
}

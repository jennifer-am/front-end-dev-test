import events from "./seed.js";
import locales from "./locales.js";

function render() {
  const parent = document.querySelector(".list-container");
  const modal = document.querySelector(".modal");

  for (let event of events) {
    parent.innerHTML +=
      '<div class="event-card"><div class="card-left-side"><span>' +
      event.name +
      "</span><span>" +
      event.description +
      '</span></div><div class="card-right-side"><span>' +
      event.venue +
      "</span><span>" +
      event.date +
      '</span></div><div class="see-details cursor-pointer" id="see-' +
      event.id +
      '">Voir les détails</div>';
  }

  const seeDetails = document.querySelectorAll(".see-details");
  const modalContent = document.querySelector(".modal-content");
  const close = document.querySelector(".modal-close");

  seeDetails.forEach((element) => {
    element.addEventListener("click", () => {
      modal.style.display = "flex";

      const data = events.find((el) => element.id.slice(-1) == el.id);

      if (!data) return;
      delete data.id;

      for (let key in data) {
        modalContent.innerHTML +=
          "<div><span class='title'>" +
          locales[key] +
          " : </span><span>" +
          data[key] +
          "</span></div>";
      }
    });
  });

  close.addEventListener("click", () => {
    modalContent.innerHTML = "";
    modal.style.display = "none";
  });
}

window.addEventListener("load", () => {
  render();
});

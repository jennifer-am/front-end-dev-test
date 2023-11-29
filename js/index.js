import events from "./seed.js";
import locales from "./locales.js";

function render(array) {
  const parent = document.querySelector(".list-container");
  const modal = document.querySelector(".modal");

  for (let event of array) {
    parent.innerHTML +=
      '<div class="event-card"><div class="card-left-side"><span class="title">' +
      event.name +
      "</span><span>" +
      event.description +
      '</span></div><div class="card-right-side"><div><span class="title">Where : </span><span>' +
      event.venue +
      '</span></div><div><span class="title">When : </span><span>' +
      event.date +
      '</span></div></div><div class="see-details cursor-pointer" id="see-' +
      event.id +
      '">Voir les détails</div>';
  }

  const seeDetails = document.querySelectorAll(".see-details");
  const modalContent = document.querySelector(".modal-content");
  const close = document.querySelector(".modal-close");

  seeDetails.forEach((element) => {
    element.addEventListener("click", () => {
      modal.style.display = "flex";

      const data = array.find((el) => element.id.slice(-1) == el.id);

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

function updateFilters(params) {
  let data = events;
  const parent = document.querySelector(".list-container");

  for (const key in params) {
    if (params[key])
      data = data.filter((e) => {
        if (key == "year") return e.name.includes(params[key]);
        else return e[key] === params[key];
      });
  }

  parent.innerHTML = "";
  render(data);
}

window.addEventListener("load", () => {
  render(events);

  let venue, year;

  const venueEl = document.body.querySelector("select[name='venue']");
  const yearEl = document.body.querySelector("select[name='year']");

  venueEl.value = yearEl.value = "";

  venueEl.addEventListener("change", (e) => {
    venue = e.target.value;
    updateFilters({ venue, year });
  });

  yearEl.addEventListener("change", (e) => {
    year = e.target.value;
    updateFilters({ venue, year });
  });
});

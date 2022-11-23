"use strict";

const form = document.querySelector("form.search");
const app = document.querySelector("section.app");

const KEY = "563492ad6f917000010000013c89d691c262401783ca57da95b6f7bb";

const writePhotos = (photos) => {
  const photoList = photos.map((photo) => {
    return `<li>
  <img src="${photo.src.tiny}" alt="${photo.alt}"
  <p>${photo.alt} (${photo.photographer}</p>
  </li>`;
  });

  app.innerHTML = `<ul>${photoList.join("")}</ul>`;
};

const writeMessage = (message) => {
  app.innerHTML = `<p>${message}</p>`;
};

const doSearch = async (e) => {
  e.preventDefault();

  const values = new FormData(form);
  const query = values.get("query");
  const color = values.get("color");

  // https://api.pexels.com/v1/search?query=nature&color=red&per_page=40

  try {
    writeMessage("Cargando datos...");
    const url = `https://api.pexels.com/v1/search?query=${query}&color=${color}&per_page=40`;

    const response = await fetch(url, {
      headers: {
        authorization: KEY,
      },
    });

    if (response.ok) {
      const data = await response.json();
      writePhotos(data.photos);
    } else {
      writeMessage("Hubo un error haciendo la petición");
    }
  } catch (error) {
    writeMessage(error.message);
  }
};

form.addEventListener("submit", doSearch);

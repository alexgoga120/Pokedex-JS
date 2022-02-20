var URL = "https://pokeapi.co/api/v2/pokemon/";

var listPokemon = await getPokemons(URL).then((data) => {
  return data;
});

let counter = setInterval(async function () {
  await fetch(URL + randomPoke(1, 898))
    .then((res) => res.json())
    .then((data) => {
      var poke = makePokemon(data);
      createCard(poke);
    });
}, 30000);

//drawPoke(listPokemon);

var eraser = document.getElementById("btn-eraser");
eraser.addEventListener("click", function () {
  grid.innerHTML = " ";
  clearGrid();
});
var show = document.getElementById("btn-showPoke");
show.addEventListener("click", async function () {
  await fetch(URL + randomPoke(1, 898))
    .then((res) => res.json())
    .then((data) => {
      var poke = makePokemon(data);
      createCard(poke);
    })
    .catch((err) => {
      input.className = "form-control is-invalid";
      msg.innerText = "No se ha encontrado Pokemon";
      console.log(err);
    });
});
var divNav = document.getElementById("navigator");
var draw = document.getElementById("btn-drawPoke");
draw.addEventListener("click", function () {
  grid.innerHTML = " ";
  divNav.className = "row mt-3";
  nav.className = "col mr-5 d-none";
  show.className = "btn btn-dark d-none";
  draw.className = "btn btn-dark d-none";
  clearInterval(counter);
  drawPoke(listPokemon);
});

var btn = document.getElementById("btn-search");
var msg = document.getElementById("msgError");
var input = document.getElementById("input-search");
btn.addEventListener("click", async function () {
  input.className = "form-control";
  if (input.value != "") {
    await fetch(URL + input.value)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        var poke = makePokemon(data);
        createCard(poke);
      })
      .catch((err) => {
        input.className = "form-control is-invalid";
        msg.innerText = "No se ha encontrado Pokemon";
        console.log(err);
      });
    input.value = "";
  } else {
    input.className = "form-control is-invalid";
    msg.innerText = "No se aceptan campos vacios";
  }
});
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    btn.click();
  }
});

var grid = document.getElementById("cardGrid");
var nav = document.getElementById("nav");
let prev = document.getElementById("prev");
prev.addEventListener("click", async function () {
  grid.innerHTML = " ";
  URL = listPokemon.previous;
  listPokemon = await getPokemons(URL).then((data) => {
    return data;
  });
  displayNav();
  drawPoke(listPokemon);
});

let next = document.getElementById("next");
next.addEventListener("click", async function () {
  grid.innerHTML = " ";
  URL = listPokemon.next;
  listPokemon = await getPokemons(URL).then((data) => {
    return data;
  });
  displayNav();
  drawPoke(listPokemon);
});

function upperFisrt(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearGrid() {
  grid.innerHTML = " ";
  URL = "https://pokeapi.co/api/v2/pokemon/";
  divNav.className = "row mt-3 d-none";
  nav.className = "col mr-5";
  show.className = "btn btn-dark";
  draw.className = "btn btn-dark";

  counter = setInterval(async function () {
    await fetch(URL + randomPoke(1, 898))
      .then((res) => res.json())
      .then((data) => {
        var poke = makePokemon(data);
        createCard(poke);
      });
  }, 30000);
}

function randomPoke(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function getPokemons(api) {
  return fetch(api).then((res) => res.json());
}

async function drawPoke(data) {
  data.results.forEach((element) => {
    fetch(element.url)
      .then((res) => res.json())
      .then((data) => {
        var poke = makePokemon(data);
        createCard(poke);
      });
  });
}

function displayNav() {
  prev.classList.remove("d-none");
  next.classList.remove("d-none");
  if (listPokemon.previous === null) {
    prev.className = "btn btn-lg d-none";
  } else if (listPokemon.next === null) {
    next.className = "btn btn-lg d-none";
  }
}

function createCard(pokemon) {
  let cardCol = document.createElement("div");
  cardCol.className = "col";

  let card = document.createElement("div");
  card.className = "card bg-light";

  let row_head = document.createElement("div");
  row_head.className = "row";

  let colHeadL = document.createElement("div");
  colHeadL.className = "col-7 ml-3 mt-2";

  let colHeadR = document.createElement("div");
  colHeadR.className = "col ";
  colHeadR.innerHTML += `<p class="idPoke">N.° ${pokemon.id}</p>`;

  row_head.appendChild(colHeadL);
  row_head.appendChild(colHeadR);

  let imgPoke = document.createElement("img");
  imgPoke.id = pokemon.name;
  imgPoke.src = pokemon.front;
  imgPoke.className = "card-img-top";

  let row_bot = document.createElement("div");
  row_bot.className = "row";

  let colHeadL_bot = document.createElement("div");
  colHeadL_bot.className = "col text-left ml-3";

  let btnShiny = document.createElement("button");
  btnShiny.id = "btnShiny";
  btnShiny.type = "button";
  btnShiny.className = "btn-sm btn-dark";
  btnShiny.setAttribute("name", pokemon.name);
  btnShiny.setAttribute("shiny", "false");
  btnShiny.innerHTML += `<i class="fa fa-lg fa-star"></i>`;
  btnShiny.addEventListener("click", function () {
    var img = document.getElementById(pokemon.name);
    if (btnShiny.getAttribute("shiny") === "false") {
      if (btnRotate.getAttribute("sprite") === "front") {
        img.setAttribute("src", pokemon.shiny_front);
        btnShiny.setAttribute("shiny", "true");
      } else {
        img.setAttribute("src", pokemon.shiny_back);
        btnShiny.setAttribute("shiny", "true");
      }
    } else {
      if (btnRotate.getAttribute("sprite") === "front") {
        img.setAttribute("src", pokemon.front);
        btnShiny.setAttribute("shiny", "false");
      } else {
        img.setAttribute("src", pokemon.back);
        btnShiny.setAttribute("shiny", "false");
      }
    }
  });

  let colHeadR_bot = document.createElement("div");
  colHeadR_bot.className = "col text-right mr-3";

  let btnRotate = document.createElement("button");
  btnRotate.id = "btnRotate";
  btnRotate.type = "button";
  btnRotate.className = "btn-sm btn-dark";
  btnRotate.setAttribute("name", pokemon.name);
  btnRotate.setAttribute("sprite", "front");
  btnRotate.innerHTML += `<i class="fa fa-lg fa-rotate-left"></i>`;
  btnRotate.addEventListener("click", function () {
    var img = document.getElementById(pokemon.name);
    if (btnShiny.getAttribute("shiny") === "false") {
      if (btnRotate.getAttribute("sprite") === "front") {
        img.setAttribute("src", pokemon.back);
        btnRotate.setAttribute("sprite", "back");
      } else {
        img.setAttribute("src", pokemon.front);
        btnRotate.setAttribute("sprite", "front");
      }
    } else {
      if (btnRotate.getAttribute("sprite") === "front") {
        img.setAttribute("src", pokemon.shiny_back);
        btnRotate.setAttribute("sprite", "back");
      } else {
        img.setAttribute("src", pokemon.shiny_front);
        btnRotate.setAttribute("sprite", "front");
      }
    }
  });

  colHeadL_bot.appendChild(btnShiny);
  colHeadR_bot.appendChild(btnRotate);
  row_bot.appendChild(colHeadL_bot);
  row_bot.appendChild(colHeadR_bot);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body pkInfo bg-light mt-2";
  cardBody.innerHTML += `<h5 class="card-title"><b>${upperFisrt(
    pokemon.name
  )}</b></h5>`;
  cardBody.innerHTML += `<b class="card-text">Peso: </b>`;
  cardBody.innerHTML += `<p class="card-text">${pokemon.weight} kg.</p>`;
  cardBody.innerHTML += `<b class="card-text">Altura: </b>`;
  cardBody.innerHTML += `<p class="card-text">${pokemon.height} m.</p>`;

  let row = document.createElement("div.row");
  row.className = "row";

  row.appendChild(typePoke(pokemon.types));
  cardBody.appendChild(row);

  card.appendChild(row_head);
  card.appendChild(imgPoke);
  card.appendChild(row_bot);
  card.appendChild(cardBody);

  cardCol.appendChild(card);

  grid.appendChild(cardCol);
}

function typePoke(type) {
  let wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  type.forEach((element) => {
    let type_name = element.type.name;
    let type = document.createElement("div");
    type.className = `icon ${type_name}`;

    let img = document.createElement("img");
    img.title = upperFisrt(type_name);

    img.src = `icons/${type_name}.svg`;

    type.appendChild(img);
    wrapper.appendChild(type);
  });
  return wrapper;
}

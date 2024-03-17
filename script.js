document.addEventListener("DOMContentLoaded", function() { //azert kell hogy ne toltson ujra az oldal
  document.getElementById("keresettSzoInput").addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          event.preventDefault(); // nem tolt ujra az oldal
          keresestipusKivalasztasa();
      }
  });
});


function keresestipusKivalasztasa() {
  var selectElem = document.getElementById("keresesTipus");
  var selectedValue = selectElem.value;
  if (selectedValue == 1) {
    keresesKeresoSzora();
  } else if (selectedValue == 2) {
    keresesSzemelyekre(); //itt nem tudtam mit kell a kartyan megjeleníteni így kiirattama azt ami logikusnak tünt...
  } else {
    keresesKeresoSzora(); //nem talaltam API-linket amivel megtudnam ezt nezni mas modon, ugyan azt  linket hasznaljak arre mint a keresoszavaknal
  }
}

function keresesKeresoSzora() {
  var keresoSzo = document.getElementById("keresettSzoInput").value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.tvmaze.com/search/shows?q=" + keresoSzo, true);
  //console.log( "https://api.tvmaze.com/search/shows?q=" + keresoSzo);
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = xhr.response;
      responseLengthCreate(responseData.length);
      createNameCards(responseData); //meghívom a kartyakat
    } else {
      console.error("Eror: " + xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error("Error, probably with the url.");
    console.log(keresoSzo);
  };
  xhr.send();
}
function keresesSzemelyekre() {
  var keresoSzo = document.getElementById("keresettSzoInput").value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.tvmaze.com/search/people?q=" + keresoSzo, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = xhr.response;
      responseLengthCreate(responseData.length);
      createPersonCards(responseData);
    } else {
      console.error("Hiba: " + xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error("Hiba történt, valószínűleg az URL-lel.");
    console.log(keresoSzo);
  };
  xhr.send();
}
function keresesCimre() {
  console.log("Filmre  valo kereses.");
}

function createPersonCards(responseData) {
  var cardHolderDiv = document.getElementById("cardHolder");
  cardHolderDiv.innerHTML = "";

  for (var i = 0; i < responseData.length; i++) {
    var personData = responseData[i].person;
    var personImage = personData.image ? personData.image.medium : "";

    var card = document.createElement("div");
    card.classList.add("col-lg-3", "col-md-4", "col-sm-6");
    card.innerHTML =
      '<div class="card mb-3">' +
      '<img class="card-img-top img-small" src="' +
      personImage +
      '" alt="' +
      personData.name +
      '">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' +
      personData.name +
      "</h5>" +
      (personData.birthday
        ? '<p class="card-text"><b>Születésnap:</b> ' +
          personData.birthday +
          "</p>"
        : "") +
      (personData.gender
        ? '<p class="card-text"><b>Nem:</b> ' + personData.gender + "</p>"
        : "") +
      (personData.url
        ? '<p class="card-text"><b>TV Maze URL:</b> <a href="' +
          personData.url +
          '" target="_blank">' +
          personData.url +
          "</a></p>"
        : "") +
      "</div>" +
      "</div>";

    cardHolderDiv.appendChild(card);
  }
}

function responseLengthCreate(length) {
  var talalatokHolderP = document.getElementById("talalatok");
  talalatokHolderP.textContent = "Találatok száma: " + length;
}

function createNameCards(responseData) {
  var cardHolderDiv = document.getElementById("cardHolder");
  cardHolderDiv.innerHTML = "";

  for (var i = 0; i < responseData.length; i++) {
    var showData = responseData[i];
    var summary = showData.show.summary
      ? smallSummary(showData.show.summary)
      : "";

    var card = document.createElement("div"); //bootstrappel jobban nem ki...
    card.classList.add("col-lg-3", "col-md-4", "col-sm-6");
    card.innerHTML =
      '<div class="card mb-3">' +
      '<img class="card-img-top img-small" src="' +
      (showData.show.image ? showData.show.image.medium : "") +
      '" alt="' + //beallítjuk hogy a kepleiras megegyezen a cimel
      showData.show.name +
      '">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' +
      showData.show.name +
      "</h5>" +
      '<p class="card-text"><b>IMDB ID:</b> ' +
      showData.show.externals.imdb +
      "</p>" +
      '<p class="card-text"><b>Nyelv:</b> ' +
      showData.show.language +
      "</p>" +
      '<p class="card-text"><b>Műfajok:</b> ' +
      showData.show.genres.join(", ") +
      "</p>" +
      '<p class="card-text"><b>Premier:</b> ' +
      showData.show.premiered +
      "</p>" +
      '<p class="card-text"><b>Állapot:</b> ' +
      showData.show.status +
      "</p>" +
      "</div>" +
      '<div class="card-footer">' + //footerben lesz fölötte egy csík, csak esztetikailag szamít, e nelkül is megfeleloen írna ki
      "</div>" +
      "</div>";
    var cardFooter = card.querySelector(".card-footer");
    cardFooter.innerHTML = summary;
    cardHolderDiv.appendChild(card);
  }
}

function smallSummary(summary) {
  if (summary.length > 200) {
    return summary.substring(0, 197) + "..."; //mivel nincs meghatarozva hogy a 3 pont beleszamit e az osszefoglaloba úgy tekintek ra mintha beleszamitana
  } else {
    return summary;
  }
}

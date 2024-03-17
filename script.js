function keresesKeresoSzora() {
  var keresoSzo = document.getElementById("keresettSzoInput").value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.tvmaze.com/search/shows?q=" + keresoSzo, true);
  //console.log( "https://api.tvmaze.com/search/shows?q=" + keresoSzo);
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = xhr.response;
      console.log(responseData);
      responseLenghtCreate(responseData.length);
      cardCreate(responseData); //meghívom a kartyakat
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
function responseLenghtCreate(length) {
  var talalatokHolderP = document.getElementById("talalatok");
  talalatokHolderP.textContent = "Talaatok szama: " + length;
}

function cardCreate(responseData) {
  var cardHolderDiv = document.getElementById("cardHolder");
  cardHolderDiv.innerHTML = "";

  for (var i = 0; i < responseData.length; i++) {
    var showData = responseData[i];

    // Kártya létrehozása
    var card = document.createElement("div");
    card.classList.add("col-lg-3", "col-md-4", "col-sm-6");
    card.innerHTML =
      '<div class="card mb-3">' +
      '<img class="card-img-top img-small" src="' +
      (showData.show.image ? showData.show.image.medium : "") +
      '" alt="' +
      showData.show.name +
      '">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' +
      showData.show.name +
      "</h5>" +
      '<p class="card-text">' +
      (showData.show.summary ? truncateSummary(showData.show.summary) : "") +
      "</p>" +
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
      "</div>" + // Itt zárul a card-body div
      '<div class="card-footer">' +
      (showData.show.summary ? truncateSummary(showData.show.summary) : "") + // Összefoglaló a kártya alján
      "</div>" +
      "</div>";
    // A kártya hozzáadása a tartóhoz
    cardHolderDiv.appendChild(card);
}
}

  // Függvény az összefoglaló levágására, ha hosszabb, mint 200 karakter
  function truncateSummary(summary) {
    if (summary.length > 200) {
      return summary.substring(0, 197) + '...'; //nem tudom hogy itt a 200 as limitbe beleszámít e a ... így a biztonság kedvéért úgy vettem hogy beleszámít
    } else {
      return summary;
    }
  }

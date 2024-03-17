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
    var summary = showData.show.summary ? truncateSummary(showData.show.summary) : "";

  
    var card = document.createElement("div"); //bootstrappel jobban nem ki...
    card.classList.add("col-lg-3", "col-md-4", "col-sm-6");
    card.innerHTML =
      '<div class="card mb-3">' +
      '<img class="card-img-top img-small" src="' +
      (showData.show.image ? showData.show.image.medium : "hiba") +
      '" alt="' + //bealítjuk hogy a kepleiras megegyezen cimel
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

function truncateSummary(summary) {
  if (summary.length > 200) {
    return summary.substring(0, 197) + "..."; //mivel nincs meghatarozva hogy a 3 pont beleszamit e az osszefoglaloba úgy tekintek ra mintha beleszamitana
  } else {
    return summary;
  }
}


function keresesKeresoSzora() {
  var keresoSzo = document.getElementById("keresettSzoInput").value;
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.tvmaze.com/singlesearch/shows?q=" + keresoSzo,
    true
  );
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = xhr.response;
      console.log(responseData);
      cardCreate(responseData); //meghívom a kartya
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

function cardCreate(responseData) {
  var cardHolderDiv = document.getElementById("cardHolder");
  cardHolderDiv.innerHTML = cardHolderDiv.innerHTML + responseData.id;
  cardHolderDiv.innerHTML =
    cardHolderDiv.innerHTML +
    '<div class="col-lg-3 col-md-4 col-sm-6">' +
    '<div class="card mb-3">' +
    '<img class="card-img-top" src="..." alt="Card image cap">' +
    '<div class="card-body">' +
    '<h5 class="card-title">Card 10</h5>' +
    '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>' +
    '<a href="#" class="btn btn-primary">Go somewhere</a>' +
    "</div>" +
    "</div>" +
    "</div>";
    
}

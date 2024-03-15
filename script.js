function keresesKeresoSzora() {
  // létrehozunk egy XMLHTTPRequest objektumot
  var keresoSzo = document.getElementById("keresettSzoInput").value;


  var xhr = new XMLHttpRequest();

  // beállítjuk a kérést az adatok URL-jére
  xhr.open("GET", "https://api.tvmaze.com/singlesearch/shows?q=" + keresoSzo, true);
  console.log("https://api.tvmaze.com/singlesearch/shows?q=" + keresoSzo);

  // beállítjuk a válasz típusát JSON-ra
  xhr.responseType = "json";

  // itt definiáljuk, hogy mi történjen, amikor a kérés sikeresen befejeződött
  xhr.onload = function () {
    // Ellenőrizzük, hogy a kérés állapota sikeres volt-e (HTTP státusz kód 200)
    if (xhr.status === 200) {
      // A válasz a xhr.response tulajdonságban található JSON objektumként
      var responseData = xhr.response;
      // Most itt tudsz dolgozni a kapott adatokkal
      console.log(responseData);
    } else {
      // Ha a kérés sikertelen volt, kiírjuk a hibát a konzolra
      console.error("Eror: " + xhr.status);
    }
  };

  // Ha hiba történik a kérés során
  xhr.onerror = function () {
    console.error("Hiba történt a kérés során.");
  };

  // Elküldjük a kérést
  xhr.send();
}

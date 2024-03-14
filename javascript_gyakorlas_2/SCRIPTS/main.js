function displayTime() {
  const now = new Date();
  const ora = now.getHours().toString();
  const perc = now.getMinutes().toString();
  const masodperc = now.getSeconds().toString();

  document.getElementById(
    "pontosIdo"
  ).textContent = `${ora}:${perc}:${masodperc}`;
}

setInterval(displayTime, 10);

function oraSzamol() {
  let szamElso = document.getElementById("szamOne").value;
  let szamMasodik = document.getElementById("szamTwo").value;
  let muvelet = document.getElementById("muvelet").value;
  let vegeredmeny = 0;
  if (String(muvelet) == "+") {
    vegeredmeny = Number(szamElso) + Number(szamMasodik);
    document.getElementById("vegeredmeny").textContent = vegeredmeny;
  } else if (String(muvelet) == "-") {
    vegeredmeny = Number(szamElso) - Number(szamMasodik);
    document.getElementById("vegeredmeny").textContent = vegeredmeny;
  } else if (String(muvelet) == "*") {
    vegeredmeny = Number(szamElso) * Number(szamMasodik);
    document.getElementById("vegeredmeny").textContent = vegeredmeny;
  } else if (String(muvelet) == "/") {
    vegeredmeny = Number(szamElso) / Number(szamMasodik);
    document.getElementById("vegeredmeny").textContent = vegeredmeny;
  } else if (String(muvelet) == "√") {
    vegeredmeny = Math.sqrt(Number(szamElso), Number(szamMasodik));
    document.getElementById("vegeredmeny").textContent = vegeredmeny;
  } else if (String(muvelet) == "^") {
    vegeredmeny = Math.pow(Number(szamElso),Number(szamMasodik));
    document.getElementById("vegeredmeny").textContent = vegeredmeny;
  }
}

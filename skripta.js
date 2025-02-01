function dodaj() {
    const unosPolje = document.getElementById("unospolje"); 
    const tekst = unosPolje.value.trim(); 

    if (tekst === "") {
        alert("Morate uneti zadatak!"); 
        return;
    }

    dodajZadatak(tekst, false);
    unosPolje.value = "";

    cuvajPodatke();    
}

document.querySelector(".lista").addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("gotovo");
        cuvajPodatke();
    } else if (e.target.classList.contains("obrisi")) {
        e.target.parentElement.remove();
        cuvajPodatke();
    }
});

function cuvajPodatke() {
    const zadaci = [];
    document.querySelectorAll(".lista li").forEach((li) => {
        zadaci.push({
            tekst: li.textContent.replace("×", "").trim(), // Uklanja "×" iz teksta
            gotovo: li.classList.contains("gotovo")
        });
    });
    localStorage.setItem("data", JSON.stringify(zadaci));
}

function vratiPodatke() {
    const lista = document.querySelector(".lista");
    lista.innerHTML = ""; // Očisti listu pre dodavanja učitanih zadataka
    const sacuvaniPodaci = JSON.parse(localStorage.getItem("data")) || [];

    sacuvaniPodaci.forEach((zadatak) => {
        dodajZadatak(zadatak.tekst, zadatak.gotovo);
    });
}

function dodajZadatak(tekst, gotovo) {
    const lista = document.querySelector(".lista");
    const noviLi = document.createElement("li"); 
    noviLi.textContent = tekst; 

    if (gotovo) {
        noviLi.classList.add("gotovo");
    }

    const dugmeX = document.createElement("span");
    dugmeX.textContent = "\u00d7";
    dugmeX.classList.add("obrisi");

    noviLi.appendChild(dugmeX);
    lista.appendChild(noviLi);
}

vratiPodatke();

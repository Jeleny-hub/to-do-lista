function dodaj() {
    const unosPolje = document.getElementById("unospolje"); 
    const tekst = unosPolje.value.trim(); 

    if (tekst === "") {
        alert("Morate uneti zadatak!"); 
        return;
    }

    const lista = document.querySelector(".lista");
    const noviLi = document.createElement("li"); 
    noviLi.textContent = tekst; 

    const dugmeX = document.createElement("span");
    dugmeX.textContent = "\u00d7";
    dugmeX.classList.add("obrisi");

    noviLi.appendChild(dugmeX);
    lista.appendChild(noviLi);
    unosPolje.value = "";

    cuvajPodatke();    
}

document.querySelector(".lista").addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("gotovo");
        cuvajPodatke();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        cuvajPodatke();
    }
});

function cuvajPodatke() {
    localStorage.setItem("data", document.querySelector(".lista").innerHTML);
}

function vratiPodatke() {
    document.querySelector(".lista").innerHTML = localStorage.getItem("data") || "";
    dodajEventNaPostojece();
}

function dodajEventNaPostojece() {
    document.querySelectorAll(".lista li").forEach((li) => {
        li.addEventListener("click", function (e) {
            if (e.target.tagName === "LI") {
                e.target.classList.toggle("gotovo");
                cuvajPodatke();
            } else if (e.target.tagName === "SPAN") {
                e.target.parentElement.remove();
                cuvajPodatke();
            }
        });
    });
}
vratiPodatke();

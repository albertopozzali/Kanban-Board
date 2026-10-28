const formAttivita = document.getElementById("formAttivita")
const filtroPriorita = document.getElementById("filtroPriorita")
const errore = document.getElementById("errore")
const liste = document.getElementsByClassName("lista")
const conteggi = document.getElementsByClassName("conteggio")
 
const dati = JSON.parse(localStorage.getItem("kanbanDati")) || []

formAttivita.addEventListener("submit", gestisciSubmit)
filtroPriorita.addEventListener("change", mostraBoard)
 
function salva() {
    localStorage.setItem("kanbanDati", JSON.stringify(dati))
}

function mostraBoard() {
    for (let i = 0; i < 3; i++) {
        liste[i].innerHTML = ""
    }
    let contatori = [0, 0, 0]
    for (let i = 0; i < dati.length; i++) {
        const valori = dati[i]
        if (filtroPriorita.value == "Tutte" || valori.priorita == filtroPriorita.value) {
            creaScheda(valori)
            contatori[valori.stato]++
        }
    }
    for (let i = 0; i < 3; i++) {
        conteggi[i].textContent = contatori[i]
    }
}
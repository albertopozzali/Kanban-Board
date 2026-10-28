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

function gestisciSubmit(event) {
    event.preventDefault()
    const titolo = document.getElementById("titolo").value.trim()
    const descrizione = document.getElementById("descrizione").value
    const priorita = document.getElementById("priorita").value
    const assegnatario = document.getElementById("assegnatario").value
    const stato = 0
    // if (titolo == "" || priorita === "Nulla") {
    //     errore.textContent = "Inserisci il titolo e scegli la priorità!"
    //     return
    // } else {
    //     errore.textContent = ""
    // }
    if (priorita == "Nulla"){
        errore.textContent = "Inserisci la priorità!"
        return
    }
    const valori = {
        titolo,
        descrizione,
        priorita,
        assegnatario,
        stato
    }
    dati.push(valori)
    salva()
    mostraBoard()
    formAttivita.reset()
}
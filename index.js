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
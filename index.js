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

function creaScheda(valori) {
    const scheda = document.createElement("p")
    const titolo = document.createElement("h3")
    titolo.textContent = valori.titolo
    scheda.appendChild(titolo)
    const descrizione = document.createElement("p")
    descrizione.textContent = valori.descrizione
    scheda.appendChild(descrizione)
    const info = document.createElement("p")
    info.textContent = valori.priorita + " - " + valori.assegnatario
    scheda.appendChild(info)
    if (valori.stato != 0) {
        const bottoneIndietro = document.createElement("button")
        bottoneIndietro.textContent = "← Indietro"
        scheda.appendChild(bottoneIndietro)
        bottoneIndietro.addEventListener("click", () => {
            valori.stato = valori.stato - 1
            salva()
            mostraBoard()
        })
    }
    if (valori.stato != 2) {
        const bottoneAvanti = document.createElement("button")
        bottoneAvanti.textContent = "Avanti →"
        scheda.appendChild(bottoneAvanti)
        bottoneAvanti.addEventListener("click", () => {
            valori.stato = valori.stato + 1
            salva()
            mostraBoard()
        })
    }
    const bottoneElimina = document.createElement("button")
    bottoneElimina.textContent = "Elimina"
    scheda.appendChild(bottoneElimina)
    bottoneElimina.addEventListener("click", () => {
        const indice = dati.indexOf(valori)
        if (indice !== -1) {
            dati.splice(indice, 1)
        }
        salva()
        mostraBoard()
    })
    liste[valori.stato].appendChild(scheda)
}
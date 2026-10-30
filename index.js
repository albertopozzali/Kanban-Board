const formAttivita = document.getElementById("formAttivita")
const filtroPriorita = document.getElementById("filtroPriorita")
const filtroPersona = document.getElementById("filtroPersona")
const errore = document.getElementById("errore")
const listaDaFare = document.getElementById("listaDaFare")
const listaInCorso = document.getElementById("listaInCorso")
const listaCompletato = document.getElementById("listaCompletato")
const contDaFare = document.getElementById("contDaFare")
const contInCorso = document.getElementById("contInCorso")
const contCompletato = document.getElementById("contCompletato")

const dati = JSON.parse(localStorage.getItem("kanbanDati")) || []

formAttivita.addEventListener("submit", gestisciSubmit)
filtroPriorita.addEventListener("change", mostraBoard)
filtroPersona.addEventListener("change", mostraBoard)

function salva() {
    localStorage.setItem("kanbanDati", JSON.stringify(dati))
}

function aggiornaFiltroPersona() {
    const selezionata = filtroPersona.value
    filtroPersona.innerHTML = '<option value="Tutte">Tutte</option>'
    let persone = []
    for (let i = 0; i < dati.length; i++) {
        if (!persone.includes(dati[i].assegnatario)) {
            persone.push(dati[i].assegnatario)
        }
    }
    for (let i = 0; i < persone.length; i++) {
        const opzione = document.createElement("option")
        opzione.value = persone[i]
        opzione.textContent = persone[i]
        filtroPersona.appendChild(opzione)
    }
    filtroPersona.value = selezionata
}
function mostraBoard() {
    aggiornaFiltroPersona()
    listaDaFare.innerHTML = ""
    listaInCorso.innerHTML = ""
    listaCompletato.innerHTML = ""
    let contatori = [0, 0, 0]
    for (let i = 0; i < dati.length; i++) {
        const valori = dati[i]
        if (
            (filtroPriorita.value == "Tutte" || valori.priorita == filtroPriorita.value) &&
            (filtroPersona.value == "Tutte" || valori.assegnatario == filtroPersona.value)
        ) {
            creaScheda(valori)
            contatori[valori.stato]++
        }
    }
    contDaFare.textContent = contatori[0]
    contInCorso.textContent = contatori[1]
    contCompletato.textContent = contatori[2]
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
    if (valori.stato == 0) {
        listaDaFare.appendChild(scheda)
    } else if (valori.stato == 1) {
        listaInCorso.appendChild(scheda)
    } else {
        listaCompletato.appendChild(scheda)
    }
}

function gestisciSubmit(event) {
    event.preventDefault()
    const titolo = document.getElementById("titolo").value.trim()
    const descrizione = document.getElementById("descrizione").value
    const priorita = document.getElementById("priorita").value
    const assegnatario = document.getElementById("assegnatario").value
    const stato = 0

    if (priorita == "Nulla") {
        errore.textContent = "Inserisci la priorità!"
        return
    } else {
        errore.textContent = ""
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

mostraBoard()

function carregar() {
    fetch('./dados/info.json')
        .then(response => response.json())
        .then(info => {
            const container = document.querySelector("#flags-container")
            info.map(flag => {
                const card = document.createElement("div")
                card.classList.add("card")

                const img = document.createElement("img")
                img.src = flag.imagem
                img.alt = flag.nome;

                const titulo = document.createElement("h3")
                titulo.textContent = flag.nome

                card.appendChild(img)
                card.appendChild(titulo)
                container.appendChild(card)
            })
            
        })
}

carregar()
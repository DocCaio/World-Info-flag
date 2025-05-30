let infoPaises = [];

fetch('../dados/info.json')
  .then(response => response.json())
  .then(data => {
    infoPaises = data;
    carregarPaises(data);
  });

function carregarPaises(info) {
  const container = document.querySelector("#flags-container");
  container.innerHTML = "";
  info.forEach((flag) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${flag.imagem}" alt="Bandeira de ${flag.nome}">
      <h3>${flag.nome}</h3>
    `;
   card.addEventListener("click", () => abrirModal(flag));
    container.appendChild(card);
  });
}


export function abrirModal(pais) {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
    <div id="content">
    <div id="description"> 

      <p>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-buildings-fill" viewBox="0 0 16 16">
      <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z"/>
      </svg>
      <strong>Capital:</strong> ${pais.capital}
      </p>

      <p>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe-americas-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="m8 0 .412.01A7.97 7.97 0 0 1 13.29 2a8.04 8.04 0 0 1 2.548 4.382 8 8 0 1 1-15.674 0 8 8 0 0 1 1.361-3.078A8 8 0 0 1 2.711 2 7.96 7.96 0 0 1 8 0m0 1a7 7 0 0 0-5.958 3.324C2.497 6.192 6.669 7.827 6.5 8c-.5.5-1.034.884-1 1.5.07 1.248 2.259.774 2.5 2 .202 1.032-1.051 3 0 3 1.5-.5 3.798-3.186 4-5 .138-1.242-2-2-3.5-2.5-.828-.276-1.055.648-1.5.5S4.5 5.5 5.5 5s1 0 1.5.5c1 .5.5-1 1-1.5.838-.838 3.16-1.394 3.605-2.001A6.97 6.97 0 0 0 8 1"/>
      </svg>
      <strong>Continente:</strong> ${pais.continente}
      </p>

      <p>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
      </svg>
      <strong>População:</strong> ${pais.populacao.toLocaleString("pt-BR")}
      </p>

      <p>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
      <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
      </svg>
      <strong>Língua:</strong> <span id="lingua">${pais.lingua_falada}</span>
      </p>

      ${pais.Copas_do_mundo ? `<p>
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16">
       <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/>
       </svg>  
        <strong>Copas do Mundo:</strong> ${pais.Copas_do_mundo}</p>` : ''}
       </div> 
      <div>
       <img src="${pais.imagem}" alt="Bandeira de ${pais.nome}" style="width: 100px; margin-top: 10px;"> 
      </div>   
         <div>
       <button onclick="fecharModal()" aria-label="Fechar modal">X</button>
      </div>   
      
    </div>
  `;
  modal.style.display = "block";
}

function fecharModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

window.fecharModal = fecharModal;

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    fecharModal();
  }
};

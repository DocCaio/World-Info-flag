import { abrirModal } from './modal.js'

let todosPaises = [];
let quantidadeExibida = 0;
const incremento = 25; 

fetch('./dados/info.json')
  .then(res => res.json())
  .then(data => {
    todosPaises = data;
    preencherFiltros(data);
    carregarMais();
  });

function preencherFiltros(paises) {
    const selectContinente = document.getElementById('select-continente');
    const selectCopa = document.getElementById('select-copa');
    const selectLingua = document.getElementById('select-lingua');

    const continentes = [...new Set(paises.map(p => p.continente))];
    const linguas = [...new Set(paises.map(p => p.lingua_falada))];

    continentes.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      selectContinente.appendChild(opt);
    });
  
    linguas.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      selectLingua.appendChild(opt);
    });

     
     while (selectCopa.children.length > 1) {
      selectCopa.removeChild(selectCopa.lastChild);
    }

     const opSim = document.createElement('option');
     opSim.value = "Sim";
     opSim.textContent = "Sim";
     selectCopa.appendChild(opSim);

     const opNao = document.createElement('option');
     opNao.value = "Não";
     opNao.textContent = "Não";
     selectCopa.appendChild(opNao); 
  }

     function exibirPaises(lista) {
    const container = document.getElementById("flags-container");
    container.innerHTML = "";

    lista.forEach(pais => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML =  `<img src="${pais.imagem}" alt="Bandeira de ${pais.nome}"> <h3>${pais.nome}</h3>`;
        card.addEventListener("click", () => abrirModal(pais));
        container.appendChild(card);
    });
}

function aplicarFiltros() {
    quantidadeExibida = 0;
  
    const continente = document.getElementById('select-continente').value;
    const copa = document.getElementById('select-copa').value;
    const lingua = document.getElementById('select-lingua').value;
    const busca = document.getElementById('input-pais').value.toLowerCase();
  
    const filtrados = todosPaises.filter(pais => {
      const cond1 = !continente || pais.continente === continente;
      const cond2 = 
  !copa || 
  (copa === 'Sim' && pais["Copas do mundo"] && pais["Copas do mundo"] !== '0') ||
  (copa === 'Não' && (!pais["Copas do mundo"] || pais["Copas do mundo"] === '0'));

      const cond3 = !lingua || pais.lingua_falada === lingua;
      const cond4 = !busca || pais.nome.toLowerCase().includes(busca);
      return cond1 && cond2 && cond3 && cond4;
    });

    carregarMais(filtrados);
}

function carregarMais(listaFiltrada) {
    const lista = listaFiltrada || todosPaises;
    const proximaQuantidade = quantidadeExibida + incremento;
    const exibicaoAtual = lista.slice(0, proximaQuantidade);
    exibirPaises(exibicaoAtual);
    quantidadeExibida = proximaQuantidade;
  
    if (quantidadeExibida >= lista.length) {
      document.getElementById('load-more').style.display = 'none';
    } else {
      document.getElementById('load-more').style.display = 'block';
    }
  }


document.getElementById('select-continente').addEventListener('change', aplicarFiltros);
document.getElementById('select-copa').addEventListener('change', aplicarFiltros);
document.getElementById('select-lingua').addEventListener('change', aplicarFiltros);
document.getElementById('input-pais').addEventListener('input', aplicarFiltros);
document.getElementById('load-more').addEventListener('click', () => carregarMais());

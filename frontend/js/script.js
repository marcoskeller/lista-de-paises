


//Esta parte se refere ao Estado da Aplicação
let abaPaises = null;
let abaFavorios = null;

let listaTodosPaises = [];
let listaPaisesFavoritos = [];

let quantidadeDePaises = 0;
let quantidadePaisesFavoritos = 0;

let listaPopulacaoTotal = 0;
let listaPopulacaoTotalFavoritos = 0;

let formatacaoNumeros = null;

console.log("Pagina Carregada!");

window.addEventListener('load', () => {
    abaPaises = document.querySelector('#abaPaises');
    abaFavorios = document.querySelector('#abaFavoritos');

    quantidadeDePaises = document.querySelector('#quantidadeDePaises');
    quantidadePaisesFavoritos = document.querySelector('#quantidadePaisesFavoritos');

    listaPopulacaoTotal = document.querySelector('#listaPopulacaoTotal');
    listaPopulacaoTotalFavoritos = document.querySelector('#listaPopulacaoTotalPaisesFavoritos');

    formatacaoNumeros = Intl.NumberFormat('pt-BR');

    buscarPaises();
});


function buscarPaises(){
    console.log('Teste de funcao!');
}
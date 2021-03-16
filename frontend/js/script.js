


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


async function buscarPaises(){
    console.log('Teste de funcao!');
    const resource = await fetch('https://restcountries.eu/rest/v2/all');
    const listaFormatoJson = await resource.json();

    listaTodosPaises = listaFormatoJson.map(pais =>{
        const { numericCode, translations, population, flag} = pais;

        return{
            id:numericCode,
            name: translations.pt,
            population: population,
            //formattedPopulation: formatacaoNumeros(population),
            flag:flag
        };
    });
    //console.log(listaTodosPaises);
    render();
}

function render(){
   renderizarListaPaises();

   renderizarListaFavoritos();

   renderizarSomatorioPopulacao();

   renderizarBotoesListaPaises();

}

function renderizarListaPaises(){
console.log('Renderizando lista de Paises');

let paisesHTML = "<div>";

listaTodosPaises.forEach(pais => {
    const {name, flag, id, population, formattedPopulation} = pais;

    const paisHTML = `
        <div class='pais'>
            <!--Div Relacionada ao Botão da Lista-->
            <div>
            <a id="${id} class="waves-effect waves-light btn">+</a>
            </div>

            <!--Div Relacionada a Badeira do Pais-->
            <div>
            <img src="${flag}" alt="${name}">
            </div>

            <!--Div Relacionada aos dados do Pais-->
            <div>
                <ul>
                    <li>${name}</li>
                    <li>${population}</li>
                </ul>
            </div>
        </div>
    `;
    paisesHTML =  paisesHTML + paisHTML;
});

paisesHTML = paisesHTML + '</div>';
abaPaises.innerHTML = paisesHTML;

}

function renderizarListaFavoritos(){
    let favoritosHTML = "<div>";

    listaPaisesFavoritos.forEach(pais => {
        const {name, flag, id, population, formattedPopulation} = pais;

        const favoritoHTML = `
            <div class='pais'>
                <!--Div Relacionada ao Botão da Lista-->
                <div>
                    <a id="${id} class="waves-effect waves-light btn">-</a>
                </div>

                <!--Div Relacionada a Badeira do Pais-->
                <div>
                <img src="${flag}" alt="${name}">
                </div>

                <!--Div Relacionada aos dados do Pais-->
                <div>
                    <ul>
                        <li>${name}<li>
                        <li>${population}</li>
                    </ul>
                </div>

        `;

        favoritoHTML = favoritoHTML + favoritoHTML;
    })

    favoritosHTML = favoritosHTML + '</div>';
    abaFavorios.innerHTML = favoritosHTML;

}

function renderizarSomatorioPopulacao(){

}

function renderizarBotoesListaPaises(){

}



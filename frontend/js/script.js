


//Esta parte se refere ao Estado da Aplicação
let abaPaises = null;
let abaFavoritos = null;

let listaTodosPaises = [];
let listaPaisesFavoritos = [];

let quantidadeDePaises = 0;
let quantidadePaisesFavoritos = 0;

let listaPopulacaoTotal = 0;
let listaPopulacaoTotalFavoritos = 0;

let numeroFormatado = null;

console.log("Pagina Carregada!");

window.addEventListener('load', () => {
    abaPaises = document.querySelector('#abaPaises');
    abaFavoritos = document.querySelector('#abaFavoritos');

    quantidadeDePaises = document.querySelector('#quantidadeDePaises');
    quantidadePaisesFavoritos = document.querySelector('#quantidadePaisesFavoritos');

    listaPopulacaoTotal = document.querySelector('#listaPopulacaoTotal');
    listaPopulacaoTotalFavoritos = document.querySelector('#listaPopulacaoTotalPaisesFavoritos');

    numeroFormatado = Intl.NumberFormat('pt-BR');

    buscarPaises();
});


async function buscarPaises(){

    const resource = await fetch('https://restcountries.eu/rest/v2/all');
    const listaFormatoJson = await resource.json();

    listaTodosPaises = listaFormatoJson.map(pais =>{
        const { numericCode, translations, population, flag} = pais;

        return{
            id:numericCode,
            name: translations.pt,
            population: population,
            formattedPopulation: formatacaoNumeros(population),
            flag:flag
        };
    });

    render();
}

function render(){
   renderizarListaPaises();

   renderizarListaFavoritos();

   renderizarSomatorioPopulacao();

   renderizarBotoesListaPaises();

}

function renderizarListaPaises(){

let paisesHTML = "<div>";

listaTodosPaises.forEach(pais => {
    const {name, flag, id, population, formattedPopulation} = pais;

    const paisHTML = `
        <div class='pais'>
            <!--Div Relacionada ao Botão da Lista-->
            <div>
            <a id="${id}" class="waves-effect waves-light btn">+</a>
            </div>

            <!--Div Relacionada a Badeira do Pais-->
            <div>
            <img src="${flag}" alt="${name}">
            </div>

            <!--Div Relacionada aos dados do Pais-->
            <div>
                <ul>
                    <li>${name}</li>
                    <li>${formattedPopulation}</li>
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
    let favoritosHTML = '<div>';

    listaPaisesFavoritos.forEach( pais => {
        const {name, flag, id, population, formattedPopulation} = pais;

        const paisfavoritoHTML = `
            <div class='pais'>
                <!--Div Relacionada ao Botão da Lista-->
                <div>
                    <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
                </div>

                <!--Div Relacionada a Badeira do Pais-->
                <div>
                <img src="${flag}" alt="${name}">
                </div>

                <!--Div Relacionada aos dados do Pais-->
                <div>
                    <ul>
                        <li>${name}</li>
                        <li>${formattedPopulation}</li>
                    </ul>
                </div>
            </div>

        `;
        favoritosHTML += paisfavoritoHTML;
    });

    favoritosHTML += '</div>';
    abaFavoritos.innerHTML = favoritosHTML;
}


function renderizarSomatorioPopulacao(){
    
    quantidadeDePaises.textContent = listaTodosPaises.length;
    quantidadePaisesFavoritos.textContent = listaPaisesFavoritos.length;

    const totalPopulacao = listaTodosPaises.reduce((accumulator, current) => {
        return accumulator + current.population;
    }, 0);

    const totalPopulacaoFavoritos = listaPaisesFavoritos.reduce((accumulator, current) => {
        return accumulator + current.population;
    } , 0);

    listaPopulacaoTotal.textContent = formatacaoNumeros(totalPopulacao);
    listaPopulacaoTotalFavoritos.textContent = formatacaoNumeros(totalPopulacaoFavoritos);

}


function renderizarBotoesListaPaises(){
    
    const botaoPais = Array.from(abaPaises.querySelectorAll('.btn'));
    const botaoPaisFavorito = Array.from(abaFavoritos.querySelectorAll('.btn'));
    
    botaoPais.forEach(button => {
        button.addEventListener('click', () => adcionarParaFavoritos(button.id));
    });

    botaoPaisFavorito.forEach(button => {
        button.addEventListener('click', () => removerDeFavoritos(button.id));
    });
    
}


function adcionarParaFavoritos(id){
    const adcionarPaisParaFavoritos = listaTodosPaises.find(pais => pais.id === id);
   
    listaPaisesFavoritos = [... listaPaisesFavoritos, adcionarPaisParaFavoritos];

    listaPaisesFavoritos.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    listaTodosPaises = listaTodosPaises.filter( pais => pais.id !== id);

    
    render();
}


function removerDeFavoritos(id){
    const removerPaisDeFavoritos = listaPaisesFavoritos.find(pais => pais.id === id);
    
    listaTodosPaises = [...listaTodosPaises, removerPaisDeFavoritos];

    listaTodosPaises.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    listaPaisesFavoritos = listaPaisesFavoritos.filter( pais => pais.id !== id);

    render();
}

function formatacaoNumeros(number) {
    return numeroFormatado.format(number);
  }

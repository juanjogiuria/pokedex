//Seleccionamos cada uno de los elementos (data) que le asignamos a cada div con querySelector.
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName =  document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeball = document.querySelector('[pokeball]')
const myPokemons = []

// Le asigno un color a cada tipo de pokemon
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

//Creamos la funcion searchPokemon() que se va a llamar en el imput del form
const searchPokemon = event => {
    event.preventDefault()  //Esta funcion de event cancela el submit de form para que no se actualize la pagina
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`) //Llamo desde la api el pokemon que busco el usuario y .toLowerCase() para que convierta a minuscula
        .then(data => data.json())
        .then(response => renderPokemonData(response)) //Creo una funcion para renderizar el pokemon elegido
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {stats, types} = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nro: ${data.id}`;

    setCardColor(types); //Creo una funcion que le asigna un color segun el tipo de pokemon
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokeball(data);

}

const setCardColor = types => {
    //No todos los pokemon tienen dos tipos por lo tanto:
    //A colorOne le asigno la posicion 0 del array que te devuelve los tipos
    const colorOne = typeColors[types[0].type.name];
    //A color two le digo que si existe la posicion 1 del arraye le asigne ese color si no que le ponga el color por default;
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;

    pokeImg.style.background =  `radial-gradient(${colorTwo} 0.5%, ${colorOne} 50%)`;
    pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.className = 'type'
        typeTextElement.style.background = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = ''
    stats.forEach(stat => {
        const statElement = document.createElement("div")
        const statElementName = document.createElement("div")
        const statElementAmount = document.createElement("div")
        statElement.className = 'stats'
        statElementName.textContent = stat.stat.name
        statElementAmount.textContent = stat.base_stat

        statElement.appendChild(statElementName)
        statElement.appendChild(statElementAmount)
        pokeStats.appendChild(statElement)

    })
}

const renderPokeball = (data) => {
    pokeball.innerHTML = ''
    const logoPokeball = document.createElement("img")
    logoPokeball.className = 'pokeball-styles'
    logoPokeball.setAttribute('src', 'pokeball.png')
    pokeball.appendChild(logoPokeball);
    pokeball.onclick = () => {
        myPokemons.push(data.name);
        console.log(myPokemons)
    }
}


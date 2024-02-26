// reference to https://www.pokemon.com/us/pokedex

var aPokemonList = [];
const eType = {
    grass: [0, "grass"],
    posion: [1, "posion"],
    fire: [2, "fire"],
    ice: [3, "ice"],
    flying: [4, "flying"],
    psychic: [5, "psychic"],
    water: [6, "water"],
    ground: [7, "ground"],
    rock: [8, "rock"],
    electric: [9, "electric"]
}
const eCategory = {
    seed: [0, "seed"],
    lizard: [1, "lizard"],
    flame: [2, "flame"]
}

let pBulbasaur  = {
    id: 1,
    evolution: 2,
    degeneration: null,
    name: "Bulbasaur",
    types: [eType.grass, eType.posion],
    category: eCategory.seed,
    state: {
        HP: 45,
        ATK: 49,
        DEF: 49,
        SPD: 45,
        SP_ATK: 65,
        SP_DEF: 65
    },
    profile: {
        height: 0.7,
        weight: 6.9,
        maleRatio: 0.875,
    }
}
let pIvysaur = {
    id: 2,
    evolution: 3,
    degeneration: 1,
    name: "Ivysaur",
    types: [eType.grass, eType.posion],
    category: eCategory.seed,
    state: {
        HP: 60,
        ATK: 62,
        DEF: 63,
        SPD: 60,
        SP_ATK: 80,
        SP_DEF: 80
    },
    profile: {
        height: 1,
        weight: 13,
        maleRatio: 0.875,
    }
}
let pVenusaur = {
    id: 3,
    evolution: null,
    degeneration: 2,
    name: "Venusaur",
    types: [eType.grass, eType.posion],
    category: eCategory.seed,
    state: {
        HP: 80,
        ATK: 82,
        DEF: 83,
        SPD: 80,
        SP_ATK: 100,
        SP_DEF: 100
    },
    profile: {
        height: 2,
        weight: 100,
        maleRatio: 0.875,
    }
}
let pCharmander = {
    id: 4,
    evolution: 5,
    degeneration: null,
    name: "Charmander",
    types: eType.fire,
    category: eCategory.lizard,
    state: {
        HP: 39,
        ATK: 52,
        DEF: 43,
        SPD: 65,
        SP_ATK: 60,
        SP_DEF: 50
    },
    profile: {
        height: 0.6,
        weight: 8.5,
        maleRatio: 0.875,
    }
}
let pCharmeleon = {
    id: 5,
    evolution: 6,   // next pokemon id
    degeneration: 4, // previous pokemon id
    name: "Charmeleon",
    types: eType.fire,
    category: eCategory.flame,
    state: {
        HP: 58,
        ATK: 64,
        DEF: 58,
        SPD: 80,
        SP_ATK: 80,
        SP_DEF: 65
    },
    profile: {
        height: 1.1,
        weight: 19,
        maleRatio: 0.875,
    }
}
let pCharizard = {
    id: 6,
    evolution: null,   // next pokemon id
    degeneration: 5, // previous pokemon id
    name: "Charizard",
    types: [eType.fire, eType.flying],
    category: eCategory.flame,
    state: {
        HP: 78,
        ATK: 84,
        DEF: 78,
        SPD: 100,
        SP_ATK: 109,
        SP_DEF: 85
    },
    profile: {
        height: 1.7,
        weight: 90.5,
        maleRatio: 0.875,
    }
}
aPokemonList.push(pBulbasaur);
aPokemonList.push(pIvysaur);
aPokemonList.push(pVenusaur);
aPokemonList.push(pCharmander);
aPokemonList.push(pCharmeleon);
aPokemonList.push(pCharizard);


document.write("<p class='list'>")
document.write("Pokemons in list:");    // CR is ignored in html, meaningless for writeln
document.write("<br>");                 // use <br> for new line
for (let i = 0; i < aPokemonList.length; i++) {
    let pPokemon = aPokemonList[i];
    let digit = 3 - Math.floor(Math.log10(pPokemon.id));
    let digitDisplay = "";
    for (let j = 0; j < digit; j++) {
        digitDisplay += "0";
    }
    document.write('#' + digitDisplay + pPokemon.id + " "
                    + pPokemon.name);
    document.write(" (height: " + pPokemon.profile.height + "m)");
    if (pPokemon.profile.height >= 1) {
        document.write(" - Wow, that's big!");
    }
    document.write("<br>");
}
document.write("</p>")

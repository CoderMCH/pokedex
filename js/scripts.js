// reference to https://www.pokemon.com/us/pokedex

var aPekemonList = [];
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

let bulbasaur  = {
    id: 1,
    evolution: 2,   // next pokemon id
    degeneration: null, // previous pokemon id
    name: "bulbasaur",
    types: [eType.grass, eType.posion],
    weaknesses: [eType.fire, eType.ice, eType.flying, eType.psychic],
    category: eCategory.seed,
    state: {
        HP: 3,
        ATK: 3,
        DEF: 3,
        SP_ATK: 4,
        SP_DEF: 4,
        SPD: 3
    }
}
let ivysaur = {
    id: 2,
    evolution: 3,   // next pokemon id
    degeneration: 1, // previous pokemon id
    name: "ivysaur",
    types: [eType.grass, eType.posion],
    weaknesses: [eType.fire, eType.ice, eType.flying, eType.psychic],
    category: eCategory.seed,
    state: {
        HP: 4,
        ATK: 4,
        DEF: 4,
        SP_ATK: 5,
        SP_DEF: 5,
        SPD: 3
    }
}
let venusaur = {
    id: 3,
    evolution: null,   // next pokemon id
    degeneration: 2, // previous pokemon id
    name: "venusaur",
    types: [eType.grass, eType.posion],
    weaknesses: [eType.fire, eType.ice, eType.flying, eType.psychic],
    category: eCategory.seed,
    state: {
        HP: 5,
        ATK: 5,
        DEF: 5,
        SP_ATK: 6,
        SP_DEF: 6,
        SPD: 5
    }
}
let charmander = {
    id: 4,
    evolution: 5,   // next pokemon id
    degeneration: null, // previous pokemon id
    name: "charmander",
    types: eType.fire,
    weaknesses: [eType.water, eType.ground, eType.rock],
    category: eCategory.lizard,
    state: {
        HP: 3,
        ATK: 4,
        DEF: 3,
        SP_ATK: 4,
        SP_DEF: 3,
        SPD: 4
    }
}
let charmeleon = {
    id: 5,
    evolution: 6,   // next pokemon id
    degeneration: 4, // previous pokemon id
    name: "charmeleon",
    types: eType.fire,
    weaknesses: [eType.water, eType.ground, eType.rock],
    category: eCategory.flame,
    state: {
        HP: 4,
        ATK: 4,
        DEF: 4,
        SP_ATK: 5,
        SP_DEF: 4,
        SPD: 5
    }
}
let charizard = {
    id: 6,
    evolution: null,   // next pokemon id
    degeneration: 5, // previous pokemon id
    name: "charizard",
    types: [eType.fire, eType.flying],
    weaknesses: [eType.water, eType.electric, eType.rock],    // rock duels 4x dmg so have 4/2 items
    category: eCategory.flame,
    state: {
        HP: 5,
        ATK: 5,
        DEF: 5,
        SP_ATK: 7,
        SP_DEF: 5,
        SPD: 6
    }
}
aPekemonList.push(bulbasaur);
aPekemonList.push(ivysaur);
aPekemonList.push(venusaur);
aPekemonList.push(charmander);
aPekemonList.push(charmeleon);
aPekemonList.push(charizard);


document.write("<p class='list'>")
document.write("Pokemons in list:");    // CR is ignored in html, meaningless for writeln
document.write("<br>");                 // use <br> for new line
for (let i = 0; i < aPekemonList.length; i++) {
    let digit = 3 - Math.floor(Math.log10(aPekemonList[i].id));
    let digitDisplay = "";
    for (let j = 0; j < digit; j++) {
        digitDisplay += "0";
    }
    document.write('#' + digitDisplay + aPekemonList[i].id + " "
                    + aPekemonList[i].name + "<br>");
}
document.write("</p>")

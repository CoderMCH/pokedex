let repoPokemon = (function() {
    let aPokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    function add(pPokemon) {
        aPokemonList.push(pPokemon);
    }
    function getAll() {
        return aPokemonList;
    }
    function validate(pPokemon) {
        if (typeof pPokemon != "object") return false;
        let keyTemplate = Object.keys(pPokemonTemplate);
        let keyPokemon = Object.keys(pPokemon);
        return JSON.stringify(keyTemplate) == JSON.stringify(keyPokemon);
    }
    function addv(pPokemon) {
        if (validate(pPokemon)) {
            add(pPokemon);
        } else {
            alert("This is not a valid pokemon.");
        }
    }
    function filterByName(strName) {
        return aPokemonList.filter(pPokemon => pPokemon.name == strName);
    }
    function addListItem(pPokemon) {;
        let button = document.createElement("button");
        button.classList.add("pokemon-list-button");
        button.innerText = pPokemon.name;
        addButtonEvenListener(button, pPokemon);
        
        let ulPekomonList = document.querySelector("ul.pokemon-list");
        let liPekomon = document.createElement("li");
        liPekomon.classList.add("pokemon-list-item");
        liPekomon.appendChild(button);
        ulPekomonList.appendChild(liPekomon);
    }
    function showDetails(pPokemon) {
        let p = document.querySelector(".pokemon-details");
        p.innerText = pPokemon.name;
    }
    function addButtonEvenListener(pButton, pPokemon) {
        pButton.addEventListener("click", ev => showDetails(pPokemon));
    }

    function loadList() {
        fetch(apiUrl, {method: "GET"}).then(res => {
            return res.json();
        }).then(json => {
            json.results.forEach(pokemon => {
                add({
                    name: pokemon.name,
                    detailsUrl: pokemon.url
                })
            })
        }).catch(err => console.error(err))
    }
    function loadDetails(pPokemon) {
        fetch(pPokemon.detailsUrl, {method: "GET"}).then(res => {
            return res.json();
        }).then(json => {
            console.log(json)
            pPokemon.id = json.id;
            pPokemon.types = json.types;
            pPokemon.sprite = json.sprite;
            pPokemon.height = json.height;
        }).catch(err => console.error(err))
    }

    return {
        add: add,
        getAll: getAll,
        validate: validate,
        addv: addv,
        filterByName: filterByName,
        addListItem: addListItem,
        showDetail: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

repoPokemon.loadList();

repoPokemon.getAll().forEach(pPokemon => {
    repoPokemon.addListItem(pPokemon);
})

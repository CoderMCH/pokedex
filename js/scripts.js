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
        p.innerText = "";
        loadDetails(pPokemon).then(res => {
            console.log(res);   // as task 6.2 request
            p.innerText = "#" + res.id + "\xa0" + res.name + "\n";
            p.innerText += "types:\xa0";
            console.log(res)
            res.types.forEach(slot => p.innerText += slot.type.name + "\xa0")
        })
    }
    function addButtonEvenListener(pButton, pPokemon) {
        pButton.addEventListener("click", ev => showDetails(pPokemon));
    }

    async function loadList() {
        try {
            showLoadingMessage();
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                return fetch(apiUrl, {method: "GET"})
                    .then(res => {return res.json()})
                    .then(json => {
                        json.results.forEach(pokemon => {
                            add({
                                name: pokemon.name,
                                detailsUrl: pokemon.url
                            });
                        });
                        hideLoadingMessage();
                        resolve();
                    }
                    ).catch(err => {
                        console.error(err);
                        reject(err);
                    })
                }, 2000)
            })
        } catch (err) {
            return console.error(err);
        }
    }
    async function loadDetails(pPokemon) {
        try {
            showLoadingMessage();
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    fetch(pPokemon.detailsUrl, { method: "GET" }).then(res => {
                        return res.json();
                    }).then(json => {
                        pPokemon.id = json.id;
                        pPokemon.types = json.types;
                        pPokemon.sprite = json.sprite;
                        pPokemon.height = json.height;
                        hideLoadingMessage();
                        resolve();
                    }).catch(err => {
                        console.error(err);
                        reject();
                    })
                }, 2000)
            })
            return pPokemon;
        } catch (err) {
            return console.error(err);
        }
    }
    function showLoadingMessage() {
        let mesg = document.getElementById("loading-message");
        mesg.style = "display: block";
    }
    function hideLoadingMessage() {
        let mesg = document.getElementById("loading-message");
        mesg.style = "display: none";
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
        loadDetails: loadDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage
    };
})();

repoPokemon.loadList().then(() => {
    repoPokemon.getAll().forEach(pPokemon => {
        repoPokemon.addListItem(pPokemon);
    })
}).catch(err => console.error(err))


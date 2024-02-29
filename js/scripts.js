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
        showLoadingMessage();
        loadDetails(pPokemon).then(res => {
            let details = "#" + res.id + "\xa0" + res.name + "\n";
            details += "types:\xa0";
            res.types.forEach(slot => details += slot.type.name + "\xa0")
            details += "\nheight: " + res.height/10 + "m\n";
            details += "weight: " + res.weight/10 + "kg\n";
            let imgList = [
                res.sprites.front_default, res.sprites.front_shiny,
                res.sprites.back_default, res.sprites.back_shiny,
                res.sprites.back_female, res.sprites.back_shiny_female,
                res.sprites.front_female, res.sprites.front_shiny_female
            ]
            showModal("Pokemon details", details, imgList);
        }).catch(err => console.error(err));
    }
    function addButtonEvenListener(pButton, pPokemon) {
        pButton.addEventListener("pointerdown", ev => showDetails(pPokemon));
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
                        pPokemon.sprites = json.sprites;
                        pPokemon.height = json.height;
                        pPokemon.weight = json.weight;
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
        showModal("", "Loading......");
    }
    function hideLoadingMessage() {
        hideModal();
    }

    function showModal(title, text, imgList) {
        let modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.remove("invisible");
        document.getElementById("modal-title").innerText = title;
        document.getElementById("modal-details").innerText = text;
        let gallery = modalContainer.querySelector("#modal-gallery");
        Array.from(gallery.children).forEach(child => gallery.removeChild(child))
        if (imgList) {
            imgList.forEach(imgUrl => {
                if (!imgUrl) return;
                let img = document.createElement("img");
                img.src = imgUrl;
                gallery.appendChild(img);
            })
        }
    }
    function hideModal() {
        let modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.add("invisible");
    }
    function modalListeners() {
        let buttonClose = document.getElementById("modal-button-close");
        buttonClose.addEventListener("pointerdown", ev => {
            hideModal();
        })
        let modalContainer = document.querySelector(".modal-container");
        window.addEventListener("keydown", ev => {
            console.log(ev.key)
            if (ev.key == "Escape" && !modalContainer.classList.contains("invisible")) {
                hideModal();
            }
        })
        modalContainer.addEventListener("pointerdown", ev => {
            if (ev.target === modalContainer) {
                hideModal();
            }
        })
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
        hideLoadingMessage: hideLoadingMessage,
        showModal: showModal,
        hideModal: hideModal,
        modalListeners: modalListeners
    };
})();

repoPokemon.modalListeners();
repoPokemon.loadList().then(() => {
    repoPokemon.getAll().forEach(pPokemon => {
        repoPokemon.addListItem(pPokemon);
    })
}).catch(err => console.error(err))

let repoPokemon = (function() {
    let aPokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=100000";
    let nDelay = 500;

    function add(pPokemon) {
        aPokemonList.push(pPokemon);
    }
    function getAll() {
        return aPokemonList;
    }
    function validate(pPokemon) {
        if (typeof pPokemon != "object") return false;
        let keyTemplate = Object.keys({
            name: "pokemon.name",
            detailsUrl: "pokemon.url"
        });
        let keyPokemon = Object.keys(pPokemon);
        return JSON.stringify(keyPokemon).includes(JSON.stringify(keyTemplate));
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
    function addListItem(pPokemon) {
        let btn = $("<button></button>").addClass("btn btn-primary");
        btn.attr("data-toggle", "modal").attr("data-target", "#modalLong");
        btn.append(pPokemon.name);
        addButtonEvenListener(btn, pPokemon);
        let div = $(`<div id="${pPokemon.name}-div"></div>`);
        div.addClass("list-group-item list-group-item-dark")
        div.append(btn);
        let grid = $("#pokemon-list");
        grid.append(div);
    }
    function showDetails(pPokemon) {
        if (pPokemon.modal) {
            showModal("Pokemon details", pPokemon.modal.details, pPokemon.modal.imgList);
            return;
        }
        showLoadingMessage();
        pPokemon.showModal = true;
    }
    function addButtonEvenListener(pButton, pPokemon) {
        pButton.on("pointerdown", () => showDetails(pPokemon));
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
                            addv({
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
                }, nDelay)
            })
        } catch (err) {
            return console.error(err);
        }
    }
    async function loadDetails(pPokemon) {
        try {
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
                        
                        // for modal usage
                        let details = "#" + pPokemon.id + "\xa0" + pPokemon.name + "\n";
                        details += "types:\xa0";
                        pPokemon.types.forEach(slot => details += slot.type.name + "\xa0")
                        details += "\nheight: " + pPokemon.height/10 + "m\n";
                        details += "weight: " + pPokemon.weight/10 + "kg\n";
                        pPokemon.modal = {
                            details: details,
                            imgList: [
                                pPokemon.sprites.front_default, pPokemon.sprites.front_shiny,
                                pPokemon.sprites.back_default, pPokemon.sprites.back_shiny,
                                pPokemon.sprites.back_female, pPokemon.sprites.back_shiny_female,
                                pPokemon.sprites.front_female, pPokemon.sprites.front_shiny_female
                            ]
                        }
                        if (pPokemon.showModal) {
                            showModal("Pokemon details", pPokemon.modal.details, pPokemon.modal.imgList);
                        }
                        resolve();
                    }).catch(err => {
                        console.error(err);
                        reject();
                    })
                }, nDelay)
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
        $("#modalLong").modal("show");
        $("#modalLongTitle").text(title);
        let modalBody = $("#modalLong .modal-body").empty();
        let paragraph = $("<p></p>");
        text.split("\n").forEach(substr => paragraph.append(substr).append("<br>"));
        modalBody.append(paragraph);
        let gallery = $("<div></div>").addClass("row");
        if (imgList) {
            imgList.forEach(imgUrl => {
                if (!imgUrl) return;
                let img = $("<img>").attr("src", imgUrl).addClass("col col-sm-6");
                gallery.append(img);
            })
        }
        modalBody.append(gallery);
    }
    function hideModal() {
        $("#modalLong").modal("hide");
    }

    // legacy code for modal without framework
    // function modalListeners() {
        // let buttonClose = document.getElementById("modal-button-close");
        // buttonClose.addEventListener("pointerdown", ev => {
        //     hideModal();
        // })
        // let modalContainer = document.querySelector(".modal-container");
        // window.addEventListener("keydown", ev => {
        //     if (ev.key == "Escape" && !modalContainer.classList.contains("invisible")) {
        //         hideModal();
        //     }
        // })
        // modalContainer.addEventListener("pointerdown", ev => {
        //     if (ev.target === modalContainer) {
        //         hideModal();
        //     }
        // })
    // }

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
    };
})();

repoPokemon.loadList().then(() => {
    repoPokemon.getAll().forEach(pPokemon => {
        repoPokemon.addListItem(pPokemon);
        repoPokemon.loadDetails(pPokemon);
    })
}).catch(err => console.error(err))

// filter related
function toggleFilterSelector() {
    $(".filter-selectors").toggle()
}
toggleFilterSelector();

const types = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "posion", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy", "stellar"]
let typeFilter = types;

function searchPokemon() {
    $("#pokemon-list button").parent().show();
    
    let text = $("#pokemon-search").val();
    $("#pokemon-list button:not(:contains(" + text + "))").parent().hide();
    let heightThreshold = $("#filter-height").val();
    let weightThreshold = $("#filter-weight").val();
    repoPokemon.getAll().forEach(pokemon => {
        let typeInclude = false;
        console.log(pokemon)
        pokemon.types.forEach(slot => {
            typeInclude = typeInclude || typeFilter.includes(slot.type.name);
        })
        if (!typeInclude || pokemon.height < (heightThreshold*10) || pokemon.weight < (weightThreshold*10)) {
            $(`#${pokemon.name}-div`).hide();
        }
    })
}

$("#pokemon-search").on("input", ev => {
    searchPokemon();
})
types.forEach(type => {
    let input = $(`<input type="checkbox" id="${type}-input" checked="true"></input>`);
    input.on("input", ev => {
        if (ev.target.checked) {
            typeFilter.push(type);
        } else {
            typeFilter.splice(typeFilter.indexOf(type), 1);
        }
        searchPokemon();
    })
    let label = $(`<label for="${type}-input">${type}</label>`);
    let div = $(`<div></div>`);
    div.append(input).append(label);
    $("#type-filter").append(div);
})
$("#filter-height").on("input", ev => {
    searchPokemon();
})
$("#filter-weight").on("input", ev => {
    searchPokemon();
})
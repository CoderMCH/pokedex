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
        let li = $("<li></li>");
        li.addClass("list-group-item list-group-item-dark")
        li.append(btn);
        let ul = $("#pokemon-list");
        ul.append(li);
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
    })
}).catch(err => console.error(err))

function searchPokemon(text) {
    $("li").show();
    if (text == "") {
        return;
    }
    $("#pokemon-list button:not(:contains(" + text + "))").parent().hide();
}
$("#pokemon-search").keypress(ev => {
    let text = $("#pokemon-search").val() + ev.key; // val doesn't include event input
    searchPokemon(text);
})
$("#pokemon-search").keyup(ev => {
    if (ev.keyCode != 8) return;    // backspace = keyCode 8
    let text = $("#pokemon-search").val();
    searchPokemon(text);
})
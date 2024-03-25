var filterSelectorShow = true;
function toggleFilterSelector() {
    filterSelectorShow = !filterSelectorShow;
    filterSelectorShow ? $(".filter-selectors").show() : $(".filter-selectors").hide();
}

// hide selector at the beginning
toggleFilterSelector();

var textFile = readFile("../resources/types.txt", "t")
console.log("text result: " + textFile)

// fetch("../resources/types.txt").then(res => {
//     res.text().then(text => {
//         console.log(text);
//     })
// })
// $("#type-filter").append()
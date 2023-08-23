import "../views/music-search-views/search-component.js";
import "../views/music-search-views/search-result.js";
import "../views/music-search-views/pop-up.js";
import "../scripts/process-header-footer.js";

import "../style/SCSS/main/main.scss";
import searchComponentStyle from "../style/SCSS/search-component.scss";
import searchResultStyle from "../style/SCSS/search-result.scss";
import popUpStyle from "../style/SCSS/pop-up.scss";

const processSearchComponent = () => {
    let searchComponent = document.querySelector("search-component");
    searchComponent.searchResultElement = document.querySelector("search-result");
    searchComponent.currentStyle = searchComponentStyle;
    searchComponent.render();
}
const searchResultComponent = () => {
    let searchResultComponent = document.querySelector("search-result");
    searchResultComponent.currentStyle = searchResultStyle;
    searchResultComponent.displayStatusMessage("fas fa-search", "Start searching something now!");
}
const processPopUpComponent = () => {
    let popUpComponent = document.querySelector("pop-up");
    popUpComponent.currentStyle = popUpStyle;
}
processSearchComponent();
searchResultComponent();
processPopUpComponent();
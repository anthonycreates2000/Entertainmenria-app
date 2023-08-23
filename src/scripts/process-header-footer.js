import "../views/common-views/header.js";
import "../views/common-views/footer.js";
import headerStyle from "../style/SCSS/header.scss";
import footerStyle from "../style/SCSS/footer.scss";

const processCustomHeader = () => {
    let customHeader = document.querySelector("custom-header");
    customHeader.currentStyle = headerStyle;
    customHeader.render();
};

const processCustomFooter = () => {
    let customFooter = document.querySelector("custom-footer");
    customFooter.currentStyle = footerStyle;
    customFooter.render();
}

processCustomHeader();
processCustomFooter();
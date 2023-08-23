import HTMLComponentTemplate from "../../scripts/template/html-component-template";
import {icons, iconSize} from "../../data/icons.js";
class Footer extends HTMLComponentTemplate{
    iterateIcons(){
        let result = "";
        icons.forEach((iconSrc, index) => {
            result += `
                <div class = "flex-row ${index < icons.length - 1 ? "right-border" : ""}">
                    <figure>
                        <img  src = "${iconSrc.source}" height = "${iconSize}">
                        <figcaption>${iconSrc.caption}</figcaption>
                    <figure>
                </div>
            `;
        });
        return result;
    }

    render(){
        this._shadowRoot.innerHTML = `
        <footer>
            <p>This website is powered by:</p>
            <div class = "flex-column">
                ${this.iterateIcons()}
            </div>
            <p class = "copyright">Copyright 2020 Cyberia Corporation, Entertainmenria is a part of Cyberia Company</p>
        </footer>
        `;        
        this._shadowRoot.appendChild(this._currentStyleElement);
    }
}
customElements.define("custom-footer", Footer);
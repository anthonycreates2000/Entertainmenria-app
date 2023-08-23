import FlexboxTemplate from "./flexbox-template";

class HTMLComponentTemplate extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
        this.flexboxTemplate = new FlexboxTemplate();
        this._currentStyleElement = null;
    }
    set currentStyle(currentStyle){
        this._currentStyleElement = document.createElement("style");
        this._currentStyleElement.textContent = currentStyle;
    }
}
export default HTMLComponentTemplate;
import HTMLComponentTemplate from "../../scripts/template/html-component-template.js";
class About extends HTMLComponentTemplate{
    render(){
        this._shadowRoot.innerHTML = `
        <article class = "about-article">
            <div class = "icons">
                <i class="fas fa-cogs"></i>
                <i class="fas fa-cloud"></i>
            </div>
            <div class = "desc">
                <h1>What does our service do?</h1>
                <p>Our service connects to API that will connect your most popular musics!</p>
                <p>Our goal is to make sure you don't miss any updates from your favourite musics!</p>
            </div>
        </article>  
        `;
        this._shadowRoot.appendChild(this._currentStyleElement);
    }
}
customElements.define("about-website", About);
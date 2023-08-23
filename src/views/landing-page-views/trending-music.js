import "../../scripts/template/html-component-api-template.js";
import HTMLComponentAPITemplate from "../../scripts/template/html-component-api-template.js";

class TrendingMusic extends HTMLComponentAPITemplate{
    constructor(){
        super();
        this._article = document.createElement("article");
        this._article.className = "trending-music";
        this.apiProcesser.beforeProcess = () => {
            this.displayCurrentStatus(`
                <h1>Processing the awesomeness...</h1>
                <p class = "status-message">We're processing top 3 artists this day for you!</p>
            `);
        }
        this.apiProcesser.processData = (axiosObject) => {
            this.render(axiosObject);    
        }
        this.apiProcesser.giveErrorMessage = (errorMessage) => {
            this.displayCurrentStatus(`
                <h1>${errorMessage}</h1>
                <p class = "status-message">Check your internet connection and try again!</p>
                <button class = "btn red darken-4 try-again-button" id = "retry">Reload</button>
            `);
            this._shadowRoot.querySelector("#retry").addEventListener("click", () => {
                this.startProcessData();
            });
        }
    }
    processResponseData(data){
        let flexboxColumn = this.flexboxTemplate.getFlexboxColumn("", "", "div");
        const napsterAPIImage = "https://api.napster.com/imageserver/v2/artists";
        data.artists.forEach((element, index) => {
            flexboxColumn.appendChild((this.flexboxTemplate.getFlexboxRow(
                `
                    <text>${index+1}</text>
                    <div class = "card-image">    
                        <img src = "${napsterAPIImage}/${element.id}/images/150x100.jpg" class = "card-image">
                        <p class = "card-title custom-padding small-text" style = "padding: 2vw">${element.name}</p>
                    </div>
                `, "card"
            )));
        });
        return flexboxColumn;
    }
    startProcessData(){
        const napsterTopArtistURL = "https://api.napster.com/v2.2/artists/top";
        this.apiProcesser.launchRequest(`${napsterTopArtistURL}?apikey=${this._napsterAPIToken}&limit=3`);
    }
    displayCurrentStatus(content){
        this._shadowRoot.innerHTML = "";
        this._article.innerHTML = `
            ${content}
        `;
        this._shadowRoot.appendChild(this._article);
        this._shadowRoot.appendChild(this._currentStyleElement);
    }
    render(data){
        this._shadowRoot.innerHTML = "";
        this._article.innerHTML = `
            <h1>Hey! Here are top 3 trending music artists this day!</h1>
            <a class=" btn red darken-4 search-more-button" href = "./music-search.html">Let's find out some more!</a>
        `   
        this._article.appendChild(this.processResponseData(data));
        this._shadowRoot.appendChild(this._article);
        this._shadowRoot.appendChild(this._currentStyleElement);
    }
    
}
customElements.define("trending-music", TrendingMusic);
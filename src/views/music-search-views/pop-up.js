import HTMLComponentTemplate from "../../scripts/template/html-component-template.js";
import anime from "../../scripts/animejs/anime-master/lib/anime.es.js";
class PopUp extends HTMLComponentTemplate{
    constructor(){
        super();
        this._article = document.createElement("article");
    }
    get article(){
        return this._article;
    }
    applyAnimation(){
        const popUp = this._shadowRoot.querySelector(".pop-up");
        const windowShowAnimation = anime({
            targets: popUp,
            translateY: ["100%", "-50%"],
            translateX: ["-50%", "-50%"],
            duration: 1500,
        });
        windowShowAnimation.play();
    }
    stopMusic(){
        let currentTrack = this._shadowRoot.querySelector("audio");
        if (currentTrack != undefined && currentTrack != null){
            currentTrack.pause();
            currentTrack.currentTime = 0;
        }   
    }
    render(imageSource, content){
        this._shadowRoot.innerHTML = "";
        this._article = document.createElement("article");
        let containerElement = document.createElement("div");
        containerElement.className = "pop-up card-view";
        containerElement.innerHTML = `
        <header>
            <h1 class = "title">Further Details<button class = "close" id = "close">X</button></h1>
        </header>
        `;
        containerElement.querySelector("#close").addEventListener("click", () => {
            this._article.style = "display: none;";
            this.stopMusic();
        });
        let flexboxColumn = this.flexboxTemplate.getFlexboxColumn("", "", "div");
        let flexboxRow = [
            this.flexboxTemplate.getFlexboxRow(`
                <img src = ${imageSource} onerror = "this.onerror = null; this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMzZd0vHGKdoI5Mfi1XFig-DEiFZ98cpJK6g&usqp=CAU'">
            `, ""),
            this.flexboxTemplate.getFlexboxRow(`
                ${content}
            `, "show-overflow")];
        
        flexboxRow.forEach((element) => {
            flexboxColumn.appendChild(element);
        });
        containerElement.appendChild(flexboxColumn);
        this._article.appendChild(containerElement);
        this._shadowRoot.appendChild(this._article);
        this._shadowRoot.appendChild(this._currentStyleElement);
        this.applyAnimation();
    }
}
customElements.define("pop-up", PopUp);
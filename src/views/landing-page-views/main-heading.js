import HTMLElementTemplate from "../../scripts/template/html-component-template";
import headingImages from "../../data/heading-images.js";
import anime from "../../scripts/animejs/anime-master/lib/anime.es.js";

class MainHeading extends HTMLElementTemplate{
    setAnimationLoop(){
        this.imageElements[this.currentElementNumber].style.zIndex = 1;
        const animation = anime({
            targets: this.imageElements[this.currentElementNumber],
            scale: [1, 1.3],
            opacity: [0.2, 1],
            direction: "alternate",
            complete: () =>{
                this.imageElements[this.currentElementNumber].style.zIndex = 0;
                setTimeout(() => {
                    if (this.currentElementNumber < this.elementCount - 1){
                        this.currentElementNumber += 1;
                    }
                    else{
                        this.currentElementNumber = 0;
                    }
                    this.setAnimationLoop();
                }, 1000);
            },
            loop: 2
        });
        animation.play();
    }
    applyAnimation(){
        this.imageElements = this._shadowRoot.querySelectorAll(".animate");
        this.currentElementNumber = 0;
        this. elementCount = this.imageElements.length;
        this.setAnimationLoop();
    }
    initializeImages(){
        let result = this.flexboxTemplate.getFlexboxColumn("", "image-grid", "div");
        headingImages.forEach((image) => {
            result.appendChild(this.flexboxTemplate.getFlexboxRow(`
                    <img class = "animate" src = "${image.imageUrl}"; width = 100%; style = "opacity: 0.2;">
                `)
            );
            
        });
        return result;
    }
    giveDescription(){
        let description = document.createElement("div");
        description.className = "heading-text";
        description.innerHTML = `
            <h1>Your music library. All in one place.</h1>
            <h2>Welcome to the music room. From Cyberia, to all music fans</p>
        `;
        return description;
    }
    render(){
        const articleElement = document.createElement("article");
        articleElement.className = "main-heading";
        articleElement.appendChild(this.initializeImages());
        articleElement.appendChild(this.giveDescription());
        this._shadowRoot.appendChild(articleElement);
        this._shadowRoot.appendChild(this._currentStyleElement);
        this.applyAnimation();
    }
}
customElements.define("main-heading", MainHeading);
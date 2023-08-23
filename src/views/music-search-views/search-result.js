import HTMLComponentTemplate from "../../scripts/template/html-component-template.js";
class SearchResult extends HTMLComponentTemplate{
    constructor(){
        super();
        this.dataType = "";
    }
   
    displayResult(axiosObject, type){
        this._shadowRoot.innerHTML = "<p>Click on a card to show the information</p>";
        if (axiosObject.meta.returnedCount === 0){
            this.displayStatusMessage("fas fa-question-circle", "It looked like we didn't find any results. Please try changing your keyword!");
        }
        else{
            this.displayStatusMessage("fas fa-check-circle", `We have ${axiosObject.meta.returnedCount} results!`);
        }
        this.dataType = type;
        if (type === "artist"){
            this.displayCardInformation(axiosObject.search.data.artists);
        }
        else if (type === "album"){
            this.displayCardInformation(axiosObject.search.data.albums);
        }
        else if (type === "track"){
            this.displayCardInformation(axiosObject.search.data.tracks);
        }
        this._shadowRoot.appendChild(this._currentStyleElement);
    }
    displayAdditionalArtistInformation(data, popUpElement){
        let biodata = null;
        if (data.bios != undefined && data.bios != null){
            biodata = data.bios[0].bio;
        }
        popUpElement.render(`https://api.napster.com/imageserver/v2/artists/${data.id}/images/356x237.jpg`, `
            <h1>${data.name}</h1>
            <h2>${data.type}</h2>
            <h3>Main Albums:</h3>
            <p>${data.albumGroups.main != undefined ? `${data.albumGroups.main.length}` : "No data"}</p>
            <h3>Album groups compilations:</h3>
            <p>${data.albumGroups.compilations != undefined ? data.albumGroups.compilations.length : "No data"}</p>
            <h3>Biodata</h3>
            <p>${data.bios != undefined && biodata != undefined ? `${biodata}` : "No Bio"}</p>
        `);
    }
    displayAdditionalTrackInformation(data, popUpElement){
        let trackLength = parseInt(data.playbackSeconds);
        let minute = parseInt(trackLength / 60);
        let second = trackLength % 60;
        popUpElement.render(`https://api.napster.com/imageserver/v2/albums/${data.albumId}/images/300x300.jpg`, `
            <h1>${data.name}</h1>
            <h2>${data.type}</h2>
            <h3>Album</h3>
            <p>${data.albumName}</p>
            <h3>Artist</h3>
            <p>${data.artistName}</p>
            <h3>Length</h3>
            <p>${minute}:${(second < 10) ? `0${second}` : `${second}`}</p>
            <h3>Track Preview</h3>
            <audio controls>
                <source src = "${data.previewURL}" />
            </audio>
        `);
    }
    displayAdditionalAlbumInformation(data, popUpElement){
        popUpElement.render(`https://api.napster.com/imageserver/v2/albums/${data.id}/images/300x300.jpg` ,`
            <h1>${data.name}</h1>
            <h2>${data.type}</h2>
            <h3>Album Release Date</h3>
            <p>${data.originallyReleased}</p>
            <h3>Disc Count</h3>
            <p>${data.discCount}</p>
            <h3>Track Count</h3>
            <p>${data.trackCount}</p>
            <h3>Album Label</h3>
            <p>${data.label === "" ? "No data" : data.label}</p>
            <h3>Copyright</h3>
            <p>${data.copyright === "" ? "No data" : data.copyright}</p>
        `);
    }
    displayAdditionalInformation(data){
        let popUpElement = document.querySelector("pop-up");
        let articlePopUp = popUpElement.article;
        articlePopUp.style = "display: visible;";
        if (this.dataType === "artist"){
            this.displayAdditionalArtistInformation(data, popUpElement);
        }
        else if (this.dataType === "track"){
            this.displayAdditionalTrackInformation(data, popUpElement);
        }
        else if (this.dataType === "album"){
            this.displayAdditionalAlbumInformation(data, popUpElement);
        }
    }
    displayCardInformation(data){   
        let flexboxColumn = this.flexboxTemplate.getFlexboxColumn("", "", "div");
        data.forEach((element, index) => {
            if (index % 4 == 0){
                this._shadowRoot.appendChild(flexboxColumn);
                flexboxColumn = this.flexboxTemplate.getFlexboxColumn("", "", "div");
            }
            let flexboxRow = this.flexboxTemplate.getFlexboxRow("", "", "div");
            let cardElement = document.createElement("div");
            cardElement.className = "card";
            let imageURL = "";
            if (this.dataType === "artist"){
                imageURL = `https://api.napster.com/imageserver/v2/artists/${element.id}/images/356x237.jpg`;
            }
            else if (this.dataType === "album"){
                imageURL = `https://api.napster.com/imageserver/v2/albums/${element.id}/images/200x200.jpg`;
            }
            else if (this.dataType === "track"){
                imageURL = `https://api.napster.com/imageserver/v2/albums/${element.albumId}/images/200x200.jpg`;
            }
            cardElement.innerHTML = `
                <div class = "card-image">
                    <img src = "${imageURL}" onerror = "this.onerror = null; this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMzZd0vHGKdoI5Mfi1XFig-DEiFZ98cpJK6g&usqp=CAU';">
                </div>
                <div class = "card-content">
                    <p>${element.name}</p>
                </div>    
            `;
            if (element.id !== "" && element.id !== null){
                cardElement.innerHTML += `
                    <div class = "card-action">
                        <button class = "btn red darken-1" id = "view-more-button">VIEW MORE</p>
                    </div>
                `;
                let buttonLink = cardElement.querySelector("button");
                buttonLink.addEventListener("click", () => {
                    this.displayAdditionalInformation(element);
                });
            }
            flexboxRow.appendChild(cardElement);
            flexboxColumn.appendChild(flexboxRow);
        });
        this._shadowRoot.appendChild(flexboxColumn);
    }
    displayStatusMessage(icon, description){
        this._shadowRoot.innerHTML = "";
        this._shadowRoot.innerHTML = `
            <article class = "info">
                <i class="${icon}"></i>
                <p class = "introText">${description}</p>
                <p class = "firstDescriptionText">When you click an item, a pop-up will be shown to show the detail!</p>
            </article>
        `;
        this._shadowRoot.appendChild(this._currentStyleElement);
    }
}

customElements.define("search-result", SearchResult);
import HTMLComponentAPITemplate from "../../scripts/template/html-component-api-template";
class SearchComponent extends HTMLComponentAPITemplate{
    constructor(){
        super();
        this.type = "";
        this.apiProcesser.beforeProcess = () => {
            this._searchResultElement.displayStatusMessage("fas fa-sync-alt", "Prepare to connect...");
        }
        this.apiProcesser.giveErrorMessage = (error) => {
            this._searchResultElement.displayStatusMessage("fas fa-times", `${error}`);
        }
        this.apiProcesser.processData = (axiosObject) => {
            this._searchResultElement.displayStatusMessage("fas fa-sync-alt", "Processing data...");
            this._searchResultElement.displayResult(axiosObject, this.type);
        }
    }
    set searchResultElement(searchResultElement){
        this._searchResultElement = searchResultElement;
    }
    createChoices(optionName, isChecked){
        let labelInput = document.createElement("label");
        labelInput.innerHTML =  `
            <p>
                <input class = "with-gap custom-radio-button" name = "type" type = "radio" ${isChecked ? "checked" : ""}>
                <span>${optionName}</span>
            </p>
        `;
        return labelInput;
    }
    giveURL(nameInput){
        let audioScribbleURL = "https://api.napster.com/v2.2/search?";
        let apiKey = "YjVkZjA0NmItYTI3MS00NjJlLWEwZWYtNzBhNWZjNmFjNTg2";
        let radioButtons = this._shadowRoot.querySelectorAll("input[type='radio']");
        let radioButtonsValue = this._shadowRoot.querySelectorAll("input[type='radio'] + span");
        let limitValue = this._shadowRoot.querySelector("input[type='number']");
        radioButtons.forEach((element, index) => {
            if (element.checked == true){
                this.type = radioButtonsValue[index].textContent.toLowerCase();
                audioScribbleURL += `type=${this.type}&query=${nameInput}&apikey=${apiKey}&per_type_limit=${parseInt(limitValue.value)}`;
            }
        });
        return encodeURI(audioScribbleURL);
    }
    performSearch(){
        let nameInput = this._shadowRoot.querySelector("input[type='search']");
        if (nameInput.value === "" || nameInput.value === null){
            alert("Please specify a name!");
            return;
        }
        this.apiProcesser.launchRequest(this.giveURL(nameInput.value), "");
    }
    createAdditionalOptionsElement(){
        let additionalOptionsElement = document.createElement("form");
        additionalOptionsElement.className = "additional-options";
        additionalOptionsElement.onsubmit = () => {return false;}
        additionalOptionsElement.innerHTML = `
            <h1>Options</h1>
            <p>Here, you can filter which data you'd like to search!</p>
        `;
        let flexboxColumn = this.flexboxTemplate.getFlexboxColumn("", "", "div");
        let flexboxRowChoice = this.flexboxTemplate.getFlexboxRow(`
            <p>Pick your desired type</p>
        `, "");
        let choices = [
            this.createChoices("Album", true),
            this.createChoices("Artist", false),
            this.createChoices("Track", false),
        ]
        choices.forEach((element) => {
            flexboxRowChoice.appendChild(element);
        });
        flexboxColumn.appendChild(flexboxRowChoice);

        let flexboxRowLimit = this.flexboxTemplate.getFlexboxRow(`
            <input id = "limit_number" type = "number" value = "1" min = "1" max = "200">
            <label for = "limit_number">Limit Results</label><br>
            <button type = "button" class = "btn red darken-1"><i class = "material-icons left">search</i>Search now!</button>
        `);
        flexboxColumn.appendChild(flexboxRowLimit);
        additionalOptionsElement.appendChild(flexboxColumn);
        this._shadowRoot.appendChild(additionalOptionsElement);

        let buttonSearch = this._shadowRoot.querySelector("button");
        buttonSearch.addEventListener("click", () => {this.performSearch()});
    }
    createSearchComponentElement(){
        let searchComponent = document.createElement("article");
        searchComponent.className = "search-component";
        searchComponent.innerHTML = `
            <nav>
                <div class="nav-wrapper">
                    <div class="input-field">
                        <input id="search" type="search" placeholder = "Input name here..." required>
                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                        <i class="material-icons">close</i>
                    </div>
                </div>
            </nav>
        `;
        this._shadowRoot.appendChild(searchComponent);
    }
    render(){
        this.createSearchComponentElement();
        this.createAdditionalOptionsElement();
        this._shadowRoot.appendChild(this._currentStyleElement);
    }
}
customElements.define("search-component", SearchComponent);
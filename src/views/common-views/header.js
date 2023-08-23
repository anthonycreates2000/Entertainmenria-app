import HTMLComponentTemplate from "../../scripts/template/html-component-template";
class Header extends HTMLComponentTemplate{
    render(){
        const flexboxColumn = this.flexboxTemplate.getFlexboxColumn("", "", "header");
        const flexboxRows = [
            this.flexboxTemplate.getFlexboxRow(`
                    <div class = "circle">
                        <i class = "fas fa-music"></i>
                    </div>
                    <h1>Entertainmenria</h1>
            `, ""),
            this.flexboxTemplate.getFlexboxRow(`
                <h2>Your best portal for music lovers</h2>
            `, "")
        ];
        flexboxRows.forEach((element) => {
            flexboxColumn.appendChild(element);
        });
        this._shadowRoot.appendChild(flexboxColumn);
        this._shadowRoot.appendChild(this._currentStyleElement);
    }
}
customElements.define("custom-header", Header);
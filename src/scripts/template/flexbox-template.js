class FlexboxTemplate{
    getFlexboxColumn(content, additionalName, elementType){
        let columnElement = document.createElement(elementType);
        columnElement.innerHTML = content;
        columnElement.className = `flex-column ${additionalName}`;
        return columnElement;
    }
    getFlexboxRow(content, additionalName = ""){
        let rowElement = document.createElement("div");
        rowElement.innerHTML = content;
        rowElement.className = `flex-row ${additionalName}`;
        return rowElement;
    }
}
export default FlexboxTemplate;
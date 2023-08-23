import HTMLComponentTemplate from "./html-component-template.js" ;
import APIProcesser from "../../data/api-process.js";

class HTMLComponentAPITemplate extends HTMLComponentTemplate{
    constructor(){
        super();
        this.apiProcesser = new APIProcesser();
        this._napsterAPIToken = "YjVkZjA0NmItYTI3MS00NjJlLWEwZWYtNzBhNWZjNmFjNTg2";
    }
}
export default HTMLComponentAPITemplate;
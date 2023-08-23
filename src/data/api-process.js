class APIProcesser{
    constructor(){
        this.beforeProcess = null;
        this.processData = null;
        this.giveErrorMessage = null;
    }
    launchRequest(URL, header){
        this.beforeProcess();
        axios.get(URL, header)
        .then((successResponse) => {
            return successResponse.data;
        })
        .then((axiosObject) => {
            this.processData(axiosObject);
        })
        .catch((error) => {
            this.giveErrorMessage(error);
        });
    }
}

export default APIProcesser;
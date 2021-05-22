export default class DactylError extends Error {
    constructor(message:string){
        super(message);
        this.name = "RaznarError";
    }
}
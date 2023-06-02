export default class User {
    id: number;
    displayName: string;
    email: string;
    isLoggedIn: boolean;

    constructor(id: number, displayName: string, email: string, isLoggedIn: boolean) {
        this.id = id;
        this.displayName = displayName;
        this.email = email;
        this.isLoggedIn = isLoggedIn;
    }    

}
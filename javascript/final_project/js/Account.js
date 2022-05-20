class Account{
    constructor(username, email, password){
        this.accountId = undefined;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    setId(id){ this.accountId = (id > 0)? id : undefined; }
}
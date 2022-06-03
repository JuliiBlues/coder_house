class StorageManager{

    constructor(){}

    //PRE: Nothing.
    //POST: Returns the key of the identities stored in "localStorage".
    listOfIdentities(identity){
        const list = [
            {name: "accounts", key: "accountsIdentity"},
            {name: "groups", key: "groupsIdentity"}
        ]

        let exists = list.some((elem) => elem.name == identity);
        return exists? list.find((elem) => elem.name == identity).key : undefined;
    }

    //PRE: Nothing.
    //POST: Increments the value of the selected identity by 1. Start at 1.
    incrementIdentity(identity){
        const key = this.listOfIdentities(identity);
        let value = key? (localStorage.getItem(key) || 1) : undefined;
        localStorage.setItem(key, ++value);
    }

    //PRE: Nothing.
    //POST: Returns the actual value of the selected identity. Start at 1. If not exists returns undefined.
    getIdentity(identity){
        const key = this.listOfIdentities(identity);
        return key? (localStorage.getItem(key) || 1) : undefined;
    }

    //PRE: Nothing.
    //POST: Store a new account in "localStorage".
    storeNewAccount(account){
        const storedAccounts = JSON.parse(localStorage.getItem("storedAccounts")) || [];
        let identity = this.getIdentity("accounts");
        account.setId(identity);
        storedAccounts.push(account);
        this.incrementIdentity("accounts");
        localStorage.setItem("storedAccounts", JSON.stringify(storedAccounts));
    }

    //PRE: Nothing.
    //POST: If the username and password match a stored account, put that account in "sessionStorage".
    setAccountLoggedIn(username, password){
        const storedAccounts = JSON.parse(localStorage.getItem("storedAccounts")) || [];
        const account = storedAccounts.find(elem => elem.username == username && elem.password == password);
        sessionStorage.setItem("accountLoggedIn", JSON.stringify(account));
    }

    accountLogOut(){
        sessionStorage.removeItem("accountLoggedIn");
    }

    //PRE: Nothing.
    //POST: Returns the account stored in sessionStorage. If not exists returns null.
    getAccountLoggedIn(){
        const accountLoggedIn = JSON.parse(sessionStorage.getItem("accountLoggedIn"));
        return accountLoggedIn || undefined;
    }

    //PRE: Nothing.
    //POST: Returns true / false if the username is already stored.
    checkIfUsernameExists(username){
        const storedAccounts = JSON.parse(localStorage.getItem("storedAccounts")) || [];
        return storedAccounts.some((elem) => elem.username === username);
    }

    //PRE: Nothing.
    //POST: Returns true / false if the email is already stored.
    checkIfEmailExists(email){
        const storedAccounts = JSON.parse(localStorage.getItem("storedAccounts")) || [];
        return storedAccounts.some((elem) => elem.email === email);
    }

    //PRE: Nothing.
    //POST: Returns true / false if the username and password match with any account.
    checkCredentials(username, password){
        const storedAccounts = JSON.parse(localStorage.getItem("storedAccounts")) || [];
        return storedAccounts.some(elem => elem.username === username && elem.password === password);
    }
}
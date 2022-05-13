class Dal{

    constructor(){
    }

    setAccountLoggedIn(username){
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        const accountLoggedIn = accounts.find((elem) => elem.username == username);
        sessionStorage.setItem("loggedIn", JSON.stringify(accountLoggedIn));
    }

    getAccountIdLoggedIn(){
        let account = JSON.parse(sessionStorage.getItem("loggedIn"));

        if(account == undefined)
            return -1;

        return account.id;
    }

    getIdentity(identityKey){

        let identity = localStorage.getItem(identityKey);
        
        if(identity == null)
            identity = 1;

        return identity;
    }
    
    getPasswordsGroupByAccountId(accountId){
        let passwordGroups = JSON.parse(localStorage.getItem("passwordsGroup"));

        if(passwordGroups == null)
            passwordGroups = [];
        
        return passwordGroups.filter((elem) => elem.accountId == accountId);
    }

    getPasswordsByGroupId(groupId){
        let passwords = JSON.parse(localStorage.getItem("passwords"));

        if(passwords == null)
        passwords = [];
        
        return passwords.filter((elem) => elem.groupId == groupId);
    }

    hasGroupsCreated(accountId){
        let groups = JSON.parse(localStorage.getItem("passwordsGroup"));

        if (groups == null)
            groups = [];

        return groups.some((elem) => elem.accountId == accountId);
    }

    hasPasswordsCreatedByGroup(groupId){
        let passwords = JSON.parse(localStorage.getItem("passwords"));

        if (passwords == null)
            passwords = [];

        return passwords.some((elem) => elem.groupId == groupId);
    }

    storeNewAccount(account){
        let id = this.getIdentity("accountIdentity");
        account.setId(id++);
        this.updateIdentity("accountIdentity", id);
        let accounts = JSON.parse(localStorage.getItem("accounts"));

        if(accounts == null) accounts = [];

        accounts.push(account);
        localStorage.removeItem("accounts");
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }
    
    storeNewGroup(group){
        let groupId = this.getIdentity("groupIdentity");
        group.setId(groupId++);
        this.updateIdentity("groupIdentity", groupId);
        let groups = JSON.parse(localStorage.getItem("passwordsGroup"));
        
        if(groups == null) groups = [];

        groups.push(group);
        localStorage.removeItem("passwordsGroup");
        localStorage.setItem("passwordsGroup", JSON.stringify(groups));
    }

    storeNewPassword(password){
        let passwordId = this.getIdentity("passwordIdentity");
        password.setId(passwordId++);
        this.updateIdentity("passwordIdentity", passwordId);
        let storedPasswords = JSON.parse(localStorage.getItem("passwords"));

        if(storedPasswords == null) storedPasswords = [];

        storedPasswords.push(password);
        localStorage.removeItem("passwords");
        localStorage.setItem("passwords", JSON.stringify(storedPasswords));
    }

    updateIdentity(identityKey, value){
        localStorage.setItem(identityKey, value);
    }

    usernameExist(username){
        let accounts = JSON.parse(localStorage.getItem("accounts"));

        if(accounts == null)
            accounts = [];
        
        return accounts.some((elem) => elem.username == username);
    }

    emailExist(email){
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        if(accounts == null)
            accounts = [];
        return accounts.some((elem) => elem.email == email);
    }

    checkCredentials(username, password){
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        if(accounts == null)
            accounts = [];
        return accounts.some((elem) => elem.username == username && elem.password == password);
    }
}
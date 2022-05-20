class Dal{

    constructor(){
    }

    setAccountLoggedIn(username){
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        const accountLoggedIn = accounts.find((elem) => elem.username == username);
        sessionStorage.setItem("loggedIn", JSON.stringify(accountLoggedIn));
    }

    getAccountIdLoggedIn(){
        let account = JSON.parse(sessionStorage.getItem("loggedIn")) || -1;
        return account.id;
    }

    getIdentity(identityKey){
        let identity = localStorage.getItem(identityKey) || 1;
        return identity;
    }
    
    getPasswordsGroupByAccountId(accountId){
        const passwordGroups = JSON.parse(localStorage.getItem("passwordsGroup")) || [];
        return passwordGroups.filter((elem) => elem.accountId == accountId);
    }

    getPasswordsByGroupId(groupId){
        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];        
        return passwords.filter((elem) => elem.groupId == groupId);
    }

    hasGroupsCreated(accountId){
        const groups = JSON.parse(localStorage.getItem("passwordsGroup")) || [];
        return groups.some((elem) => elem.accountId == accountId);
    }

    hasPasswordsCreatedByGroup(groupId){
        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        return passwords.some((elem) => elem.groupId == groupId);
    }

    storeNewAccount(account){
        let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        let id = this.getIdentity("accountIdentity");
        account.setId(id++);
        this.updateIdentity("accountIdentity", id);
        accounts.push(account);
        localStorage.removeItem("accounts");
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }
    
    storeNewGroup(group){
        let groupId = this.getIdentity("groupIdentity");
        group.setId(groupId++);
        this.updateIdentity("groupIdentity", groupId);
        const groups = JSON.parse(localStorage.getItem("passwordsGroup")) || [];
        groups.push(group);
        localStorage.removeItem("passwordsGroup");
        localStorage.setItem("passwordsGroup", JSON.stringify(groups));
    }

    storeNewPassword(password){
        let passwordId = this.getIdentity("passwordIdentity");
        password.setId(passwordId++);
        this.updateIdentity("passwordIdentity", passwordId);
        const storedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
        storedPasswords.push(password);
        localStorage.removeItem("passwords");
        localStorage.setItem("passwords", JSON.stringify(storedPasswords));
    }

    updateIdentity(identityKey, value){
        localStorage.setItem(identityKey, value);
    }

    usernameExist(username){
        let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        return accounts.some((elem) => elem.username == username);
    }

    emailExist(email){
        let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        return accounts.some((elem) => elem.email == email);
    }

    checkCredentials(username, password){
        let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        return accounts.some((elem) => elem.username == username && elem.password == password);
    }
}
class PasswordGroup{

    constructor(accountId, groupName){
        this.groupId;
        this.accountId = accountId;
        this.groupName = groupName;
        this.storedPasswords = [];
    }

    //PRE: Nothing.
    //POST: Returns property "groupId".
    getId(){
        return this.groupId;
    }

    setId(id){
        this.groupId = id;
    }

    //PRE: Nothing.
    //POST: Returns property "groupName".
    getGroupName(){
        return this.groupName;
    }

    //PRE: Nothing.
    //POST: Returns property "storedPasswords".
    getStoredPasswords(){
        return this.storedPasswords;
    }

    //PRE: Requires an array of storedPassword created. 
    //POST: Adds a new password object to the stored password array.
    addPassword(newPassword){
        this.storedPasswords.push(newPassword);
    }

    //PRE: Requires an array of storedPassword created.
    //POST: Removes the input's password from the stored password array .
    removePassword(password){

        let index = this.storedPasswords.indexOf(password);

        if (index != -1){
            this.storedPasswords.splice(index, 1);
            return 0;
        } 

        return index;
    }

    //PRE: Requires an array of storedPassword created.
    //POST: Returns the maximum id from the storedPasswords array.
    getMaxIdPassword(){
        if(this.storedPasswords.length > 0){
            let passwordsIds = this.storedPasswords.map((elem) => parseInt(elem.passwordId));

            passwordsIds.sort( (a, b) => (a - b));

            return passwordsIds[passwordsIds.length - 1];
        } else {
            return 0;
        }
    }
}
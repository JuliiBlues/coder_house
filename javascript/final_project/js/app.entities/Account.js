class Account{

    constructor(username, email, password){
        this.id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordGroups = [];
    }

    setId(id){this.id = id};

    addGroup(newGroup){
        this.passwordGroups.push(newGroup);
    }

    removeGroup(groupToDelete){
        let index = this.passwordGroups.indexOf(groupToDelete);

        if(index != -1){
            this.passwordGroups.splice(index, 1);
            return 0;
        }

        return index;
    }

    getPasswordGroups(){
        return this.passwordGroups.map((elem)=>{elem});
    }
}
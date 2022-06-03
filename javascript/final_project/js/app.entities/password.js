class Password{
    constructor(gropuId, alias, password){
        this.id = undefined;
        this.gropuId = gropuId;
        this.alias = alias;
        this.password = password;
    }

    setId(id){ this.id = id; }

    setPassword(password){ this.password = password; }

    getPassword(){ return this.password; }

    getAlias() { return this.alias; }
}
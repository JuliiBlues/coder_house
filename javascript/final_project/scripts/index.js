class Password{

    constructor(passwordId, alias){

        this.passwordId = passwordId;
        this.alias = alias;
        
        this.password;
    }

    //PRE: Nothing.
    //POST: Sets the "password" property to the new array entered.
    setPassword(newPassword) { 
        this.password = newPassword;
    }

    //PRE: Nothing.
    //POST: Returns a string containing the object information.
    toString(){

        return `Alias: ${this.alias}.\nPassword: ${this.password.join("")}.`;

    }

    //PRE: Nothing.
    /*POST: Returns a specific characters array given the input.
        - "lowerCase": lower case alphabet.
        - "upperCase": upper case alphabet.
        - "numbers": base 10 numbers.
        - "symbols": some symbols.
    */
    getCharacterList(charactersList){

        const dictionary = [

            {type: "lowerCase", characters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] },
            {type: "upperCase", characters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] },
            {type: "numbers", characters: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] },
            {type: "symbols", characters: ["@", "!", "#", "$", "%", "&", "/", "(", ")", "=", "?", "^", "+", "-", "*"]}

        ]

        let list = dictionary.find(aux => aux.type == charactersList);

        if(list != undefined)
            return list.characters;
        else
            return undefined;
    }

    //PRE: Nothing
    //POST: Returns a random number between minimum and maximum values.
    generateRandomNumberInRange(minValue, maxValue){
        return Math.trunc((maxValue - minValue + 1) * Math.random() - minValue);
    }

    //PRE: Nothing. 
    //POST: Returns an array containing the selected characters converted to a string.
    convertFromBooleanToString(hasLower = true, hasUpper = true, hasNumber = true, hasSymbol = true){

        let aux = [];

        if (hasLower) aux.push("lowerCase");
        if (hasUpper) aux.push("upperCase");
        if (hasNumber) aux.push("numbers");
        if (hasSymbol) aux.push("symbols");

        return aux;
    }

    /*PRE: Requires the following functions created:
        - generateRandomNumberInRange();
        - getCharacterList();
        - convertFromBooleanToString();
    */
    //POST: Returns a random character that is included in the list.
    newRandomCharacterFromList(listOfCharacters){

        let randomNumber; ;
        let typeOfRandomNumber;
        let maxValue;

        do {

            randomNumber = this.generateRandomNumberInRange(0, 3);
         
            if(randomNumber === 0) typeOfRandomNumber = "lowerCase";
            if(randomNumber === 1) typeOfRandomNumber = "upperCase";
            if(randomNumber === 2) typeOfRandomNumber = "numbers";
            if(randomNumber === 3) typeOfRandomNumber = "symbols";


        }while(listOfCharacters.indexOf(typeOfRandomNumber) == -1);

        listOfCharacters = this.getCharacterList(typeOfRandomNumber);

        maxValue = listOfCharacters.length - 1;

        return listOfCharacters[this.generateRandomNumberInRange(0, maxValue)];
    }

    /*PRE: Requires the following functions created:
        - convertFromBooleanToString();
        - newRandomCharacterFromList();
    */
    //POST: Returns a random password with a specified length and selected characters in array format.
    generateNewRandomPassword(hasLower = true, hasUpper = true, hasNumber = true, hasSymbol = true, length = 4){

        let newPassword = [];
        
        let listOfCharactersToInclude = this.convertFromBooleanToString(hasLower, hasUpper, hasNumber, hasSymbol);

        for(let i = 0; i < length; i++){
            let newCharacter = this.newRandomCharacterFromList(listOfCharactersToInclude);
            
            newPassword.push(newCharacter);
        }

        return newPassword;
    }
}

class PasswordGroup{

    constructor(groupId, groupName){

        this.groupId = groupId;
        this.groupName = groupName;

        this.storedPasswords = [];
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

    //PRE: Nothing.
    //POST: Returns a string containing the storedPassword array information.
    toString(){

        let message = [`\nGroup: ${this.groupName}.\n`];

        this.storedPasswords.forEach( (elem) => (message.push(elem.toString())) )

        return message.join("\n");
    }

    //PRE: Requires an array of storedPassword created.
    //POST: Returns the maximum id from the storedPasswords array.
    getMaxIdPassword(){
        if(this.storedPasswords.length > 0){
            let passwordsIds = [];
            
            this.storedPasswords.forEach((elem) => passwordsIds.push(parseInt(elem.passwordId)));
            
            passwordsIds.sort( (a, b) => (a - b));

            return passwordsIds[passwordsIds.length - 1];
        } else {
            return 0;
        }
    }
}

class Account{

    constructor(accountId, username, email, password){

        this.accountId = accountId;
        this.username = username;
        this.email = email;
        this.password = password;

        this.passwordGroupsCreated = [];
    }

    //PRE: Requires an array of passwordGroups created. 
    //POST: Adds a new password object to the stored password array.
    addPasswordGroup(newPasswordGroup){
        this.passwordGroupsCreated.push(newPasswordGroup);
    }

    //PRE: Requires an array of passwordGroups created.
    //POST: Removes the input's passwordGroup from the stored passwordGroups array .
    removePasswordGroup(passwordGroup){

        let index = this.passwordGroupsCreated.indexOf(passwordGroup);

        if(index != -1){
            this.passwordGroupsCreated.splice(index, 1);
            return 0;
        }

        return index;
    }

    //PRE: Nothing.
    //POST: Returns a string containing the object information.
    toString() {

        let message = [];

        this.passwordGroupsCreated.forEach( (elem) => (message.push(elem.toString() + "\n")));

        return message.join("");
    }

    //PRE: Requires an array of passwordGroups created.
    //POST: Returns a passwordGroups object given the input.
    getGroupByName(groupName){

        let group = this.passwordGroupsCreated.find( (elem) => (elem.groupName == groupName));

        return group;
    }

    //PRE: Requires an array of passwordGroups created.
    //POST: Returns a string containing the names of the passwordGroups stored.
    getGroupsNames(){

        let auxNames = [];

        this.passwordGroupsCreated.forEach( (elem) => ( auxNames.push("Group name: " + elem.groupName)));

        return auxNames.join("\n");
    }   

    //PRE: Requires an array of passwordGroups created.
    //POST: Returns the maximum id from the passwordGroups array.
    getMaxIdGroup(){
        if(this.passwordGroupsCreated.length > 0){
            let groupsIds = [];
            
            this.passwordGroupsCreated.forEach((elem) => groupsIds.push(parseInt(elem.groupId)));
            
            groupsIds.sort( (a, b) => (a - b));

            return groupsIds[groupsIds.length - 1];
        
        }else 
            return 0;

    }
}

class AccountManager{

    constructor(){

        this.storedAccounts = [];

    }

    //PRE: Requires an array of storedAccounts created.
    //POST: Adds a new Account object to the accounts array.
    addAccount(newAccount){
        this.storedAccounts.push(newAccount);
    }

    //PRE: Requires an array of storedAccounts created.
    //POST: Removes the input's account from the storedAccount array.
    removeAccount(account){

        let index = this.storedAccounts.indexOf(account);

        if(index != -1){
            this.storedAccounts.splice(index, 1);
            return 0;
        }

        return index;
    }

    //PRE: Requires an array of storedAccounts created.
    //POST: Returns an Account object given the input.
    getAccount(username){

        let account = this.storedAccounts.find( (elem) => (elem.username == username));

        return account;
    }

    //PRE: Requires an array of storedAccounts created.
    //POST: Returns a list with the usernames of the accounts stored.
    getUsernameList(){

        let list = [];

        this.storedAccounts.forEach( (elem) => (list.push(elem.username)));

        return list;
    }

    //PRE: Requires an array of storedAccounts created.
    //POST: Returns a list with the emails of the accounts stored..
    getEmailList(){

        let list = [];

        this.storedAccounts.forEach( (elem) => (list.push(elem.email)));

        return list;

    }

    ///PRE: Requires an array of passwordGroups created.
    //POST: Returns the maximum id from the storedAccounts array.
    getMaxIdAccount(){
        if(this.storedAccounts.length > 0){
            let accountIds = [];
            
            this.storedAccounts.forEach((elem) => accountIds.push(parseInt(elem.accountId)));
            
            accountIds.sort( (a, b) => (a - b));

            return accountIds[accountIds.length - 1];
        } else 
            return 0;
    }

    //PRE: Requires an array of storedAccounts created.
    //POST: Returns true if the username is registered. Returns false if not registered
    checkIfUsernameIsAlreadyInUse(username){

        let check = this.storedAccounts.some( (elem) => (elem.username == username));

        return check;
    }

    //PRE: Requires an array of storedAccounts created.
    //POST: Returns true if the username and password are correct. Returns false if not.
    checkValidUsernameAndPassword(username, password){

        let check = this.storedAccounts.some( (elem) => (elem.username == username && elem.password == password));

        return check;
    }
}

function auxDataBase(){

    const passOne = new Password(1, "myEmail");
    passOne.setPassword(passOne.generateNewRandomPassword(true, true, false, false, 4));

    const passTwo = new Password(2, "mySecondEmail");
    passTwo.setPassword(passTwo.generateNewRandomPassword(true, true, true, true, 10));

    const passThree = new Password(3, "mySteamAccount");
    passThree.setPassword(passThree.generateNewRandomPassword(false, true, true, false, 20));

    const passFour = new Password(4, "myGitHubAccount");
    passFour.setPassword(passFour.generateNewRandomPassword(false, true, false, true, 13));

    const passGroupEmail = new PasswordGroup(1, "Email");
    passGroupEmail.addPassword(passOne);
    passGroupEmail.addPassword(passTwo);

    const passGroupSteam = new PasswordGroup(2, "Steam");
    passGroupSteam.addPassword(passThree);

    const passGroupGitHub = new PasswordGroup(3, "Git-Hub");
    passGroupGitHub.addPassword(passFour);

    const account = new Account(1, "admin", "myEmail@email.com", "admin");

    account.addPasswordGroup(passGroupEmail);
    account.addPasswordGroup(passGroupSteam);
    account.addPasswordGroup(passGroupGitHub);

    const manager = new AccountManager();
    manager.addAccount(account);

    return manager;

}

//This section is in Spanish because it will be removed when the events are added.

const MENUPRINCIPAL = "--- Bienvenido al administrador de contraseñas ---\n\n" +
                         "1 - Ingresar.\n" + 
                         "2 - Registrarse.\n\n" + 
                         "0 - Salir del programa.\n";

const PANELDECONTROL = "--- Panel de control ---\n\n" +
                       "1 - Ver grupos de contraseñas almacenados.\n" +
                       "2 - Crear nuevo grupo de contraseñas.\n" +
                       "3 - Eliminar grupo de contraseñas.\n" +
                       "4 - Agregar nueva contraseña.\n" +
                       "5 - Ver contraseñas almacenadas.\n\n" +
                       "0 - Cerrar Sesion.";


//Funcion para ingreso usuario
const ingresoUsuario = (mensaje) =>{

    let ingresoUsuario = prompt(mensaje);

    return ingresoUsuario;
}

//Funcion para ingreso email
const ingresoEmail = (mensaje) =>{

    let email = prompt(mensaje);

    return email;
}

//Funcion para ingreso contraseña
const ingresoPassword = (mensaje) =>{
    let password = prompt(mensaje);

    return password;
}

//Funcion para generar nuevas cuentas de usuario.
const seccionRegistro = (listaUsuarios, listaEmail, ultimoId) =>{

    let usuario, email;
    let verificado;
    
    do{

        verificado = false;

        usuario = ingresoUsuario("Ingresa un nombre de usuario: ");
        
        if(listaUsuarios.some((elem) => elem == usuario)){
            alert("Error! El usuario ya se encuentra registrado.");
        } else if(usuario.length < 5){
            alert("Error! El usuario tiene que tener por lo menos 5 caracteres.");
        }else {
            verificado = true
        }

    }while(!verificado);

    do{

        verificado = false;

        email = ingresoEmail("Ingresa un email: ");
        
        if(listaEmail.some((elem) => elem == email)){
            alert("Error! El email ya se encuentra registrado.");
        }else if(!email.includes("@")){
            alert("Error! Ingresa un email valido.");
        } else {
            verificado = true
        }

    }while(!verificado);

    do{

        verificado = false;

        password = ingresoPassword("Ingresa una contraseña: ");
        
        if(password.length < 4){
            alert("Error! La contraseña requiere de un minimo de 4 caracteres.");
        } else {
            verificado = true
        }

    }while(!verificado);

    ultimoId++;

    return new Account(ultimoId, usuario, email, password);
}

//Funcion para loguear
const seccionIngresar = (accountManager) =>{

    let usuario, password;
    let verificacion;

    do{
        verificacion = false;

        usuario = prompt("Ingrese su usuario: ");
        password = prompt("Ingrese su contraseña: ");

        verificacion = accountManager.checkValidUsernameAndPassword(usuario, password);
        
        if(!verificacion)
            alert("El usuario o la contraseña no son válidos.");

    }while(!verificacion);

    return accountManager.getAccount(usuario);
}

//Valida si la opcion ingresada se encuentra entre el minimo y maximo especificado.
const ingresarOpcionEnRango = (minimo, maximo, mensaje, mensajeError) =>{

    let opcionIngresada;

    do{

        opcionIngresada = parseInt(prompt(mensaje));

        if(!(minimo <= opcionIngresada && maximo >= opcionIngresada))
            alert(mensajeError);

    }while(!(minimo <= opcionIngresada && maximo >= opcionIngresada));

    return opcionIngresada;
}


//Funcion para gestion de la cuenta.
const panelControl = (account) => {

    let terminar = false;

    while(!terminar){
    
        let opcionIngresada = ingresarOpcionEnRango(0, 5, PANELDECONTROL, "Error! El valor se encuentra fuera de rango.");       
    
        if(opcionIngresada == 0){
            terminar = true;
        }else if(opcionIngresada == 1){
            let aux = account.getGroupsNames();

            if(aux != ""){
                alert(account.getGroupsNames());
                console.log(account);
            } else {
                alert("Aún no se registro ningún grupo.");
            }
        
        }else if(opcionIngresada == 2){

            let nuevoGrupo = prompt("Ingrese el alias del grupo de contraseñas: ");
            let maxId = account.getMaxIdGroup();
            maxId++;
            console.log(maxId);
            let aux = new PasswordGroup(maxId, nuevoGrupo);
            account.addPasswordGroup(aux);

            alert("Grupo creado con éxito.");

        }else if(opcionIngresada == 3){

            let mensaje = "Ingresa el nombre del grupo que deseas eliminar: \nSi no quieres eliminar ninguno ingresa 0.\n\n";
            mensaje += account.getGroupsNames();

            let grupoAEliminar = prompt(mensaje);

            if(Number.isNaN(parseInt(grupoAEliminar))){
                let grupo = account.getGroupByName(grupoAEliminar);
                account.removePasswordGroup(grupo);
                alert("Grupo eliminado con éxito");
                console.log(account);
            }

        }else if(opcionIngresada == 4){

            let mensaje = "Ingresa el nombre del grupo al que deseas agregarle una contraseña: \nSi no quieres agregar ninguna contraseña ingresa 0.\n\n";
            let aux = account.getGroupsNames();

            if (aux != ""){
                
                mensaje += aux;
                let grupoSeleccionado = prompt(mensaje);

                if(Number.isNaN(parseInt(grupoSeleccionado))){
                    let alias = prompt("Ingrese el alias para la contraseña: ");
                    let grupo = account.getGroupByName(grupoSeleccionado);
                    let maxId = grupo.getMaxIdPassword();
                    maxId++;

                    let nuevaContrasena = new Password(maxId, alias);
                    nuevaContrasena.setPassword(nuevaContrasena.generateNewRandomPassword(true, true, true, true, 20));

                    grupo.addPassword(nuevaContrasena);
                    console.log(account);
                }
            } else {

                alert("Primero se debe crear un grupo.");

            }
        }else if(opcionIngresada == 5){
            let aux = account.toString();

            if(aux != ""){
                alert(account.toString());
            } else {
                alert("No hay contraseñas almacenadas.");
            }
        }       
    }
}

//Bucle principal del programa

//ACLARACIÓN: Las contraseñas se generarán con todos los caracteres disponibles y con una longitud de 20.

const accountManager = auxDataBase();

let terminarPrograma = false;

alert("Mirá la consola para poder loguear con una cuenta precargada.");
console.log(accountManager.getAccount("admin"));    

while(!terminarPrograma){

    let opcionIngresada = ingresarOpcionEnRango(0, 3, MENUPRINCIPAL, "Error! El valor se encuentra fuera de rango.");

    if(opcionIngresada == 0){

        terminarPrograma = true;

    }else if(opcionIngresada == 1){

        let account = seccionIngresar(accountManager);

        panelControl(account);

        console.log(account);

    }else if (opcionIngresada == 2){

        let account = seccionRegistro(accountManager.getUsernameList(), accountManager.getEmailList(), accountManager.getMaxIdAccount());
        accountManager.addAccount(account);

        console.log((account));
    }

}

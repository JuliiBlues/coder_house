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

    getPassword(){
        return this.password.join("");
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



const MSJ_MINUS = "Ingrese si quiere que la contraseña contenga minúsculas.\n\n1 - Si.\n0 - No ";
const MSJ_MAYUS = "Ingrese si quiere que la contraseña contenga mayúsculas.\n\n1 - Si.\n0 - No ";
const MSJ_NUMS = "Ingrese si quiere que la contraseña contenga números.\n\n1 - Si.\n0 - No ";
const MSJ_SIMBOLOS = "Ingrese si quiere que la contraseña contenga simbolos.\n\n1 - Si.\n0 - No ";
const MSJ_LONGITUD = "Ingrese el número de caracteres que quiere.\n\n4 caracteres mínimos.\n30 caracteres máximos.";
const MSJ_ERROR_RANGO = "Error! Valor fuera de rango";

const ingresoOpcionEnRango = (minimo, maximo, mensaje, mensajeError) =>{

    let opcion;

    do{

        opcion = parseInt(prompt(mensaje));

        if(!(minimo <= opcion && maximo >= opcion))
            alert(mensajeError);

    }while(!(minimo <= opcion && maximo >= opcion));

    return opcion;
}

const setCaracterSeleccionado = (id, estado) =>{

    const componente = document.getElementById(id);

    if(estado)
        componente.className += " character-seleccionado";
    else 
        componente.className += " character-no-seleccionado";
}

const setLongitud = (longitud) =>{
    let texto = document.getElementById("longitud-numeros");
    texto.textContent = longitud;
}

const setPasswordEnPantalla = (password) =>{

    let control = document.getElementById("campo-contrasena");
    control.textContent = password;

}

let minusculas = ingresoOpcionEnRango(0, 1, MSJ_MINUS, MSJ_ERROR_RANGO);
let mayusculas = ingresoOpcionEnRango(0, 1, MSJ_MAYUS, MSJ_ERROR_RANGO);
let numeros = ingresoOpcionEnRango(0, 1, MSJ_NUMS, MSJ_ERROR_RANGO);
let simbolos = ingresoOpcionEnRango(0, 1, MSJ_SIMBOLOS, MSJ_ERROR_RANGO);
let longitud;

if ((minusculas || mayusculas ||numeros || simbolos)){

    longitud = ingresoOpcionEnRango(4, 30, MSJ_LONGITUD, MSJ_ERROR_RANGO);


    const password = new Password(1, "custom");
    password.setPassword(password.generateNewRandomPassword(minusculas, mayusculas, numeros, simbolos, longitud));
    
    setCaracterSeleccionado("minusculas", minusculas);
    setCaracterSeleccionado("mayusculas", mayusculas);
    setCaracterSeleccionado("numeros", numeros);
    setCaracterSeleccionado("simbolos", simbolos);

    setLongitud(longitud);

    setPasswordEnPantalla(password.getPassword());
} else {

    alert("Error! La contraseña debe contener al menos 1 tipo de caracter.");

}

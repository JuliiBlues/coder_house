class Password{

    constructor(groupId, alias){
        
        this.passwordId;
        this.groupId = groupId;
        this.alias = alias;
        this.password;
    }

    setId(id) {this.passwordId = id;}

    //PRE: Nothing.
    //POST: Sets the "password" property to the new array entered.
    setPassword(newPassword) { 
        this.password = newPassword;
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


        return (list != undefined)? list.characters : undefined;
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


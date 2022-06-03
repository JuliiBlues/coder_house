const ERROR_MSSG = {
    userNull: 'A user must be entered.',
    userRegistered: 'Username already registered.',
    emailRegistered: 'Email already registered.',
    invalidPassword: 'The password must have a minimum of 8 characters.',
    invalidEmail: 'Invalid email address.'
}

const checkCorrectFormatEmail = (email) => {
    let mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Regex to validate a mail.
    return mail_format.test(email);
}

const checkCorrectFormatPassword = (password) =>{
    let check = false;

    if(password != null && password != undefined && password != '')
        if(password.length >= 8)
            check = true;

    return check;
}

const correctUsername = (username) => {
    username = username.trim();
    let regex = new RegExp('  ', 'g'); //Checks double white space. '  '

    while(username.match(regex) != null){
        username = username.split("  ").join(" ");
    }

    return username;
}

const checkInputData = (username, password, email = "login") => {
    const storageManager = new StorageManager();

    if(username == null || username == undefined || username ==  '')
        return ERROR_MSSG.userNull;

    username = correctUsername(username);
    
    if(!checkCorrectFormatEmail(email) && email != "login")
        return ERROR_MSSG.invalidEmail;
    
    if(!checkCorrectFormatPassword(password))
        return ERROR_MSSG.invalidPassword;

    if(storageManager.checkIfUsernameExists(username))
        return ERROR_MSSG.userRegistered;

    if(storageManager.checkIfEmailExists(email))
        return ERROR_MSSG.emailRegistered;

    return 'Correct';
}

const MESSAGGE = {
    wrongCredentials: `Wrong credentials`,
    logging: `Logging in`,
    registered: `Account registered successfully`
}

//PRE: Nothing.
//POST: Returns an object with the input values. username, email, and password.
const takeInputData = () => {
    let txtUsername = document.getElementById("txt-username").value;
    let txtEmail = document.getElementById("txt-email").value;
    let txtPassword = document.getElementById("txt-password").value;

    return {username: txtUsername, email: txtEmail, password: txtPassword} ;
}

/*PRE: Requires the following functions created:
    - takeInputData().
    - checkInputData(). From "AccValidation" file.
    - storeNewAccount(). From "DAL" file.
*/
//POST: Returns a message if the user was correct or not registered.
const signup = () => {
    const {username, email, password} = takeInputData();
    const verified = checkInputData(username, password, email); //From AccValidation file.
    const storageManager = new StorageManager();

    if(verified == "Correct") {
        storageManager.storeNewAccount(new Account(username, email, password));   
        return MESSAGGE.registered;
    } else {
        return verified;
    }
}

/*PRE: Requires the following functions created:
    - takeInputData().
    - checkCredentials(). From "DAL" file.
*/
//POST: Returns a message if the user was correct or not logged.
const login = () => {
    const {username, password} = takeInputData();
    const storageManager = new StorageManager();
    let check = storageManager.checkCredentials(username, password);
    
    if(check){
        storageManager.setAccountLoggedIn(username, password);
        return MESSAGGE.logging;
    }

    return MESSAGGE.wrongCredentials;
}

//PRE: Requires the library "Toastify" linked.
//POST: Show a notification with a message.
const showMessage = (message, duration, className) =>{
    let maxY = window.innerHeight - (window.innerHeight / 4.5);
    Toastify({
        text: `${message}`,
        duration: duration,
        className: className,
        offset: {
            x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: maxY // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
    }).showToast();
}

const clearFields = () =>{
    document.getElementById("txt-username").value = "";
    document.getElementById("txt-email").value = "";
    document.getElementById("txt-password").value = "";
}

const btnLogin = document.getElementById("btn-login");
const btnSignup = document.getElementById("btn-signup");
const btnConfirm = document.getElementById("btn-confirm");
const fieldContainer = document.getElementById("field-container");
const iconEmail = document.querySelectorAll(".field-email")[0];
const inputEmail = document.querySelectorAll(".field-email")[1];
let isLoginSelected = false;

fieldContainer.id = "";

window.onload = () => {
    clearFields();
}

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("header__subhead") && 
    document.getElementById("header__subhead").remove(); //Removes the subhead.
    btnLogin.classList.replace("btn-deselected--login", "btn-selected--login"); //Set the correct animation to each button.
    btnSignup.classList.replace("btn-selected--signup", "btn-deselected--signup");
    btnConfirm.children[0].textContent = "Log In"; //Changes the text of the button confirm.
    fieldContainer.id = "field-container"; //Shows the form "field-container"
    fieldContainer.hidden = false;
    iconEmail.classList.replace("fade-in", "fade-out"); 
    inputEmail.classList.replace("fade-in", "fade-out");
    clearFields();
    isLoginSelected = true;
    setTimeout(()=>{
        iconEmail.hidden = true;
        inputEmail.hidden = true;
    }, 300);
});

btnSignup.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("header__subhead") && 
    document.getElementById("header__subhead").remove();
    btnSignup.classList.replace("btn-deselected--signup", "btn-selected--signup");
    btnLogin.classList.replace("btn-selected--login", "btn-deselected--login");
    btnConfirm.children[0].textContent = "Sign Up";
    fieldContainer.id = "field-container";
    fieldContainer.hidden = false;
    iconEmail.hidden = false;
    inputEmail.hidden = false;
    clearFields();
    isLoginSelected = false;
    setTimeout(()=>{
        iconEmail.classList.replace("fade-out", "fade-in");
        inputEmail.classList.replace("fade-out", "fade-in");
    }, 300);
});

btnConfirm.addEventListener("click", (e)=> {
    e.preventDefault();
    let message;

    if(isLoginSelected){
        message = login();
        if (message == MESSAGGE.logging) {
            showMessage(MESSAGGE.logging, 1500, `mssg-verified`);
            setTimeout(() => { location.href = `./pages/app.html`; }, 1500);
            btnConfirm.classList.add("animation-btn-confirm");
        }else
            showMessage(MESSAGGE.wrongCredentials, 1500, "mssg-error");
    
    } else {
        message = signup();
        if(message != MESSAGGE.registered)
            showMessage(message, 2500, "mssg-error")
        else {
            showMessage(MESSAGGE.registered, 1500, "mssg-verified");
            btnLogin.click();
        }
    }
});


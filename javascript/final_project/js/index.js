const btnGetStarted = document.getElementById("main__section__button");
const btnConfirm = document.getElementById("btn-confirm");

const btnLogin = document.getElementById("btn-login");
const btnSignup = document.getElementById("btn-signup");

let flagBtnSelected = "login";

btnGetStarted.addEventListener("click", (e) => {
    e.preventDefault();
    btnGetStarted.classList.add("animation-click");
    btnGetStarted.children[0].classList.add("animation-text");
    setTimeout(() =>{
        document.getElementById("main__section--info").remove();
        document.getElementById("section-user-fields").hidden = false;
        document.getElementById("section-user-fields").className = "";
    }, 700);
});

btnConfirm.addEventListener("click", (e) => {
    e.preventDefault();
    btnConfirm.classList.toggle("animation-click");
    btnConfirm.children[0].classList.toggle("animation-text");

    if(flagBtnSelected == "login"){
        let user = document.getElementById("txt-username").value;
        let password = document.getElementById("txt-password").value;
        if(storageManager.checkCredentials(user, password)){
            storageManager.setAccountLoggedIn(user);
            location.href = "./pages/app.html"
        }
    } else {
        let user = document.getElementById("txt-username").value;
        let email = document.getElementById("txt-email").value;
        let password = document.getElementById("txt-password").value;
        let registeredSuccessfully = newUserRegistration(user, email, password);
        console.log(registeredSuccessfully);
    }
    
    setTimeout(()=>{
        btnConfirm.classList.toggle("animation-click");
        btnConfirm.children[0].classList.toggle("animation-text");
        btnLogin.click();
    }, 700);
});

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("icon-email").hidden = true;
    document.getElementById("txt-email").hidden = true;
    btnLogin.className = "main__section__form__button btn-form-selected";
    btnSignup.className = "main__section__form__button btn-form-deselected";
    btnConfirm.children[0].textContent = "Login";
    flagBtnSelected = "login";
});

btnSignup.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("icon-email").hidden = false;
    document.getElementById("txt-email").hidden = false;
    btnSignup.className = "main__section__form__button btn-form-selected";
    btnLogin.className = "main__section__form__button btn-form-deselected";
    btnConfirm.children[0].textContent = "Signup";
    flagBtnSelected = "register";
});

const storageManager = new Dal();

const newUserRegistration = (username, email, password) => {

    let isUsernameAlreadyTaken = storageManager.usernameExist(username);
    let isEmailAlreadyTaken = storageManager.emailExist(email);

    if(!isUsernameAlreadyTaken && !isEmailAlreadyTaken && password != ""){
        storageManager.storeNewAccount(new Account(username, email, password));
        return 0;
    }

    if(isUsernameAlreadyTaken)
        return 1;
    
    if(isEmailAlreadyTaken)
        return 2;

    if(password == "" || password == null)
        return 3;
}


window.onload = function(){
    document.getElementById("txt-username").value = "";
    document.getElementById("txt-email").value = "";
    document.getElementById("txt-password").value = "";
}

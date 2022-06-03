const takeParameters = () =>{
    let upper = document.getElementById("chkBox-upper-case").checked? 1 : 0;
    let lower = document.getElementById("chkBox-lower-case").checked? 2 : 0;
    let numbers = document.getElementById("chkBox-number").checked? 4 : 0;
    let symbols = document.getElementById("chkBox-symbol").checked? 8 : 0;

    return lower + upper + numbers + symbols;
}

const generateRandomPassword = async (display, length, characters) => {
    let query = "https://random.justyy.workers.dev/api/random/?cached&n=" + length + "&x=" + characters;
    let response = await fetch(query);
    let data = await response.json();
    
    display.value = characters != 0? data : "";
}

const sliderLengthPassword = document.getElementById("length-password"),
      valueLengthPassword = document.getElementById("value-input-range"),
      display = document.getElementById("display-password"),
      generatePassword = document.getElementById("button-generate"),
      chkBoxLower = document.getElementById("chkBox-lower-case"),
      chkBoxUpper = document.getElementById("chkBox-upper-case"),
      chkBoxNumber = document.getElementById("chkBox-number"),
      chkBoxSymbol = document.getElementById("chkBox-symbol");


chkBoxLower.checked = true;
chkBoxUpper.checked = true;
chkBoxNumber.checked = true;
chkBoxSymbol.checked = true;

sliderLengthPassword.value = 20;
valueLengthPassword.innerHTML = `length: ${sliderLengthPassword.value}`;

generateRandomPassword(display, sliderLengthPassword.value, takeParameters());

sliderLengthPassword.addEventListener("input", () => {
    valueLengthPassword.innerHTML = `length: ${sliderLengthPassword.value}`;
    generateRandomPassword(display, sliderLengthPassword.value, takeParameters());
});

generatePassword.addEventListener("click", () => {
    generateRandomPassword(display, sliderLengthPassword.value, takeParameters());
});

chkBoxLower.addEventListener("change", () =>{
    generateRandomPassword(display, sliderLengthPassword.value, takeParameters());
});

chkBoxUpper.addEventListener("change", () =>{
    generateRandomPassword(display, sliderLengthPassword.value, takeParameters());
});

chkBoxNumber.addEventListener("change", () =>{
    generateRandomPassword(display, sliderLengthPassword.value, takeParameters());
});

chkBoxSymbol.addEventListener("change", () =>{
    generateRandomPassword(display, sliderLengthPassword.value, takeParameters());
});

document.getElementById("button-random-password-copy").addEventListener("click", () => {
    display.value == ""? "" : navigator.clipboard.writeText(display.value);
});


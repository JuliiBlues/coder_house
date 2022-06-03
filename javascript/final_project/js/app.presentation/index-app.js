window.onload = () => {
    const storageManager = new StorageManager();
    storageManager.getAccountLoggedIn() == null && (location.href = `../index.html`);
};

const setTitleMessage = (account) => {
    document.getElementById("mssg-welcome").innerText = `Welcome ${account.username}`;
}

const switchMenu = () => {
    document.getElementById("section-menu").classList.toggle("menu-disabled");
    document.getElementById("section-menu").classList.toggle("hide");
}

const storageManager = new StorageManager();
const buttonOpenMenu = document.getElementById("button-open-menu");
const buttonCloseMenu = document.getElementById("button-close-menu");
const buttonNewGroup = document.getElementById("button-new-group");
const buttonLogOut = document.getElementById("button-log-out");

setTitleMessage(storageManager.getAccountLoggedIn());

buttonOpenMenu.addEventListener("click", () =>{
    switchMenu();
});

buttonCloseMenu.addEventListener("click", () => {
    switchMenu();
});
let i = 1;
buttonNewGroup.addEventListener("click", () => {
    const aux = new HTMLConstructor();
    let art = aux.createNewGroup(i++, "A", []);
    switchMenu();
    console.log(art);    
    document.getElementById("groups-created").appendChild(art);
});


buttonLogOut.addEventListener("click", () =>{
    storageManager.accountLogOut();
    location.reload();
});
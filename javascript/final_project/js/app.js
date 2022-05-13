const showPasswordGroups = (passwordGroups) => {
    const events = new GroupEvents();
    const constructor = new Group();
    
    for(const group of passwordGroups){
        const newGroup = constructor.createNewGroup(group.groupId);
        events.addEventsGroup(newGroup);
        document.getElementById("group-container").appendChild(newGroup);
        loadPasswors(group.groupId);
    }

}

const loadPasswordGroups = (accountId) =>{
    let check = storageManager.hasGroupsCreated(accountId);

    if(check){
        let passwordGroups = storageManager.getPasswordsGroupByAccountId(accountId);
        showPasswordGroups(passwordGroups);
    }
}

const loadPasswors = (groupId) =>{
    const group = `group-${groupId}`;
    let check = storageManager.hasPasswordsCreatedByGroup(groupId);
    const getter = new Group();
    
    if(check){
        let storedPasswords = storageManager.getPasswordsByGroupId(groupId);
        let appendGroup = document.getElementById(group);
        let passContainer = getter.getPasswordContainer(appendGroup);
        console.log(passContainer);
        const ev = new GroupEvents();
        for(const passwords of storedPasswords){
            const alias = getter.createPasswordAlias(passwords.passwordId);
            const password = getter.createPasswordLi(passwords.passwordId);
            passContainer.appendChild(alias);
            ev.addEventsPasswords(appendGroup, passwords.passwordId);
            passContainer.appendChild(password);
            ev.addEventsPasswords(appendGroup, passwords.passwordId);
        }
    }
}

const storageManager = new Dal();
let isAccountLoggedIn = storageManager.getAccountIdLoggedIn();

if(isAccountLoggedIn == -1)
    location.href = "../index.html";

loadPasswordGroups(isAccountLoggedIn);

const btnAddGroup = document.getElementById("btn-add-group");
const groupConstructor = new Group();
const events = new GroupEvents();

btnAddGroup.addEventListener("click", () =>{
    let idGroup = storageManager.getIdentity("groupIdentity");
    console.log(idGroup);
    const newGroup  = groupConstructor.createNewGroup(idGroup);
    const group = new PasswordGroup(isAccountLoggedIn, "New Group");
    events.addEventsGroup(newGroup);
    document.getElementById("group-container").appendChild(newGroup);
    storageManager.storeNewGroup(group);
});
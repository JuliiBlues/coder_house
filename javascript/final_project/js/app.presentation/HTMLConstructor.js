class Group{

    constructor(){}

    getGroupId(group){
        let id = group.id.substring(6,7);
        return parseInt(id);
    }

    getInputAliasMenu(group){
        return group.children[0].children[0];
    }

    getBtnPlus(group){
        return group.children[0].children[1].children[0];
    }

    getBtnEditMenu(group){
        return group.children[0].children[1].children[1]
    }

    getBtnDeleteMenu(group){
        return group.children[0].children[1].children[2];
    }

    getBtnOpen(group){
        return group.children[0].children[1].children[3];
    }

    getGroupMenu(group){
        return group.children[0];
    }

    getPasswordContainer(group){
        return group.children[1].children[0];
    }

    getBtnEditPassword(group){
        let container = this.getPasswordContainer(group);
        let last = container.children.length - 1;

        return container.children[last].children[1];
    }

    getInputGroupPassword(group){
        let container = this.getPasswordContainer(group);
        let last = container.children.length - 1;

        return container.children[last].children[0];
    }

    getBtnDeletePassword(group){
        let container = this.getPasswordContainer(group);
        let last = container.children.length - 1;

        let btnAux = container.children[last].children[2];

        if(btnAux.children[0].classList.contains("fa-trash"))
            return btnAux;

        return null;  
    }

    getBtnCopyPassword(group){
        let container = this.getPasswordContainer(group);
        let last = container.children.length - 1;

        return container.children[last].children[2];
    }

    getLastPasswordInArray(id){
        id = parseInt(id);
        let passwordheader = document.getElementById(`li-password-header-${id}`);
        let password = document.getElementById(`li-password-${id}`);
        
        if(passwordheader == undefined || password == undefined)
            return null

        let aux = [];
        aux.push(passwordheader);
        aux.push(password);
        return aux;
    }

    createGroupHeader(idGroup){
        const groupId = `group-${idGroup}`;
        const container = document.createElement("div");
        container.classList = "unique-group__group-menu border-top-radius border-bottom-radius";
        container.innerHTML =

        `<input id="txt-alias-${groupId}" class="group-alias" type="text" value="New Group" disabled>
         <div class="icons-container">
            <button id="btn-plus-${groupId}" class="group-menu-btn" type="button"><i class="fa-solid fa-plus group-menu-icons"></i></button> 
            <button id="btn-edit-${groupId}" class="group-menu-btn" type="button"><i class="fa-solid fa-edit group-menu-icons"></i></button>
            <button id="btn-trash-${groupId}" class="group-menu-btn" type="button"><i class="fa-solid fa-trash group-menu-icons"></i></button>
            <button id="btn-open-${groupId}" class="group-menu-btn" type="button"><i class="fa-solid fa-angle-down group-menu-icons"></i></button>
        </div>`;

        return container;
    }

    createGroupPasswords(idGroup){
        const groupId = `group-${idGroup}`;
        const container = document.createElement("div");
        container.classList = "unique-group__group-passwords hide";
        container.innerHTML =  
        `<ul id="password-list-${groupId}" class="password-list border-bottom-radius">
        
        </ul>`;

        return container;
    }

    createPasswordAlias(id){
        const aliasLi = document.createElement("li");

        aliasLi.id = `li-password-header-${id}`;
        aliasLi.className = `li-header`;
        aliasLi.innerHTML = 
        `<input id="txt-alias-password-${id}" type="text" value="Alias Password" disabled>
         <button id="btn-edit-alias-password-${id}" type="button"><i class="fa-solid fa-edit btn-li"></i></button>
         <button id="btn-delete-password-${id}" type="button"><i class="fa-solid fa-trash btn-li"></i></button>`;

        return aliasLi;
    }

    createPasswordLi(id){
        const passwordLi = document.createElement("li");

        passwordLi.id = `li-password-${id}`;
        passwordLi.className = `li-pass`;
        passwordLi.innerHTML =
        `<input id="txt-password-${id}" type="text" value="Empty Password" disabled>
         <button id="btn-edit-password-${id}" type="button"><i class="fa-solid fa-edit btn-li"></i></button>
         <button id="btn-copy-password-${id}" type="button"><i class="fa-solid fa-copy btn-li"></i></button>
         `;

        return passwordLi;
    }

    createNewGroup(idGroup){
        const groupId = `group-${idGroup}`;
        const newGroup = document.createElement("article");
        const header = this.createGroupHeader(idGroup);
        const passwords = this.createGroupPasswords(idGroup);

        newGroup.id = groupId;
        newGroup.className = "unique-group";

        newGroup.appendChild(header);
        newGroup.appendChild(passwords);

        return newGroup;
    }
}


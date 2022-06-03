class HTMLPasswordGroup{
    constructor(){}

    createPasswordHeader(id, alias = ""){
        const container = document.createElement("div");
        const groupId = `password-group-header-${id}`;
        
        container.id = groupId;
        container.className = `unique-group--header`;
        container.innerHTML = `<input class="group-header-input" type="text" placeholder="Enter an alias" disabled>
                               <i class="fa-solid fa-plus group-header-icon"></i>
                               <i class="fa-solid fa-edit group-header-icon"></i>
                               <i class="fa-solid fa-trash group-header-icon"></i>
                               <i class="fa-solid fa-angle-down group-header-icon"></i>`
        
        container.children[0].textContent = alias;
        return container;
    }

    createPasswordList(id){
        const container = document.createElement("div");
        const groupId = `password-group-list-${id}`;
        
        container.id = groupId;
        container.className = `unique-group--passwords`;
        container.innerHTML = `<ul class="unique-password">
                               <li class="li-alias-password"><input class="alias-password" type="text" placeholder="Enter a password alias" disabled></li>
                               <li class="li-password"><input type="text" placeholder="Enter a password" disabled></li>
                               <li><button class="button-delete-password" type="button">Delete</button></li>
                               <li  class="li-edit-alias-password"><button><i class="fa-solid fa-pencil"></i></button></li>
                               <li  class="li-edit-password"><button><i class="fa-solid fa-pencil"></i></button></li>
                               <li  class="li-copy-password"><button><i class="fa-solid fa-copy"></i></button></li>
                               </ul>`;

        return container;
    }
}

class HTMLConstructor{
    constructor(){}

    createNewGroup(id, alias, list){
        const groupId = `group-${id}`;
        const container = document.createElement("article");
        const HTMLPassword = new HTMLPasswordGroup();

        container.id = groupId;
        container.className = `unique-group`;
        container.appendChild(HTMLPassword.createPasswordHeader(id, alias));
        container.appendChild(HTMLPassword.createPasswordList(id, list));

        return container;
    }
}

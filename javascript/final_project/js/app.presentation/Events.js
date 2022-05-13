class GroupEvents{

    constructor(){this.id = 1; this.last}
    
    addEventListenerEdit(button, input, defMessage){
        button.addEventListener("click", () =>{
            input.disabled = false;
            input.focus();
        });

        input.addEventListener("focus", () =>{
            if(input.value == defMessage)
                input.value = "";
        })

        input.addEventListener("blur", () =>{
            if(input.value == "")
                input.value = defMessage;

            input.disabled = true;
        });
    }

    addEventListenerCopyToClipboard(button, input){
        button.addEventListener("click", () =>{
            navigator.clipboard.writeText(input.value);
        });
    }

    addEventsPasswords(groupContainer, idGroupPassword){
        const getter = new Group();
        
        const btn = getter.getBtnEditPassword(groupContainer); 
        const input = getter.getInputGroupPassword(groupContainer);
        const btnDelete = getter.getBtnDeletePassword(groupContainer);
        const lastGroupPassword = getter.getLastPasswordInArray(idGroupPassword);
        const btnCopy = getter.getBtnCopyPassword(groupContainer);

        if(!input.id.includes("alias"))
            this.addEventListenerCopyToClipboard(btnCopy, input);

        if(btnDelete != null)
            this.last = btnDelete;

        if(lastGroupPassword != null){
            this.addEventListenerDelete(this.last, lastGroupPassword[0]);
            this.addEventListenerDelete(this.last, lastGroupPassword[1]);
        }

        this.addEventListenerEdit(btn, input, input.value);
        
    }

    addEventListenerPlusPassword(button, groupContainer){
        const getter = new Group();
        const storageManager = new Dal();
        let passwordContainer = getter.getPasswordContainer(groupContainer);
        
        button.addEventListener("click", () => {
            let id = new Dal().getIdentity("passwordIdentity");
            
            const alias = getter.createPasswordAlias(id);
            const password = getter.createPasswordLi(id);
            passwordContainer.appendChild(alias);
            this.addEventsPasswords(groupContainer, id);
            passwordContainer.appendChild(password);
            this.addEventsPasswords(groupContainer, id);
            let auxPass = new Password(getter.getGroupId(groupContainer), "Alias Password");
            auxPass.setPassword("Empty Password");
            storageManager.storeNewPassword(auxPass);
        });
    }

    addEventListenerDelete(button, container){
        button.addEventListener("click", () => {
            container.remove();
        })
    }

    addEventListenerOpenGroup(button, btnContainer, passwordContainer){
        button.addEventListener("click", () => {
            button.children[0].classList.toggle("fa-angle-down");
            button.children[0].classList.toggle("fa-angle-up");
            btnContainer.classList.toggle("border-bottom-radius");
            passwordContainer.parentElement.classList.toggle("hide");
        });
    }

    addEventsGroup(groupContainer){
        const getter = new Group();

        const input = getter.getInputAliasMenu(groupContainer);
        const btnPlus = getter.getBtnPlus(groupContainer);
        const btnEdit = getter.getBtnEditMenu(groupContainer);
        const btnDelete = getter.getBtnDeleteMenu(groupContainer);
        const btnOpen = getter.getBtnOpen(groupContainer);

        const btnContainer = getter.getGroupMenu(groupContainer);

        this.addEventListenerPlusPassword(btnPlus, groupContainer);
        this.addEventListenerEdit(btnEdit, input, "New Group");
        this.addEventListenerDelete(btnDelete, groupContainer);
        this.addEventListenerOpenGroup(btnOpen, btnContainer, getter.getPasswordContainer(groupContainer));
    }

}
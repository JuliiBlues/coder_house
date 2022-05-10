class GeneradorContenedorContrasenias{

    constructor(){}

    crearContenedor(idGrupo){
        const grupo = `grupo-${idGrupo}`;
        const contenedor = document.createElement("div");
        const boton = document.createElement("button");

        boton.id = grupo;
        boton.type = "button";
        boton.className = "boton-nueva-contrasenia";
        boton.innerHTML = "Nueva Contraseña";
        contenedor.id = "contenedor-contrasenias-" + grupo;
        contenedor.className = "contenedor-contrasenias oculto";
        contenedor.appendChild(boton);        
        return contenedor;
    }

}

class GeneradorCabecera{
    constructor(){}

    agregarEventoDesplegar(boton, contenedor, idGrupo){
        boton.addEventListener("click", () =>{
            const grupoContrasenias = document.getElementById(`contenedor-contrasenias-grupo-${idGrupo}`);
            const estaOculto = (grupoContrasenias.classList[1] == "oculto");

            if(estaOculto) {
                grupoContrasenias.classList.remove("oculto");
                contenedor.classList.add("corregir-borde-grupo");
                boton.classList.replace("fa-angle-down", "fa-angle-up");
            }else{
                grupoContrasenias.classList.add("oculto");
                contenedor.classList.remove("corregir-borde-grupo");
                boton.classList.replace("fa-angle-up", "fa-angle-down");
            }
        });
    }

    agregarEventoEliminar(boton, idGrupo){
        boton.addEventListener("click", () => {
            const grupoSeleccionado = document.getElementById(`grupo-${idGrupo}`);
            grupoSeleccionado.remove();
            const contadorGrupos = document.getElementById("cantidad-grupos");
            let cantidad = parseInt(contadorGrupos.innerHTML);
            contadorGrupos.innerHTML = --cantidad;
        });
    }

    agregarEventoEditar(boton, input){

        boton.addEventListener("click", ()=>{
            const estaDesabilidato = input.disabled;

            if(estaDesabilidato){
                boton.classList.replace("fa-pencil", "fa-check");
                input.disabled = false;
                input.focus();
            } else {
                boton.classList.replace("fa-check", "fa-pencil");
                input.disabled = true;
            }
        });

    }

    agregarEventoCampoTexto(input){

        input.addEventListener("focus", () =>{
            const porDefecto = "Asignar alias";

            if(porDefecto){
                input.value = "";
            }
        });

        input.addEventListener("blur", (e)=>{
            if(input.value == ""){
                input.value = "Asignar alias";
            }
        });

    }

    crearNuevaCabecera(idGrupo){
        const grupo = `grupo-${idGrupo}`;
        const contenedor = document.createElement("div");
        const campoTexto = document.createElement("input")
        const iconoEditar = document.createElement("i");
        const iconoEliminar = document.createElement("i");
        const iconoDesplegar = document.createElement("i");

        contenedor.id = "contenedor-" + grupo;
        contenedor.className = "cabecera-grupo";
        campoTexto.id = "alias-grupo-" + grupo;
        campoTexto.className = "alias-grupo";
        campoTexto.disabled = true;
        campoTexto.value = "Asignar alias";
        iconoEditar.id = "icono-editar-" + grupo;
        iconoEditar.className = "icono-cabecera icono-cabecera-editar fa fa-solid fa-pencil";
        iconoEliminar.id = "icono-eliminar-" + grupo;
        iconoEliminar.className = "icono-cabecera icono-cabecera-eliminar fa-solid fa-trash";
        iconoDesplegar.id = "icono-desplegar-" + grupo;
        iconoDesplegar.className = "icono-cabecera icono-cabecera-desplegar fa fa-solid fa-angle-down";

        this.agregarEventoCampoTexto(campoTexto)
        this.agregarEventoEditar(iconoEditar, campoTexto, idGrupo);
        this.agregarEventoEliminar(iconoEliminar, idGrupo);
        this.agregarEventoDesplegar(iconoDesplegar, contenedor, idGrupo);
        

        contenedor.appendChild(campoTexto);
        contenedor.appendChild(iconoEditar);
        contenedor.appendChild(iconoEliminar);
        contenedor.appendChild(iconoDesplegar);

        return contenedor;
    }
}

class GenerarGrupo{
    constructor(){ this.idGrupo = 1; }

    crearNuevoGrupo(){

        const nuevoGrupo = document.createElement("article");
        const cabecera = new GeneradorCabecera().crearNuevaCabecera(this.idGrupo);
        const contenedorContrasenias = new GeneradorContenedorContrasenias().crearContenedor(this.idGrupo);

        nuevoGrupo.id = `grupo-${this.idGrupo}`;
        nuevoGrupo.className = "grupo";
        nuevoGrupo.appendChild(cabecera);
        nuevoGrupo.appendChild(contenedorContrasenias);

        this.idGrupo++;

        return nuevoGrupo;
    }
}

const seccionGrupos = document.getElementById("contenedor-grupos");
const botonAgregarGrupo = document.getElementById("boton-nuevo-grupo");
const nuevoGrupo = new GenerarGrupo();

botonAgregarGrupo.addEventListener("click", () => {
    const contadorGrupos = document.getElementById("cantidad-grupos");
    let cantidad = parseInt(contadorGrupos.innerHTML);
    contadorGrupos.innerHTML = ++cantidad;
    
    seccionGrupos.appendChild(nuevoGrupo.crearNuevoGrupo())
});

class Curso{

    constructor(nombreCurso, profesor, precio){

        this.nombreCurso = nombreCurso;
        this.profesor = profesor;
        this.precio = precio;

    }

    obtenerDatos(){

        return `Curso: ${this.nombreCurso}.\nProfesor: ${this.profesor}.\nPrecio: $${this.precio}.`;

    }

}

class Institucion{

    constructor(){

        this.cursosDisponibles = [];

    }

    agregarCurso(nuevoCurso){

        this.cursosDisponibles.push(nuevoCurso);

    }

    eliminarCurso(cursoAEliminar){

        let index = this.cursosDisponibles.indexOf(cursoAEliminar);

        this.cursosDisponibles.splice(index, 1);
    }

    obtenerCursoSegunIndex(index){
        return this.cursosDisponibles[index];
    }

    obtenerListadoCursos(){

        let auxMensaje = [];

        for(let i = 0; i < this.cursosDisponibles.length; i++){

            auxMensaje.push (`N° de Curso: ${i + 1}.\n` + this.cursosDisponibles[i].obtenerDatos() + "\n");

        }

        return auxMensaje.join("\n");
    }

    obtenerCantidadCursosDisponibles(){
        
        return this.cursosDisponibles.length;

    }
}

const mensajeError = (detalleMensaje = "") => "Error! " + detalleMensaje;

const MSJ_MENU_PRINCIPAL = "--- Bienvenido al panel de administrador de Coder House ---\n\n" +
                           "1 - Ver listado de cursos.\n" +
                           "2 - Agregar nuevo curso.\n" +
                           "3 - Eliminar curso existente.\n\n" +
                           "0 - Salir del programa.";

//Esta función valida que el número ingresado por el usuario se encuentre en el rango especificado (minimo, maximo).
//Una vez ingresado un valor útil se retorna.
const ingresarOpcion = (minimo, maximo, mensajeMenu, mensajeError) =>{

    let opcion;

    do{

        opcion = parseInt(prompt(mensajeMenu));

        if(Number.isNaN(opcion)){ //Se fuerza a que el while se repita.
            opcion = minimo -1;
        }

        if(!(minimo <= opcion && maximo >= opcion) || opcion == undefined)
            alert(mensajeError);        

    }while(!(minimo <= opcion && maximo >= opcion));

    return opcion;
}

//Formato para mostrar el listado de cursos. Retorna string
const mensajeListadoCursos = (listadoCursos) =>{

    let auxMensaje = "--- Cursos disponibles actualmente ---\n\n";

    auxMensaje += listadoCursos;

    return auxMensaje;
}

//Función para que el programa no arranque en 0. Una "base de datos".
const preCargaDatos = () =>{

    const institucion = new Institucion();

    institucion.agregarCurso(new Curso("Desarrollo Web", "Juan Gomez", 30251));
    institucion.agregarCurso(new Curso("JavaScript", "Andrés Trujillo", 70540));
    institucion.agregarCurso(new Curso("React JS", "Roberto Perez", 61321));

    return institucion;
}


const ingresarDatosNuevoCurso = () =>{

    let nombreCurso = prompt("Ingresar nombre del curso: ");
    let profesorACargo = prompt("Ingresar nombre del profesor a cargo: ");
    let precio = ingresarOpcion(0, 99000000, "Ingrese el precio del curso", mensajeError("El valor ingresado se encuentra fuera de rango."));
    
    return new Curso(nombreCurso, profesorACargo, precio);
}


const ejecutarOpcionAgregarNuevoCurso = (institucion) =>{

    let nuevoCurso = ingresarDatosNuevoCurso();

    institucion.agregarCurso(nuevoCurso);

    alert("¡Curso agregado con éxito!");
}

const ingresarCursoAEliminar = (listadoCursos, cantidadCursos) => {
    let auxMensaje = mensajeListadoCursos(listadoCursos);

    auxMensaje += "\nIngrese el número de curso que desea eliminar.\n";
    auxMensaje += "Ingrese el número 0 si desea cancelar.";

    return ingresarOpcion(0, cantidadCursos, auxMensaje, mensajeError("El valor ingresado se encuentra fuera de rango."));
}

const ejecutarOpcionEliminarCurso = (institucion) =>{

    let cursoSeleccionado = ingresarCursoAEliminar(institucion.obtenerListadoCursos(), institucion.obtenerCantidadCursosDisponibles());
    
    if(cursoSeleccionado > 0){ //Dado que el listado de curso se muestra desde el 1. De esta manera se corrige el desfasaje respecto a su posición en el array.
        cursoSeleccionado--;
    
        let auxCurso = institucion.obtenerCursoSegunIndex(cursoSeleccionado);
        institucion.eliminarCurso(auxCurso);

        alert("Curso eliminado con éxito");
    }
}


//Ejecución programa.

const institucion = preCargaDatos();

let terminarPrograma = false;

while(!terminarPrograma){

    let opcionIngresada = ingresarOpcion(0, 3, MSJ_MENU_PRINCIPAL, mensajeError("El valor se encuentra fuera de rango."));

    if(opcionIngresada == 0)
        terminarPrograma = true;
    else if(opcionIngresada == 1)
        alert(mensajeListadoCursos(institucion.obtenerListadoCursos()));
    else if(opcionIngresada == 2)
        ejecutarOpcionAgregarNuevoCurso(institucion);
    else if(opcionIngresada == 3)
        ejecutarOpcionEliminarCurso(institucion);
    else {
        alert(mensajeError("Ocurrió un error inesperado. Se procede a terminar el programa."));
        break;
    }
}

alert("¡Hasta la próxima!");
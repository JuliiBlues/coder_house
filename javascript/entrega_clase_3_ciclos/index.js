/* 
    LAS REFERENCIAS SE ENCUENTRAN EN EL ARCHIVO TXT Y ESTAN AHÍ PARA NO ESCRIBIR TANTO COMENTARIO ACA.
 */

const mensajeMenu = "-------------- Ingrese una opción --------------\n" +
                    "1) Realizar sucesión de fibonacci.\n" +
                    "2) Calcular si un número es primo.\n" +
                    "3) Calcular si un año es bisiesto.\n" +
                    "0) Salir del programa.";


//REFERENCIA ACLARACIÓN: 1.
let terminarPrograma = false;


while(!terminarPrograma) {

    let opcionIngresada = prompt(mensajeMenu);

    //Se concatena "opcion" al valor ingresado por el usuario para que el switch evalúe "opcion N°", simplemente para que quede mas semántico.
    opcionIngresada = "opcion " + opcionIngresada;

    switch(opcionIngresada){

        case "opcion 0":
            alert("Hasta la próxima!");
            terminarPrograma = true;
        break;

        //Opción 1: Calcula la sucesión de Fibonacci hasta el valor indicado.
        case "opcion 1":
            let cantidadDeValores = prompt("Ingrese la cantidad de valores que desea obtener: ");
            cantidadDeValores = parseInt(cantidadDeValores);
    
            let numUno = 0;
            let numDos = 1;
            let aux = numUno;
    
            for (let i = 0; i < cantidadDeValores; i++){
                alert(`El valor ${(i + 1)} es: ${aux}`);
                numUno = numUno + numDos;
                numDos = aux;
                aux = numUno;
            }
    
        break;
    
        //Opción 2: Calcula si un número X es primo o no. Aclaración: Es primo cuando es >= 2 Y solo es divisible por 1 y por si mismo.
        case "opcion 2":
    
            //REFERENCIA ACLARACIÓN: 2.
    
            let numeroAEvaluar = prompt("Ingrese el número a evaluar: ");
            numeroAEvaluar = parseInt(numeroAEvaluar);
            let esPrimo = true;
    
            if(numeroAEvaluar >= 2){
                let dividendo = numeroAEvaluar;
    
                for(let i = 2; i < dividendo; i++){
                    let divisor = i;
                    let cociente = parseInt(dividendo / divisor); 
    
                    if((divisor * cociente - dividendo) == 0) {
                        esPrimo = false;
                        break;
                    }
                }
            } else {
                esPrimo = false;
            }
            
            if(esPrimo){
                alert(`El valor: ${numeroAEvaluar} SI es un número primo.`);
            } else {
                alert(`El valor: ${numeroAEvaluar} NO es un número primo.`);
            }
    
        break;
    
        //Opción 3: Calcula si un año es bisiesto o no. Aclaración: Es bisiesto cuando es divisible por 4, 100 y 400. O por 4 y NO por 100.
        case "opcion 3":
    
            let anioAEvaluar = prompt("Ingrese el año a evaluar: ");
            let esBisiesto = true;
    
            //REFERENCIA ACLARACIÓN 2.
    
            let esDivisiblePorCuatro = parseInt((anioAEvaluar / 4));
            esDivisiblePorCuatro = (esDivisiblePorCuatro * 4) - anioAEvaluar; 
    
            let esDivisiblePorCien = parseInt((anioAEvaluar / 100));
            esDivisiblePorCien = (esDivisiblePorCien * 100) - anioAEvaluar; 
    
            let esDivisiblePorCuatrocientos = parseInt((anioAEvaluar / 400));
            esDivisiblePorCuatrocientos = (esDivisiblePorCuatrocientos * 400) - anioAEvaluar; 
    
            if (esDivisiblePorCuatro === 0){
                if(esDivisiblePorCien === 0){
                    if(esDivisiblePorCuatrocientos === 0){
                        esBisiesto = true;
                    } else {
                        esBisiesto = false;
                    }
                } else {
                    esBisiesto = true;
                }
            } else{
                esBisiesto = false;
            }
    
            if (esBisiesto){
                alert(`El año ${anioAEvaluar} SI es un año bisiesto`);
            } else{
                alert(`El año ${anioAEvaluar} NO es un año bisiesto`);
            }
        break;
    
        default:
            alert("Esa opción no está en la lista. Por favor ingrese un valor válido.");
        break;
    }
}



/*

    Programa creado para simular una calculadora básica.
        
        El programa cuenta debe contar con un menu de opciones.
        La ejecución del mismo finaliza cuando el usuario ingresa como opcion 0.

        El programa debe calcular: 
            - Suma
            - Resta
            - Division
            - Multiplicacion
            - Potencia
            - Raíz Cuadrada.
            - Hipotenusa.
*/

const calcularSuma = (primerValor, segundoValor) => primerValor + segundoValor;
const calcularResta = (primerValor, segundoValor) => primerValor - segundoValor;
const calcularDivision = (primerValor, segundoValor) => primerValor / segundoValor;
const calcularMultiplicacion = (primerValor, segundoValor) => primerValor * segundoValor;

function calcularPotencia(valorBase, valorExponente){

    let resultado;

    for(let i = 0; i < valorExponente; i++) {
        
        if(i == 0)
            resultado = valorBase;
        else
            resultado *= valorBase;
            
    }
    
    return resultado;
}

function calcularRaizCuadrada(valorRadicando){

    let raiz = valorRadicando / 2;
    let aux = 0;

    while(raiz != aux){

        aux = raiz;

        raiz = ((valorRadicando / aux) + aux) / 2;
    }

    return raiz;
}

function calcularHipotenusaTrianguloRectangulo(valorCatetoUno, valorCatetoDos){

    // Se calcula mediante el teorema de Pitágoras
    // H^2 = C1^2 + C2^2.
    // H = Raiz (C1^2 + C2^2);

    /*
        Aclaración:
            Entiendo que se podría resumir en una única línea tal que:
                return calcularRaizCuadrada((calcularPotencia(valorCatetoUno, 2) + calcularPotencia(valorCatetoDos, 2)));
        
        La idea de hacer esto es que tenga mayor legibilidad el código :)
    */

    let catetoUnoAlCuadrado = calcularPotencia(valorCatetoUno, 2);
    let catetoDosAlCuadrado = calcularPotencia(valorCatetoDos, 2);

    let sumaCatetosAlCuadrado = (catetoUnoAlCuadrado + catetoDosAlCuadrado);

    let hipotenusa = calcularRaizCuadrada(sumaCatetosAlCuadrado);

    return hipotenusa;
}

const mensajeMenu = "---------- Opciones Calculadora ----------\n" +
                    "-    Ingrese solo el número de opción    -\n" +
                    "Opcion 1: Calcular suma dado 2 valores.\n" +
                    "Opcion 2: Calcular resta dado 2 valores.\n" +
                    "Opcion 3: Calcular division dado 2 valores.\n" +
                    "Opcion 4: Calcular multiplicacion dado 2 valores.\n" +
                    "Opcion 5: Calcular potencia dado base y exponente.\n" +
                    "Opcion 6: Calcular raiz cuadrada de un valor.\n" +
                    "Opcion 7: Calcular hipotenusa de un triangulo rectangulo.\n" +
                    "Opcion 0: Salir del programa.\n";

const mensajeSalirPrograma = "Saliendo del programa...\nHasta la próxima.";

function ingresarOpcionMenu() {

    let opcionIngresada = "opcion " + prompt(mensajeMenu);
    return opcionIngresada;
}   

const ingresarValor = (numeroValor = "único") => prompt(`Ingrese el ${numeroValor} valor: `);

const mostrarResultadoOperacion = (primerValor, operacion, segundoValor, resultado) => {
    alert(`El resultado de ${primerValor} ${operacion} ${segundoValor} = ${resultado}`);
}

const mostrarHipotenusa = (catetoUno, catetoDos, hipotenusa) => {
    alert(`Dado los catetos: C1: ${catetoUno}. C2: ${catetoDos}.\nEl valor de la hipotenusa es: ${hipotenusa}`);
}

function ejecutarOpcion(opcionIngresada){

    if (opcionIngresada == "opcion 0"){

        alert(mensajeSalirPrograma);
        return true;

    } else {

        let primerValor, segundoValor, resultado;

        switch(opcionIngresada){

            case "opcion 1":
                primerValor = parseFloat(ingresarValor("primer"));
                segundoValor = parseFloat(ingresarValor("segundo"));
                resultado = calcularSuma(primerValor, segundoValor);
                mostrarResultadoOperacion(primerValor, "+", segundoValor, resultado);
            break;

            case "opcion 2":
                primerValor = parseFloat(ingresarValor("primer"));
                segundoValor = parseFloat(ingresarValor("segundo"));
                resultado = calcularResta(primerValor, segundoValor);
                mostrarResultadoOperacion(primerValor, "-", segundoValor, resultado);
            break;

            case "opcion 3":
                primerValor = parseFloat(ingresarValor("primer"));
                segundoValor = parseFloat(ingresarValor("segundo"));
                resultado = calcularDivision(primerValor, segundoValor);
                mostrarResultadoOperacion(primerValor, "/", segundoValor, resultado);
            break;

            case "opcion 4":
                primerValor = parseFloat(ingresarValor("primer"));
                segundoValor = parseFloat(ingresarValor("segundo"));
                resultado = calcularMultiplicacion(primerValor, segundoValor);
                mostrarResultadoOperacion(primerValor, "*", segundoValor, resultado);
            break;

            case "opcion 5":
                primerValor = parseFloat(ingresarValor("primer"));
                segundoValor = parseFloat(ingresarValor("segundo"));
                resultado = calcularPotencia(primerValor, segundoValor);
                mostrarResultadoOperacion(primerValor, "^", segundoValor, resultado);
            break;

            case "opcion 6":
                primerValor = parseFloat(ingresarValor());
                resultado = calcularRaizCuadrada(primerValor);
                mostrarResultadoOperacion("la raíz cuadrada", "de", primerValor, resultado);
            break;

            case "opcion 7":
                primerValor = parseFloat(ingresarValor("primer"));
                segundoValor = parseFloat(ingresarValor("segundo"));
                resultado = calcularHipotenusaTrianguloRectangulo(primerValor, segundoValor);
                mostrarHipotenusa(primerValor, segundoValor, resultado);
            break;
        }
    }

    return false;
}


let terminarPrograma = false; 
let opcionIngresada;  

while(!terminarPrograma) {      
    opcionIngresada = ingresarOpcionMenu();      
    terminarPrograma = ejecutarOpcion(opcionIngresada); 
}
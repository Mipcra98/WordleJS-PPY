window.addEventListener('load',iniciar);
const lista = ["abeto", "actor", "aguas", "agudo", "altar", "atizo", "abaco", "abate", "abeja", "acres", "actas", "actos", "acuso", "aguda", "alces", "aldea", "aguja", "roble"]
var secreta = ''
var cantin = 6

var butt = document.getElementById("guess-button");
butt.addEventListener("click",intentar);
var INPUT = document.getElementById("guess-input");
var reset = document.getElementById('reset-button');

function reiniciar(){
    reset.addEventListener('click',iniciar);
}



function iniciar(){
    let grid = document.getElementById('grid');
    while(grid.childNodes.length>0){
        grid.removeChild(grid.lastChild)
    }
    let contenedor = document.getElementById('guesses');
    contenedor.style.visibility = 'hidden'
    reset.style.visibility = 'hidden';
    butt.style.opacity = '100%';
    INPUT.disabled = false;
    butt.disabled = false;
    secreta = lista[Math.floor(Math.random() * lista.length)].toLocaleUpperCase();
}



function validarEntrada(inten){
    for (i in inten){
        if ((/[0-9]/.test(inten[i]))){              //validación para números
            alert("Por favor, solamente LETRAS.");
            document.getElementById("guess-input").focus();
            return false;
        }
    }
    if (inten === "") {                             //validación de campo vacío
        alert("Por favor, un texto de 5 letras.");
        document.getElementById("guess-input").focus();
        return false;
    }else if(inten.length >5){                      //validación de cantidad máxima
        alert("Por favor, solamente 5 letras.");
        document.getElementById("guess-input").focus();
        return false;
    }else if(inten.length <5){                      //validación de cantidad mínima
        alert("Por favor, minimamente 5 letras, no se aceptan espacios.");
        document.getElementById("guess-input").focus();
        return false;
    }else{
        return true;
    }
}

function isWhitespace(charToCheck) {            //Quitar campos vacios antes de validar datos
	var whitespaceChars = " \t\n\r\f";
	return (whitespaceChars.indexOf(charToCheck) != -1);
}


function intentar(){
    let INTENTO = leerIntento();
    if(validarEntrada(INTENTO)){
        evaluar(INTENTO);
    }else{
        console.log("Has hecho algo mal")   // ne se puede reconocer el texto ingresado por el usuario
    }
}

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value.toUpperCase();
    document.getElementById("guess-input").value = ""
    return intento;
}

function evaluar(INTENTO){
    let GRID = document.getElementById("grid");         //Obtener el elemento "grid"
    let ROW = document.createElement('div');            //A partir de acá se empieza a armar el texto nuevo de a cuerdo a lo ingresado por el usuario
    ROW.className = 'row';
    for (let i in INTENTO) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        SPAN.innerHTML = INTENTO[i];
        if (secreta[i]===INTENTO[i]){
            SPAN.style.backgroundColor = '#79b851'; //imprimir letra en verde
        }else if(secreta.includes(INTENTO[i])){
            SPAN.style.backgroundColor = '#f3c237'; //imprimir letra en amarillo
        }else{
            SPAN.style.backgroundColor = '#a4aec4'; //imprimir letra en gris
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    if (secreta === INTENTO){
        secreta = ''
        terminar("<h2>Has ganado!😀</h2>")
        fuego(.25,{startVelocity:60,spread:30})         //Más confetti, más alegría...
        fuego(.2,{spread:60})
        fuego(.35,{spread:100,decay: .9,scalar: 1})
        fuego(.1,{spread: 130, startVelocity: 30,decay: .92, scalar: 1.2})
        fuego(.2,{spread: 120, startVelocity: 45})
        return
    }
    cantin = cantin - 1
    // console.log("Intentos restantes",cantin)
        
    if (cantin==0){
        secreta = ''
        terminar("<h2>Has perdido!😖</h2>")
        return
    }
}

function fuego(ratio, opt){                 //funcion fuego, que genera los Confetti's
    confetti(Object.assign({},opt,{
        origin: {y: .6},
        particleCount: Math.floor(200 * ratio),
    }))
}

function terminar(mensaje){                         //al terminar un juego se produce:
    reset.style.visibility = 'visible';
    butt.style.opacity = '50%';
    INPUT.disabled = true;
    butt.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
    contenedor.style.visibility = 'visible'
    reiniciar()
    cantin = 6
}


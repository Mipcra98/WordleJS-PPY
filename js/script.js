let butt = document.getElementById("guess-button");

butt.addEventListener("click",intentar)

function validarEntrada(inten){
    for (i in inten){
        if ((/[0-9]/.test(inten[i]))){
            alert("Por favor, solamente LETRAS.");
            document.getElementById("guess-input").focus();
            return false;
        }
    }
    if (inten === "") {
        alert("Por favor, un texto de 5 letras.");
        document.getElementById("guess-input").focus();
        return false;
    }else if(inten.length >5){
        alert("Por favor, solamente 5 letras.");
        document.getElementById("guess-input").focus();
        return false;
    }else if(inten.length <5){
        alert("Por favor, minimamente 5 letras, no se aceptan espacios.");
        document.getElementById("guess-input").focus();
        return false;
    }else{
        return true;
    }
}

function isWhitespace(charToCheck) {
	var whitespaceChars = " \t\n\r\f";
	return (whitespaceChars.indexOf(charToCheck) != -1);
}

let INTENTO
let valido

function intentar(){
    INTENTO = leerIntento();
    if(validarEntrada(INTENTO)){
        evaluar();
    }else{
        console.log("Has hecho algo mal")
    }
}

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value.toUpperCase();
    document.getElementById("guess-input").value = ""
    return intento;
}

let cantin = 6


const lista = ["abeto", "actor", "aguas", "agudo", "alado", "albas", "altar", "atizo", "avala", "azul", "abaco", "abate", "abeja", "aboya", "abran", "abras", "acoja", "acojo", "acres", "actas", "actos", "acuna", "acune", "acuso", "afeas", "aguda", "agudo", "alces", "aldea"]
const secreta = lista[Math.floor(Math.random() * lista.length)].toLocaleUpperCase();
//secreta = secreta.toUpperCase();

console.log("jaja, creíste que porías ver algo aca?, pues si, sigue interactuando...")

function evaluar(){
    let GRID = document.getElementById("grid");
    let ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in INTENTO) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (secreta[i]===INTENTO[i]){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
        }else if(secreta.includes(INTENTO[i])){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
        }else{
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    if (secreta === INTENTO){
        terminar("<h1>Has ganado!😀</h1>")
        return
    }
    cantin = cantin - 1
    console.log("Intentos restantes",cantin)
    
        /*}else{            //1er algoridmo para verificar si existe la letra en otra ubicación
            for (l in secreta){
                if (secreta[l]===INTENTO[i]){
                    console.log(INTENTO[i],"Amarillo")
                    break
                }else{
                    console.log(INTENTO[i],"Gris")
                }
            }
        }*/
        
    if (cantin==0){
        terminar("<h1>Has perdido!😖</h1>")
        console.log("La palabra secreta fué",secreta)
        return
    }
}

function terminar(mensaje){
    let INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    butt.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;

}


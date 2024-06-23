window.addEventListener('load', init)

function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web')
}

let butt = document.getElementById("guess-button");

butt.addEventListener("click", intentar)

let INTENTO

function intentar(){
    INTENTO = leerIntento();
    INTENTO = INTENTO.toUpperCase();
    console.log(INTENTO)
    evaluar();
}

function leerIntento(){
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase(); 
    return intento;
}

let secreta = "abeto"
secreta = secreta.toUpperCase();

let lista = ["abeto", "actor", "aguas", "agudo", "alado", "albas", "altar", "atizo", "avala", "azul", "abaco", "abate", "abeja", "aboya", "abran", "abras", "acoja", "acojo", "acres", "actas", "actos", "acuna", "acune", "acuso", "afeas", "aguda", "agudo", "alces", "aldea"]

let amar = 0;

function evaluar(){
    if (secreta === INTENTO){
        console.log("Ganaste")
    }else{
        for (let i in INTENTO) {
            if (secreta[i]===INTENTO[i]){
                console.log(INTENTO[i],"Verde")
                amar = 0;
            }else{
                for (l in INTENTO){
                    if (INTENTO[i]===secreta[l]){
                        console.log(INTENTO[i],"Amarillo")
                        amar = 0;
                    }
                }
                if (amar>=1){
                    console.log(INTENTO[i],"Gris")
                    return
                }
            }
        }
    }
}
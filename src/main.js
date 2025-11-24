import{getJuegoService} from "./services/getJuegoService.js"

const btnId = document.getElementById("btn-id");

const salida = document.getElementById("salida")

const getIdFromButton = ()=>{
    console.log("Entre a getIdFromButton")
    const input = prompt("Ingresa el id del Juego: ")
    const id = Number(input)
    if(isNaN(id)){
        alert("El id debe ser un número")
        return 
    }
    return id
}

const mostrarJuegoThenCatch = (id) => {
    console.log("Entre a mostrar JuegoTHenCatch")
    getJuegoService(id).then((juego)=>{
        console.log("Entro a then")
        salida.innerHTML = ""
        const pId = document.createElement('P')
        pId.textContent = `-ID: ${juego.id}`
        salida.appendChild(pId)
        const pTitulo = document.createElement('P')
        pTitulo.textContent = `-Titulo: ${juego.titulo}`
        salida.appendChild(pTitulo)
        const pPlatagorma = document.createElement('P')
        pPlatagorma.textContent = `-Plataforma: ${juego.plataforma}`
        salida.appendChild(pPlatagorma)
        console.log(juego ," Juego")
        

    }).catch((error)=>{
        console.log("Entro a catch")
        console.error(error, " Error")
        salida.innerHTML = ""
        salida.textContent = error instanceof Error ? error.message : "Error Inesperado"
    })
}



btnId.addEventListener(("click") ,() => {
    console.log("Click en botón por ID")
    try{
        const id = getIdFromButton()
        if(id !== undefined){
            mostrarJuegoThenCatch(id)
        }
    }catch(error){
        result.textContent = error instanceof Error ? error.message : "Error Inesperado"
    }
} )


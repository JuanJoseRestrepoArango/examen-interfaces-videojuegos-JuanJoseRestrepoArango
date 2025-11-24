import{getJuegoService} from "./services/getJuegoService.js"
import{getValoracionService} from "./services/getValoracionService.js"
import{getJuegosPorPlataformaService} from "./services/getJuegosPorPlataformaService.js"

const btnId = document.getElementById("btn-id");
const btnIdValoracion = document.getElementById("btn-id-valoracion");
const btnPlataforma = document.getElementById("btn-plataforma");
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

const getPlataformaFromButton = () => {
    console.log("Entre a getPlataformaFromButton")
    const input = prompt("Ingrese la plataforma de los juegos(PC, PlayStation, Xbox o Nintendo Switch:): ")
    const plataforma = input?.trim()
    if(!plataforma || plataforma.length === 0){
        alert("Debe ingresar una plataforma")
        return 
    }
    return plataforma
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


const mostrarJuegoValoracionAll = (id) => {
    console.log("Entre a mostrar JuegoValoracionAll")
    Promise.all([getJuegoService(id),getValoracionService(id)]).then(([juego,puntuacion])=>{
        console.log("Entro a then")
        salida.innerHTML = ""
        const pTitulo = document.createElement('P')
        pTitulo.textContent = `-Titulo: ${juego.titulo}`
        salida.appendChild(pTitulo)
        const pPuntuacion = document.createElement('P')
        pPuntuacion.textContent = `-Puntuación: ${puntuacion}/10`
        salida.appendChild(pPuntuacion)
        console.log(juego ," Juego")
        console.log(puntuacion ," puntuacion")

    }).catch((error)=>{
        console.log("Entro a catch")
        console.error(error, " Error")
        salida.innerHTML = ""
        salida.textContent = error instanceof Error ? error.message : "Error Inesperado"
    })
}

async function mostrarJuegosPorPlataforma(plataforma) {
    try {
        const resultados = await getJuegosPorPlataformaService(plataforma);
        console.table(resultados)
        salida.innerHTML = ""
        if(resultados.length> 0){

            resultados.forEach(juego => {
                const p = document.createElement("p")
                p.textContent = `-[ ${juego.id}]  ${juego.titulo}`
                salida.appendChild(p)
                
            });
        }else{
            throw "No se encontro juego para esa plataforma"
        }
    } catch (error) {
        console.log("Entro a catch")
        console.error(error, " Error")
        salida.innerHTML = ""
        salida.textContent = error instanceof Error ? error.message : "Error Inesperado"
    }
}    



btnId.addEventListener(("click") ,() => {
    console.log("Click en botón por ID")
    try{
        const id = getIdFromButton()
        if(id !== undefined){
            mostrarJuegoThenCatch(id)
        }
    }catch(error){
        salida.textContent = error instanceof Error ? error.message : "Error Inesperado"
    }
} )

btnIdValoracion.addEventListener(("click") ,() => {
    console.log("Click en botón por ID para  busqueda con promise.all")
    try{
        const id = getIdFromButton()
        if(id !== undefined){
            mostrarJuegoValoracionAll(id)
        }
    }catch(error){
        salida.textContent = error instanceof Error ? error.message : "Error Inesperado"
    }
} )

btnPlataforma.addEventListener("click",() => {
    console.log("clieck en boton para buscar juegos por plataforma")
    try {
        const plataforma = getPlataformaFromButton()
        if(plataforma && plataforma.length > 0){
            mostrarJuegosPorPlataforma(plataforma)
        }
    } catch(error){
        salida.textContent = error instanceof Error ? error.message : "Error Inesperado"
    }
})


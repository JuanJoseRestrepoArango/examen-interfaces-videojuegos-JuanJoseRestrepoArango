import {valoraciones} from "../../public/data/info.js"

export function getValoracionService(id){
    const promise = new Promise((resolve,reject) => {
        setTimeout(( ) => {
            const valoracion = valoraciones.find(v => v.id === id)?.puntuacion
            console.log(valoracion)
            if(valoracion && valoracion !== undefined){
                resolve(valoracion)
            }else{
                reject( `La valoración del juego con id ${id} no existe`)
            }
        },900)
    })

    return promise
}

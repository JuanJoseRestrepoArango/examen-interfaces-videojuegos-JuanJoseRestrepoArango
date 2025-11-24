import {juegos} from "../../public/data/info.js"

export function getJuegoService(id){
    const promise = new Promise((resolve,reject) => {
        setTimeout(( ) => {
            const juego = juegos.find(j => j.id === id)
            console.table(juego)
            if(juego !== undefined){
                resolve(juego)
            }else{
                reject( `Juego no encontrado con id ${id}`)
            }
        },800)
    })

    return promise
}

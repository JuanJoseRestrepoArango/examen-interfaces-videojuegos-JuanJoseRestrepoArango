import {juegos} from "../../public/data/info.js"

export function getJuegosPorPlataformaService(plataforma){
    const promise = new Promise((resolve,reject) => {
        setTimeout(( ) => {
            const juegosPorPlataforma = juegos.filter(j => j.plataforma === plataforma)
            console.table(juegosPorPlataforma)
            
            resolve(juegosPorPlataforma)
            
        },1000)
    })

    return promise
}

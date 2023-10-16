import { resolve } from 'node:path'

// console.log(resolve('pages'))

export default {
    server: {
        port: "2222",
    },
    css: {
        devSourcemap: true,
    },
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                acessorios: resolve('acessorios.html'),
                celulares: resolve('celulares.html'),
                inicio: resolve('inicio.html'),
                index: resolve('index.html'),
                
            }
        }
    }
}
/* Librerías */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/* Archivos de proyecto */
import './css/style.css'


import { 
  comprarProducto,
   eliminarProducto, 
   leerLocalStorage,
   procesarPedido,
   vaciarCarrito,
  } 
   from './src/carrito'




const productos = document.getElementById('lista-productos')
//console.log(productos)

const carrito = document.getElementById('carrito')
//console.log('carrito')

const vaciarCarritoBtn = carrito.querySelector("#vaciar-carrito")
const procesarPedidoBtn = carrito.querySelector("#procesar-pedido")
cargarEventos()

function cargarEventos () {

  //se ejecuta cuando se presiona el boton comprar
  productos.addEventListener('click',(e)=> comprarProducto(e))

// al cargar el documento se muestra lo almacenado en el LS
document.addEventListener("DOMContentLoaded" , leerLocalStorage())

//cuando se elimina un producto del carrito
carrito.addEventListener('click', e => eliminarProducto(e))


vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))

procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))

} 


const listaProductos = document.querySelector("#lista-carrito tbody ")

//Anade un producto al carrito y para poder usarla la tenemos que exportar
export function comprarProducto(e) {
  e.preventDefault() //comportamiento por defecto, lo detiene
  //delegar  para agregar al carrito
  //console.dir(e.target)
  if (e.target.classList.contains("producto-carrito")) {
    const producto = e.target.parentElement.parentElement

    leerDatosProducto(producto)
  }

}
function leerDatosProducto(producto) {
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h3").textContent,
    precio: producto.querySelector(".alinear").textContent,
    id: producto.querySelector("button").getAttribute("data-id"),
    cantidad: 1
  }
//console.log(infoProducto)

 let productosLS
 productosLS = obtenerProductosLocalStorage()

 productosLS.forEach(function(productoLS) {
     if(productoLS.id === infoProducto.id) {
         productosLS = productoLS.id;
     }
 })

 if ( productosLS === infoProducto.id ) {
     console.warn('El producto ya está (en el carrito) en el localStorage')
 } else {
     insertarCarrito(infoProducto)
 }

}
// Comprobar que hay elementos en el LS
function obtenerProductosLocalStorage() {
 let productosLS

 // Comprobar si hay algo en el LS
 if ( localStorage.getItem('productos') === null ) {
     productosLS = []
 }
 else {
     productosLS = JSON.parse(localStorage.getItem('productos'))
 }
 return productosLS
}

// Muestra producto seleccionad en carrito
function insertarCarrito(producto) {
 const row = document.createElement('tr')

 row.innerHTML = `
     <td>
         <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
     </td>
     <td>${producto.titulo}</td>
     <td>${producto.precio}</td>
     <td>
         <a href="#" class="borrar-producto" data-id="${producto.id}"><i class="fa-solid fa-x"></i></a>
     </td>
 `
 listaProductos.appendChild(row)
 guardarProductosLocalStorage(producto)
}

// Almacenar en el LS
function guardarProductosLocalStorage(producto) {
 let productos

 // Toma valor de un arreglo con datos del LS
 productos = obtenerProductosLocalStorage()

 // Agrego el producto al carrito
 productos.push(producto)
 // Agregamos al LS
 localStorage.setItem('productos', JSON.stringify(productos))
  
}

export function leerLocalStorage() {
 let productosLS
 productosLS = obtenerProductosLocalStorage()
 productosLS.forEach(function (producto) {
     const row = document.createElement('tr')
     row.innerHTML = `
     <td>
         <img src="${producto.imagen}" alt="${producto.titulo}" width="50">
     </td>
     <td>${producto.titulo}</td>
     <td>${producto.precio}</td>
     <td>
         <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
     </td>
     `
     listaProductos.appendChild(row)
 })


}
// Eliminar el producto del carrito en el DOM 
export function eliminarProducto(e) {
 e.preventDefault()
 let producto, productoID
 if ( e.target.classList.contains('borrar-producto')) {
     //e.target.parentElement.parentElement.remove()
     producto = e.target.parentElement.parentElement
     productoID = producto.querySelector('a').getAttribute('data-id')
     producto.remove()
     eliminarProductoLocalStorage(productoID)
 }
}

// Eliminar producto Por ID del LS
function eliminarProductoLocalStorage(productoID) {
 let productosLS
 // Obtenemos el arreglo de productos
 productosLS = obtenerProductosLocalStorage()
 // Comparamos el id del producto borrado con el LS
 productosLS.forEach(function(productoLS, index) {
     if(productoLS.id === productoID) {
         productosLS.splice(index, 1)
     }
 })

 // Añadimos el arreglo actual al LS
 localStorage.setItem('productos', JSON.stringify(productosLS))
}

export function vaciarCarrito(e) {
    e.preventDefault()
    while(listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild)
    }
    vaciarLocalStorage()

    return false
}

function vaciarLocalStorage() {
    window.localStorage.clear()
}

// Procesando el pedido
export function procesarPedido(e) {
    e.preventDefault() // Detener el comportamiento por defecto de los <a> o los <form>
    let array = obtenerProductosLocalStorage()
    if ( array.length === 0 ) {
        console.warn('El carrito está vacío')
    } else {
        location.href = 'pages/carrito.html'
    }


}

/* // Mostrar los productos guardados en el LS en la página de carrito.html
export function leerLocalStorageCompra() {
 let productosLS
 productosLS = obtenerProductosLocalStorage()
 productosLS.forEach(function (producto) {
      const div = document.createElement('div')
      div.innerHTML = `
      
      `
 })

} */


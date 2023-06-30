let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
const contenedorCarritoTotal = document.querySelector("#total")
let botonesEliminar = document.querySelectorAll("#carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const botonComprar = document.querySelector("#carrito-acciones-comprar")


function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = 
            `
                <img class="carrito-producto-imagen" src="${producto.image}" alt="">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.title}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.amount}</p>
                </div>
                <div class="carrito-producto-presio">
                    <small>Presio</small>
                    <p>${producto.price}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.price * producto.amount}</p>
                </div>
                <button id="${producto._id}" class="carrito-producto-eliminar">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            contenedorCarritoProductos.append(div);
        })
    
    } else {
        
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal()
}

cargarProductosCarrito();



function actualizarBotonesEliminar(){
    botonesAgregar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", eliminarProductoCarrito);
    })
}

function eliminarProductoCarrito(e) {
    const idBoton = e.currentTarget._id;
    const index = productosEnCarrito.findIndex(producto => producto._id === idBoton)
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito)
function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal(){
   const toalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.price * producto.amount), 0);
   total.innerText = `$${toalCalculado}`
}


botonComprar.addEventListener("click", comprarCarrito)
function comprarCarrito(){
    
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");

}
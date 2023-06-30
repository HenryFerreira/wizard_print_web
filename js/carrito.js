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

/* URLs de la API */
const URL_API_CREATE_ORDER = "https://wizardprintapi-production.up.railway.app/api/wizardprint/order"

// Ejemplo implementando el metodo POST:
async function crearOrden(data) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(URL_API_CREATE_ORDER, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

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
    const productosComprar = [];
    const toalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.price * producto.amount), 0);
    
    productosEnCarrito.forEach(producto => {
        const newProduct = {
            productName: producto.title,
            price: producto.price,
            amount: producto.amount,
            _id: producto._id
        }
        productosComprar.push(newProduct)
    })

    const ordenDeCompra = {
        products: productosComprar,
        totalPirce: toalCalculado
    }

    crearOrden(ordenDeCompra);    
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    /* Desabilitar las vistas */    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
}

/* Elementos del HTML */
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const contadorProductos = document.querySelector("#contador");
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarContador();
} else {
    productosEnCarrito = []
}

/* URLs de la API */
const URL_API_GETALL_PRODUCTOS = "https://wizardprintapi-production.up.railway.app/api/wizardprint/product"
const URL_API_GETALL_PRODUCTOS_BY_CATEGORY = "https://wizardprintapi-production.up.railway.app/api/wizardprint/product/category"

/* Funciones */
async function cargarProductos() {
    const respuesta = await fetch (URL_API_GETALL_PRODUCTOS);
    const respuestaJson = await respuesta.json();
    const data = respuestaJson.data;

    contenedorProductos.innerHTML = "";

    data.forEach(elem =>{ 
        const div =  document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = 
        `
            <img class="producto-imagen" src="${elem.image}" alt="">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${elem.title}</h3>
                <p class="producto-precio">$ ${elem.price}</p>
                <button class="producto-agregar" id="${elem._id}">
                    <i class="bi bi-plus-square-fill"></i>
                    Agregar
                </button>
            </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
    console.log(botonesAgregar);
}

async function cargarProductosPorCategoria(categoria) {
    const respuesta = await fetch (`${URL_API_GETALL_PRODUCTOS_BY_CATEGORY}/${categoria}`);
    const respuestaJson = await respuesta.json();
    const data = await respuestaJson.data;

    contenedorProductos.innerHTML = "";

    data.forEach(elem =>{ 
        const div =  document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = 
        `
            <img class="producto-imagen" src="${elem.image}" alt="">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${elem.title}</h3>
                <p class="producto-precio">$ ${elem.price}</p>
                <button class="producto-agregar" id="${elem._id}">
                    <i class="bi bi-plus-square-fill"></i>
                    Agregar
                </button>
            </div>
        `;
        tituloPrincipal.innerText = categoria;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
    console.log(botonesAgregar);
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (evento) => {
        botonesCategorias.forEach(boton=> {
            boton.classList.remove("active")
        });
        evento.currentTarget.classList.add("active");

        if(evento.currentTarget.id === "todos-productos"){
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos()
        }
        else{
            cargarProductosPorCategoria(evento.currentTarget.id);
        }

    });
});
  
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito)
    })
}


async function agregarCarrito(e) {
    const idBoton = e.currentTarget.id;
    const respuesta = await fetch (URL_API_GETALL_PRODUCTOS);
    const respuestaJson = await respuesta.json();
    const data = respuestaJson.data;

    const productoAgregado = data.find(producto => producto._id === idBoton);
    if(productosEnCarrito.some(producto => producto._id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto._id === idBoton);
        productosEnCarrito[index].amount++;
    
    } else {
        productoAgregado.amount = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarContador()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


function actualizarContador(){
    let contador = productosEnCarrito.reduce((acc, producto) => acc + producto.amount, 0);
    contadorProductos.innerText = contador
}

cargarProductos();
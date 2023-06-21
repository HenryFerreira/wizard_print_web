/* Elementos del HTML */
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");

/* URLs de la API */
const URL_API_GETALL_PRODUCTOS = "https://apinode-production-03a5.up.railway.app/api/productos"

/* Funciones */
async function cargarProductos() {
    const respuesta = await fetch (URL_API_GETALL_PRODUCTOS);
    const data = await respuesta.json();

    contenedorProductos.innerHTML = "";

    data.forEach(elem =>{ 
        console.log(elem.titulo)
        
        const div =  document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = 
        `
            <img class="producto-imagen" src="./images/buzos/01.png" alt="">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${elem.titulo}</h3>
                <p class="producto-precio">$ ${elem.precio}</p>
                <button class="producto-agregar" id="${elem._id}">
                    <i class="bi bi-plus-square-fill"></i>
                    Agregar
                </button>
            </div>
        `;
        contenedorProductos.append(div);
    })
}

async function cargarProductosPorCategoria(categoria) {
    const respuesta = await fetch (URL_API_GETALL_PRODUCTOS);
    const data = await respuesta.json();
    const dataFilter = await data.filter(elem => elem.categoria === categoria);

    contenedorProductos.innerHTML = "";

    dataFilter.forEach(elem =>{ 
        const div =  document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = 
        `
            <img class="producto-imagen" src="./images/buzos/01.png" alt="">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${elem.titulo}</h3>
                <p class="producto-precio">$ ${elem.precio}</p>
                <button class="producto-agregar" id="${elem._id}">
                    <i class="bi bi-plus-square-fill"></i>
                    Agregar
                </button>
            </div>
        `;
        tituloPrincipal.innerText = categoria;
        contenedorProductos.append(div);
    })
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
  

cargarProductos()

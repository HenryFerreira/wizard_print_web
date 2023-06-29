/* Elementos del HTML */
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");

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
        console.log(elem.title)
        
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

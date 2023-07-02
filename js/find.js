//buscador o filtrador en la seccion productos.

const inputBuscar = document.querySelector("#buscar");

inputBuscar.onkeyup = (e) => {
    const articulosBuscar = document.querySelectorAll(".articulo");
    articulosBuscar.forEach((producto) => {
        producto.textContent.includes(e.target.value)
            ? producto.classList.remove("filtro")
            : producto.classList.add("filtro");
    });
};

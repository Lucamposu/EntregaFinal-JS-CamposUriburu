let carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoContainer = document.getElementById("carritoContainer");
const paragraph = document.getElementById("total");
const finalizarBoton = document.querySelector(".finalizarBoton");

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carritoItems));
}

//funcion para calcular el precio total
function totalCarrito(carrito) {

    if (carrito) {
        let total = 0;

        carrito.forEach((element) => {
            total = total + Number(element.precio) * element.cantidad;
        });

        return total;
    }
}

function actualizarCarritoHTML() {

    // HTML para mostrar los elementos del carrito
    const carritoHTML = carritoItems.map((articulo, index) => {
            return `
                <tr class="articulo" data-index="${index}">
                    <td>${articulo.title}</td>
                    <td>${articulo.precio}</td>
                    <td>
                        <button class="btn-disminuir" data-index="${index}">-</button>
                        <span>${articulo.cantidad}</span>
                        <button class="btn-aumentar" data-index="${index}">+</button>
                    </td>
                    <td>${articulo.precio * articulo.cantidad}</td>
                </tr>
            `;
        })
        .join("");

    carritoContainer.innerHTML = carritoHTML;
    
    paragraph.textContent = totalCarrito(carritoItems);
}

carritoContainer.addEventListener("click", (event) => {

    if (event.target.classList.contains("btn-disminuir")) {
        disminuirCantidad(event);
    } else if (event.target.classList.contains("btn-aumentar")) {
        aumentarCantidad(event);
    }

});

//funcion para aumentar la cantidad de productos desde el carrito
function disminuirCantidad(event) {
    const index = event.target.dataset.index;
  
    if (carritoItems[index].cantidad > 1) {
      carritoItems[index].cantidad--;
      guardarCarritoEnLocalStorage();
      actualizarCarritoHTML();
    } else {
      carritoItems.splice(index, 1);
      guardarCarritoEnLocalStorage();
      actualizarCarritoHTML();
  
      if (carritoItems.length === 0) {
        localStorage.removeItem("carrito");
      }
    }
  }

//funcion para aumentar la cantidad de productos desde el carrito
function aumentarCantidad(event) {

    const index = event.target.dataset.index;

    carritoItems[index].cantidad++;

    guardarCarritoEnLocalStorage();
    actualizarCarritoHTML();
}


paragraph.textContent = totalCarrito(carritoItems);

// Borrar lo guardado en el localStorage una vez apretado el boton finalizar compra
finalizarBoton.addEventListener("click", limpiarCarrito);

function limpiarCarrito() {

    // Borrar los datos del localStorage
    localStorage.removeItem("carrito");
    
    carritoItems = [];

    // Actualizar el contenido del carrito en el HTML
    carritoContainer.innerHTML = "";

    // Actualizar el total en el HTML
    paragraph.textContent = totalCarrito(carritoItems);

    // Mensaje al tocar boton
    Swal.fire({

        position: "center",
        icon: "success",
        title: "Compra realizada con éxito",
        showConfirmButton: false,
        timer: 1500,
    }).then(() => {
        window.location.href = "/index.html";
    });
}


function init() {
    actualizarCarritoHTML();
    finalizarBoton.addEventListener("click", limpiarCarrito);
}

init();
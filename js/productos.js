const contenedor = document.querySelector(".productosVole");

// Dibujamos los productos en el dom, determinando nuestro html
const renderServicios = (arr) => {
  let html;
  contenedor.innerHTML = "";

    //recorer con el foreach nuestro array y por cada item genere ese html definido
    arr.forEach(item=>{
      html = `
      <div class="articulo">
        <img class="articuloImg" src="${item.img}" alt="${item.nombre}">
        <h2 class="articuloTitle">${item.nombre}</h2>
        <h2 class="articuloPrecio">${item.precio}</h2>
        <a role="button" class="consultasEnca" id="botonComprar" onclick="agregarCarrito(event)">agregar al carrito</a>
      </div>
       `;
       
    contenedor.innerHTML += html;
    })
  };

//declaramos fetchapi para obtener nuestros datos locales 
const fetchApi= async ()=>{
  const response= await fetch('../data/db.json');
  const data= await response.json();
    
  renderServicios(data)
};

fetchApi()









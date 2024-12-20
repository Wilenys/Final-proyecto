// Inicializar el carrito con localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Ejecutar después de cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoUI();
    agregarEventosBotones();
    agregarEventoVaciarCarrito();
});

// Productos disponibles
const productos = [
    { id: 1, nombre: "Aceite", precio: 1500 },
    { id: 2, nombre: "Arroz", precio: 1230 },
    { id: 3, nombre: "Azúcar", precio: 1000 },
    { id: 4, nombre: "Fideos", precio: 1100 },
    { id: 5, nombre: "Yerba", precio: 1850 },
];

// Agregar eventos a botones "Agregar al carrito"
function agregarEventosBotones() {
    const botonesAgregar = document.querySelectorAll('#productos button');
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            agregarAlCarrito(index);
        });
    });
}

// Agregar funcionalidad para vaciar carrito
function agregarEventoVaciarCarrito() {
    const botonVaciar = document.querySelector('#vaciar-carrito');
    botonVaciar.addEventListener('click', () => {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarritoUI();
        alert("El carrito ha sido vaciado.");
    });
}

// Agregar producto al carrito
function agregarAlCarrito(indice) {
    const productoSeleccionado = productos[indice];
    const productoEnCarrito = carrito.find(item => item.id === productoSeleccionado.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    // Guardar carrito en localStorage y actualizar UI
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();

    // Mostrar mensaje en la página
    const mensajeCarrito = document.querySelector('#mensaje-carrito');
    mensajeCarrito.textContent = `Se ha añadido "${productoSeleccionado.nombre}" al carrito.`;
    mensajeCarrito.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeCarrito.style.display = 'none';
    }, 3000);
}

// Actualizar UI de la sección "Tu Carrito"
function actualizarCarritoUI() {
    const carritoSeccion = document.querySelector('#carrito p');
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    carritoSeccion.textContent = totalProductos > 0
        ? `Has añadido ${totalProductos} productos al carrito.`
        : "Aún no has añadido productos a tu carrito.";
}

function mostrarFormulario() {
    var formulario = document.getElementById('Agregarformulario');
    formulario.style.display = 'block';
}

function crearBotones(index) {
    const editarBtn = document.createElement('button');
    editarBtn.textContent = 'Editar';
    editarBtn.addEventListener('click', function() {
        editarProducto(index);
    });

    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.addEventListener('click', function() {
        console.log('Eliminar producto');
    });

    const accionesContainer = document.createElement('td');
    accionesContainer.appendChild(editarBtn);
    accionesContainer.appendChild(eliminarBtn);

    return accionesContainer;
}

const elementosFormulario = document.getElementById('formulario');

elementosFormulario.addEventListener('submit', (event) => {
    event.preventDefault();

    let producto = document.getElementById('producto').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio = document.getElementById('precio').value;
    let categoria = document.getElementById('categoria').value;

    let recibido = { producto, descripcion, precio, categoria };

    fetch('http://localhost:3000/agregar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recibido)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        location.reload();
    })
    .catch(error => console.error('Error:', error));
});

fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(data => {
        const tablaProductos = document.getElementById('tablaProductos');

        data.forEach((producto, index) => {
            const fila = document.createElement('tr');
            fila.setAttribute('data-id', index);
            fila.innerHTML = `
                <td>${producto.producto}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>${producto.categoria}</td>
            `;

            const acciones = crearBotones(index);
            fila.appendChild(acciones);

            tablaProductos.appendChild(fila);
        });
    })
    .catch(error => console.error('Error:', error));

function editarProducto(index) {
    const fila = document.querySelector(`tr[data-id="${index}"]`);

    if (fila) {
        document.getElementById('editProducto').value = fila.cells[0].textContent;
        document.getElementById('editDescripcion').value = fila.cells[1].textContent;
        document.getElementById('editPrecio').value = fila.cells[2].textContent;
        document.getElementById('editCategoria').value = fila.cells[3].textContent;

        document.getElementById('formularioEdicion').style.display = 'block';

        const guardarBtn = document.getElementById('guardarEdicion');
        guardarBtn.setAttribute('data-id', index);
    } else {
        console.error(`No se encontró la fila con data-id=${index}`);
    }
}

function guardarEdicion() {
    let editProducto = document.getElementById('editProducto').value;
    let editDescripcion = document.getElementById('editDescripcion').value;
    let editPrecio = document.getElementById('editPrecio').value;
    let editCategoria = document.getElementById('editCategoria').value;

    let indexButton = document.getElementById('guardarEdicion');

    if (indexButton && !isNaN(parseInt(indexButton.getAttribute('data-id')))) {
        let index = parseInt(indexButton.getAttribute('data-id'));

        let productoActualizado = {
            producto: editProducto,
            descripcion: editDescripcion,
            precio: editPrecio,
            categoria: editCategoria
        };

        fetch(`http://localhost:3000/editar/${index}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActualizado)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Producto actualizado:', data);

            actualizarFilaEnTabla(index, productoActualizado);

            document.getElementById('formularioEdicion').style.display = 'none';
        })
        .catch(error => console.error('Error al actualizar producto:', error));
    } else {
        console.error('El atributo data-id no está presente o no es un número válido.');
    }
}

document.getElementById('guardarEdicion').addEventListener('click', guardarEdicion);

function actualizarFilaEnTabla(index, productoActualizado) {
    const fila = document.querySelector(`tr[data-id="${index}"]`);

    fila.cells[0].textContent = productoActualizado.producto;
    fila.cells[1].textContent = productoActualizado.descripcion;
    fila.cells[2].textContent = productoActualizado.precio;
    fila.cells[3].textContent = productoActualizado.categoria;
}

document.getElementById('formularioEdicion').style.display = 'none';

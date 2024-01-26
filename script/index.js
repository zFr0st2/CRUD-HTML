function mostrarFormulario() {
    var formulario = document.getElementById('Agregarformulario');
    formulario.style.display = 'block';
}

const elementosFormulario = document.getElementById('formulario')

elementosFormulario.addEventListener('submit', (event) => {
    event.preventDefault()
    
    let producto = document.getElementById('producto').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio = document.getElementById('precio').value;
    let categoria = document.getElementById('categoria').value;

    let recibido = {producto: producto, descripcion: descripcion, precio: precio, categoria: categoria}
    let recibidoJson = JSON.stringify(recibido)
    console.log(recibidoJson)

    fetch('http://localhost:3000/agregar',{
        method: 'Post',
        body: recibidoJson
    })
})

    fetch('http://localhost:3000/productos').the(x => x.JSON().then(Agregarformulario))

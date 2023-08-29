import { obtenerArticulos } from '../modelos/articulos.js';

const alerta = document.querySelector('#alerta');

const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector('#formularioModal'));
const btnNuevo

const inputCodigo = document.querySelector('#codigo');
const inputNombre = document.querySelector('#nombre');
const inputDescripcion = document.querySelector('#descripcion');
const inputPrecio = document.querySelector('#precio');
const inputImagen = document.querySelector('#imagen');

const frmImagen = document.querySelector("frmImagen");

let accion = "";
let id;

document.addEventListener('DOMContentLoaded', () => {
    mostrarArticulos();
});

async function mostrarArticulos() {
    const articulos = await obtenerArticulos();
    console.log(articulos);
    const listado = document.querySelector("#listado");
    listado.innerHTML = '';
    for (let articulo of articulos) {
        listado.innerHTML += `
              <div class="col">
                <div class="card" style="width:18rem;">
                    <img src="imagenes/productos/${articulo.imagen ?? 'no disponible.png'}" alt="${articulo.nombre}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span>
                        </h5>
                        <p class="card-text">
                        ${articulo.descripcion}.
                        </p>
                        <h5>$ <span name="spanprecio">${articulo.precio}</span></h5>
                        <input type="number" name="inputcantidad" class="form-control" value="0" min="0" max="30" onchange="calcularPedido()">
                    </div>
                    <div class"card-footer d-flex justify-content-center">
                    <a class="btn editar btn btn-primary">editar</a>
                    <a class="btn editar btn btn-danger">eliminar</a>
                    input type="hidden" class=""
                    input type="hidden" class=""
                </div>
            </div>
`;
    }
}
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    const datos = new FormData(formulario);
    switch(action){
        case "insertar":
           fetch(url + "&accion=insertar", {
            method: 'POST',
            body: datos
            })
                .then(res => res.json)
                .then(data => {
                    insertarAlerta(data, 'success')
                    mostrarArticulos();
                });
            break;
    
    
        case "actualizar":
            fetch(url + `&accion=actualizar&id=${}`, {
                method: 'POST',
                body: datos
            })
                .then(res => res.json)
                .then(data => {
                    insertarAlerta(data, 'success')
                    mostrarArticulos();
                });
                break;
            }
        });
        


btnNuevo.addEventListener('click', () => {
    inputCodigo.value = null;
    inputNombre.value = null;
    inputDescripcion.value = null;
    inputPrecio.value = null;
    inputImagen.value = null;
    frmImagen.src = './imagenes/productos/nodisponible.png'

    formularioModal.show();
    accion='insertar';
})

/**
 * 
 * @param mensaje
 * @param tipo
 */
const insertarAlerta = (mensaje, tipo) => {
    const envoltorio = document.createElement('div')
    envoltorio.innerHTML = `
        <div class="alert-${tipo} alert-dismissible" role = "alert">
            <div>${mensaje}</div>
            <button type="button" class = "btn close" data_bs_dismiss = "alert" aria-label="close"></button>
        </div>
    `;
    alerta.append(envoltorio);
}

/**
 * @param elemento
 * @param evento
 * @param selector
 * @param manejador
 */
const on = (elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, e => {
        if (e.tarjet.closest(selector)) {
            manejador(e);
        }
    })
};


on(document, 'click', '.btnEditar', e => {
    const cardFooter = e.target.parentNode;
    id = cardFooter.querySelector('.idArticulo').value;
    const codigo = cardFooter.parentNode.querySelector('span[name=spancodigo]').innerHTML
    const nombre = cardFooter.parentNode.querySelector('span[name=spancodigo]').innerHTML
    const precio = cardFooter.parentNode.querySelector('span[name=spancodigo]').innerHTML
    const descripcion = cardFooter.parentNode.querySelector('span[name=spancodigo]').innerHTML
    const imagen = cardFooter.parentNode.querySelector('span[name=spancodigo]').innerHTML

    inputCodigo.value = codigo;
    inputNombre.value = nombre;
    inputPrecio.value = precio;
    inputDescripcion.value = descripcion;
    frmImagen.src ='./imagenes/productos/${imagen}';
    
    formularioModal.show();
    accion = 'actualizar';

}) ;
 
on(document, 'click', '.btnborrar', e=>{
    const cardFooter = e.target.parentNode;
    id=cardFooter.querySelector('.idArticulo');
    const nombre = cardFooter.parentNode.querySelector("span[name=spannombre]".innerHTML);
    let aceptar = confirm(`¿realmente decea eliminar a ${nombre}?`);
    if(aceptar) {
        console.log(`${nombre} eliminado`)
        fetch(`${url}/&accion=eliminar&id=${id}`)
        .then(res => res.json())
        .then(data=>{
        insertarAlerta(data, 'danger');
        mostrarArticulos();
        });
    }
});
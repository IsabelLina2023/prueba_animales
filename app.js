//¿qué hacer?
//-crear un app.js que será el mpodulo que llamará a todos los archivos js que contendran las clases
//-crear la clase de cada animal en su archivo.js con constructor y metodos
//-crear la funcion para invocar a json y traer los datos: Funcion async con await y fetch
//-crear las variables de cada animal q contengan sus propiedades y metodos
//-crear un forEach para recorrer el array y no sé bien para que
//-crear los llamados al DOM, con escuchadores de Eventos, con un llamado a un form para insertar el comentario en una div que debe ser mostrado en el modal
//-crear una funcion modal para mostrar una tarjeta con imagen y sonido del animal
import { Leon } from './assets/js/leon.js';
import { Lobo } from './assets/js/lobo.js';
import { Oso } from './assets/js/oso.js';
import { Aguila } from './assets/js/aguila.js';
import { Serpiente } from './assets/js/serpiente.js';

//Funcion asincrona y autoejecutable:
const animalesComentados = []; //esta cuestion sera un array 

const animales = await (async () => {
    const URL = "./animales.json";
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo');
        }
        const datos = await response.json();
        return datos.animales;
    } catch (error) {
        console.error('Error al cargar el archivo:', error.message);
    }
})();
//await cumple la promesa
console.log(animales)

//
function getInstancia(nombre, edad, img, comentarios, sonido) {
    switch (nombre) {
        case "Leon":
            return new Leon(nombre, edad, img, comentarios, sonido);
            break;
        case "Lobo":
            return new Lobo(nombre, edad, img, comentarios, sonido);
            break;
        case "Oso":
            return new Oso(nombre, edad, img, comentarios, sonido);
            break;
        case "Serpiente":
            return new Serpiente(nombre, edad, img, comentarios, sonido);
            break;
        case "Aguila":
            return new Aguila(nombre, edad, img, comentarios, sonido);
            break;
        default:
            document.getElementById('mensajeError').textContent = `No se encontró el animal ${animal}.`;
            return;
    }
}

document.getElementById('animal').addEventListener('change', (event) => {
    let previewDiv = document.querySelector('#preview');
    let previewImg = document.createElement('img');
    let animalSeleccionado = event.target.value

    animales.forEach((item) => {
        if (item.name === animalSeleccionado) {
            previewImg.src = `./assets/imgs/${item.imagen}`
        }
    })
    previewDiv.innerHTML = "";
    previewDiv.appendChild(previewImg);
})

document.getElementById('btnRegistrar').addEventListener('click', () => {
    let nombre = document.getElementById('animal').value;
    let edad = document.getElementById('edad').value;
    let comentario = document.getElementById('comentarios').value;
    let imagen = ""
    let sonido = ""
    animales.forEach((item) => {
        if (item.name === nombre) {
            imagen = item.imagen;
            sonido = item.sonido;
        }
    })
    let objetoAnimal = getInstancia(nombre, edad, imagen, comentario, sonido)
    animalesComentados.push(objetoAnimal)
    console.log(animalesComentados)
    mostrarAnimales(animalesComentados)

})
function mostrarAnimales(arrayComentados) {
    //agarrar el array que es la lista de animalesComentados
    //recorrer el array con forEach
    //cuando tenga el objeto creo un elemento html ¿div? por cada objeto del arreglo
    //con createElement
    //dentro del contenedor va la imagen y un boton para el sonido
    //con interpolación le doy los valores necesarios
    //con appendChild muestro en html el resultado 
    document.getElementById('Animales').innerHTML = ""
    arrayComentados.forEach((item) => {
        let contenedorDiv = document.createElement('div');
        let imagen = document.createElement('img');
        let boton = document.createElement('button');
        boton.innerHTML = 'Play'
        imagen.src = `./assets/imgs/${item.img}`
        boton.addEventListener('click', () => {
            let sonido = document.getElementById('player');
            sonido.src = `./assets/sounds/${item.sonido}`
            sonido.play()
        })
        contenedorDiv.appendChild(imagen)
        contenedorDiv.appendChild(boton)
        document.getElementById('Animales').appendChild(contenedorDiv)
    })
}
//}
// Incio de Script
// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const btnSubmit = document.querySelector('input[type=submit]');
let tweets = [];

// Cargar eventos
cargarEventos();
function cargarEventos() {
    btnSubmit.addEventListener('click', agregarTweet);
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}


// Funciones

function agregarTweet(e) {
    e.preventDefault();

    borrarMensaje();

    const tweet = document.querySelector('#tweet').value;
    if (tweet === '') {
        mostrarError();
        return;
    }


    const tweetObj = {
        id: Date.now(),
        tweet // tweet : tweet
    }

    // Añadir al  arreglo de tweets
    tweets = [...tweets, tweetObj];
    console.table(tweets);

    if (tweets.length > 0) {
        crearHTML();
    }

    almacenarTweets();

    formulario.reset();
}

function mostrarError() {
    const mensaje = document.createElement('P');
    mensaje.classList.add('error', 'tweet-vacio');
    mensaje.textContent = 'La casilla no puede ir vacia';
    formulario.appendChild(mensaje);


    setTimeout(() => {
        mensaje.remove();
    }, 4000)

    return;
}

function borrarMensaje() {
    const existe = formulario.querySelector('.tweet-vacio');

    if (existe) {
        existe.remove();
    }
}

function crearHTML() {

    // Limpiar
    limpiarHTML(listaTweets);

    if (tweets.length > 0) {
        tweets.forEach(tweet => {

            // Agegar boton de eliminar tweet
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Añadir la funcion de elminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement('li');

            // Agregar texto
            li.textContent = tweet.tweet

            // Asignar boton
            li.appendChild(btnEliminar);

            // Agregar a lista de tweets
            listaTweets.appendChild(li);
        })
    }

    almacenarTweets();
}

function limpiarHTML(lista) {

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    console.log(tweets);
    crearHTML();
}

function almacenarTweets() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Fin de script
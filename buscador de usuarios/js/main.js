let API = 'https://api.github.com/users/';

let dark = true;
let resultado = document.querySelector('.resultado');
let form = document.querySelector('.form');
let input = document.querySelector('.formInput');
let espera = document.querySelector('.espera');
let noEncontrado = document.querySelector('.not-found');
let cambiarTema = document.querySelector('.cambiarTema');
let nombreTema = document.querySelector('.nombreTema');
let temaCSS = document.querySelector('.temaCss');
let iconModo = document.querySelector('.iconModo');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let nombreUsuario = input.value.trim();
    if (!nombreUsuario) return;

    obtenerDatosUsuario(nombreUsuario);

    input.value = '';
});

cambiarTema.addEventListener('click', cambiarTemaColor);

async function obtenerDatosUsuario(nombreUsuario) {
    try {
        let respuesta = await fetch(API + nombreUsuario);
        if (!respuesta.ok) {
            throw new Error('No existe ese nombre de usuario');
        }
        let datos = await respuesta.json();
        mostrarDatosUsuario(datos);
    } catch (error) {
        console.error('Error', error);
        mostrarNoEncontrado();
    }
}

function mostrarNoEncontrado() {
    let img = '<img class="not-found" style="width: 400px; height: 400px" src="img/errorNoEncon.gif" alt="No se encuentra">';

    resultado.innerHTML = img;
}

function mostrarDatosUsuario(datos) {
    let {
        login,
        avatar_url: avatar,
        name,
        company,
        blog,
        public_repos: repos,
        location,
        email,
        bio,
        twitter_username: twitter,
        followers,
        following,
        created_at: joined,
    } = datos;

    let datosUsuario = `
        <img src="${avatar}" class="avatar">

        <h2 class="nombre">${name}</h2>
        <h4 class="unido">Se unió el ${parseDate(joined)}</h4>
        <h5 class="username">${login}</h5>
        <p class="bio">${bio}</p>

        <section class="stats">
            <p class="repos">Repos</p>
            <p class="seguidores">Seguidores</p>
            <p class="siguiendo">Siguiendo</p>
            <small class="repos">${repos}</small>
            <small class="seguidores">${followers}</small>
            <small class="siguiendo">${following}</small>
        </section>

        <nav class="contacto">
            <a href="#" class="link"><i class="fa fa-map-marker-alt"></i>${location}</a>
            <a href="https://twitter.com/${twitter}" class="link"><i class="fab fa-twitter">&nbsp${twitter}</i></a>
            <a href="${blog}" target="_blank" class="link"><i class="fa fa-link"></i>${blog}</a>
            <a href="#" class="link"><i class="fa fa-building"></i>${company}</a>
        </nav>
    `;

    resultado.innerHTML = datosUsuario;

    function parseDate(fecha) {
        let ops = {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(fecha).toLocaleString('es-ES', ops);
    }
}

function cambiarTemaColor() {
    dark = !dark;
    if (dark) {
        temaCSS.setAttribute('href', 'css/estiloLight.css');
        iconModo.setAttribute('class', 'fa fa-moon iconModo');
        nombreTema.textContent = 'DARK';
    } else {
        temaCSS.setAttribute('href', 'css/estiloDark.css');
        iconModo.setAttribute('class', 'fa fa-sun iconModo');
        nombreTema.textContent = 'LIGHT';
    }
}
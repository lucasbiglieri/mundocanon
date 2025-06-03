document.addEventListener("DOMContentLoaded", function() {
    // Función para cargar las noticias
    fetch('JS/noticias.json')
        .then(response => response.json())
        .then(data => {
            const noticiasContainer = document.getElementById('noticias-container');
            data.noticias.forEach(noticia => {
                // Crear un div para cada noticia
                const noticiaDiv = document.createElement('div');
                noticiaDiv.classList.add('noticia');

                // Crear el título
                const titulo = document.createElement('h3');
                titulo.textContent = noticia.titulo;
                noticiaDiv.appendChild(titulo);

                // Crear la fecha
                const fecha = document.createElement('p');
                fecha.textContent = `Fecha: ${noticia.fecha}`;
                noticiaDiv.appendChild(fecha);

                // Crear el contenido
                const contenido = document.createElement('p');
                contenido.textContent = noticia.contenido;
                noticiaDiv.appendChild(contenido);

                const enlace = document.createElement('a');
                enlace.textContent = noticia.enlace;
                enlace.href = noticia.enlace;
                enlace.target = "_blank";  // Abre el enlace en una nueva pestaña
                enlace.textContent = "leer más...";
                noticiaDiv.appendChild(enlace);

                // Añadir la noticia al contenedor de noticias
                noticiasContainer.appendChild(noticiaDiv);
            });
        })
        .catch (error => {
            console.error('Error al cargar las noticias:', error);
        });
});

const navbar = document.getElementById('navbar')

function scrollNavbar() {
    console.log (window.scrollY)

    if (window.scrollY > 80) {
        navbar.classList.add('nav-scroll')
    } else {
        navbar.classList.remove('nav-scroll')
    }
}

window.addEventListener('scroll', scrollNavbar)



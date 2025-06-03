function scrollNavbar() {
  console.log (window.scrollY)

  if (window.scrollY > 80) {
      navbar.classList.add('nav-scroll')
  } else {
      navbar.classList.remove('nav-scroll')
  }
}

window.addEventListener('scroll', scrollNavbar)

const businessCoords = [40.416775, -3.703790]; // Dirección empresa: Madrid
let control = null;

// Inicia el mapa
const map = L.map('map').setView(businessCoords, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Marcador empresa
L.marker(businessCoords).addTo(map)
  .bindPopup('Mi Empresa S.A.<br>Calle Falsa 123')
  .openPopup();

// Intenta obtener ubicación del usuario
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  mostrarSoloEmpresa();
}

function successCallback(position) {
  const userCoords = [position.coords.latitude, position.coords.longitude];

  // Mostrar marcador de usuario
  L.marker(userCoords).addTo(map)
    .bindPopup('Tu ubicación')
    .openPopup();

  // Centrar mapa entre ambos puntos
  map.fitBounds([businessCoords, userCoords]);

  // Calcular y mostrar ruta
  control = L.Routing.control({
    waypoints: [
      L.latLng(userCoords),
      L.latLng(businessCoords)
    ],
    routeWhileDragging: false,
    show: false,
    createMarker: () => null,
    router: L.Routing.osrmv1({
      serviceUrl: 'https://router.project-osrm.org/route/v1',
      language: 'es'
    })
  }).addTo(map);

  control.on('routesfound', function (e) {
    const instruccionesDiv = document.getElementById('instrucciones');
    let html = "<ol>";
    e.routes[0].instructions.forEach(instr => {
      html += `<li>${instr.text}</li>`;
    });
    html += "</ol>";
    instruccionesDiv.innerHTML = html;
  });
}

function errorCallback(error) {
  console.warn('Error de geolocalización:', error.message);
  mostrarSoloEmpresa();
}

function mostrarSoloEmpresa() {
  map.setView(businessCoords, 13);
  const instruccionesDiv = document.getElementById('instrucciones');
  instruccionesDiv.innerHTML = "<p>No se pudo obtener tu ubicación. Solo se muestra la ubicación de la empresa.</p>";
}

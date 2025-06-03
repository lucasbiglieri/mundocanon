const productos = [
    {
      nombre: "Canon EOS R7 + Objetivo RF-S 18-150mm F3.5-6.3 IS STM de Canon",
      precio: "$1.799,99",
      imagen: "/img/eosr7.webp"
    },
    {
      nombre: "Canon EOS R6 Mark II",
      precio: "$2.219,99",
      imagen: "/img/eosr6.webp"
    },
    {
      nombre: "Canon EOS R10 + Objetivo RF-S 55-210mm + Objetivo RF-S 18-45mm + Tarjeta SD + Batería de repuesto",
      precio: "$1.339,99",
      imagen: "/img/eosr10.webp"
    },
    {
      nombre: "Canon EOS R5",
      precio: "$3.189,99",
      imagen: "/img/eosr5.webp"
    }
  ];
  
  const galeria = document.getElementById('galeria');
  
  productos.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'producto';
    card.innerHTML = `
      <img src="${producto.imagen}" alt="fotografia de camara ${producto.nombre}">
      <div class="info">
        <div class="titulo">${producto.nombre}</div>
        <div class="precio">${producto.precio}</div>
      </div>
    `;
    galeria.appendChild(card);
  });

  const producto = [
    {
      nombre: "RF16-28MM F2.8 IS STM",
      precio: "$1.379,00",
      imagen: "/img/Rf16-28.webp"
    },
    {
      nombre: "Objetivo RF 100-500mm F4.5-7.1L IS USM de Canon",
      precio: "$3.323,99",
      imagen: "/img/rf100-500.webp"
    },
    {
      nombre: "Objetivo RF 24-70mm F2.8L IS USM de Canon",
      precio: "$2.939,99",
      imagen: "/img/rf24-70.webp"
    },
    {
      nombre: "Objetivo Canon RF 70-200mm F2.8L IS USM",
      precio: "$3.349,00",
      imagen: "/img/rf70-200.webp"
    }
  ];
  
  const objeto = document.getElementById('objeto');
  
  producto.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'producto2';
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="info">
        <div class="titulo">${producto.nombre}</div>
        <div class="precio">${producto.precio}</div>
      </div>
    `;
    objeto.appendChild(card);
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
  
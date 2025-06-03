const navbar = document.getElementById('navbar');

function scrollNavbar() {
    console.log(window.scrollY);

    if (window.scrollY > 80) {
        navbar.classList.add('nav-scroll');
    } else {
        navbar.classList.remove('nav-scroll');
    }
}

window.addEventListener('scroll', scrollNavbar);

function validarParte1() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje');
    const aceptarCondiciones = document.getElementById('aceptar-condiciones').checked;

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9]{9}$/;
    const soloLetrasConTildes = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;

    let valido = true;
    let errores = '';

    // Validación del nombre
    if (!soloLetrasConTildes.test(nombre) || nombre.length === 0 || nombre.length > 15) {
        errores += 'El nombre debe contener solo letras y tener máximo 15 caracteres.\n';
        valido = false;
    }

    // Validación del apellido
    if (!soloLetrasConTildes.test(apellido) || apellido.length === 0 || apellido.length > 40) {
        errores += 'El apellido debe contener solo letras (sin números ni símbolos) y tener máximo 40 caracteres.\n';
        valido = false;
    }

    // Validación del teléfono
    if (!telefonoRegex.test(telefono)) {
        errores += 'El teléfono debe contener solo 9 números.\n';
        valido = false;
    }

    // Validación del correo electrónico
    if (!correoRegex.test(correo)) {
        errores += 'Introduce un correo válido.\n';
        valido = false;
    }

    // Validación de las condiciones de privacidad
    if (!aceptarCondiciones) {
        errores += 'Debes aceptar las condiciones de privacidad.\n';
        valido = false;
    }

    if (!valido) {
        mensaje.textContent = errores;
        mensaje.style.color = 'red';
        return; // Si hay errores, no se envía el formulario
    }

    // Si todo es válido, mostrar el mensaje de éxito
    mensaje.textContent = '¡Formulario enviado correctamente!';
    mensaje.style.color = 'green';

    // Simular el envío o procesar los datos, por ejemplo
    setTimeout(function () {
        document.getElementById('formulario').reset(); // Resetea el formulario
    }, 2000); // Simula un pequeño delay para mostrar el mensaje antes de hacer algo más
}

// Personalizar comportamiento al enviar el formulario
document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Validar la primera parte antes de enviar el formulario
    validarParte1();
});

const preciosProductos = {
    producto1: 1799.99,
    producto2: 2219.99,
    producto3: 1339.99,
    producto4: 3189.99,
};

const preciosExtras = {
    garantia: 100,
    soporte: 80,
    instalacion: 60,
    asistencia: 90,
};

// Función para calcular el presupuesto
// Función para calcular el presupuesto
// Función para calcular el presupuesto
// Función para calcular el presupuesto
// Función para calcular el presupuesto
function calcularPresupuesto() {
    let total = 0;

    const producto = document.getElementById('producto').value;
    const plazoInput = document.getElementById('plazo');
    const presupuestoField = document.getElementById('presupuesto');

    console.log('Producto seleccionado:', producto);  // Depuración

    // Si no hay producto, salimos
    if (!producto || !preciosProductos[producto]) {
        console.log('No se ha seleccionado un producto o el producto no existe.');  // Depuración
        presupuestoField.value = '';
        return;
    }

    total += preciosProductos[producto];
    console.log('Precio del producto:', preciosProductos[producto]);  // Depuración

    // Extras
    const extras = document.querySelectorAll('input[name="extras"]:checked');
    extras.forEach(extra => {
        if (preciosExtras[extra.value]) {
            total += preciosExtras[extra.value];
        }
    });
    console.log('Total con extras:', total);  // Depuración

    // Obtener el plazo desde el input
    let plazo = parseInt(plazoInput.value);
    console.log('Plazo seleccionado:', plazo);  // Depuración

    // Validar que el plazo esté en un rango adecuado (0 a 100 días por ejemplo)
    if (isNaN(plazo) || plazo < 0 || plazo > 100) {
        console.log('El plazo no es válido o está fuera del rango permitido.');  // Depuración
        presupuestoField.value = '';
        return;
    }

    // Descuento basado en el rango del plazo
    let descuento = 0;
    if (plazo >= 1 && plazo <= 5) {
        descuento = 0.05; // 5% de descuento
    } else if (plazo >= 6 && plazo <= 15) {
        descuento = 0.10; // 10% de descuento
    } else if (plazo >= 16 && plazo <= 30) {
        descuento = 0.15; // 15% de descuento
    } else if (plazo > 30) {
        descuento = 0.20; // 20% de descuento
    }

    console.log('Descuento aplicado:', descuento * 100, '%');  // Depuración

    total *= (1 - descuento);
    console.log('Total con descuento:', total);  // Depuración

    presupuestoField.value = `€${total.toFixed(2)}`;
}

// Escuchar cambios en producto, plazo y extras
document.getElementById('producto').addEventListener('change', function() {
    calcularPresupuesto(); // Recalcular cuando cambia el producto
});
document.querySelectorAll('input[name="extras"]').forEach(c => {
    c.addEventListener('change', calcularPresupuesto); // Recalcular cuando cambian los extras
});

// Escuchar cambios en el plazo desde el input
document.getElementById('plazo').addEventListener('input', function() {
    let plazo = parseInt(this.value);

    // Validar que el plazo esté en un rango adecuado (0 a 100 días por ejemplo)
    if (isNaN(plazo) || plazo < 0 || plazo > 100) {
        alert("El plazo debe ser un número entre 0 y 100.");
        this.value = ""; // Limpiar el campo si es inválido
        calcularPresupuesto(); // Recalcular al limpiar
        return;
    }

    calcularPresupuesto(); // Recalcular cuando cambia el plazo
});



const formulario = document.querySelector('form');
const listado = document.querySelector('#listado');
let listaTareas = [
    { idTarea: 0, tarea: 'Estudiar Javascript', prioridad: 'urgente' },
    { idTarea: 1, tarea: 'Dormir', prioridad: 'diaria' },
    { idTarea: 2, tarea: 'Salir a comer', prioridad: 'mensual' }
];

// Cuando haga submit guarda la tarea para que nunca se repita el id si se borran tareas
formulario.addEventListener('submit', guardarTarea);

/**
 * let contadorTareas = Math.max(...listaTareas.map(t => t.idTarea)) + 1;
 * me guado esto para luego si logro aprender a guardar el arrayy que cuando se inicie de nuevo mi aplicación
 * empezar como la deje antes 
 */
// Contador de tarear para generar id siempre diferentes 
let = contadorTareas = listaTareas.length
// Función guardarTarea
function guardarTarea(event) {
    event.preventDefault(); //Invalido el evento sumit por defecto

    const tarea = formulario.tarea.value.trim();
    const prioridad = formulario.prioridad.value;
    // Verifico que siempre se ponga algo en la tarea y se seleccione una prioridad  
    if (tarea === '' || prioridad === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
    // Guardo la nueva tarea en un objeto
    const nuevaTarea = {
        idTarea: contadorTareas,
        tarea: tarea,
        prioridad: prioridad
    }
    // Aumento el contador en 1 para que ningún id se repita
    contadorTareas++;
    // Incorporo el objeto al final del array
    listaTareas.push(nuevaTarea)

    // ejecuto la función pintarTareas
    pintarLista(listaTareas);

    formulario.reset();
}

// Función pintarLista
function pintarLista(lista) {
    listado.innerHTML = '';  // Vacío el <ul> con id = listado para que no se sobreescriba 
    for (let tarea of lista) {
        pintarTarea(tarea);
    }
}

function pintarTarea(tarea) {
    // Creo un elemento contenedor para la tarea y el botón
    const divContenedor = document.createElement('div');
    divContenedor.classList.add('contenedor-tarea'); // Le asigno clase

    // En dependencia del tipo de prioridad se le asigna una clase para dar un color de fondo
    if (tarea.prioridad === 'urgente') {
        divContenedor.classList.add('prioridad-urgente');
    } else if (tarea.prioridad === 'diaria') {
        divContenedor.classList.add('prioridad-diaria');
    } else if (tarea.prioridad === 'mensual') {
        divContenedor.classList.add('prioridad-mensual');
    }

    divContenedor.id = tarea.idTarea; // Sele asigna un id, que es un string

    // Crear span
    const divTarea = document.createElement('div');
    divTarea.textContent = tarea.tarea; // Se escribe la tarea a realizar


    // Creo el botón
    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.classList.add('btn', 'btn-danger');

    // Evento: cuando haga click en el botón borra el ojeto del array y del DOM
    button.addEventListener('click', () => {
        const id = parseInt(divContenedor.id);
        // Eliminar del array
        listaTareas = listaTareas.filter(t => t.idTarea !== id); //Devuelve un nuevo array sin el elemnto que se desea eliminar
        // Eliminar del DOM
        divContenedor.remove();
    });

    divContenedor.append(divTarea, button); // Incorporo el botón y el contenedor con texto al al contenedor padre
    listado.append(divContenedor); // Incorporo el contenedor al listado
}


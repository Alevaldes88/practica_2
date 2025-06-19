// _______Declaración de variables globales_______
const formulario = document.querySelector('form'); // Para rescatar los valores del select y el imput
const listado = document.querySelector('#listado'); // Donde se pintará el listado de tareas 
const filtroPrioridad = document.querySelector('#filtro-prioridad'); // Para rescatar el valor del selector de búsquedad
const buscadorTarea = document.querySelector('#buscador-tarea'); // Para rescatar el valor del input que filtra la búsqueda

// Contador de tarea que utilizaré para generar un id siempre diferente. Se iniciará con el valor de la longitud del array.
// Se irá incrementando en uno cada vez que incorpore una tarea nueva, garantizando que aunque se eliminen tareas no se repita ningún id.
let contadorTareas = listaTareas.length;

pintarLista(listaTareas); // Comienza pintando la lista de tareas con la que abre mi app

// _______Eventos________

// Cuando haga submit guarda la tarea para pintar la nueva lista 
formulario.addEventListener('submit', guardarTarea);

// Cuando seleccione 
filtroPrioridad.addEventListener('change', filtrarTareas);
buscadorTarea.addEventListener('input', filtrarTareas);

// ______Funciones_______

// Función guardarTarea
function guardarTarea(event) {
    event.preventDefault(); //Invalido el evento sumit por defecto

    // Guardo en variables lo que se escribe en el input y la prioridad seleccionada en el select
    const tarea = formulario.tarea.value;
    const prioridad = formulario.prioridad.value;
    // Verifico que siempre se escriba algo en el input y se seleccione una prioridad  
    if (tarea === '' || prioridad === '') {
        alert('Por favor, completa todos los campos.'); // De no ser así saltga esta alerta al hacer sumit y retorno para que no se ejecute la secuencia que continúa
        return;
    }
    // Guardo la nueva tarea en un objeto
    const nuevaTarea = {
        idTarea: contadorTareas,
        tarea: tarea,
        prioridad: prioridad
    }
    // Cada vez que se guarde una nueva tarea se aumenta el contador en 1 para que ningún id se repita mientras se está corriendo la app
    contadorTareas++;
    // Incorporo el objeto al final del array
    listaTareas.push(nuevaTarea)

    // Ejecuto la función pintarLista
    pintarLista(listaTareas);

    formulario.reset(); // Limpio los campos del formulario
}

// Función pintarLista
function pintarLista(lista) {
    listado.innerHTML = '';  // Vacío el div con id = "listado" para que no se sobreescriba nada y simpre volver a pintar en limpio
    for (let t of lista) {
        pintarTarea(t); // Pinto una por una de las tareas, garantizando así que se pinte toda la lista 
    }
}


// Función PintarTarea
function pintarTarea(tarea) {
    // Creo un elemento contenedor para la tarea y el botón de eliminar
    const divContenedor = document.createElement('div');
    divContenedor.classList.add('contenedor-tarea'); // Se asigna una clase que se atacaá desde el CSS para darele estilo

    // En dependencia del tipo de prioridad se le asigna la clase que definirá el color de fondo para atacarla desde el CSS
    if (tarea.prioridad === 'urgente') {
        divContenedor.classList.add('prioridad-urgente');
    } else if (tarea.prioridad === 'diaria') {
        divContenedor.classList.add('prioridad-diaria');
    } else if (tarea.prioridad === 'mensual') {
        divContenedor.classList.add('prioridad-mensual');
    }

    divContenedor.id = tarea.idTarea; // Se le asigna un id, que se almacena como string

    // Se crea un div que contiene la tarea
    const divTarea = document.createElement('div');
    divTarea.textContent = tarea.tarea; // Se escribe la tarea a realizar


    // Se crea el botón
    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.classList.add('btn', 'btn-danger'); // Se le asignan clases propias de Bootstrap para su estilo

    // Evento: cuando haga click en el botón se borra el ojeto del array y del DOM
    button.addEventListener('click', () => {
        const id = parseInt(divContenedor.id); // Convierto el id del contenedor padre a un valor numérico para utilizarlo posteriormente en la comparación del filter
        // Eliminar del array
        listaTareas = listaTareas.filter(t => t.idTarea !== id); //Devuelve un nuevo array sin el elemnto que se desea eliminar para que cuando se vuelva a ejecutar el evento guardar, la lista esté actualizada.
        // Eliminar del DOM
        divContenedor.remove();
    });

    divContenedor.append(divTarea, button); // Incorporo el botón y el contenedor con la tarea a almacenar al contenedor padre
    listado.append(divContenedor); // Incorporo el contenedor padre al listado
}


// // Función filtarTareas
function filtrarTareas() {
    const textoBusqueda = buscadorTarea.value.toLowerCase(); // Recupero el valor de buscador del input convertido a minúsculas

    let tareasFiltradas = listaTareas; // Le paso el array a otra variable para no modificarlo 

    if (filtroPrioridad.value !== '') {
        tareasFiltradas = tareasFiltradas.filter(t => t.prioridad === filtroPrioridad.value); // Busco dentro del array todas aquellas tareas cuyo valor de prioridad sea igual al valor de la prioridad seleccionada en el selector para poder pintarlas en el DOM
    }

    if (textoBusqueda !== '') {
        tareasFiltradas = tareasFiltradas.filter(t => t.tarea.toLowerCase().includes(textoBusqueda)); // Busco dentro del array todas aquellas tareas cuyo valor de la clave tarea pasado a minúsculas incluya el valor del texto introducido a través del input de búsqueda para poder pintarlas en el DOM

    }

    pintarLista(tareasFiltradas); // Pinto la lista filtrada
}


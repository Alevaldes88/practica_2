# practica_2


Practica TODO Javascript
Instrucciones
Para esta practica debemos realizar una aplicación web basada en la creación de una app que almacene TAREAS(TODO’s) Y que me permita filtrar dichas tareas por prioridad de la tarea y ademas tendrá un buscador por palabras que me permitirá buscar la tarea por la palabra que contenga esa input.

Lo primero es encapsular la función de pintar las tareas en el interfaz según el siguiente modelo.

const listaTareas = [
  { idTarea: 0, titulo: 'Estudiar Javascript', prioridad: 'urgente' },
  { idTarea: 1, titulo: 'Dormir', prioridad: 'diaria' },
  { idTarea: 2, titulo: 'Salir a comer', prioridad: 'mensual' }
];


Podéis poner las tareas iniciales que os de la gana.

La aplicación podrá borrar, añadir tareas.

También podrá filtrar por prioridad dichas tareas. La prioridad es URGENTE, DIARIA y MENSUAL.

Cada tarea tendrá asociado un color que se la asignará en el momento de la creación.

La aplicación deberá tener en cuenta diferentes tipos de eventos, los filtros reaccionará al cambio (change) y el campo de búsqueda al evento de pulsar el intro o le podéis poner un boton.

La aplicación deberá guardar el listado de tareas en el array que esta disponible en el modelo.

Se puede usar cualquier técnica vista en clase e incluso las que podáis investigar, siempre que os ayuden.

La aplicación tiene que tener más o menos este aspecto.

// JSON de ejemplo
const datos = { 
    "proyectos": [
        {
            "id": 1,
            "nombre": "Proyecto Clínica Odontológica",
            "descripcion": "Desarrollo de un sistema de gestión para la clínica odontológica",
            "tareas": [
                {
                    "id": 1,
                    "nombre": "Diseñar la base de datos",
                    "descripcion": "Definir las tablas, campos y relaciones para almacenamiento",
                    "estado_completado": false,
                    "fecha_limite": "2024-12-01"
                },
                {
                    "id": 2,
                    "nombre": "Implementar backend",
                    "descripcion": "Crear las APIs necesarias para gestionar las operaciones",
                    "estado_completado": false,
                    "fecha_limite": "2024-12-15"
                },
                {
                    "id": 3,
                    "nombre": "Diseño de UI/UX",
                    "descripcion": "Desarrollar una interfaz amigable para la gestión",
                    "estado_completado": true,
                    "fecha_limite": "2024-11-20"
                }
            ]
        }
    ]
};

// Referencia al contenedor principal
const contenedor = document.getElementById('contenedor-proyectos');

// Función para renderizar los proyectos y sus tareas
function renderizarProyectos(data) {
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de renderizar

    data.proyectos.forEach(proyecto => {
        // Crear contenedor de proyecto
        const proyectoDiv = document.createElement('div');
        proyectoDiv.classList.add('proyecto');
        proyectoDiv.innerHTML = `
            <h2>${proyecto.nombre}</h2>
            <p>${proyecto.descripcion}</p>
        `;

        // Crear tabla para tareas
        const tabla = document.createElement('table');
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Fecha Límite</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        // Llenar la tabla con las tareas
        const tbody = tabla.querySelector('tbody');
        proyecto.tareas.forEach(tarea => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${tarea.id}</td>
                <td class="${tarea.estado_completado ? 'completed' : ''}">${tarea.nombre}</td>
                <td>${tarea.descripcion}</td>
                <td>${tarea.estado_completado ? 'Completado' : 'Pendiente'}</td>
                <td>${tarea.fecha_limite}</td>
                <td><button class="eliminar">Eliminar</button></td>
            `;

            // Agregar evento para eliminar tarea
            fila.querySelector('.eliminar').addEventListener('click', () => {
                proyecto.tareas = proyecto.tareas.filter(t => t.id !== tarea.id);
                renderizarProyectos(datos); // Volver a renderizar
            });

            tbody.appendChild(fila);
        });

        // Crear formulario para agregar nuevas tareas
        const form = document.createElement('form');
        form.innerHTML = `
            <input type="text" placeholder="Nombre de la tarea" id="nombre-tarea" required>
            <input type="text" placeholder="Descripción de la tarea" id="descripcion-tarea" required>
            <input type="date" id="fecha-limite-tarea" required>
            <button type="submit">Agregar Tarea</button>
        `;

        // Evento para agregar nueva tarea
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nuevaTarea = {
                id: proyecto.tareas.length + 1,
                nombre: form.querySelector('#nombre-tarea').value,
                descripcion: form.querySelector('#descripcion-tarea').value,
                estado_completado: false,
                fecha_limite: form.querySelector('#fecha-limite-tarea').value
            };

            proyecto.tareas.push(nuevaTarea);
            renderizarProyectos(datos); // Volver a renderizar
        });

        // Añadir tabla y formulario al proyecto
        proyectoDiv.appendChild(tabla);
        proyectoDiv.appendChild(form);

        contenedor.appendChild(proyectoDiv);
    });
}

// Llamar a la función para renderizar
renderizarProyectos(datos);

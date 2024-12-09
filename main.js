document.addEventListener('DOMContentLoaded', () => {
    // Evento para agregar lista
    document.getElementById('add-list').addEventListener('click', () => {
        const board = document.querySelector('.board');
        const cantidadListas = board.querySelectorAll('.list').length + 1;
        
        const nuevaLista = document.createElement('section');
        nuevaLista.classList.add('list');
        nuevaLista.innerHTML = `
            <div class="list__header">
                <h2 class="list__title">Lista ${cantidadListas}</h2>
                <button class="btn--danger delete-list">
                    <i class="material-icons">delete</i>
                </button>
            </div>
            <div class="list__content">
                <div class="list__tasks"></div>
                <div class="list__content__add-task">
                    <button class="btn--primary add-task">
                        <i class="material-icons">add_task</i>
                        Agregar Tarea
                    </button>
                </div>
            </div>
        `;
        board.appendChild(nuevaLista);
    });

    // Evento delegado para eliminar listas
    document.querySelector('.board').addEventListener('click', (e) => {
        if (e.target.closest('.delete-list')) {
            e.target.closest('.list').remove();
        }
    });

    // Evento delegado para agregar tareas
    document.querySelector('.board').addEventListener('click', (e) => {
        if (e.target.closest('.add-task')) {
            const contenedorTareas = e.target.closest('.list__content').querySelector('.list__tasks');
            const cantidadTareas = contenedorTareas.children.length + 1;
            
            const nuevaTarea = document.createElement('div');
            nuevaTarea.classList.add('task');
            nuevaTarea.innerHTML = `
                <div class="task__name">
                    <p id="name">Tarea ${cantidadTareas}</p>
                </div>
                <div class="task__buttons">
                    <button class="btn--success complete-task">
                        <i class="material-icons">check</i>
                    </button>
                    <button class="btn--danger delete-task">
                        <i class="material-icons">delete</i>
                    </button>
                </div>
            `;
            contenedorTareas.appendChild(nuevaTarea);
        }
    });

    // Evento delegado para eliminar tareas
    document.querySelector('.board').addEventListener('click', (e) => {
        if (e.target.closest('.delete-task')) {
            e.target.closest('.task').remove();
        }
    });

    // Evento delegado para completar tareas
    document.querySelector('.board').addEventListener('click', (e) => {
        if (e.target.closest('.complete-task')) {
            const tarea = e.target.closest('.task');
            tarea.classList.toggle('completed');
        }
    });
});
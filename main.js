document.addEventListener('DOMContentLoaded', () => {
    // Función para crear modal genérico
    function crearModal(titulo, placeholderTexto, callback) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${titulo}</h2>
                <input type="text" placeholder="${placeholderTexto}" id="modal-input">
                <div class="modal-buttons">
                    <button id="modal-confirm">Confirmar</button>
                    <button id="modal-cancel">Cancelar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const confirmar = modal.querySelector('#modal-confirm');
        const cancelar = modal.querySelector('#modal-cancel');
        const input = modal.querySelector('#modal-input');

        confirmar.addEventListener('click', () => {
            if (input.value.trim()) {
                callback(input.value);
                modal.remove();
            }
        });

        cancelar.addEventListener('click', () => {
            modal.remove();
        });
    }

    // Evento para agregar lista con modal
    document.getElementById('add-list').addEventListener('click', () => {
        crearModal(
            'Nombre de la Lista', 
            'Introduce un nombre para la lista',
            (nombreLista) => {
                const board = document.querySelector('.board');
                const nuevaLista = document.createElement('section');
                nuevaLista.classList.add('list');
                nuevaLista.innerHTML = `
                    <div class="list__header">
                        <h2 class="list__title">${nombreLista}</h2>
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
            }
        );
    });

    // Evento delegado para eliminar listas
    document.querySelector('.board').addEventListener('click', (e) => {
        if (e.target.closest('.delete-list')) {
            e.target.closest('.list').remove();
        }
    });

    // Evento delegado para agregar tareas con modal
    document.querySelector('.board').addEventListener('click', (e) => {
        if (e.target.closest('.add-task')) {
            crearModal(
                'Nombre de la Tarea', 
                'Introduce un nombre para la tarea',
                (nombreTarea) => {
                    const contenedorTareas = e.target.closest('.list__content').querySelector('.list__tasks');
                    const nuevaTarea = document.createElement('div');
                    nuevaTarea.classList.add('task');
                    nuevaTarea.innerHTML = `
                        <div class="task__name">
                            <p id="name">${nombreTarea}</p>
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
            );
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
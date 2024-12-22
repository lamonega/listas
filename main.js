document.addEventListener("DOMContentLoaded", () => {
  // Función para crear modal genérico

  function crearModal(titulo, placeholderTexto, callback) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
            <div class="modal-content">
                <h2>${titulo}</h2>
                <input type="text" placeholder="${placeholderTexto}" id="modal-input">
                <div class="modal-buttons">
                    <button id="modal-cancel">Cancelar</button>
                    <button id="modal-confirm">Confirmar</button>
                </div>
            </div>
        `;
    document.body.appendChild(modal);

    const confirmar = modal.querySelector("#modal-confirm");
    const cancelar = modal.querySelector("#modal-cancel");
    const input = modal.querySelector("#modal-input");

    confirmar.addEventListener("click", () => {
      if (input.value.trim()) {
        callback(input.value);
        modal.remove();
      }
    });

    cancelar.addEventListener("click", () => {
      modal.remove();
    });
  }

  // Evento para agregar lista con modal
  document.getElementById("add-list").addEventListener("click", () => {
    crearModal(
      "Nombre de la Lista",
      "Introduce un nombre para la lista",
      (nombreLista) => {
        const board = document.querySelector(".board");
        const nuevaLista = document.createElement("section");
        nuevaLista.classList.add("list");
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
  document.querySelector(".board").addEventListener("click", (e) => {
    if (e.target.closest(".delete-list")) {
      e.target.closest(".list").remove();
    }
  });

  // Evento delegado para agregar tareas con modal
  document.querySelector(".board").addEventListener("click", (e) => {
    if (e.target.closest(".add-task")) {
      crearModal(
        "Nombre de la Tarea",
        "Introduce un nombre para la tarea",
        (nombreTarea) => {
          const contenedorTareas = e.target
            .closest(".list__content")
            .querySelector(".list__tasks");
          const nuevaTarea = document.createElement("div");
          nuevaTarea.classList.add("task");
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
  document.querySelector(".board").addEventListener("click", (e) => {
    if (e.target.closest(".delete-task")) {
      e.target.closest(".task").remove();
    }
  });

  // Evento delegado para completar tareas
  document.querySelector(".board").addEventListener("click", (e) => {
    if (e.target.closest(".complete-task")) {
      const tarea = e.target.closest(".task");
      tarea.classList.toggle("completed");
    }
  });

  // Función para crear el modal del autor
  function crearModalAutor() {
    const modal = document.createElement("div");
    modal.classList.add("author-modal");
    modal.innerHTML = `
            <div class="author-modal-content">
                <span class="author-modal-close">&times;</span>
                
                <div class="author-profile">
                    <img src="https://media.licdn.com/dms/image/v2/D4E03AQGvbTLJlz9gsA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1701826695685?e=1740614400&v=beta&t=aRND3JTMI90GMrFGaCZy9kPikXa-LWOBtO6zcpEQ5AE" alt="Laureano Lamonega">
                    <h2>Laureano Lamonega</h2>
                    <p>Estudiante de Analista en TIC @ Fac. de Informática UNLP. Desarrollador web full-stack autodidacta.</p>
                </div>
    
                <div class="author-links">
                    <a href="https://github.com/lamonega" target="_blank" class="btn--primary">
                        <i class="material-icons">code</i> GitHub
                    </a>
                </div>
    
                <form class="contact-form" id="contact-form">
                    <input type="hidden" name="contact_number" value="${
                      (Math.random() * 100000) | 0
                    }">
                    <input type="text" name="user_name" placeholder="Tu nombre" required>
                    <input type="email" name="user_email" placeholder="Tu email" required>
                    <textarea name="message" placeholder="Tu mensaje" required rows="4"></textarea>
                    <button type="submit">
                        <i class="material-icons">send</i> Enviar mensaje
                    </button>
                </form>
            </div>
        `;

    document.body.appendChild(modal);

    // Cerrar modal
    modal.querySelector(".author-modal-close").addEventListener("click", () => {
      modal.remove();
    });

    // Cerrar modal al hacer clic fuera
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Manejar envío del formulario
    modal
      .querySelector("#contact-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        const submitButton = this.querySelector("button");
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<i class="material-icons">hourglass_empty</i> Enviando...';

        emailjs
          .sendForm("listas", "template_listas", this, "ZxDb--Jfn_YASD9HJ")
          .then(() => {
            alert("¡Mensaje enviado con éxito!");
            this.reset();
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error al enviar el mensaje. Por favor, intenta nuevamente.");
          })
          .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML =
              '<i class="material-icons">send</i> Enviar mensaje';
          });
      });
  }

  // Agregar evento al link del autor
  document.getElementById("author-info").addEventListener("click", (e) => {
    e.preventDefault();
    crearModalAutor();
  });
});

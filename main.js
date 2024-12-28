document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".board");
  const addListBtn = document.getElementById("add-list");
  const authorInfo = document.getElementById("author-info");

  // Función para crear modales genéricos
  function crearModal(titulo, placeholderTexto, callback) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal-content">
        <h2>${titulo}</h2>
        <input type="text" placeholder="${placeholderTexto}" id="modal-input">
        <div class="modal-buttons">
          <button id="modal-cancel" class="btn--danger">Cancelar</button>
          <button id="modal-confirm" class="btn--success">Confirmar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const confirmar = modal.querySelector("#modal-confirm");
    const cancelar = modal.querySelector("#modal-cancel");
    const input = modal.querySelector("#modal-input");

    confirmar.addEventListener("click", () => {
      const valor = input.value.trim();
      if (valor) {
        callback(valor);
        modal.remove();
      }
    });

    cancelar.addEventListener("click", () => {
      modal.remove();
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  // Función para crear una nueva lista
  function crearNuevaLista(nombreLista) {
    const lista = document.createElement("section");
    lista.classList.add("list");
    lista.innerHTML = `
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
    board.appendChild(lista);
  }

  // Función para crear una nueva tarea
  function crearNuevaTarea(nombreTarea, contenedorTareas) {
    const tarea = document.createElement("div");
    tarea.classList.add("task");
    tarea.innerHTML = `
      <div class="task__name">
        <p>${nombreTarea}</p>
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
    contenedorTareas.appendChild(tarea);
  }

  // Event Listener para agregar nuevas listas
  addListBtn.addEventListener("click", () => {
    crearModal(
      "Nombre de la Lista",
      "Introduce un nombre para la lista",
      (nombreLista) => {
        crearNuevaLista(nombreLista);
      }
    );
  });

  // Delegación de eventos en el tablero para manejar listas y tareas
  board.addEventListener("click", (e) => {
    const boton = e.target.closest("button");

    if (!boton) return; // Si no se hizo clic en un botón, salir

    // Eliminar lista
    if (boton.classList.contains("delete-list")) {
      const lista = boton.closest(".list");
      lista.remove();
    }

    // Agregar tarea
    else if (boton.classList.contains("add-task")) {
      crearModal(
        "Nombre de la Tarea",
        "Introduce un nombre para la tarea",
        (nombreTarea) => {
          const contenedorTareas = boton
            .closest(".list__content")
            .querySelector(".list__tasks");
          crearNuevaTarea(nombreTarea, contenedorTareas);
        }
      );
    }

    // Eliminar tarea
    else if (boton.classList.contains("delete-task")) {
      const tarea = boton.closest(".task");
      tarea.remove();
    }

    // Completar tarea
    else if (boton.classList.contains("complete-task")) {
      const tarea = boton.closest(".task");
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
          <input type="hidden" name="contact_number" value="${Math.floor(
            Math.random() * 100000
          )}">
          <input type="text" name="user_name" placeholder="Tu nombre" required>
          <input type="email" name="user_email" placeholder="Tu email" required>
          <textarea name="message" placeholder="Tu mensaje" required rows="4"></textarea>
          <button type="submit" class="btn--primary">
            <i class="material-icons">send</i> Enviar mensaje
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    // Cerrar modal
    const cerrarModal = () => modal.remove();
    modal
      .querySelector(".author-modal-close")
      .addEventListener("click", cerrarModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });

    // Manejar envío del formulario
    const formulario = modal.querySelector("#contact-form");
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      const botonEnviar = formulario.querySelector("button");
      botonEnviar.disabled = true;
      botonEnviar.innerHTML =
        '<i class="material-icons">hourglass_empty</i> Enviando...';

      emailjs
        .sendForm("listas", "template_listas", formulario, "ZxDb--Jfn_YASD9HJ")
        .then(() => {
          alert("¡Mensaje enviado con éxito!");
          formulario.reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error al enviar el mensaje. Por favor, intenta nuevamente.");
        })
        .finally(() => {
          botonEnviar.disabled = false;
          botonEnviar.innerHTML =
            '<i class="material-icons">send</i> Enviar mensaje';
        });
    });
  }

  // Event Listener para abrir el modal del autor
  authorInfo.addEventListener("click", (e) => {
    e.preventDefault();
    crearModalAutor();
  });
});

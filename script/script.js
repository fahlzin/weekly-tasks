let mainTitle = document.querySelector("h1");
mainTitle.innerText = "WEEKLY-TASKS";

const dayNames = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const days = document.querySelectorAll(".day");

// === Funções de armazenamento ===
function saveTasks() {
  const data = {};
  days.forEach((item, index) => {
    const tasks = [...item.querySelectorAll(".taskText")].map(t => t.textContent);
    data[dayNames[index]] = tasks;
  });
  localStorage.setItem("weeklyTasks", JSON.stringify(data));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("weeklyTasks")) || {};
  days.forEach((item, index) => {
    const tasks = saved[dayNames[index]] || [];
    const taskList = item.querySelector(".taskList");
    tasks.forEach(text => addTaskToList(taskList, text));
  });
}

// === Criação dos elementos de cada dia ===
days.forEach((item, index) => {
  const dayTitle = document.createElement("h2");
  dayTitle.textContent = dayNames[index];
  item.appendChild(dayTitle);

  const listBox = document.createElement("div");
  listBox.classList.add("list-box");
  item.appendChild(listBox);

  const input = document.createElement("input");
  input.classList.add("addTask");
  input.type = "text";
  input.placeholder = "Incluir tarefa...";
  input.setAttribute('enterkeyhint', 'done');
  listBox.appendChild(input);

  const taskList = document.createElement("ul");
  taskList.classList.add("taskList");
  listBox.appendChild(taskList);

  // evento de adicionar tarefa
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      const taskText = input.value.trim();
      if (taskText === "") return;
      addTaskToList(taskList, taskText);
      input.value = "";
      saveTasks();
    }
  });
});

// === Criação do item de tarefa com drag & drop ===
function addTaskToList(taskList, text) {
  const li = document.createElement("li");
  li.classList.add("taskItem");
  li.setAttribute("draggable", "true"); // permite arrastar

  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.classList.add("taskText");
  span.textContent = text;

  li.appendChild(checkbox);
  li.appendChild(span);
  taskList.appendChild(li);

  // animação e remoção
  checkbox.addEventListener("change", () => {
    li.classList.add("done");
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 500);
  });

  // eventos de arrastar
  li.addEventListener("dragstart", () => li.classList.add("dragging"));
  li.addEventListener("dragend", () => {
    li.classList.remove("dragging");
    saveTasks();
  });

  taskList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) taskList.appendChild(dragging);
    else taskList.insertBefore(dragging, afterElement);
  });
}

// calcula posição correta para soltar o item
function getDragAfterElement(container, y) {
  const elements = [...container.querySelectorAll(".taskItem:not(.dragging)")];
  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// === carregar tarefas ao iniciar ===
loadTasks();

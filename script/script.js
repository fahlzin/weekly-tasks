let mainTitle = document.querySelector('h1');
mainTitle.innerText = 'WEEKLY-TASKS';

const dayNames = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const days = document.querySelectorAll('.day');

days.forEach((item, index) => {
  const dayTitle = document.createElement('h2');
  dayTitle.textContent = dayNames[index];
  item.appendChild(dayTitle);

  const listBox = document.createElement('div');
  listBox.classList.add('list-box')
  item.appendChild(listBox);

  // campo de input
  const input = document.createElement('input');
  input.classList.add('addTask');
  input.type = 'text';
  input.placeholder = 'Incluir tarefa ( Enter )';
  listBox.appendChild(input);

  // lista de tarefas
  const taskList = document.createElement('ul');
  taskList.classList.add('taskList');
  listBox.appendChild(taskList);

  // adicionar tarefa ao pressionar ENTER
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const taskText = input.value.trim();
      if (taskText === '') return;

      // criar li com checkbox
      const li = document.createElement('li');
      li.classList.add('taskItem');
      const checkbox = document.createElement('input');
      checkbox.classList.add('checkbox');
      checkbox.type = 'checkbox';

      // quando marcado, remove o item
      checkbox.addEventListener('change', () => {
      li.classList.add('done');

      setTimeout(() => li.remove(), 500);
});

      li.appendChild(checkbox);
      const span = document.createElement('span');
      span.classList.add('taskText');
      span.textContent = taskText;
      li.appendChild(span);
      taskList.appendChild(li);

      input.value = '';
    }
  });
});
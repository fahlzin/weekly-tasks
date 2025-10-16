let mainTitle = document.querySelector('h1');
mainTitle.innerText = 'WEEKLY-TASKS';

const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
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
  input.type = 'text';
  input.placeholder = 'Incluir tarefa (Enter)';
  listBox.appendChild(input);

  // lista de tarefas
  const taskList = document.createElement('ul');
  listBox.appendChild(taskList);

  // adicionar tarefa ao pressionar ENTER
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const taskText = input.value.trim();
      if (taskText === '') return;

      // criar li com checkbox
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      // quando marcado, remove o item
      checkbox.addEventListener('change', () => li.remove());

      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(taskText));
      taskList.appendChild(li);

      input.value = '';
    }
  });
});
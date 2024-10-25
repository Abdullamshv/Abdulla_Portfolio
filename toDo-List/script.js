const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");
form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", crossTask);

let tasks = [];
checkEmptyList();
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(task => {
  const cssClass = task.done ? "task-title--done" : "task-title";

  const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
              <button class="btn-action" type="button" data-action="done">
                <img
                  src="./Sources/tick.svg"
                  alt="Done"
                  width="18"
                  height="18"
                />
              </button>
              <button class="btn-action" type="button" data-action="delete">
                <img
                  src="./Sources/cross.svg"
                  alt="Done"
                  width="18"
                  height="18"
                />
              </button>
            </div>
          </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
});

function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false //по умолчанию задача не выполнена
  };

  tasks.push(newTask);

  const cssClass = newTask.done ? "task-title--done" : "task-title";

  const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${newTask.text}</span>
            <div class="task-item__buttons">
              <button class="btn-action" type="button" data-action="done">
                <img
                  src="./Sources/tick.svg"
                  alt="Done"
                  width="18"
                  height="18"
                />
              </button>
              <button class="btn-action" type="button" data-action="delete">
                <img
                  src="./Sources/cross.svg"
                  alt="Done"
                  width="18"
                  height="18"
                />
              </button>
            </div>
          </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
  taskInput.value = "";
  taskInput.focus();
  // saveToLS();
  checkEmptyList();
  saveToLocalStorage();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;
  const parentNode = event.target.closest(".list-group-item");

  const id = parentNode.id;

  const index = tasks.findIndex(task => task.id == id);

  tasks.splice(index, 1);

  parentNode.remove();

  // saveToLS();

  saveToLocalStorage();
}

function crossTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".list-group-item");
  const id = parentNode.id;
  const task = tasks.find(task => task.id == id);
  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");

  // saveToLS();
  saveToLocalStorage();
}

//Dirty and simple way to save tasks to LS
// if (localStorage.getItem("tasksLi")) {
//   tasksList.innerHTML = localStorage.getItem("tasksLi");
// }
// function saveToLS() {
//   localStorage.setItem("tasksLi", tasksList.innerHTML);
// }

function checkEmptyList() {
  if (tasks.length == 0) {
    const emptyList = `          <li class="list-group-item empty-list" id="emptyList">
            <img src="./Sources/leaf.svg" alt="empty" width="48" class="mt-3" />
            <div class="empty-list__title">List is empty</div>
          </li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyList);
  }

  if (tasks.Length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

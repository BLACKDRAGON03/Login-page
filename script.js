const taskInput = document.getElementById("add-todo");
const doingInput = document.getElementById("add-doing");
const doneInput = document.getElementById("add-done");
const todoList = document.querySelector(".todo-list");
const doingList = document.querySelector(".doing-list");
const doneList = document.querySelector(".done-list");

const addDrag = () => {
  const draggedElements = document.querySelectorAll(".li");
  const containers = document.querySelectorAll(".list");

  draggedElements.forEach((element) => {
    element.addEventListener("dragstart", () => {
      element.classList.add("dragging");
    });

    element.addEventListener("dragend", () => {
      element.classList.remove("dragging");
      saveStuff();
    });
  });

  containers.forEach((container) =>
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggedElement = document.querySelector(".dragging");
      const afterElement = getAfterElement(container, e.clientY);
      if (afterElement == null) {
        container.appendChild(draggedElement);
      } else {
        container.insertBefore(draggedElement, afterElement);
      }
    })
  );

  const getAfterElement = (container, y) => {
    const nonDraggingElements = [
      ...container.querySelectorAll(".li:not(.dragging)"),
    ];

    return nonDraggingElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };
};

let tasks =
  JSON.parse(localStorage.getItem("tasks")) &&
  JSON.parse(localStorage.getItem("tasks"));

tasks &&
  tasks.forEach((task) => {
    switch (task.type) {
      case "todo":
        let newTask = document.createElement("li");
        newTask.innerHTML = `<span>${task.item}</span><i class="fa-solid fa-xmark"></i>`;
        newTask.setAttribute("draggable", "true");
        newTask.classList.add("li");
        todoList.appendChild(newTask);
        // addDrag();
        break;
      case "doing":
        let newTask1 = document.createElement("li");
        newTask1.innerHTML = `<span>${task.item}</span><i class="fa-solid fa-xmark"></i>`;
        newTask1.setAttribute("draggable", "true");
        newTask1.classList.add("li");
        doingList.appendChild(newTask1);
        // addDrag();
        break;
      case "done":
        let newTask2 = document.createElement("li");
        newTask2.innerHTML = `<span>${task.item}</span><i class="fa-solid fa-xmark"></i>`;
        newTask2.setAttribute("draggable", "true");
        newTask2.classList.add("li");
        doneList.appendChild(newTask2);
        // addDrag();
        break;
    }
  });

addDrag();

const enterPressDo = (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
};
const enterPressDoing = (e) => {
  if (e.key === "Enter") {
    addDoing();
  }
};
const enterPressDone = (e) => {
  if (e.key === "Enter") {
    addDone();
  }
};

const addTodo = () => {
  let task = taskInput.value.trim();
  if (!task) {
    return;
  }
  let taskText = document.createElement("span");
  taskText.innerText = task;
  let closeBtn = document.createElement("i");
  closeBtn.classList.add("fa-solid", "fa-xmark");
  let listItem = document.createElement("li");
  listItem.setAttribute("draggable", "true");
  listItem.classList.add("li");
  listItem.appendChild(taskText);
  listItem.appendChild(closeBtn);
  todoList.appendChild(listItem);
  taskInput.value = "";
  taskInput.focus();
  addDrag();
  saveStuff();
};

const addDoing = () => {
  let task = doingInput.value.trim();
  if (!task) {
    return;
  }
  let taskText = document.createElement("span");
  taskText.innerText = task;
  let closeBtn = document.createElement("i");
  closeBtn.classList.add("fa-solid", "fa-xmark");
  let listItem = document.createElement("li");
  listItem.setAttribute("draggable", "true");
  listItem.classList.add("li");
  listItem.appendChild(taskText);
  listItem.appendChild(closeBtn);
  doingList.appendChild(listItem);
  doingInput.value = "";
  doingInput.focus();
  addDrag();
  saveStuff();
};

const addDone = () => {
  let task = doneInput.value.trim();
  if (!task) {
    return;
  }
  let taskText = document.createElement("span");
  taskText.innerText = task;
  let closeBtn = document.createElement("i");
  closeBtn.classList.add("fa-solid", "fa-xmark");
  let listItem = document.createElement("li");
  listItem.setAttribute("draggable", "true");
  listItem.classList.add("li");
  listItem.appendChild(taskText);
  listItem.appendChild(closeBtn);
  doneList.appendChild(listItem);
  doneInput.value = "";
  doneInput.focus();
  addDrag();
};

const removeTask = (e) => {
  if (e.target.tagName === "I") {
    e.target.parentElement.remove();
    saveStuff();
  }
};

const saveStuff = () => {
  tasks = [];
  document.querySelectorAll(".list").forEach((container) => {
    container.querySelectorAll(".li span").forEach((i) => {
      tasks.push({
        type: container.classList.contains("todo-list")
          ? "todo"
          : container.classList.contains("doing-list")
          ? "doing"
          : container.classList.contains("done-list")
          ? "done"
          : "uknown",

        item: i.innerText,
      });
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Event listeners
taskInput.addEventListener("keydown", enterPressDo);
doingInput.addEventListener("keydown", enterPressDoing);
doneInput.addEventListener("keydown", enterPressDone);

todoList.addEventListener("click", removeTask);

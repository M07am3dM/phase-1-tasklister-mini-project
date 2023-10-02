document.addEventListener("DOMContentLoaded", () => {
  //declarations
  const form = document.querySelector("form");
  const descriptionInput = document.getElementById("new-task-description");
  const taskList = document.getElementById("tasks");
  const toggleSort = document.getElementById("sort");
  const prioritySelect = document.getElementById("priority-select");
  const tasksArray = [];

  //this function : clear the task list and creates and appends based on the task array
  function renderTasks() {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    tasksArray.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task-item");
      const descriptionSpan = document.createElement("span");
      descriptionSpan.textContent = task.description;
      descriptionSpan.classList.add("task-description");
      listItem.appendChild(descriptionSpan);
      listItem.appendChild(task.editButton);
      listItem.appendChild(task.deleteButton);
      taskList.appendChild(listItem);

      descriptionSpan.style.color =
        task.priority === 1 ? "red" : task.priority === 2 ? "yellow" : "green";
    });
  }

  // function to create delete Button
  function createDeleteButton(description) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.background = "red";
    deleteButton.addEventListener("click", function () {
      const taskIndex = tasksArray.findIndex(
        (taskObj) => taskObj.description === description
      );
      if (taskIndex !== -1) {
        tasksArray.splice(taskIndex, 1);
        renderTasks();
      }
    });
    return deleteButton;
  }

  // function to create delete Button
  function createEditButton(description) {
    const editbButton = document.createElement("button");
    editbButton.textContent = "Edit";
    editbButton.style.background = "blue";
    editbButton.addEventListener("click", function () {
      const newDescription = prompt("Enter new description:", description);
      const taskIndex = tasksArray.findIndex(
        (taskObj) => taskObj.description === description
      );
      if (newDescription !== null && taskIndex !== -1) {
        tasksArray[taskIndex].description = newDescription;
        renderTasks();
      }
    });
    return editbButton;
  }

  let sort = true;

  //descending order
  toggleSort.addEventListener("click", () => {
    if (sort) tasksArray.sort((a, b) => a.priority - b.priority);
    else tasksArray.sort((a, b) => b.priority - a.priority);
    sort = !sort;
    renderTasks();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value;
    const priority = parseInt(prioritySelect.value);
    const deleteButton = createDeleteButton(description);
    const editButton = createEditButton(description);
    const task = { description, priority, deleteButton, editButton };
    tasksArray.push(task);

    renderTasks();

    descriptionInput.value = "";
  });
});

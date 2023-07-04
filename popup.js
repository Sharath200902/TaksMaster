document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");
  
    // Load tasks from storage
    chrome.storage.local.get("tasks", ({ tasks }) => {
      if (tasks) {
        tasks.forEach((task) => {
          addTaskToList(task);
        });
      }
    });
  
    addButton.addEventListener("click", () => {
      const taskText = taskInput.value;
      if (taskText) {
        addTaskToList(taskText);
        saveTask(taskText);
        taskInput.value = "";
      }
    });
  
    function addTaskToList(task) {
        const li = document.createElement("li");
        const bullet = document.createElement("span");
        bullet.innerHTML = "&#8226;"; // Unicode character for bullet (•)
        bullet.style.marginRight = "5px";
        li.appendChild(bullet);
        li.innerHTML += task;
        
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
          li.remove();
          removeTask(task);
        });
        
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
  
    function saveTask(task) {
      chrome.storage.local.get("tasks", ({ tasks }) => {
        tasks = tasks || [];
        tasks.push(task);
        chrome.storage.local.set({ tasks });
      });
    }
  
    function removeTask(task) {
      chrome.storage.local.get("tasks", ({ tasks }) => {
        tasks = tasks || [];
        const index = tasks.indexOf(task);
        if (index !== -1) {
          tasks.splice(index, 1);
          chrome.storage.local.set({ tasks });
        }
      });
    }
  });
  
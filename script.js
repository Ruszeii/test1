document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");
    const tasks = [];

    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("task-title").value;
        const priority = document.getElementById("task-priority").value;
        const status = document.querySelector('input[name="task-status"]:checked').value;

        if (title) {
            const task = {
                title,
                priority,
                status,
            };

            tasks.push(task);
            addTaskToDOM(task);
            taskForm.reset();
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement("li");
        li.className = `list-group-item ${task.priority}`;
        li.innerHTML = `
            <span class="task-title">${task.title}</span>
            <span class="task-priority">Priority: ${task.priority}</span>
            <span class="task-status">Status: ${task.status}</span>
            <button class="btn btn-danger float-right remove-button">Remove</button>
            <button class="btn btn-success float-right complete-button">Complete</button>
        `;

        if (task.status === "completed") {
            li.style.textDecoration = "line-through";
        }

        taskList.appendChild(li);
    }

    taskList.addEventListener("click", function (e) {
        const taskElement = e.target.closest("li");
        if (!taskElement) return;

        if (e.target.classList.contains("remove-button")) {
            removeTask(taskElement);
        } else if (e.target.classList.contains("complete-button")) {
            markAsComplete(taskElement);
        }
    });

    function removeTask(taskElement) {
        const taskIndex = Array.from(taskList.children).indexOf(taskElement);
        taskList.removeChild(taskElement);
        tasks.splice(taskIndex, 1);
    }

    function markAsComplete(taskElement) {
        const taskIndex = Array.from(taskList.children).indexOf(taskElement);
        const task = tasks[taskIndex];

        if (task.status === "completed") {
            task.status = "pending";
            taskElement.querySelector(".task-status").textContent = "Status: pending";
            taskElement.style.textDecoration = "none";
        } else {
            task.status = "completed";
            taskElement.querySelector(".task-status").textContent = "Status: completed";
            taskElement.style.textDecoration = "line-through";
        }
    }
});

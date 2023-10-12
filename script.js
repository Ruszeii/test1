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
            ${task.title}
            <span class="badge badge-danger float-right" onclick="removeTask(${tasks.length - 1})">Remove</span>
            <span class="badge badge-success float-right" onclick="markAsComplete(${tasks.length - 1})">Complete</span>
        `;

        if (task.status === "completed") {
            li.style.textDecoration = "line-through";
        }

        taskList.appendChild(li);
    }

    function removeTask(index) {
        taskList.removeChild(taskList.childNodes[index]);
        tasks.splice(index, 1);
    }

    function markAsComplete(index) {
        tasks[index].status = "completed";
        taskList.childNodes[index].style.textDecoration = "line-through";
    }
});

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
        <button class="btn btn-danger float-right" onclick="removeTask(this)">Remove</button>
        <button class="btn btn-success float-right" onclick="markAsComplete(this)">Complete</button>
    `;

    if (task.status === "completed") {
        li.style.textDecoration = "line-through";
    }

    taskList.appendChild(li);
}



    function removeTask(button) {
        const taskIndex = Array.from(taskList.children).indexOf(button.parentElement);
        taskList.removeChild(button.parentElement);
        tasks.splice(taskIndex, 1);
    }

    function markAsComplete(button) {
        const taskIndex = Array.from(taskList.children).indexOf(button.parentElement);
        tasks[taskIndex].status = "completed";
        button.parentElement.style.textDecoration = "line-through";
    }
});

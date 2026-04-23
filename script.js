
const currentUser = localStorage.getItem("loggedInUser");

if (!currentUser) {
    window.location.href = "login.html";
}


let tasks = JSON.parse(localStorage.getItem(currentUser + "_tasks")) || [];
let currentFilter = "all";


function saveTasks() {
    localStorage.setItem(currentUser + "_tasks", JSON.stringify(tasks));
}


function addTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const date = document.getElementById("taskDate").value;
    const priority = document.getElementById("priority").value;

    if (!title) {
        alert("Task cannot be empty");
        return;
    }

    tasks.push({
        id: Date.now(),
        title,
        date,
        priority,
        completed: false
    });

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDate").value = "";

    saveTasks();
    renderTasks();
}


function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filtered.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <small>${task.date || "No date"} | ${task.priority}</small>
            </div>

            <div>
                <button onclick="toggleTask(${task.id})">✔</button>
                <button onclick="editTask(${task.id})">✏</button>
                <button onclick="deleteTask(${task.id})">🗑</button>
            </div>
        `;

        if (task.completed) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        }

        list.appendChild(li);
    });

    updateStats();
}


function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );

    saveTasks();
    renderTasks();
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}


function editTask(id) {
    let newTitle = prompt("Edit task:");
    if (newTitle && newTitle.trim() !== "") {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, title: newTitle.trim() } : task
        );

        saveTasks();
        renderTasks();
    }
}


function filterTasks(filter) {
    currentFilter = filter;
    renderTasks();
}


function updateStats() {
    document.getElementById("totalTasks").innerText = tasks.length;
    document.getElementById("completedTasks").innerText =
        tasks.filter(t => t.completed).length;
    document.getElementById("pendingTasks").innerText =
        tasks.filter(t => !t.completed).length;
}


renderTasks();
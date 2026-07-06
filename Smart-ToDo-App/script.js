// ==========================================
// Smart To-Do App
// Developed by Nkosinathi Msimango
// ==========================================

// DOM Elements
const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const addTaskBtn = document.getElementById("add-task");

const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search");

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");

const emptyState = document.getElementById("empty-state");

const filterButtons = document.querySelectorAll(".filter");

const themeToggle = document.getElementById("theme-toggle");

// App Data
let tasks = [];

let currentFilter = "all";

// ================================
// Load Tasks
// ================================

function loadTasks() {

    const saved = localStorage.getItem("tasks");

    if (saved) {

        tasks = JSON.parse(saved);

    }

}

// ================================
// Save Tasks
// ================================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
// ================================
// Add Task
// ================================

addTaskBtn.addEventListener("click", () => {

    const title = taskInput.value.trim();

    if (title === "") {

        alert("Please enter a task.");

        return;

    }

    const task = {

        id: Date.now(),

        title: title,

        date: taskDate.value,

        priority: priority.value,

        category: category.value,

        completed: false

    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";

    taskDate.value = "";

});

// ================================
// Dashboard
// ================================

function updateDashboard() {

    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;

    pendingTasks.textContent =
        tasks.filter(task => !task.completed).length;

}
// ================================
// Render Tasks
// ================================

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Filter
    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(task => task.completed);

    }

    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(task => !task.completed);

    }

    // Search
    const search = searchInput.value.toLowerCase();

    filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(search)
    );

    if (filteredTasks.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className =
            "task" + (task.completed ? " completed" : "");

        li.innerHTML = `
            <div class="task-info">

                <h3>${task.title}</h3>

                <p>

                    <span class="priority ${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>

                    ${task.category}

                </p>

                <p>📅 ${task.date || "No due date"}</p>

            </div>

            <div class="actions">

                <button class="complete" onclick="toggleTask(${task.id})">
                    ✔
                </button>

                <button class="edit" onclick="editTask(${task.id})">
                    ✏
                </button>

                <button class="delete" onclick="deleteTask(${task.id})">
                    🗑
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

    updateDashboard();

}
// ================================
// Complete Task
// ================================

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });

    saveTasks();

    renderTasks();

}

// ================================
// Delete Task
// ================================

function deleteTask(id) {

    if (!confirm("Delete this task?")) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

}

// ================================
// Edit Task
// ================================

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    const newTitle = prompt("Edit task", task.title);

    if (newTitle === null) return;

    task.title = newTitle.trim();

    saveTasks();

    renderTasks();

}

// ================================
// Search
// ================================

searchInput.addEventListener("input", renderTasks);

// ================================
// Filters
// ================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});

// ================================
// Theme
// ================================

function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add("dark");

        themeToggle.textContent = "☀";

    }

}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeToggle.textContent = "☀";

    } else {

        localStorage.setItem("theme", "light");

        themeToggle.textContent = "🌙";

    }

});

// ================================
// Start App
// ================================

loadTasks();

loadTheme();

renderTasks();
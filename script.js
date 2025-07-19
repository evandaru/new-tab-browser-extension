document.addEventListener('DOMContentLoaded', () => {
    // Clock Logic
    const clockElement = document.getElementById('clock');
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // To-Do List Logic
    const todoForm = document.getElementById('todo-form');
    const todoContentInput = document.getElementById('todo-content');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveAndRenderTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            if (todo.done) {
                li.classList.add('done');
            }
            li.dataset.id = todo.id;

            // Buat elemen paragraf untuk teks
            const p = document.createElement('p');
            p.textContent = todo.content;

            // Buat tombol hapus
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerHTML = '×';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah event klik pada li tereksekusi
                deleteTodo(todo.id);
            });

            // Tambahkan paragraf dan tombol ke dalam li
            li.appendChild(p);
            li.appendChild(deleteBtn);

            // Tambahkan event listener ke seluruh item li untuk menandai selesai
            li.addEventListener('click', () => {
                toggleDone(todo.id);
            });

            todoList.appendChild(li);
        });
    }

    function addTodo(e) {
        e.preventDefault();
        const content = todoContentInput.value.trim();
        if (content) {
            todos.unshift({ id: Date.now(), content: content, done: false });
            todoContentInput.value = '';
            saveAndRenderTodos();
        }
    }

    function deleteTodo(id) {
        todos = todos.filter(t => t.id !== id);
        saveAndRenderTodos();
    }

    function toggleDone(id) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.done = !todo.done;
            saveAndRenderTodos();
        }
    }

    todoForm.addEventListener('submit', addTodo);
    renderTodos();

    // Pomodoro Timer Logic
    const pomodoroDisplay = document.getElementById('pomodoro-display');
    const startBtn = document.getElementById('pomodoro-start');
    const pauseBtn = document.getElementById('pomodoro-pause');
    const resetBtn = document.getElementById('pomodoro-reset');
    const fiveMinBtn = document.getElementById('pomodoro-5min');
    const tenMinBtn = document.getElementById('pomodoro-10min');
    const twentyFiveMinBtn = document.getElementById('pomodoro-25min');

    let timeRemaining = 25 * 60;
    let timerId = null;
    let isRunning = false;

    function updatePomodoroDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        pomodoroDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function setTimer(minutes) {
        pauseTimer();
        timeRemaining = minutes * 60;
        updatePomodoroDisplay();
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        timerId = setInterval(() => {
            timeRemaining--;
            updatePomodoroDisplay();
            if (timeRemaining <= 0) {
                clearInterval(timerId);
                isRunning = false;
                alert("Waktu fokus selesai!");
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerId);
        isRunning = false;
    }

    function resetTimer() {
        pauseTimer();
        timeRemaining = 25 * 60;
        updatePomodoroDisplay();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    fiveMinBtn.addEventListener('click', () => setTimer(5));
    tenMinBtn.addEventListener('click', () => setTimer(10));
    twentyFiveMinBtn.addEventListener('click', () => setTimer(25));

    updatePomodoroDisplay();
});
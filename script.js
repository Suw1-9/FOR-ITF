const STORAGE_KEY = "todos";
const DEFAULT_TODOS = ["Roblox", "PSCP", "MFIT", "Sleeping"];

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// ---------- Local Storage ----------
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      // first visit: seed with the original items
      return DEFAULT_TODOS.map((text) => ({ id: crypto.randomUUID(), text }));
    }
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Cannot read localStorage:", err);
    return [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (err) {
    console.error("Cannot write localStorage:", err);
  }
}

let todos = loadTodos();

// ---------- Render ----------
function render() {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    const span = document.createElement("span");
    span.textContent = todo.text; // textContent = safe from HTML injection

    const del = document.createElement("button");
    del.className = "del-btn";
    del.textContent = "ลบ";

    li.append(span, del);
    list.appendChild(li);
  });
}

// ---------- Actions ----------
function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: crypto.randomUUID(), text });
  saveTodos();
  render();
  input.value = "";
  input.focus();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

// ---------- Events ----------
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("del-btn")) {
    deleteTodo(e.target.closest("li").dataset.id);
  }
});

saveTodos(); // persists the default items on first load
render();

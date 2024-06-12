const addTaskBtn = document.getElementById('add-task-btn');
const dekTaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;

localStorage.tasks ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];

let todoItems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description" class="buttons">${task.description}
                <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-delete">Удалить</button>
            </div>
        </div>
    `
}

const filterTasks = () => {
    const activeTasks =  tasks.filter(item => item.completed == false);
    const completedTasks =  tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index); 
        });
        todoItems = document.querySelectorAll('.todo-item');
    }
}

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

fillHtmlList();

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItems[index].classList.add('checked');
    } else {
        todoItems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(dekTaskInput.value));
    updateLocal();
    fillHtmlList();
    dekTaskInput.value = '';
})

const deleteTask = index => {
    todoItems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500)  
}




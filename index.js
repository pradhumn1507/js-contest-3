const addSection = document.getElementById('add-section');
const itemName = document.getElementById('item-name');
const itemDate = document.getElementById('item-date');
const itemPriority = document.getElementById('item-priority');
const addButton = document.getElementById('add-button');
const todaysTasks = document.getElementById('todays-tasks-list');
const futuresTasks = document.getElementById('futures-tasks-list');
const completedTasks = document.getElementById('completed-tasks-list');



// let todoList = [];
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];


const addItem = (e) => {
    e.preventDefault();

    const newItem = {
        name: itemName.value,
        date: itemDate.value,
        priority: itemPriority.value,
        completed: false,
    }

    if (newItem.name != "" && newItem.date != "" && newItem.priority != "") {
        todoList.push(newItem);
    }

    localStorage.setItem('todoList', JSON.stringify(todoList));

    itemName.value = "";
    itemDate.date = "";
    itemPriority.priority = "";
    showTodoList();

    // todoList = JSON.parse(localStorage.getItem('todoList'));
    // console.log(todoList);
}

// todoList = JSON.parse(localStorage.getItem('todoList'));
console.log(todoList);



const deleteItem = (index) => {
    todoList.splice(index, 1);
    // console.log(todoList);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    showTodoList();
}


const taskComplete = (index) => {
    todoList[index].completed = !todoList[index].completed;
    localStorage.setItem('todoList', JSON.stringify(todoList));
    showTodoList();
}


const showTodoList = () => {
    todaysTasks.innerHTML = "";
    futuresTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    const today = new Date().toISOString().slice(0, 10)
    // console.log(today);

    todoList.forEach((element, index) => {
        const taskCard = document.createElement('div');

        taskCard.classList.add('task-card');
        if (element.date < today && !element.completed) {
            taskCard.classList.add('not-complete');
        } else if (element.completed) {
            taskCard.classList.add('compelted-tasks')
        }


        taskCard.innerHTML =
            `
                <span>${element.name}</span>
                <span>${element.date}</span>
      
                <span>Priority: ${element.priority}</span>
            <div>
                <button class="buttons" onclick="taskComplete(${index})">
                    ${element.completed ? '<img id="completeImg" src="Done.png"/>' : '<img id="completeImg" src="Done.png"/>'}
                </button>
                <button class="buttons" onclick="deleteItem(${index})">
                    <img id="deleteImg" src="delete.png"/>
                </button>
            </div>
            `;


        if (element.completed) {
            completedTasks.appendChild(taskCard);
        } else if (element.date === today) {
            todaysTasks.appendChild(taskCard);
        } else {
            futuresTasks.appendChild(taskCard);
        }
    });
}


addButton.addEventListener('click', addItem);
showTodoList();
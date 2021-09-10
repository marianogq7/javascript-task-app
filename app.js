document.getElementById('formTask').addEventListener('submit', saveTask);


function saveTask(e) {
    let title = document.getElementById('taskInput').value;
    let description = document.getElementById('descriptionInput').value;
    let date = (new Date()).toDateString();

    if(title && description){
        
        
        const task = { title, description, date};
        
        if (localStorage.getItem('tasks') === null){
            let tasks = [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks))
            
        } else {
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
        getTasks();
    }
        e.preventDefault();
    
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');
    
    tasksView.innerHTML = '';
    for(let i = 0; i < (tasks || []).length; i++){
        let title = tasks[i].title;
        let description = tasks[i].description;
        let date = tasks[i].date;
        tasksView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p style="text-align: right"> ${date} </p>
                <p>${title} - ${description}</p>  
                <button type="button" class="btn btn-danger" onclick="deleteTask('${title}')">Delete</button>
            </div> 
        </div>`;
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].title == title){
            tasks.splice(i,1);
        }

    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();
// let my_newTask = document.querySelector('input[type="text"]')
// let my_submit = document.querySelector('input[type="submit"]')
// let TASKS = document.querySelector('.tasks')



// my_submit.onclick = function(){
//     let task = document.createElement('div');
//     let spanTask = document.createElement('span')
//     task.className = "task";
//     mytext = my_newTask.value
//     myTaskText = document.createTextNode(mytext)
//     spanTask.appendChild(myTaskText)
//     let button = document.createElement('button')
//     textButton = document.createTextNode('Delete')
//     button.appendChild(textButton)
//     console.log(mytext)
//     task.appendChild(spanTask)
//     task.appendChild(button)
//     TASKS.appendChild(task)
  

// }

let input = document.querySelector('.input')
let submit = document.querySelector('.add')
let tasksDiv = document.querySelector('.tasks')

// emptyo array to store the tasks
let arrayOfTasks = [];
// [6]
// chech if there is tasks in local storage 
if (localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
};

// trigger get data from local storage function
getDataFromLocalStorage();





// [2]
function addTaskToArray(taskText){
    // task data 
    const task = {
        id:Date.now(),
        title:taskText,
        completed:false
    };
    // push task to array of tasks
    arrayOfTasks.push(task);
    console.log(arrayOfTasks)
    // add tasks to page
    addElementsToPageFrom(arrayOfTasks)
    // add tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks)
    // for testing 
    console.log(arrayOfTasks)
    console.log(JSON.stringify(arrayOfTasks))
}

// [3]
function addElementsToPageFrom(arrayOfTasks){
    // empty tasks Div
    tasksDiv.innerHTML = ""
    // looping on array of tasks
    arrayOfTasks.forEach((task) => {
        // Create main div 
        let div = document.createElement("div");
        div.className = "task";
        // check if task div
        if (task.completed){
            div.className = 'task done'
        }
        div.setAttribute("data-id",task.id)
        div.appendChild(document.createTextNode(task.title))
        // create delete button
        let span = document.createElement('span')
        span.className = 'del';
        span.appendChild(document.createTextNode("Delete"))
        // append button to main div
        div.appendChild(span)
        tasksDiv.appendChild(div);

    })
}


// [4]
function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks))
}
// [5]
function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")
    if (data){
        let tasks = JSON.parse(data)
        addElementsToPageFrom(tasks)
        console.log(tasks)
    }
}


// [7]
// click on task element
tasksDiv.addEventListener("click",(e) => {
    // delete button
    if (e.target.classList.contains("del")){
        // remove task from local storge
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        // remove element from page 
        e.target.parentElement.remove()
    }
    // Task Element
    if (e.target.classList.contains('task')){
        // toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        // toggle done class
        e.target.classList.toggle('done')
    }
})



// [1]
// add task
submit.onclick =function(){
    if (input.value !== ""){
        addTaskToArray(input.value); // add task to array of tasks
        input.value = ""; // empty input field
    }
}

// [8]
function deleteTaskWith(taskId){
    // for explian only
    // for (let i = 0;i<arrayOfTasks.length;i++){
    //     console.log(`${arrayOfTasks[i].id}===${taskId}`)
    // }
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocalStorageFrom(arrayOfTasks)
}
// [9]
function toggleStatusTaskWith(taskId){
    for (let i = 0;i<arrayOfTasks.length;i++){
        if (arrayOfTasks[i].id == taskId ){
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks)


}
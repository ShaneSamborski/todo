async function getToDoList(){
    let requestOptions = {
        method: "GET",
        headers : { "Content-Type": "application/json"} 
    }

    const response = await fetch("/items", requestOptions); 
    const body = await response.json(); 
    if(response.status != 200){
        throw Error(body.message); 
    }

    return body; 

}

function generateList(){
    getToDoList().then(function(body){
        //let myHTMLnode = document.createElement('div');
        //let myHTML = document.createTextNode(myHTMLnode);
        let myHTML = '';
        let completedclass;
        let priorityclass;
        for(let i = 0; i < body.length; i++){
            if (body[i].completed === false){
                completedclass = ("<h2 class='incomplete'>Incomplete</h2>")
            } else if (body[i].completed === true){
                completedclass = ("<h2 class='complete'>Completed</h2>")
            }
            if (body[i].itemPriority === "High"){
                priorityclass = ("<h2 class='highpriority'>High Priority</h2>")
            } else if (body[i].itemPriority === "Medium"){
                priorityclass = ("<h2 class='mediumpriority'>Medium Priority</h2>")
            } else if (body[i].itemPriority === "Low"){
                priorityclass = ("<h2 class='lowpriority'>Low Priority</h2>")
            }
            myHTML += `<h1 class="itemname">${body[i].itemName}</h1>
            <h2 class="assignee">Assignee: ${body[i].assignee}</h2>
            ${priorityclass}
            ${completedclass}
            <button id="complete_${body[i]._id}" class="statusbutton" onclick="markItemCompleted()">Complete!</button>
            <button data-id=${body[i]._id} class="delete">Delete</button>`;
            //<h1 class="completed">${body[i].completed}</h1>
        }
        document.getElementById('todolist').insertAdjacentHTML('beforeend', myHTML);

        let deleteButtons = document.getElementsByClassName("delete");
        console.log(deleteButtons); 
        for(let i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].addEventListener('click', function(event){
                //alert("the click works"); 
                deleteItem(event.target.dataset.id);
    }); 
} 
    }).catch(function(err){
        console.log(err); 
    }); 
}

function addNewItem(){
    postItem().then(function(result){
        //do something here if we succeed 
        alert("Success!");
        location.reload(); 
    }).catch(function(error){
        console.log(error); 
    })
}

async function postItem(){

    let dropdown = document.getElementById("newitempriority");
    let selection = dropdown.options[dropdown.selectedIndex].value;

    let data = {
        itemName     : document.getElementById("newitemname").value,
        itemPriority : selection,
        assignee     : document.getElementById("newassignee").value, 
        completed    : false
    }

    let requestOptions = {
        method  : "POST",
        body    : JSON.stringify(data),
        headers : { "Content-Type": "application/json"} 
    }

    const response = await fetch("/items", requestOptions); 
    console.log(response);

    return false; 

}

function deleteItem(id){
    console.log("About to make a call to deleteItemRequest!"); 
    deleteItemRequest(id).then(function(success){
        alert("Deleted!");
        location.reload(); 
    }).catch(function(error){
        console.log(error); 
    }); 
}

async function deleteItemRequest(id){
    let data = {
        _id : id
    }

    let requestOptions = {
        method  : "DELETE",
        body    : JSON.stringify(data),
        headers : { "Content-Type": "application/json"} 
    }
    console.log("About to make a fetch!"); 
    const response = await fetch("/items/"+ id, requestOptions); 
    console.log(response);

    return false; 

}

function markItemCompleted(){

    //  I wanted to implement a PUT function that would update the item from
    //  incomplete to completed, but I procrastinated too much and don't
    //  have the time or brainpower to work on it more before the assignment
    //  is overdue. I will try to work on implementing this in the coming days
    //  on my own time, however. I also want to work on using bootstrap to make
    //  the whole thing a lot prettier.

}
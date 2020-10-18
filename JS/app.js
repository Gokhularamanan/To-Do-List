//select the elements

const dateElement = document.getElementById("date");
const clear = document.querySelector(".clear");
const input = document.getElementById("input");
const list = document.getElementById("list");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
var LIST , id ;

//get item from the local storage
let data = localStorage.getItem("TODO");
//add item to the local storage
if(data)
{
    LIST = JSON.parse(data);
    id = LIST.lenght;//set the id to last in the list
    loadList(LIST); //load the list to the UI
}  
else{
    //if data is not empty
    LIST = [];
    id = 0;
}

//load item to UI
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name , item.id , item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// show date
const options = {weekday : "long" , month :"short",day :"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

 //add to a function
 function addToDo(toDo , id , done , trash)
 {
     if(trash){return;}

     const DONE = done ? CHECK : UNCHECK;
     const LINE = done ? LINE_THROUGH : "";



     const item = `<li class="item">
                        <i class="fa ${DONE} fa-circle-thin co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job ="delete" id="${id}"></i>
                  </li>`;
     const position = "beforeend";
     list.insertAdjacentHTML(position,item);
 }

// add the to do when press enter
document.addEventListener("keypress",function(event){
    if(event.keyCode === 13 || event.which === 13)
    {
        const toDo = input.value; 

        if(toDo)
        {
            addToDo(toDo , id , false , false);

            LIST.push({
                name:toDo,
                id : id,
                done : false ,
                trash : false
            });

            localStorage.setItem("TODO",JSON.stringify(LIST)); //list update
            id++;
        }
        input.value = "";
    }
});


//completeToDo
function completeToDo(element)
{
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LINE[element.id].done = LINE[element.id].done ? false : true;
}

//removeToDo
function removeToDo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}


//target the element created dynamically

list.addEventListener("click",function(event){
    const element = event.target; // return the element in the list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob === "complete")
    {
        completeToDo(element);
    }
    else if(elementJob === "delete")
    {
        removeToDo(element);
    }

    localStorage.setItem("TODO",JSON.stringify(LIST)); //list update
});
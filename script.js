// const form = document.querySelector('#addTaskForm');

const btn = document.querySelector('.input-group-append');

const input = document.querySelector('#txtTaskName');

const a = document.querySelector('#btnDeleteAll');

const ul = document.querySelector('#task-list');

let items;

// form.addEventListener('submit', addNewItem);
eventListeners();
loadItems();

function createElement(text){
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // creating a

    const deleteItem = document.createElement('a');
    deleteItem.classList = 'delete-item float-right';
    deleteItem.setAttribute('href', '#');
    deleteItem.innerHTML = "<i class='fas fa-times'></i>";
    
    li.appendChild(deleteItem);
    ul.appendChild(li);
}

function eventListeners() {
    // adding item to list
    btn.addEventListener('click',addNewItem);

    // delete all items 
    a.addEventListener('click', clearAll);

    // delete items
    ul.addEventListener('click',deleteItem);    
} 
function loadItems(){
    items = getItemsFromLS();
    items.forEach(function(item){
        createElement(item);
    });
}

function getItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items =JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLocalStorage(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));

}

function addNewItem(event) {

    if (input.value === '') {
        alert('please enter any value ...');
    } else{
        // creating list element
       createElement(input.value);

       // save 

       setItemToLocalStorage(input.value);
    }
        input.value = '';
    
    event.preventDefault();
}
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
        items.splice(index,1);
        }
    });

    localStorage.setItem('items',JSON.stringify(items));
}
function deleteItem(e){
    if(e.type === 'click'){
    if(e.target.className == 'fas fa-times' ){
        if(confirm('Are you sure ?')){
        e.target.parentElement.parentElement.remove();

        //delete item from local stroage
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
            }
    }

    e.preventDefault();
}
}

function clearAll(event) {
    // ul.innerHTML = '';
    if(confirm('are you sure ? ')){
            while(ul.firstChild){
                ul.removeChild(ul.firstChild);
            }
        localStorage.clear();
    }
    event.preventDefault();
}
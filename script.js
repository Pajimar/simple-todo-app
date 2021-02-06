/*formulario de añadir todos. Es el formulario el que genera
el evento submmit*/
const addForm = document.getElementById('addform');
// referencia a la lista 
const todo_list = document.querySelector('.todo_list');
/*input donde se introduce el todo a buscar. Es éste input 
el que genera el evento keyup*/
const search = document.getElementById('search');


const insertTodo = (todo) => {

    const list_item_template = `
        <li class="list-item">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    // inyectar plantilla en lista
    todo_list.innerHTML += list_item_template;
    
    
}


/*cuando ocurra evento submit en el formulario, ejecutar funcion anonima 
que recibe como parametro (y que usa el evento generado)*/
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = addForm.addtodo.value.trim();
        
    if(todo.length){
        insertTodo(todo.toLowerCase());
        addForm.reset();
    }
    
});

/*registrar la lista ul en el evento click*/
todo_list.addEventListener('click', (e) => {
    // comprobar si el elemento que generó el evento contiene 'delete' entre sus clases
    // (es decir, es icono trash)
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
})

const filterTodos = (data) => {
    /*buscar elementos que no hacen match para añadir clase hideTodo */
    list_items = Array.from(todo_list.children);
    list_items_toHide = list_items.filter(item => {
        return !item.textContent.toLowerCase().includes(data);
    });
    list_items_toHide.forEach(item => {
        item.classList.add('hideTodo');
    })

    /* buscar elementos que hacen match para quitarles la clase hideTodo*/
    list_items = Array.from(todo_list.children);
    list_items_toHide = list_items.filter(item => {
        return item.textContent.toLowerCase().includes(data);
    });
    list_items_toHide.forEach(item => {
        item.classList.remove('hideTodo');
    })
}

search.addEventListener('keyup', () => {
    filterTodos(search.value.trim().toLowerCase());
})



const request = new XMLHttpRequest();
request.open('GET', 'https://jsonplaceholder.typicode.com/posts/');
request.send();




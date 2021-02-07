/*formulario de añadir todos. Es el formulario el que genera
el evento submmit*/
const addForm = document.getElementById('addform');
// referencia a la lista 
const todo_list = document.querySelector('.todo_list');
/*input donde se introduce el todo a buscar. Es éste input 
el que genera el evento keyup*/
const search = document.getElementById('search');

// añadir elemento a la UI
const addTodoUI = (doc) => {
    const list_item_template = `
        <li class="list-item" id=${doc.id}>
            <span>${doc.data().text}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    // inyectar plantilla en lista
    todo_list.innerHTML += list_item_template;
}

// eliminar elemento de la UI 
const removeTodoUI = (doc) => {
    // iterar por la lista de Todos del DOM buscando el elemento que tiene como atributo id = doc.id
    const todos = document.querySelectorAll('li')
    todos.forEach(todo => {
        if (todo.getAttribute('id') === doc.id){
            todo.remove()
        }
    })
}


// añadir ToDo a la BD
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = addForm.addtodo.value.trim();
        
    if(todo.length){
        // si se ha escrito algo, crear objeto
        todoObject = {
            text : todo
        }
        db.collection('todos').add(todoObject).then(() => {
            console.log('ToDo añadido')
        })
        addForm.reset();
    }
    
});

// eliminar ToDo de la BD
todo_list.addEventListener('click', (e) => {
    // comprobar si el elemento que generó el evento contiene 'delete' entre sus clases
    // (es decir, es icono trash)
    if(e.target.classList.contains('delete')){
        const id = e.target.parentElement.getAttribute('id')
        db.collection('todos').doc(id).delete().then(() => {
            console.log('ToDo eliminado')
        })
    }
})

// hacer busquedas sobre los ToDos de la interfaz
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


// listener for snapshot events on firestore DB
db.collection('todos').onSnapshot( snapshot => {
    const changes = snapshot.docChanges()
    changes.forEach(change  => {
        if(change.type === "added"){
            addTodoUI(change.doc)
        }else if(change.type === "removed"){
            removeTodoUI(change.doc)
        }
    })
})



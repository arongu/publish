import { getTasksFromStorage } from "../model/model.js";

export { dom__new_li_task }
export { dom__task_from_input_to_ul_collection }
export { dom__clear_tasks }
export { dom__filter_tasks }
export { dom__restore_tasks_from_local_storage }

// --------------------------------------------------------------------------------
// DOM manipulation
// --------------------------------------------------------------------------------
const dom__new_li_task = (task) => {
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa fa-remove');

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.setAttribute('href', '#');

    const li = document.createElement('li');
    li.setAttribute('class', 'collection-item');
    li.textContent = task;

    // assemble the list element and add it to the ul
    const ul = document.querySelector('ul.collection');
    link.appendChild(icon);
    li.appendChild(link);
    ul.appendChild(li);
}

const dom__task_from_input_to_ul_collection = () => {
    const input_task = document.querySelector('#task');
    let task = input_task.value.trim();

    if ( task !== '' ) {
        dom__new_li_task(task);
    } else {
        task = null;
    }

    input_task.value = null;
    return task;
}

const dom__clear_tasks = () => {
    const list = document.querySelector('ul.collection');

    if ( list !== null ) {
        while ( list.childElementCount !== 0 ) {
            list.removeChild(list.firstElementChild);
        }
    }
}

const dom__filter_tasks = (text) => {
    const collectionItems = document.querySelectorAll('.collection-item');

    collectionItems.forEach((listItem) => {
        const taskString = listItem.firstChild.textContent.toLowerCase();
        if ( taskString.indexOf(text.toLowerCase()) !== -1 ) {
            listItem.style.display = 'block';
        } else {
            listItem.style.display = 'none';
        }
    });
}

// --------------------------------------------------------------------------------
// Restore
// --------------------------------------------------------------------------------
const dom__restore_tasks_from_local_storage = () => {
    const tasks = getTasksFromStorage();
    if ( tasks !== null ) {
        tasks.forEach((task) => {
            dom__new_li_task(task);
        });
    }
};
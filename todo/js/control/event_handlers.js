export {
    add_listener__key_enter__FormInputTasks,
    add_listener__input__FormFilterTasks,
    add_listener__click__ButtonAddTask,
    add_listener__click__ButtonClearTasks,
    add_listener__click__toDeleteAnyTask
}

import {
    dom__clear_tasks,
    dom__filter_tasks,
    dom__task_from_input_to_ul_collection
} from "../view/view.js";

import {
    saveTaskToStorage,
    deleteTaskFromStorage,
    deleteAllTasksFromStorage
} from "../model/data.js";


// --------------------------------------------------------------------------------
// Event listeners
// --------------------------------------------------------------------------------
const add_listener__key_enter__FormInputTasks = () => {
    const input = document.querySelector('#task');
    input.addEventListener('keyup', (event) => {
        if ( event.key === 'Enter' ) {
            const task = dom__task_from_input_to_ul_collection();
            saveTaskToStorage(task);
        }
    });
}

const add_listener__input__FormFilterTasks = () => {
    const input = document.querySelector('#task-filter');
    input.addEventListener('input', () => {
        dom__filter_tasks(input.value);
    });
}

const add_listener__click__ButtonAddTask = () => {
    const btnAddTask = document.querySelector('#input-add-task');
    btnAddTask.addEventListener('click', () => {
        const task = dom__task_from_input_to_ul_collection();
        saveTaskToStorage(task);
    });
}

const add_listener__click__ButtonClearTasks = () => {
    const btnClearTasks = document.querySelector('.clear-tasks');
    btnClearTasks.addEventListener('click', () => {
        dom__clear_tasks();
        deleteAllTasksFromStorage();
    });
}

const add_listener__click__toDeleteAnyTask = () => {
    const collectionList = document.querySelector('ul.collection');
    collectionList.addEventListener('click', (event) => {
        const classList = event.target.classList;
        let listElement = null;

        if ( classList.contains('fa') || classList.contains('fa-remove') ) {
            listElement = event.target.parentElement.parentElement;

        } else if ( classList.contains('delete-item') || classList.contains('secondary-content') ) {
            listElement = event.target.parentElement;
        }

        if ( listElement !== null ) {
            let index = 0;
            let sibling = listElement;

            while ( sibling.previousElementSibling !== null ) {
                sibling = sibling.previousElementSibling;
                index++;
            }

            deleteTaskFromStorage(index);
            listElement.remove();
        }
    });
}

import {
    TaskListFilterManager,
    TaskListManager
} from "./Render.js";

import {LocalStorageManager} from "./LocalStorage.js";

export {
    listen__TaskList_Button_AddTask__click,
    listen__TaskList_Button_ClearTasks__click,
    listen__TaskList_Button_ClearAllTasks__click,
    listen__TaskList_x__click,
    listen__TaskList_Input_NewTask__key__enter,
    listen__TaskFilter_Input__input,
    listen__TaskFilter_Input__key__enter
}

// --------------------------------------------------------------------------------
// Event listeners
// --------------------------------------------------------------------------------
// TaskList related
const listen__TaskList_Input_NewTask__key__enter = () => {
    const input = document.querySelector('#task');
    input.addEventListener('keyup', (event) => {
        if ( event.key === 'Enter' ) {
            const task = TaskListManager.getInputAndClear();
            if ( task !== null) {
                TaskListManager.addTask(task);
                LocalStorageManager.addTask(task);
            }
        }
    });
}

const listen__TaskList_Button_AddTask__click = () => {
    const btnAddTask = document.querySelector('#input-add-task');
    btnAddTask.addEventListener('click', () => {
        const task = TaskListManager.getInputAndClear();
        if ( task !== null) {
            TaskListManager.addTask(task);
            LocalStorageManager.addTask(task);
        }
    });
}

const listen__TaskList_Button_ClearTasks__click = () => {
    const btnClearTasks = document.querySelector('.clear-tasks');
    btnClearTasks.addEventListener('click', () => {
        const indices = TaskListManager.removeFilteredTasks();
        for ( let index of indices) {
            LocalStorageManager.deleteTaskByIndex(index);
        }
    });
}

const listen__TaskList_Button_ClearAllTasks__click = () => {
    const btnClearTasks = document.querySelector('.clear-all-tasks');
    btnClearTasks.addEventListener('click', () => {
        TaskListManager.removeAllTasks();
        LocalStorageManager.deleteAllTasks();
    });
}

const listen__TaskList_x__click = () => {
    const collectionList = document.querySelector('ul.collection');
    collectionList.addEventListener('click', (event) => {
        const classList = event.target.classList;
        let listElement = null;

        if ( classList.contains('fa') || classList.contains('fa-remove') ) {
            listElement = event.target.parentElement.parentElement;

        } else if ( classList.contains('delete-item') || classList.contains('secondary-content') ) {
            listElement = event.target.parentElement;
        }

        if ( listElement !== null) {
            let index = 0;
            let sibling = listElement;

            while (sibling.previousElementSibling !== null) {
                sibling = sibling.previousElementSibling;
                index++;
            }

            listElement.remove();
            LocalStorageManager.deleteTaskByIndex(index);
        }
    });
}

// TaskFilter related
const listen__TaskFilter_Input__input = () => {
    const input = document.querySelector('#task-filter');
    input.addEventListener('input', () => {
        TaskListFilterManager.filterTasks(input.value);
    });
}

const listen__TaskFilter_Input__key__enter = () => {
    const input = document.querySelector('#task-filter');
    input.addEventListener('keyup', (event) => {
        if ( event.key === 'Enter' ) {
            TaskListFilterManager.clearFilters();
        }
    })
}
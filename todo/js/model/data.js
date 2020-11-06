import { storage } from "../app.js";

export { getTasksFromStorage }
export { saveTaskToStorage }
export { deleteTaskFromStorage }
export { deleteAllTasksFromStorage }

// --------------------------------------------------------------------------------
// Local storage, model management // CRUD
// --------------------------------------------------------------------------------

const getTasksFromStorage = () => {
    if ( storage.getItem('tasks') !== null ) {
        return JSON.parse(storage.getItem('tasks'));
    }

    return null;
}

const saveTaskToStorage = (task) => {
    if ( task === null) {
        return;
    }

    let savedTasks = getTasksFromStorage();
    if ( savedTasks === null ) {
        savedTasks = [];
    }

    savedTasks.push(task);
    storage.setItem('tasks', JSON.stringify(savedTasks));
}

const deleteTaskFromStorage = (index) => {
    if ( ! Number.isInteger(index) && index >= 0 ) {
        console.error(`Index must be an integer and equal to zero or greater! -- ${index}`);
        return;
    }

    const savedTasks = getTasksFromStorage();
    if ( savedTasks !== null && savedTasks[index] !== null ) {
        savedTasks.splice(index, 1);
        storage.setItem('tasks', JSON.stringify(savedTasks));
    }
}

const deleteAllTasksFromStorage = () => {
    storage.setItem('tasks', null);
}

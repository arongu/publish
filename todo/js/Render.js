import { LocalStorageManager } from "./LocalStorage.js";
// export
export { TaskListManager }
export { TaskListFilterManager }


class TaskListManager {
    static addTask(task) {
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

    static getInputAndClear() {
        const input_task = document.querySelector('#task');
        let task = input_task.value.trim();

        if ( task === '' ) {
            task = null;
        }

        input_task.value = null;
        return task;
    }

    static removeAllTasks() {
        const list = document.querySelector('ul.collection');

        if ( list !== null ) {
            while ( list.childElementCount !== 0 ) {
                list.removeChild(list.firstElementChild);
            }
        }
    }

    static removeFilteredTasks() {
        const removedIndices = [];
        const collectionItems = document.querySelectorAll('.collection-item');

        collectionItems.forEach((listElement) => {
            if ( listElement.style.display === 'block') {
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
            }
        });

        return removedIndices;
    }
}

class TaskListFilterManager {
    static filterTasks(text) {
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
}

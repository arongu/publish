// --------------------------------------------------------------------------------
//const storage = sessionStorage;
const storage = localStorage;
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// Local/Session storage, data management // CRUD
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

const dom__storage__clear_filtered_tasks = () => {
   const collectionItems = document.querySelectorAll('.collection-item');

   collectionItems.forEach((listElement) => {
      if (listElement.style.display === 'block') {
         const index = getIndexOfListElement(listElement);
         listElement.remove();
         deleteTaskFromStorage(index);
      }
   });
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
// Event listeners
// --------------------------------------------------------------------------------
const listen__TaskList_Input_NewTask__key__enter = () => {
   const input = document.querySelector('#task');
   input.addEventListener('keyup', (event) => {
      if ( event.key === 'Enter' ) {
         const task = dom__task_from_input_to_ul_collection();
         saveTaskToStorage(task);
      }
   });
}

const listen__Tasks_Input_FilterTasks__input = () => {
   const input = document.querySelector('#task-filter');
   input.addEventListener('input', () => {
      dom__filter_tasks(input.value);
   });
}

const listen__TaskList_Button_AddTask__click = () => {
   const btnAddTask = document.querySelector('#input-add-task');
   btnAddTask.addEventListener('click', () => {
      const task = dom__task_from_input_to_ul_collection();
      saveTaskToStorage(task);
   });
}

const listen__Tasks_Button_ClearTasks__click = () => {
   const btnClearTasks = document.querySelector('.clear-tasks');
   btnClearTasks.addEventListener('click', () => {
      dom__storage__clear_filtered_tasks();
   });
}

const listen__Tasks_Button_ClearAllTasks__click = () => {
   const btnClearTasks = document.querySelector('.clear-all-tasks');
   btnClearTasks.addEventListener('click', () => {
      dom__clear_tasks();
      deleteAllTasksFromStorage();
   });
}

const getIndexOfListElement = (listElement) => {
   if ( listElement !== null ) {
      let index = 0;
      let sibling = listElement;

      while (sibling.previousElementSibling !== null) {
         sibling = sibling.previousElementSibling;
         index++;
      }

      return index;
   }

   throw 'error: listElement is null';
}

const listen__Tasks_x__click = () => {
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
         const index = getIndexOfListElement(listElement);
         listElement.remove();
         deleteTaskFromStorage(index);
      }
   });
}

// --------------------------------------------------------------------------------
// Restore
// --------------------------------------------------------------------------------
const load_tasks_from_local_storage = () => {
   const tasks = getTasksFromStorage();
   if ( tasks !== null ) {
      tasks.forEach((task) => {
         dom__new_li_task(task);
      });
   }
};

// --------------------------------------------------------------------------------
// Business logic
// --------------------------------------------------------------------------------
listen__TaskList_Input_NewTask__key__enter();
listen__TaskList_Button_AddTask__click();

listen__Tasks_Input_FilterTasks__input();
listen__Tasks_Button_ClearTasks__click();
listen__Tasks_Button_ClearAllTasks__click();
listen__Tasks_x__click();

// init
load_tasks_from_local_storage();

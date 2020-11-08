import { TaskListManager } from "./js/Render.js";

import { LocalStorageManager } from "./js/LocalStorage.js";

import {
   listen__TaskFilter_Input__key__enter,
   listen__TaskFilter_Input__input,
   listen__TaskList_Button_AddTask__click,
   listen__TaskList_Button_ClearAllTasks__click,
   listen__TaskList_Button_ClearTasks__click,
   listen__TaskList_Input_NewTask__key__enter,
   listen__TaskList_x__click
} from "./js/Control.js";



// --------------------------------------------------------------------------------
// Restore
// --------------------------------------------------------------------------------
const load_tasks_from_local_storage = () => {
   const tasks = LocalStorageManager.getTasks();
   if ( tasks !== null ) {
      tasks.forEach((task) => {
         TaskListManager.addTask(task);
      });
   }
};

// --------------------------------------------------------------------------------
// Business logic
// --------------------------------------------------------------------------------

listen__TaskList_Input_NewTask__key__enter();
listen__TaskList_Button_AddTask__click();
listen__TaskList_Button_ClearTasks__click();
listen__TaskList_Button_ClearAllTasks__click();
listen__TaskList_x__click();
// TaskFilter
listen__TaskFilter_Input__input();
listen__TaskFilter_Input__key__enter()
// Init
load_tasks_from_local_storage();

// TODO add backup restore
import { TaskListManager } from "./js/view.js";
import { LocalStorageManager } from "./js/lib/local_storage.js";
import {
   listen__TaskFilter_Input__key__enter,
   listen__TaskFilter_Input__input,
   listen__TaskList_Button_AddTask__click,
   listen__TaskList_Button_ClearAllTasks__click,
   listen__TaskList_Button_ClearTasks__click,
   listen__TaskList_Input_NewTask__key__enter,
   listen__TaskList_x__click
} from "./js/controller.js";


const load_tasks_from_local_storage = () => {
   const tasks = LocalStorageManager.getTasks();
   if ( tasks !== null ) {
      tasks.forEach((task) => {
         TaskListManager.addTask(task);
      });
   }
};


listen__TaskList_Input_NewTask__key__enter();
listen__TaskList_Button_AddTask__click();
listen__TaskList_Button_ClearTasks__click();
listen__TaskList_Button_ClearAllTasks__click();
listen__TaskList_x__click();
listen__TaskFilter_Input__input();
listen__TaskFilter_Input__key__enter()

load_tasks_from_local_storage();
// TODO add backup restore
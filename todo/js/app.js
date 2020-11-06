import { dom__restore_tasks_from_local_storage } from "./view/view.js"

import {
   add_listener__click__ButtonAddTask,
   add_listener__click__ButtonClearTasks,
   add_listener__click__toDeleteAnyTask,
   add_listener__input__FormFilterTasks,
   add_listener__key_enter__FormInputTasks
} from "./control/event_handlers.js";

export { storage }

const storage = localStorage;
dom__restore_tasks_from_local_storage();
add_listener__key_enter__FormInputTasks();
add_listener__input__FormFilterTasks();
add_listener__click__ButtonAddTask();
add_listener__click__ButtonClearTasks();
add_listener__click__toDeleteAnyTask();

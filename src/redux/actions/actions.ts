import TaskCard from "../../models/task-card.model";
import TaskListClass from "../../models/task-list.model";
import ActionType from "./action-types";

interface AddNewList {
    type: ActionType.ADD_NEW_LIST;
    payload: TaskListClass
}

interface AddNewTask {
    type: ActionType.ADD_NEW_TASK;
    payload: { newTask: TaskCard, listIndexToAddTask: number }
}

interface DeleteList {
    type: ActionType.DELETE_LIST;
    payload: number
}

interface ChangeListTitle {
    type: ActionType.CHANGE_LIST_TITLE;
    payload: { listIndexToChangeTitle: number, newListTitle: string }
}

interface ChangeTaskTitle {
    type: ActionType.CHANGE_TASK_TITLE;
    payload: { taskIndexToChangeTitle: number, newTaskTitle: string, listIndexOfTask: number }
}

interface ChangeTaskDescription {
    type: ActionType.CHANGE_TASK_DESCRIPTION;
    payload: { taskIndexToChangeTitle: number, newTaskDescription: string, listIndexOfTask: number }
}

interface DeleteTask {
    type: ActionType.DELETE_TASK;
    payload: { taskIndex: number, listIndex: number }
}

interface ChangeListOfTask {
    type: ActionType.CHANGE_LIST_OF_TASK;
    payload: { taskIndex: number, oldListIndex: number, newListIndex: number }
}

type Action = AddNewList | AddNewTask | DeleteList | ChangeListTitle | ChangeTaskTitle | ChangeTaskDescription | DeleteTask | ChangeListOfTask;

export default Action;
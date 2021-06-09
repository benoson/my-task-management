import TaskListClass from "../../models/task-list.model";
import TaskCard from "../../models/task-card.model";
import ActionType from "./action-types";
import { Dispatch } from "redux";
import Action from "./actions";

export const addNewList = (newList: TaskListClass) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADD_NEW_LIST,
            payload: newList
        })
    }
}

export const addNewTask = (newTask: TaskCard, listIndexToAddTask: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADD_NEW_TASK,
            payload: { newTask, listIndexToAddTask }
        })
    }
}

export const deleteList = (listIndex: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETE_LIST,
            payload: listIndex
        })
    }
}

export const changeListTitle = (newListTitle: string, listIndexToChangeTitle: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_LIST_TITLE,
            payload: { newListTitle, listIndexToChangeTitle }
        })
    }
}

export const changeTaskTitle = (newTaskTitle: string, taskIndexToChangeTitle: number, listIndexOfTask: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_TASK_TITLE,
            payload: { newTaskTitle, taskIndexToChangeTitle, listIndexOfTask }
        })
    }
}

export const changeTaskDescription = (newTaskDescription: string, taskIndexToChangeTitle: number, listIndexOfTask: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_TASK_DESCRIPTION,
            payload: { newTaskDescription, taskIndexToChangeTitle, listIndexOfTask }
        })
    }
}

export const deleteTask = (taskIndex: number, listIndex: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETE_TASK,
            payload: { taskIndex, listIndex }
        })
    }
}

export const changeListOfTask = (taskIndex: number, oldListIndex: number, newListIndex: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_LIST_OF_TASK,
            payload: { taskIndex, oldListIndex, newListIndex }
        })
    }
}
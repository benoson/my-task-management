import TaskListClass from "../../models/task-list.model";
import ActionType from "../actions/action-types";
import Action from "../actions/actions";

const initialState = { taskLists: new Array<TaskListClass>() };


const reducer = (state: { taskLists: TaskListClass[] } = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.ADD_NEW_LIST:
            state.taskLists.push(action.payload);
            return { ...state };

        case ActionType.ADD_NEW_TASK:
            state.taskLists[action.payload.listIndexToAddTask].tasks.push(action.payload.newTask);
            return { ...state };

        case ActionType.DELETE_LIST:
            state.taskLists.splice(action.payload, 1);
            return { ...state };

        case ActionType.CHANGE_LIST_TITLE:
            state.taskLists[action.payload.listIndexToChangeTitle].listTitle = action.payload.newListTitle;
            return { ...state };

        case ActionType.CHANGE_TASK_TITLE:
            state.taskLists[action.payload.listIndexOfTask].tasks[action.payload.taskIndexToChangeTitle].title = action.payload.newTaskTitle;
            return { ...state };

        case ActionType.CHANGE_TASK_DESCRIPTION:
            state.taskLists[action.payload.listIndexOfTask].tasks[action.payload.taskIndexToChangeTitle].description = action.payload.newTaskDescription;
            return { ...state };

        case ActionType.DELETE_TASK:
            state.taskLists[action.payload.listIndex].tasks.splice(action.payload.taskIndex, 1);
            return { ...state };

        case ActionType.CHANGE_LIST_OF_TASK:
            const taskToMove = state.taskLists[action.payload.oldListIndex].tasks[action.payload.taskIndex];

            state.taskLists[action.payload.oldListIndex].tasks.splice(action.payload.taskIndex, 1);
            state.taskLists[action.payload.newListIndex].tasks.push(taskToMove);
            return { ...state };

        default:
            return { ...state }
    }
}

export default reducer;
import { combineReducers } from "redux";
import reducer from "./reducer";

const reducers = combineReducers({
    stateReducer: reducer
});

export type State = ReturnType<typeof reducers>;
export default reducers;
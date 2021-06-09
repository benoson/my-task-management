import TaskCardClass from "../../models/task-card.model";
import TaskCard from "../task-card/Task-Card.component";
import NewTaskSection from "../new-task-section/New-Task-Section.component";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux/index";
import tasksUtils from "../utils/utils";
import "./task-list.scss";

interface ITaskList {
  listID: number;
  tasks: TaskCardClass[];
  listTitle: string;
  shouldDisplayLoader: Function;
}

const TaskList = (props: ITaskList) => {
  const [listTitle, setListTitle] = useState(props.listTitle);
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const stateFromStore = useSelector((state: State) => state.stateReducer);
  const dispatch = useDispatch();
  const { deleteList, changeListTitle } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const onDoneEditingListTitleClick = () => {
    if (listTitle.trim() !== "") {
      const listIndexToChangeTitle = stateFromStore.taskLists.findIndex(
        (list) => list.listID === props.listID
      );

      tasksUtils.executeAfterDelay(
        () => {
          changeListTitle(listTitle.trim(), listIndexToChangeTitle);
          props.shouldDisplayLoader(false);
        },
        2000,
        () => {
          props.shouldDisplayLoader(true);
          setIsTitleEditable(false);
        }
      );
    }
  };

  const onDeleteListClick = () => {
    const listIndexToDelete = stateFromStore.taskLists.findIndex(
      (list) => list.listID === props.listID
    );

    tasksUtils.executeAfterDelay(
      () => {
        deleteList(listIndexToDelete);
        props.shouldDisplayLoader(false);
      },
      2000,
      () => {
        props.shouldDisplayLoader(true);
      }
    );
  };

  return (
    <div className="task-list-outer">
      <div className="task-list">
        <div className="list-header">
          {isTitleEditable ? (
            <TextField
              className="task-list-title"
              label="Edit list title"
              variant="outlined"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              helperText="Letters and numbers only"
              error={
                listTitle.trim() === "" ||
                !tasksUtils.isNewListTitleValid(listTitle)
              }
              margin="normal"
            />
          ) : (
            <h2 className="task-list-title">{listTitle}</h2>
          )}

          <div className="list-header-icons">
            {isTitleEditable ? (
              <IconButton
                onClick={onDoneEditingListTitleClick}
                aria-label="icon button"
                component="span"
                disabled={
                  listTitle.trim() === "" ||
                  !tasksUtils.isNewListTitleValid(listTitle)
                }
              >
                <DoneIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setIsTitleEditable(true)}
                aria-label="icon button"
                component="span"
              >
                <EditIcon />
              </IconButton>
            )}

            <IconButton
              onClick={onDeleteListClick}
              aria-label="icon button"
              component="span"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>

        {props.tasks.map((task: TaskCardClass) => (
          <TaskCard
            key={task.taskID}
            title={task.title}
            description={task.description}
            listTitle={listTitle}
            taskID={task.taskID}
            listID={props.listID}
            shouldDisplayLoader={props.shouldDisplayLoader}
          />
        ))}

        <NewTaskSection
          shouldDisplayLoader={props.shouldDisplayLoader}
          listID={props.listID}
        />
      </div>
    </div>
  );
};

export default TaskList;

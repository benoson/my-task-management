import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import { State } from "../../redux/index";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";
import { useState, useEffect, ChangeEvent } from "react";
import "./task-card.scss";
import tasksUtils from "../utils/utils";

interface ItaskCard {
  taskID: number;
  title: string;
  description: string;
  listTitle: string;
  listID: number;
  shouldDisplayLoader: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const TaskCard = (taskCard: ItaskCard) => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskTitleEditable, setIsTaskTitleEditable] = useState(false);
  const [isTaskDescriptionEditable, setIsTaskDescriptionEditable] =
    useState(false);
  const [taskTitle, setTaskTitle] = useState(taskCard.title);
  const [taskDescription, setTaskDescription] = useState(taskCard.description);
  const [fatherListIndex, setFatherListIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const stateFromStore = useSelector((state: State) => state.stateReducer);
  const dispatch = useDispatch();
  const {
    changeTaskTitle,
    changeTaskDescription,
    deleteTask,
    changeListOfTask,
  } = bindActionCreators(actionCreators, dispatch);

  // updating the current list and task index's
  useEffect(() => {
    const currentListIndex = stateFromStore.taskLists.findIndex(
      (list) => list.listID === taskCard.listID
    );

    const taskIndex = stateFromStore.taskLists[
      currentListIndex
    ].tasks.findIndex((task) => task.taskID === taskCard.taskID);

    setFatherListIndex(currentListIndex);
    setCurrentTaskIndex(taskIndex);
  }, []);

  const onDoneEditingTaskTtitleClick = () => {
    if (taskTitle.trim() !== "") {
      tasksUtils.executeAfterDelay(
        () => {
          changeTaskTitle(taskTitle.trim(), currentTaskIndex, fatherListIndex);
          taskCard.shouldDisplayLoader(false);
        },
        2000,
        () => {
          taskCard.shouldDisplayLoader(true);
          setIsTaskTitleEditable(false);
        }
      );
    }
  };

  const onDoneEditingTaskDescriptionClick = () => {
    if (taskDescription.trim() !== "") {
      tasksUtils.executeAfterDelay(
        () => {
          changeTaskDescription(
            taskDescription.trim(),
            currentTaskIndex,
            fatherListIndex
          );
          taskCard.shouldDisplayLoader(false);
        },
        2000,
        () => {
          taskCard.shouldDisplayLoader(true);
          setIsTaskDescriptionEditable(false);
        }
      );

      setIsTaskDescriptionEditable(false);
    }
  };

  const handleOnModalOpen = () => {
    setIsModalOpen(true);
    setIsTaskTitleEditable(false);
    setIsTaskDescriptionEditable(false);
  };

  const handleOnModalClose = () => {
    if (taskTitle.trim() !== "" && taskDescription.trim() !== "") {
      if (!isTaskTitleEditable && !isTaskDescriptionEditable) {
        setIsModalOpen(false);
      } else {
        alert("Please accept changes before closing the modal");
      }
    } else {
      alert("Can't leave fields empty");
    }
  };

  const onDeleteTaskClick = () => {
    tasksUtils.executeAfterDelay(
      () => {
        deleteTask(currentTaskIndex, fatherListIndex);
        taskCard.shouldDisplayLoader(false);
      },
      2000,
      () => {
        taskCard.shouldDisplayLoader(true);
        setIsTaskTitleEditable(false);
      }
    );
  };

  const handleOnNewListChange = (event: ChangeEvent<any>) => {
    const newListID = event.target.value;
    const newListIndex = stateFromStore.taskLists.findIndex(
      (list) => list.listID == newListID
    );
    const newTaskIndex = stateFromStore.taskLists[
      fatherListIndex
    ].tasks.findIndex((task) => task.taskID === taskCard.taskID);

    tasksUtils.executeAfterDelay(
      () => {
        changeListOfTask(newTaskIndex, fatherListIndex, newListIndex);
        taskCard.shouldDisplayLoader(false);
      },
      2000,
      () => {
        taskCard.shouldDisplayLoader(true);
        setCurrentTaskIndex(newTaskIndex);
      }
    );
  };

  return (
    <>
      <Card className="task-card">
        <CardContent className="card-content" onClick={handleOnModalOpen}>
          <Typography className="card-text" variant="h6">
            {taskCard.title}
          </Typography>

          <Typography className="card-text" variant="h5">
            {taskCard.description}
          </Typography>
        </CardContent>

        <CardActions className="bottom-card-section">
          <FormControl className="form-control-select" variant="outlined">
            <Select
              className="list-select-input"
              native
              value={taskCard.listID}
              onChange={handleOnNewListChange}
              inputProps={{
                name: "age",
                id: "filled-age-native-simple",
              }}
            >
              {stateFromStore.taskLists.map((list) => (
                <option value={list.listID}>{list.listTitle}</option>
              ))}
            </Select>
          </FormControl>
          <IconButton
            onClick={onDeleteTaskClick}
            aria-label="icon button"
            component="span"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={handleOnModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={isModalOpen}>
          <div className={classes.paper}>
            <div className="modal-task-title-section">
              <h3 className="modal-task-header">Task title</h3>
              <div className="modal-task-inner">
                {isTaskTitleEditable ? (
                  <>
                    <TextField
                      className="task-list-title"
                      label="Edit task title"
                      variant="outlined"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      helperText="Can't be empty"
                      error={taskTitle.trim() === ""}
                      margin="normal"
                    />

                    <IconButton
                      onClick={onDoneEditingTaskTtitleClick}
                      aria-label="icon button"
                      component="span"
                      disabled={taskTitle.trim() === ""}
                    >
                      <DoneIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <h2 className="modal-task-text">{taskTitle}</h2>
                    <IconButton
                      onClick={() => setIsTaskTitleEditable(true)}
                      aria-label="icon button"
                      component="span"
                      disabled={taskDescription.trim() === ""}
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </div>
            </div>

            {/* Task description on modal */}
            <div>
              <h3 className="modal-task-header">Task description</h3>
              <div className="modal-task-inner">
                {isTaskDescriptionEditable ? (
                  <>
                    <TextField
                      className="task-list-description"
                      label="Edit task description"
                      variant="outlined"
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      helperText="Can't be empty"
                      error={taskDescription.trim() === ""}
                      margin="normal"
                    />

                    <IconButton
                      onClick={onDoneEditingTaskDescriptionClick}
                      aria-label="icon button"
                      component="span"
                      disabled={taskDescription.trim() === ""}
                    >
                      <DoneIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <h2 className="modal-task-text">{taskDescription}</h2>
                    <IconButton
                      onClick={() => setIsTaskDescriptionEditable(true)}
                      aria-label="icon button"
                      component="span"
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <p>
                Inside of list:{" "}
                <span className="modal-footer-list-title">
                  {taskCard.listTitle}
                </span>
              </p>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default TaskCard;

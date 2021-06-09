import { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TaskCard from "../../models/task-card.model";
import { State } from "../../redux/index";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";
import "./new-task-section.scss";
import tasksUtils from "../utils/utils";

interface INewTaskSection {
  listID: number;
  shouldDisplayLoader: Function;
}

const NewTaskSection = (props: INewTaskSection) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  const stateFromStore = useSelector((state: State) => state.stateReducer);
  const dispatch = useDispatch();
  const { addNewTask } = bindActionCreators(actionCreators, dispatch);

  const onNewTaskClick = () => {
    if (taskTitle.trim() !== "" && taskDescription.trim() !== "") {
      const newTask = new TaskCard(taskTitle, taskDescription);
      const listIndexToAddTask = stateFromStore.taskLists.findIndex(
        (list) => list.listID === props.listID
      );

      tasksUtils.executeAfterDelay(
        () => {
          addNewTask(newTask, listIndexToAddTask);
          props.shouldDisplayLoader(false);
          setIsAccordionExpanded(false);
        },
        2000,
        () => {
          props.shouldDisplayLoader(true);
        }
      );

      setTaskTitle("");
      setTaskDescription("");
    }
  };

  return (
    <div>
      <Accordion expanded={isAccordionExpanded}>
        <AccordionSummary
          onClick={() => {
            setTaskTitle("");
            setTaskDescription("");
            setIsAccordionExpanded((prevState) => !prevState);
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          New Task
        </AccordionSummary>
        <AccordionDetails className="new-task-accordion-input-fields">
          <div className="new-task-input-fields">
            <TextField
              id="new-task-title-input"
              label="Task title..."
              variant="outlined"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            <TextField
              id="new-task-description-input"
              label="Task description..."
              variant="outlined"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              margin="normal"
            />
          </div>
          <Button
            onClick={onNewTaskClick}
            id="add-list-button"
            variant="outlined"
            color="primary"
            disabled={taskTitle.trim() === "" || taskDescription.trim() === ""}
          >
            +
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default NewTaskSection;

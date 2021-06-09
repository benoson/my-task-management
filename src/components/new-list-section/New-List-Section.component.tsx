import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import tasksUtils from "../utils/utils";
import TaskListClass from "../../models/task-list.model";
import TaskCard from "../../models/task-card.model";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";
import "./new-list-section.scss";

interface INewListSection {
  shouldDisplayLoader: Function;
}

const NewListSection = (props: INewListSection) => {
  const [listTitle, setListTitle] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  const dispatch = useDispatch();
  const { addNewList } = bindActionCreators(actionCreators, dispatch);

  const onNewListClick = () => {
    if (tasksUtils.isNewListTitleValid(listTitle)) {
      const newList = new TaskListClass(
        new Array<TaskCard>(),
        listTitle.trim()
      );

      tasksUtils.executeAfterDelay(
        () => {
          addNewList(newList);
          props.shouldDisplayLoader(false);
          setIsAccordionExpanded(false);
        },
        2000,
        () => {
          props.shouldDisplayLoader(true);
        }
      );

      setListTitle("");
    }
  };

  return (
    <div className="new-list-section">
      <Accordion expanded={isAccordionExpanded}>
        <AccordionSummary
          onClick={() => {
            setIsInputTouched(false);
            setListTitle("");
            setIsAccordionExpanded((prevState) => !prevState);
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Add New List
        </AccordionSummary>
        <AccordionDetails className="new-list-accordion-details-section">
          <TextField
            error={
              isInputTouched &&
              !tasksUtils.isNewListTitleValid(listTitle) &&
              listTitle.length > 0
            }
            helperText="Letters and numbers only"
            id="new-list-input"
            label="List title..."
            variant="outlined"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            onClick={() => setIsInputTouched(true)}
          />
          <Button
          className="confirm-new-list-button"
            onClick={onNewListClick}
            id="add-list-button"
            variant="outlined"
            color="primary"
            disabled={
              listTitle.trim() === "" ||
              !tasksUtils.isNewListTitleValid(listTitle)
            }
          >
            +
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default NewListSection;

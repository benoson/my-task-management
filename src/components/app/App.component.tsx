import { useState } from "react";
import TaskList from "../tasks-list/Task-List.component";
import TaskListClass from "../../models/task-list.model";
import NewListSection from "../new-list-section/New-List-Section.component";
import { useSelector } from "react-redux";
import { State } from "../../redux/index";
import LoaderSpinnder from "../loader-spinner/Loader-Spinner.component";
import taskManagementIcon from "../../assets/taskManagementIcon.svg";
import "./app.scss";

function App() {
  const [shouldDisplayLoader, setShouldDisplayLoader] = useState(false);
  const stateFromStore = useSelector((state: State) => state.stateReducer);

  return (
    <div className="app">
      {shouldDisplayLoader && <LoaderSpinnder />}

      <div className="app-header">
        <img className="app-header-logo" src={taskManagementIcon} alt="Bawer task management" />
        <h1 className="app-title">Bawer task managemet</h1>
      </div>

      <div className="task-lists-container">
        {stateFromStore.taskLists.map((taskList: TaskListClass) => (
          <TaskList
            {...taskList}
            shouldDisplayLoader={setShouldDisplayLoader}
            key={taskList.listID}
          />
        ))}
      </div>
      <NewListSection shouldDisplayLoader={setShouldDisplayLoader} />
    </div>
  );
}

export default App;

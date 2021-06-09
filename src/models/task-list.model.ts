import TaskCard from "./task-card.model";

export default class TaskList {
    private static listsCounter = 0;
    public listID: number;

    public constructor(public tasks: TaskCard[], public listTitle: string) {
        TaskList.listsCounter++;
        this.listID = TaskList.listsCounter;
    }
}
export default class TaskCard {

    private static tasksCounter = 0;
    public taskID: number;

    public constructor(public title: string, public description: string) {
        TaskCard.tasksCounter++;
        this.taskID = TaskCard.tasksCounter;
    }
}
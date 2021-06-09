const tasksUtils = {

    isNewListTitleValid: (listTitle: string): boolean => {
        if (listTitle.trim() !== "") {
            const titlePattern = /^[a-z\d\-_\s]+$/i;
            if (listTitle.match(titlePattern)) {
                return true;
            }
            return false;
        }
        return false;
    },

    executeAfterDelay: (callbackFunction: Function, timeToSleep: number, shouldDisplayLoader: Function): void => {
        setTimeout(callbackFunction, timeToSleep);
        shouldDisplayLoader(true);
    }

}

export default tasksUtils;
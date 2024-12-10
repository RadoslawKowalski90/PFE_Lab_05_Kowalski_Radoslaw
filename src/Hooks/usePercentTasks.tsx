import { useEffect, useState } from 'react';

const usePercentTasks = (tasks: {completed: boolean}[]) => {
    const [PercentTasks, setCompletedTasksCount] = useState(0);

    useEffect(() => {
        const percent = tasks.filter(task => task.completed).length / tasks.length * 100;
        setCompletedTasksCount(percent);
    }, [tasks])

    return PercentTasks
};

export default usePercentTasks;
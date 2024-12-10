import { useEffect, useState } from 'react';

const useAllTasks = (tasks: {completed: boolean}[]) => {
    const [allTasksCount, setAllTasksCount] = useState(0);

    useEffect(() => {
        const count = tasks.length;
        setAllTasksCount(count);
    }, [tasks])

    return allTasksCount
};

export default useAllTasks;
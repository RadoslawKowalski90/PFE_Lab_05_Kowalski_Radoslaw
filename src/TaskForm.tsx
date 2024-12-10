import React, {useEffect, useState, useRef} from 'react';

interface TaskFromProps {
    onAddTask: (task: string) => void;
}

const TaskForm: React.FC<TaskFromProps> = ({ onAddTask }) => {
    const [task, setTask] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim()){
            onAddTask(task);
            setTask('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                type='text'
                value={task}
                onChange={(e)=>setTask(e.target.value)}
                placeholder='Add a new task'
            />
            <button type='submit'>Add Task</button>
        </form>
    );
};

export default TaskForm
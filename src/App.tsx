import './App.scss'
import TaskForm from './TaskForm'
import TaskList from './TaskList/TaskList'
import React, {useEffect, useState} from 'react'
import useCompletedTasks from './Hooks/useCompletedTasks'
import useAllTasks from './Hooks/useAllTasks'
import usePercentTasks from './Hooks/usePercentTasks'
import TaskFilter from './TaskList/TaskFilter'

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskName: string) => {
    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      completed: false
    };
    setTasks([...tasks, newTask]);
  }

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task
      )
    );
  }

  const completedTasksCount = useCompletedTasks(tasks);
  const allTasksCount = useAllTasks(tasks);
  const percentTasks = usePercentTasks(tasks);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  })

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <>
      <h1>Lab05</h1>
      <div className='App'>
        <h1>To-Do List </h1>
        <TaskFilter onFilterChange={handleFilterChange} currentFilter={filter}/>
        <TaskForm onAddTask={addTask}></TaskForm>
        <TaskList 
          tasks={filteredTasks} 
          onToggleTaskCompletion={toggleTaskCompletion}
          onDeleteTask={deleteTask}>
        </TaskList>
        <p>Completed Tasks: {completedTasksCount}</p>
        <p>All Tasks: {allTasksCount}</p>
        <p>Percent of completed: {Number(percentTasks).toFixed(0)}%</p>
      </div>
    </>
  )
}

export default App

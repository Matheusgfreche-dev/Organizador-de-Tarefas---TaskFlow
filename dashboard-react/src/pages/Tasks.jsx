import { useState, useEffect } from 'react';
import styles from './Tasks.module.css';

import TaskList from '../components/TaskList/TaskList';
import TaskStats from '../components/TaskStats/TaskStats';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [originalText, setOriginalText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!newTask.trim()) return;
    setTasks([...tasks, { text: newTask, done: false }]);
    setNewTask('');
  }

  function toggleTask(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      )
    );
  }

  function removeTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function startEditing(index, text) {
    setEditingIndex(index);
    setEditingText(text);
    setOriginalText(text);
  }

  function saveEdit(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, text: editingText } : task
      )
    );
    setEditingIndex(null);
    setEditingText('');
    setOriginalText('');
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditingText(originalText);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'done') return task.done;
    if (filter === 'pending') return !task.done;
    return true;
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Minhas Tarefas</h2>

      <div className={styles.filters}>
        <button
          className={filter === 'all' ? styles.active : ''}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>

        <button
          className={filter === 'pending' ? styles.active : ''}
          onClick={() => setFilter('pending')}
        >
          Pendentes
        </button>

        <button
          className={filter === 'done' ? styles.active : ''}
          onClick={() => setFilter('done')}
        >
          Concluídas
        </button>
      </div>

      <TaskStats
        total={tasks.length}
        completed={tasks.filter(t => t.done).length}
      />

      <div className={styles.inputGroup}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Digite uma tarefa"
        />
        <button onClick={addTask}>Adicionar</button>
      </div>

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        removeTask={removeTask}
        startEditing={startEditing}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
        editingIndex={editingIndex}
        editingText={editingText}
        setEditingText={setEditingText}
      />
    </div>
  );
}

export default Tasks;

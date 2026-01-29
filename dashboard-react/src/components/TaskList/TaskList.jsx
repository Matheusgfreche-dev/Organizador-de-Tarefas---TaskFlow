import styles from './TaskList.module.css';
import TaskItem from '../TaskItem/TaskItem';

function TaskList({
  tasks,
  toggleTask,
  removeTask,
  startEditing,
  saveEdit,
  cancelEdit,
  editingIndex,
  editingText,
  setEditingText,
}) {
  if (tasks.length === 0) {
    return <p className={styles.empty}>Nenhuma tarefa encontrada</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          toggleTask={toggleTask}
          removeTask={removeTask}
          startEditing={startEditing}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          editingIndex={editingIndex}
          editingText={editingText}
          setEditingText={setEditingText}
        />
      ))}
    </ul>
  );
}

export default TaskList;

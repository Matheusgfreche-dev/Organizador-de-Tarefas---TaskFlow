import styles from './TaskItem.module.css';

function TaskItem({
  task,
  index,
  toggleTask,
  removeTask,
  startEditing,
  saveEdit,
  cancelEdit,
  editingIndex,
  editingText,
  setEditingText,
}) {
  const isEditing = editingIndex === index;
  const isDone = task.done;

  return (
    <li className={`${styles.task} ${isDone ? styles.done : ''}`}>
      <div className={styles.taskLeft}>
        <input
          type='checkbox'
          checked={isDone}
          onChange={() => toggleTask(index)}
        />

        {isEditing ? (
          <input
            className={styles.editInput}
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit(index);
              if (e.key === 'Escape') cancelEdit();
            }}
            autoFocus
          />
        ) : (
          <span className={styles.text}>{task.text}</span>
        )}
      </div>

      <div className={styles.actions}>
        {isEditing ? (
          <button className={styles.save} onClick={() => saveEdit(index)}>
            Salvar
          </button>
        ) : (
          <button
            className={styles.edit}
            onClick={() => startEditing(index, task.text)}
          >
            Editar
          </button>
        )}

        <button className={styles.delete} onClick={() => removeTask(index)}>
          Excluir
        </button>
      </div>
    </li>
  );
}

export default TaskItem;

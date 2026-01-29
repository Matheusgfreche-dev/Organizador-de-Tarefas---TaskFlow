import styles from './TaskStats.module.css';

function TaskStats({ total, completed }) {
  const pending = total - completed;

  return (
    <div className={styles.stats}>
      <span className={styles.total}>
        Total: <strong>{total}</strong>
      </span>

      <span className={styles.pending}>
        Pendentes: <strong>{pending}</strong>
      </span>
    </div>
  );
}

export default TaskStats;

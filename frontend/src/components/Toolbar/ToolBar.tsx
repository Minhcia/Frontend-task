import React from 'react';
import styles from './Toolbar.module.scss';

const Toolbar: React.FC = () => {
  return (
    <div className={styles.toolbar}>
      <button className={styles.button}>Add User</button>
      <button className={styles.button}>Settings</button>
      <button className={styles.button}>Profile</button>
    </div>
  );
};

export default Toolbar;

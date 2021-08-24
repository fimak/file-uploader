import React, { FC } from 'react';

import styles from '../styles/File.module.css';

interface FileProps {
  file: any;
}

const File: FC<FileProps> = ({ file }) => {
  return (
    <div className={styles.fileContainer}>
      <div className={styles.thumbnail}>{file.type}</div>
      <div className={styles.filename}>
        <span>{file.name}</span>
        <span>{(file.size/1024).toFixed(2)}kb</span>
      </div>
    </div>
  );
}

export default File;

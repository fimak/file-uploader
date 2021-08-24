import React, { FC, useRef } from 'react';

import styles from '../styles/File.module.css';

interface FileProps {
  file: any;
  index: number;
  containerRef: any;
}

const File: FC<FileProps> = ({ file, index, containerRef }) => {
  const fileRef = useRef(null);

  // @ts-ignore
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/html', e.target.outerHTML);
  }

  // @ts-ignore
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.style.display = 'none';
  }

  // @ts-ignore
  const handleDragEnd = (e) => {
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.currentTarget.style.display = 'flex';
  }

  return (
    <div
      className={styles.fileContainer}
      data-id={index}
      ref={fileRef}
      data-item={JSON.stringify(file)}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.thumbnail}>{file.type}</div>
      <div className={styles.filename}>
        <span>{file.name}</span>
        <span>{(file.size/1024).toFixed(2)}kb</span>
      </div>
    </div>
  );
}

export default File;

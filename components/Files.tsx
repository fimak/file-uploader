import React, { FC } from 'react';
import File from './File';

import styles from '../styles/Files.module.css';

interface FilesProps {
  files: any;
}

const Files: FC<FilesProps> = ({ files }) => {

  const filesArray = () => {
    const filesArray = [];
    for (let i = 0, numFiles = files.length; i < numFiles; i++) {
      filesArray.push(files[i]);
    }
    return filesArray;
  }

  return (
    <div className={styles.filesWrapper}>
      {filesArray().map((item) => (
        <File file={item} key={item.name} />
      ))}
    </div>
  );
}

export default Files;

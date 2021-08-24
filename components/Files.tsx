import React, {FC, useRef} from 'react';
import File from './File';

import styles from '../styles/Files.module.css';

interface FilesProps {
  files: any;
}

const Files: FC<FilesProps> = ({ files }) => {
  const fileWrapperRef = useRef(null);

  const filesArray = () => {
    const filesArray = [];
    for (let i = 0, numFiles = files.length; i < numFiles; i++) {
      filesArray.push(files[i]);
    }
    return filesArray;
  }

  return (
    <div className={styles.filesWrapper} ref={fileWrapperRef}>
      {filesArray().map((item, index) => (
        <File file={item} key={item.name} index={index} containerRef={fileWrapperRef}/>
      ))}
    </div>
  );
}

export default Files;

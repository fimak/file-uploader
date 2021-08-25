import React, { FC, useState, useCallback } from 'react';
import update from 'immutability-helper';
import File from './File';

import styles from '../styles/Files.module.css';

interface FilesProps {
  files: any;
}

const Files: FC<FilesProps> = ({ files }) => {
  const filesArray = () => {
    const filesArray = [];
    for (let i = 0, numFiles = files.length; i < numFiles; i++) {
      filesArray.push({file: files[i], id: i});
    }
    return filesArray;
  }
  const [cards, setCards] = useState(filesArray());

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    setCards(update(cards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    }));
  }, [cards]);

  return (
    <div className={styles.filesWrapper}>
      {cards.map((card, index) => (
        <File file={card.file} key={card.file.name} index={index} id={card.id} moveCard={moveCard} />
      ))}
    </div>
  );
}

export default Files;

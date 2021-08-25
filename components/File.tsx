import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import styles from '../styles/File.module.css';

interface FileProps {
  file: any;
  id: number;
  index: number;
  moveCard: any;
}

const ItemTypes = {
  CARD: 'card',
}

const File: FC<FileProps> = ({ id, file, index, moveCard }) => {
  const fileRef = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!fileRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = fileRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(fileRef));

  return (
    <div
      className={styles.fileContainer}
      style={{ opacity }}
      ref={fileRef}
      data-handler-id={handlerId}
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

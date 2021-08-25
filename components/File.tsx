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
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = fileRef.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
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

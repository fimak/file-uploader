import type { NextPage } from 'next'
import React, {useState, useRef, useEffect, ChangeEvent} from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import classnames from 'classnames';
import Head from 'next/head'
import Files from '../components/Files';

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [show, setShow] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [files, setFiles] = useState(null);
  const inputFile = useRef(null);
  const handleClick = () => {
    // @ts-ignore
    inputFile.current.click();
  }
  const handleChange = () => {
    // @ts-ignore
    if (inputFile.current.files.length < 2 || inputFile.current.files.length > 5) {
      setShow(true);
    } else {
      setShowFiles(true);
      // @ts-ignore
      setFiles(inputFile.current.files);
    }
  }

  useEffect(() => {

  }, [inputFile]);

  return (
    <div className={styles.container}>
      <Head>
        <title>TEST</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet" />
      </Head>

      <DndProvider backend={HTML5Backend}>
        <h1 className={styles.title}>Test</h1>

        <div className={classnames({[styles.main]: true, [styles.mainModified]: showFiles})}>
          {!showFiles && <button className={styles.btn} onClick={handleClick}>Add file</button>}
          {files && (
            <Files files={files} />
          )}
          <input className={styles.hidden} type="file" id="input" multiple ref={inputFile} onChange={handleChange} />
        </div>

        {show && (
          <div className={styles.modalOverflow}>
            <div className={styles.modalWindow}>
              <button className={styles.modalClose} onClick={() => setShow(false)} />
              <h1 className={styles.modalHeader}>Error</h1>
              <p className={styles.modalDescription}>Please add not less than 2 and not more than 5 files.</p>
              <button className={styles.modalBtn} onClick={() => setShow(false)}>OK</button>
            </div>
          </div>
        )}
      </DndProvider>
    </div>
  )
}

export default Home

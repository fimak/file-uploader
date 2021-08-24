import type { NextPage } from 'next'
import React, {useState, useRef, useEffect, ChangeEvent} from 'react'
import classnames from 'classnames';
import Head from 'next/head'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [show, setShow] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
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
    }
  }

  useEffect(() => {

  }, [inputFile]);

  return (
    <div className={styles.container}>
      <Head>
        <title>TEST</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet" />
      </Head>

      <h1 className={styles.title}>Test</h1>

      <div className={classnames({[styles.main]: true, [styles.mainModified]: showFiles})}>
        {!showFiles && <button className={styles.btn} onClick={handleClick}>Add file</button>}
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

    </div>
  )
}

export default Home

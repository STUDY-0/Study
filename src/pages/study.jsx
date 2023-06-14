import firebase from '../../firebase';
import styles from '../styles/study.module.css';
import React,{ useState } from 'react';
import Timer from '../../Timer';

function study() {
  const[showTimer, setShowTimer] =useState(false);

  return (
    <div>
      <navigator className={styles.nav}>
      <div className={styles.NavContainer}>
            <a className={styles.logo} href="index.html">
            <img src='/images/logo.png' alt='img' />
            </a>
            <ul className={styles.NavList}>
            <li className={styles.community}>
                <a href="community.html">Community</a>
            </li>
            <li className={styles.mypage}>
                <a href="myPage.html">My Page</a>
            </li>
            </ul>
        </div>

      <div>
        <h1>Timer</h1>
        {showTimer && <Timer />}
        <button onClick={()=> setShowTimer(!showTimer)}>Tiggle Timer</button>
      </div>
      </navigator>
    <div className={styles.box}>
      <img className={styles.student} src='./images/profile.png'/>
      <img className={styles.student} src='./images/profile.png'/>
      <img className={styles.student} src='./images/profile.png'/>
      <img className={styles.student} src='./images/profile.png'/>
      <img className={styles.student} src='./images/profile.png'/>
      <img className={styles.student} src='./images/profile.png'/>
      <img className={styles.student} src='./images/profile.png'/>
      <img className={styles.student} src='./images/profile.png'/>
      <img className={styles.StopScrolling}/>
        <div className={styles.imgcon}>
        <img src='./images/study_back.jpg' className={styles.imgbackground} width={"100%"} height={"100%"} alt='back'/>
        </div>
      </div>
    </div>

  );
}

export default study;


import firebase from '../../firebase';
import styels from '../styles/study.module.css';
import React,{ useState } from 'react';
import Timer from '../../Timer';

function study() {
  const[showTimer, setShowTimer] =useState(false);

  return (
    <div>
      <navigator className={styels.nav}>
      <div className={styels.NavContainer}>
            <a className={styels.logo} href="index.html">
            <img src='/images/logo.png' alt='img' />
            </a>
            <ul className={styels.NavList}>
            <li className={styels.community}>
                <a href="community.html">Community</a>
            </li>
            <li className={styels.mypage}>
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
      <div className={styels.StopScrolling}>
        <div className={styels.imgcon}>
        <img src='./images/study_back.jpg' width={"100%"} alt='back'/>
        </div>
      </div>
    </div>

  );
}



export default study;


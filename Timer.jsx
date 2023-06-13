import { useState, useEffect, useRef } from "react";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase 초기화
const firebaseConfig = {
  // Firebase 구성 정보 입력
  apiKey: "AIzaSyAtsC52zBNvuSkjU7zuvTdErBDcwbF-3QQ",
  authDomain: "study-0-c5302.firebaseapp.com",
  projectId: "study-0-c5302",
  storageBucket: "study-0-c5302.appspot.com",
  messagingSenderId: "816317935442",
  appId: "1:816317935442:web:08d0855201cbd6a82bd48b",
  measurementId: "G-QTPMEEX0J5"
};

const auth = getAuth();
const db = getFirestore();

// Google 로그인
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    const userId = user.uid; // 사용자의 고유 식별자

    // 사용자 데이터에 연결된 Timer 컴포넌트 렌더링
    ReactDOM.render(
      <Timer userId={userId} />,
      document.getElementById("root")
    );
  })
  .catch((error) => {
    console.error("로그인 중 오류가 발생했습니다:", error);
  });

function Timer({ userId }) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const timeRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const seconds = prevTime.seconds + 1;
        const minutes = prevTime.minutes + Math.floor(seconds / 60);
        const hours = prevTime.hours + Math.floor(minutes / 60);
        return {
          hours: hours,
          minutes: minutes % 60,
          seconds: seconds % 60,
        };
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      saveTimeToFirebase(timeRef.current); // 타이머 종료 시 Firebase에 시간 저장
    };
  }, []);

  async function saveTimeToFirebase(timeData) {
    try {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", userId);
        await setDoc(userDocRef, {
          accumulatedTime: timeData,
        });
        console.log("시간이 성공적으로 저장되었습니다.");
      } else {
        console.log("로그인되지 않은 사용자입니다. 데이터를 임시로 저장합니다.");
        // 여기에서 로그인되지 않은 사용자의 데이터를 임시로 저장할 수 있습니다.
      }
    } catch (error) {
      console.error("시간 저장 중 오류가 발생했습니다:", error);
    }
  }

  const handleStartTimer = () => {
    timeRef.current = time; // 현재 시간을 timeRef에 저장
    console.log("타이머가 시작되었습니다.");
  };

  return (
    <div>
      <p>타이머를 시작합니다.</p>
      <p>
        {time.hours < 10 ? "0" + time.hours : time.hours}:
        {time.minutes < 10 ? "0" + time.minutes : time.minutes}:
        {time.seconds < 10 ? "0" + time.seconds : time.seconds}
      </p>
      <button onClick={handleStartTimer}>시간 시작</button>
    </div>
  );
}

export default Timer;
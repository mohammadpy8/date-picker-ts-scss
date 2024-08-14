"use client"

import styles from "./page.module.scss";

function MainPage() {
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashedPassword;
  };

  const S = async() => {
    const aaa = await hashPassword("123456789");
    console.log("aaaaaaaaaaaaaaaa", aaa)
  }

  return (
    <div className={styles["main-box"]}>
      <div className={styles["box"]}></div>
      <button onClick={S}></button>
    </div>
  );
}

export default MainPage;

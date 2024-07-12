import Link from "next/link";
import styles from "./page.module.scss";

function MainPage() {
  return (
    <>
      <div className={styles["main-box"]}>
        <div className={styles["box"]}></div>
      </div>
      <Link href="/login">login</Link>
      <Link href="/register">register</Link>
    </>
  );
}

export default MainPage;

import { ChangeEvent } from "react";
import styles from "./SwitchToggle.module.scss";
import type { TSwitchProps } from "./SwitchToggle.type";

function SwitchToggle({ onChange = () => {}, valueSwitch }: TSwitchProps) {
  return (
    <div>
      <label className={styles.switch}>
        <input type="checkbox" onChange={onChange} checked={valueSwitch} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}

export default SwitchToggle;

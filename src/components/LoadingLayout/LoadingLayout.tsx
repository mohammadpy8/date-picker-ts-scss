"use client";

import { useEffect, useState, type FC } from "react";
import type { TLoadingLayoutProps } from "./LoadingLayout.type";
import styles from "./LoadingLayout.module.scss";

const LoadingLayout: FC<TLoadingLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 750);
  }, []);

  return isLoading ? (
    children
  ) : (
    <div className={styles.loading}>
      <div>
        <span>loading...</span>
      </div>
    </div>
  );
};

export { LoadingLayout };

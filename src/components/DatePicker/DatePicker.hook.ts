import { Ref, useEffect } from "react";

const useOutsideClickDatePicker = (ref: any, exeptionId: string, changeSetOptions: () => void) => {
  useEffect(() => {
    const handelOutsideClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target) && event.target.id !== exeptionId) {
        changeSetOptions();
      }
    };

    document.addEventListener("mousedown", handelOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handelOutsideClick);
    };
  }, [ref, changeSetOptions]);
};

export { useOutsideClickDatePicker };

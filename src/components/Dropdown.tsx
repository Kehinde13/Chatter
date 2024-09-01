import React, { useEffect, useRef, ReactNode } from "react";

type DropDownProps = {
  children: ReactNode;
  size: string;
  showDrop: boolean;
  setShowDrop: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropDown: React.FC<DropDownProps> = ({
  children,
  size,
  showDrop,
  setShowDrop,
}) => {
  const dropRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (showDrop && dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setShowDrop(false);
      }
    };
    window.addEventListener("mousedown", clickOutside);
    return () => window.removeEventListener("mousedown", clickOutside);
  }, [dropRef, showDrop, setShowDrop]);

  return (
    <>
      {showDrop && (
        <div
          ref={dropRef}
          className={`shadows flex flex-col absolute right-0 top-[2rem] rounded-md bg-slate-100 dark:bg-slate-800 ${size}`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default DropDown;

import React, { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  modal: boolean;
  toggleModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, modal, toggleModal }) => {
  return (
    <>
      <div
        onClick={toggleModal}
        className={`bg-white/50 fixed inset-0 z-10 ${
          modal ? "visible opacity-100" : "invisible opacity-0"
        } transition-all duration-500`}
      />
      {children}
    </>
  );
};

export default Modal;

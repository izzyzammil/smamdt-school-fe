import React, { PropsWithChildren } from "react";
import { Button, Modal } from "react-daisyui";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export const BasicModal = ({ isOpen, onClose, title, children }: PropsWithChildren<Props>) => {
  return (
    <Modal open={isOpen} className={"modal-box md:w-6/12 md:max-w-2xl"} onClickBackdrop={onClose}>
      <Button size="sm" shape="circle" className="absolute right-2 top-2" onClick={onClose}>
        ✕
      </Button>
      <Modal.Header className="font-bold">{title}</Modal.Header>

      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

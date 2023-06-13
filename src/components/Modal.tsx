import React, { useRef, useEffect, ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from './../store/index';
import { FaUserCheck } from 'react-icons/fa';

interface ModalProps {
  // setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  className: string;
  style?: any;
  dataTestId: string;
}

const Modal = ({
  isModalOpen,
  closeModal,
  children,
  className,
  style,
  dataTestId,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen && event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscKeyDown);
    return () => {
      window.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [closeModal]);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.focus();
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isModalOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      const focusableElements =
        modalRef.current?.querySelectorAll<HTMLButtonElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])',
        );
      const firstFocusableElement = focusableElements && focusableElements[0];
      const lastFocusableElement =
        focusableElements && focusableElements[focusableElements.length - 1];
      if (document.activeElement === lastFocusableElement && !event.shiftKey) {
        event.preventDefault();
        (
          modalRef.current?.querySelector(
            '.btn_closeModal',
          ) as HTMLButtonElement
        )?.focus();
      } else if (
        document.activeElement === firstFocusableElement &&
        event.shiftKey
      ) {
        event.preventDefault();
        lastFocusableElement?.focus();
      }
    }
  };

  return (
    <>
      {isModalOpen && <div className="bg_modalConfirm" />}
      <div
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="confirmation-text"
        onKeyDown={handleKeyDown}
        ref={modalRef}
        style={style}
        data-testid={dataTestId}
      >
        <button
          className="btn_closeModal"
          onClick={closeModal}
          aria-label="Fermer la fenêtre"
          tabIndex={0}
        >
          <FaTimes className="btn_closeModal_icon" />
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;

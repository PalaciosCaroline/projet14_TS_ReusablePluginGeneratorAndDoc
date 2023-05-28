import React, { useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from './../store/index';
import { FaUserCheck } from 'react-icons/fa';

interface ConfirmationModalProps {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  firstname: string;
  lastname: string;
}

export default function ConfirmationModal({
  setIsModalOpen,
  isModalOpen,
  firstname,
  lastname
}: ConfirmationModalProps) {

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalRef = useRef<HTMLDivElement>(null);

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
        className="confirmationModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="confirmation-text"
        onKeyDown={handleKeyDown}
        ref={modalRef}
      >
        <button
          className="btn_closeModal"
          onClick={closeModal}
          aria-label="Fermer la fenêtre"
          tabIndex={0}
        >
          <FaTimes className="btn_closeModal_icon" />
        </button>
        <div className="box_titleModal">
          <FaUserCheck className="iconCheckedModal" />
          <h2 id="modal-title">Confirmation</h2>
        </div>
        <p tabIndex={0} id="confirmation-text">
          The new employee, {firstname} {lastname}, has been registered
          successfully.
        </p>
      </div>
    </>
  );
}

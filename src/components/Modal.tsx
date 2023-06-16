import React, { useRef, useEffect, ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from './../store/index';
import { FaUserCheck } from 'react-icons/fa';

/**
 * `ModalProps` is an interface for the Modal component props.
 * @interface
 * @property {boolean} isModalOpen - If the modal is open or not.
 * @property {() => void} closeModal - A function to close the modal.
 * @property {ReactNode} children - The children nodes of the modal.
 * @property {string} className - The className for the modal div.
 * @property {any} style - The style for the modal div.
 * @property {string} dataTestId - The data-testid for the modal div.
 */
interface ModalProps {
  // setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  className: string;
  style?: any;
  dataTestId: string;
}

/**
 * `Modal` is a functional React component.
 * It renders a modal dialog which can be closed by clicking on the close button, or pressing the 'Escape' key.
 * @component
 * @param {ModalProps} { isModalOpen, closeModal, children, className, style, dataTestId } - The properties for the Modal component.
 * @returns {JSX.Element} The rendered Modal component.
 */
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

  // useEffect(() => {
  //   if (isModalOpen && modalRef.current) {
  //     modalRef.current.focus();
  //     modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.focus();
      const position = modalRef.current.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top: position, behavior: 'smooth' });
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
        className={`${className} ${isModalOpen ? 'open' : ''}`}
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

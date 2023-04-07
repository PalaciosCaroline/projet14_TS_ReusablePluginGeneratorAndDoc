import React, { useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from './../store/index';

interface ConfirmationModalProps {
    setIsModalOpen: (value: boolean) => void;
}

export default function ConfirmationModal({ setIsModalOpen }: ConfirmationModalProps) {
    const employees = useSelector((state: RootState) => state.employees);
    const lastEmployee = employees.slice(-1)[0];
    const firstname = lastEmployee.firstname;
    const lastname = lastEmployee.lastname;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll<HTMLButtonElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusableElement = focusableElements && focusableElements[0];
      const lastFocusableElement = focusableElements && focusableElements[focusableElements.length - 1];
      if (document.activeElement === lastFocusableElement && !event.shiftKey) {
        event.preventDefault();
        (modalRef.current?.querySelector('.btn_closeModal') as HTMLButtonElement)?.focus();
      } else if (document.activeElement === firstFocusableElement && event.shiftKey) {
        event.preventDefault();
        lastFocusableElement?.focus();
      }
    }
  };

  return (
    <div className='confirmationModal' role="dialog" aria-modal="true" aria-labelledby="modal-title" onKeyDown={handleKeyDown} ref={modalRef}>
      <button className='btn_closeModal' onClick={closeModal} aria-label="Fermer la fenêtre" tabIndex={0}><FaTimes className='btn_closeModal_icon' /></button>
      <h2 id="modal-title">Confirmation de l'enregistrement</h2>
      <p tabIndex={0}>Le nouvel employé {firstname} {lastname} a été enregistré avec succès</p>
    </div>
  );
}
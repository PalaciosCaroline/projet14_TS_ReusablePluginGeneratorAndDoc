import React, { useRef, useEffect } from 'react'
import { FaTimes} from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function ConfirmationModal({setIsModalOpen}) {
    const firstname = useSelector((state) => state.newEmployeeEntree.firstname.firstname);

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const modalRef = useRef(null);

    useEffect(() => {
        modalRef.current.focus();
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
            const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];
            if (document.activeElement === lastFocusableElement && !event.shiftKey) {
                event.preventDefault();
                modalRef.current.querySelector('.btn_closeModal').focus();
            } else if (document.activeElement === firstFocusableElement && event.shiftKey) {
                event.preventDefault();
                lastFocusableElement.focus();
            }
        }
    };

    return (   
        <div className='confirmationModal' role="dialog" aria-modal="true" aria-labelledby="modal-title" onKeyDown={handleKeyDown} ref={modalRef}>
            <button className='btn_closeModal' onClick={closeModal} aria-label="Fermer la fenêtre" tabIndex="0"><FaTimes className='btn_closeModal_icon'/></button>
            <h2 id="modal-title">Confirmation de l'enregistrement</h2>
            <p tabIndex="0">Le nouvel employé {firstname} a été enregistré avec succès</p>
        </div>
    )
}
import React, { useState, useEffect, useRef, FC } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

interface DropdownProps {
  options: string[];
  placeholder: string;
  onOptionClick: (option: string) => void;
  dropdownLabel: string;
  style?: React.CSSProperties;
}

const Dropdown: FC<DropdownProps> = ({
  options,
  placeholder,
  onOptionClick,
  dropdownLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  const handleOptionClick = (option: string): void => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionClick(option);
  };

  const toggleDropdown = (): void => {
    setIsOpen((prevIsOpen) => {
      if (!prevIsOpen) {
        setFocusedOptionIndex(0); // Sélectionnez la première option lors de l'ouverture du menu déroulant
      }
      return !prevIsOpen;
    });
  };

  const handleChevronClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ): void => {
    event.stopPropagation(); // Arrêter la propagation de l'événement pour éviter que le clic ne soit transmis au bouton parent
    toggleDropdown();
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  function handleKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
  }

  const handleTriggerKeyDown = (event: React.KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setFocusedOptionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedOptionIndex((prevIndex) =>
          prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex,
        );
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && focusedOptionIndex >= 0) {
          handleOptionClick(options[focusedOptionIndex]);
        } else {
          toggleDropdown();
        }
        break;
      case 'Tab':
        // Si l'utilisateur appuie sur 'Tab', fermez le menu déroulant
        // event.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      isOpen &&
      focusedOptionIndex >= 0 &&
      focusedOptionIndex < options.length &&
      dropdownRef.current // Ajoutez une vérification pour s'assurer que dropdownRef.current n'est pas null
    ) {
      const optionElement = dropdownRef.current.querySelector(
        `li:nth-child(${focusedOptionIndex + 1})`,
      );

      // Convertir l'élément en HTMLElement avant de faire appel à la méthode focus
      const htmlElement = optionElement as HTMLElement;

      // Ajoutez une vérification pour s'assurer que l'élément existe
      if (htmlElement) {
        htmlElement.focus();
      }
    }
  }, [focusedOptionIndex, isOpen, options.length]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleOptionKeyDown = (
    event: React.KeyboardEvent,
    option: string,
  ): void => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleOptionClick(option);
        break;
      case 'Tab':
        // Si l'utilisateur appuie sur 'Tab', fermez le menu déroulant
        // event.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="dropdown " ref={dropdownRef}>
      <button
        type="button"
        className="dropdownToggle"
        onClick={toggleDropdown}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={dropdownLabel}
        aria-label="Options de la liste déroulante"
      >
        {selectedOption || placeholder}
        <span className="arrow" onClick={handleChevronClick}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {isOpen && (
        <ul className="dropdownMenu" role="listbox">
          {options.map((option, index) => (
            <li
              key={option}
              // onKeyDown={(event) => handleOptionKeyDown(event, option)}
              className={`dropdownOption  ${
                index === focusedOptionIndex ? 'focused' : ''
              } ${
                option === selectedOption ? 'selected selectedOption' : ''
              }`}
              role="option"
              aria-selected={option === selectedOption}
            >
              <button
                onKeyDown={(event) => handleOptionKeyDown(event, option)}
                onClick={() => handleOptionClick(option)}
                onMouseOver={() => setFocusedOptionIndex(index)}
                className="dropdownOptionButton" // Ajoutez une classe pour styliser ce bouton comme vous le souhaitez
                tabIndex={0}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
      <span id={dropdownLabel} className="sr-only">
        Options de la liste déroulante
      </span>
    </div>
  );
};

export default Dropdown;

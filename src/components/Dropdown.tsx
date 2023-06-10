import React, { useState, useEffect, useRef, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { states, State } from '../utils/states';
import { setField } from '../store/employeeFormStateSlice';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { RootState } from './../store/index';

interface DropdownProps {
  label: string;
  options: string[];
  placeholder: string;
  dropdownLabel: string;
  style?: React.CSSProperties;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  placeholder,
  dropdownLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const newEmployeeEntree = useSelector(
    (state: RootState) => state.employeeFormState.formValues,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (label === 'State') {
      const state = states.find(
        (state) => state.abbreviation === newEmployeeEntree.state,
      );
      if (state) {
        setSelectedOption(state.name);
      } else {
        setSelectedOption('');
      }
    } else if (label === 'Department') {
      setSelectedOption(newEmployeeEntree.department || '');
    }
  }, [label, newEmployeeEntree.state, newEmployeeEntree.department]);

  function handleSelect(label: string, option: string): void {
    if (label === 'State') {
      const state: State | undefined = states.find(
        (item) => item.name === option,
      );

      if (state) {
        dispatch(setField({ name: 'state', value: state.abbreviation }));
        setSelectedOption(state.name);
      }
    } else {
      dispatch(setField({ name: 'department', value: option }));
    }
    setSelectedOption(option);
    setIsOpen(false);
  }

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
          handleSelect(label, options[focusedOptionIndex]);
        } else {
          toggleDropdown();
        }
        break;
      case 'Tab':
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
        handleSelect(label, option);
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
    <div className={`box_${label}`}>
      <p className="p_label">{label}</p>
      <div className="dropdown dropdownNewEmployee" ref={dropdownRef}>
        <button
          type="button"
          className="dropdownToggle"
          onClick={toggleDropdown}
          onKeyDown={handleTriggerKeyDown}
          value={selectedOption}
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
                  onClick={() => handleSelect(label, option)}
                  onMouseOver={() => setFocusedOptionIndex(index)}
                  className="dropdownOptionButton" // Ajoutez une classe pour styliser ce bouton comme vous le souhaitez
                  tabIndex={0}
                  style={{ width: '100%', height: '100%' }}
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
    </div>
  );
};

export default Dropdown;

import React, { useState, useEffect, useRef, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { states, State } from '../utils/states';
import { setField } from '../store/employeeFormStateSlice';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { RootState } from './../store/index';

/**
 * Defines the properties of the Dropdown component.
 *
 * @interface
 *
 * @property {string} label - The label of the dropdown.
 * @property {string[]} options - An array of options that the dropdown can have.
 * @property {string} placeholder - A short hint that describes the expected value of the dropdown.
 * @property {string} dropdownLabel - The aria-labelledby for the dropdown.
 * @property {React.CSSProperties} [style] - The style properties of the dropdown.
 */
export interface DropdownProps {
  label: string;
  options: string[];
  placeholder?: string;
  dropdownLabel: string;
  style?: React.CSSProperties;
}

/**
 * Dropdown is a functional component that renders a dropdown list with multiple options.
 * @component
 *
 * @param {DropdownProps} props - The props that are passed to this component
 *
 * @returns {React.FC}
 */

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
  const dropdownContainerRef = useRef<HTMLUListElement>(null);
  const [isMouseActive, setIsMouseActive] = useState(false);
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
        setFocusedOptionIndex(0); // select first option when dropdown is opened
      }
      return !prevIsOpen;
    });
  };

  const handleChevronClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    toggleDropdown();
  };

  const handleTriggerKeyDownApp = (event: React.KeyboardEvent): void => {
    if (event.currentTarget !== event.target) {
      return;
    }
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
        if (isOpen) {
          event.preventDefault();
          if (isOpen && focusedOptionIndex >= 0) {
            handleSelect(label, options[focusedOptionIndex]);
          } else {
            toggleDropdown();
          }
        }
        break;
      case 'Tab':
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
      dropdownRef.current
    ) {
      if (isMouseActive) {
        return; // Ignore scroll when mouse is active
      }
      const optionElement = dropdownRef.current.querySelector(
        `li:nth-child(${focusedOptionIndex + 1})`,
      );
      const htmlElement = optionElement as HTMLElement;

      if (htmlElement) {
        htmlElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [focusedOptionIndex, isOpen, options.length]);

  const handleOptionKeyDownApp = (
    event: React.KeyboardEvent,
    option: string,
  ): void => {
    if (event.currentTarget !== event.target) {
      return;
    }
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (isOpen) {
          event.preventDefault();
          handleSelect(label, option);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleMouseEnter = (): void => {
    setIsMouseActive(true);
  };
  
  const handleMouseLeave = (): void => {
    setIsMouseActive(false);
  };

  return (
    <div className={`box_${label}`}>
      <div
        className="dropdown dropdownNewEmployee"
        ref={dropdownRef}
        style={{ position: 'relative' }}
        onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
        <p className="p_label form__label">{label}</p>
        <button
          type="button"
          style={{
            color: selectedOption ? '#5a5a5a' : '#616060',
            fontWeight: selectedOption ? '600' : '',
          }}
          className="dropdownToggle form__input"
          onClick={toggleDropdown}
          onKeyDown={handleTriggerKeyDownApp}
          value={selectedOption}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={dropdownLabel}
          aria-label="Options de la liste déroulante"
          data-testid="test_btnDropDown"
        >
          {selectedOption || placeholder}
          <span className="arrow" onClick={handleChevronClick}>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </button>
        {isOpen && (
          <ul
            className="dropdownMenu"
            role="listbox"
            ref={dropdownContainerRef}
          >
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
                  onKeyDown={(event) => handleOptionKeyDownApp(event, option)}
                  onClick={() => handleSelect(label, option)}
                  onMouseOver={() => setFocusedOptionIndex(index)}
                  className="dropdownOptionButton"
                  tabIndex={0}
                  style={{ width: '100%', height: '100%' }}
                  data-testid={option}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
        <span id={dropdownLabel} className="sr-only">
          {isOpen
            ? `Dropdown options for ${label} are now visible`
            : `Dropdown options for ${label} are hidden. Press Enter to view`}
        </span>
      </div>
    </div>
  );
};

export default Dropdown;

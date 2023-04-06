// import React, { useState, useEffect, useRef } from 'react';
// import { FaChevronUp,FaChevronDown } from 'react-icons/fa';

// function Dropdown(props) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('');
//   const dropdownRef = useRef(null);

//   function handleOptionClick(option) {
//     setSelectedOption(option);
//     setIsOpen(false);
//     props.onOptionClick(option);
//   }

//   function toggleDropdown() {
//     setIsOpen(!isOpen);
//   }

//   function handleChevronClick(event) {
//     event.stopPropagation(); // Arrêter la propagation de l'événement pour éviter que le clic ne soit transmis au bouton parent
//     toggleDropdown();
//   }

//   function handleClickOutside(event) {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//     setIsOpen(false);
//     }
//   }
    
//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//     document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className='dropdown' ref={dropdownRef}>
//       <button
//         type="button"
//         className='dropdownToggle'
//         onClick={toggleDropdown}
//         aria-haspopup="listbox"
//         aria-expanded={isOpen}
//         aria-labelledby={props.dropdownLabel}
//         aria-label="Options de la liste déroulante"
//       >
//          {selectedOption || props.placeholder}
//         <span className='arrow' onClick={handleChevronClick}>{isOpen ? <FaChevronUp/> : <FaChevronDown/>}</span>
//       </button>
//       {isOpen && (
//         <ul className='dropdownMenu' role="listbox">
//           {props.options.map((option) => (
//             <li
//               key={option}
//               className={`dropdownOption ${option === selectedOption ? 'selected selectedOption' : ''}`}
//               onClick={() => handleOptionClick(option)}
//               role="option"
//               aria-selected={option === selectedOption}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//       <span id={props.dropdownLabel} className="sr-only">Options de la liste déroulante</span>
//     </div>
//   );
// }

// export default Dropdown;


// import React, { useState, useEffect, useRef, FC } from 'react';
// import { FaChevronUp,FaChevronDown } from 'react-icons/fa';

// interface DropdownProps {
//   options: string[];
//   placeholder: string;
//   onOptionClick: (option: string) => void;
//   dropdownLabel: string;
// }

// const Dropdown: FC<DropdownProps> = ({ options, placeholder, onOptionClick, dropdownLabel }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('');
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleOptionClick = (option: string): void => {
//     setSelectedOption(option);
//     setIsOpen(false);
//     onOptionClick(option);
//   }

//   const toggleDropdown = (): void => {
//     setIsOpen(!isOpen);
//   }

//   const handleChevronClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
//     event.stopPropagation(); // Arrêter la propagation de l'événement pour éviter que le clic ne soit transmis au bouton parent
//     toggleDropdown();
//   }

//   const handleClickOutside = (event: MouseEvent): void => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//       setIsOpen(false);
//     }
//   }
    
//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className='dropdown ' ref={dropdownRef} 
//     style={{ margin: '8px', width: '100%' }}>
//       <button
//         type="button"
//         className='dropdownToggle'
//         onClick={toggleDropdown}
//         aria-haspopup="listbox"
//         aria-expanded={isOpen}
//         aria-labelledby={dropdownLabel}
//         aria-label="Options de la liste déroulante"
//       >
//          {selectedOption || placeholder}
//         <span className='arrow' onClick={handleChevronClick}>{isOpen ? <FaChevronUp/> : <FaChevronDown/>}</span>
//       </button>
//       {isOpen && (
//         <ul className='dropdownMenu' role="listbox">
//           {options.map((option) => (
//             <li
//               key={option}
//               className={`dropdownOption ${option === selectedOption ? 'selected selectedOption' : ''}`}
//               onClick={() => handleOptionClick(option)}
//               role="option"
//               aria-selected={option === selectedOption}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//       <span id={dropdownLabel} className="sr-only">Options de la liste déroulante</span>
//     </div>
//   );
// }

// export default Dropdown;

import React, { useState, useEffect, useRef, FC } from 'react';
import { FaChevronUp,FaChevronDown } from 'react-icons/fa';

interface DropdownProps {
  options: string[];
  placeholder: string;
  onOptionClick: (option: string) => void;
  dropdownLabel: string;
  style?: React.CSSProperties;
}

const Dropdown: FC<DropdownProps> = ({ options, placeholder, onOptionClick, dropdownLabel  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string): void => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionClick(option);
  }

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  }

  const handleChevronClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    event.stopPropagation(); // Arrêter la propagation de l'événement pour éviter que le clic ne soit transmis au bouton parent
    toggleDropdown();
  }

  const handleClickOutside = (event: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }
    
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className='dropdown ' ref={dropdownRef} >
      <button
        type="button"
        className='dropdownToggle'
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={dropdownLabel}
        aria-label="Options de la liste déroulante"
      >
         {selectedOption || placeholder}
        <span className='arrow' onClick={handleChevronClick}>{isOpen ? <FaChevronUp/> : <FaChevronDown/>}</span>
      </button>
      {isOpen && (
        <ul className='dropdownMenu' role="listbox">
          {options.map((option) => (
            <li
              key={option}
              className={`dropdownOption ${option === selectedOption ? 'selected selectedOption' : ''}`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={option === selectedOption}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      <span id={dropdownLabel} className="sr-only">Options de la liste déroulante</span>
    </div>
  );
}

export default Dropdown;
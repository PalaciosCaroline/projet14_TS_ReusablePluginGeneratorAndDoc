// import React, {ChangeEvent} from 'react';

// interface InputFieldProps {
//     id: string;
//     name: string;
//     onChange: (event: ChangeEvent<HTMLInputElement>) => void;
//     error?: string;
//   }
  
// export const InputField: React.FC<InputFieldProps> = ({ id, name, onChange, error }) => {
//     const capitalizeFirstLetter = (event: ChangeEvent<HTMLInputElement>) => {
//       const { value } = event.target;
//       event.target.value = value.charAt(0).toUpperCase() + value.slice(1);
//       onChange(event);
//     };
  
//     return (
//       <>
//         <label htmlFor={id}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
//         <div style={{ position: 'relative' }}>
//           <input
//             type="text"
//             id={id}
//             name={name}
//             onInput={capitalizeFirstLetter}
//             className={error ? 'errorBorder' : ''}
//           />
//           {error ? (
//             <p className="errorMessage" data-testid={`error-${name}`}>
//               {error}
//             </p>
//           ) : (
//             ''
//           )}
//         </div>
//         </>
//     );
//   };

import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isWrapped?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ id, name, onChange, error, isWrapped = false }) => {
  const capitalizeFirstLetter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    event.target.value = value.charAt(0).toUpperCase() + value.slice(1);
    onChange(event);
  };

  const inputField = (
    <input
      type="text"
      id={id}
      name={name}
      onInput={capitalizeFirstLetter}
      className={error ? 'errorBorder' : ''}
    />
  );

  return (
    <>
      <label htmlFor={id}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      {isWrapped ? (
        <div style={{ position: 'relative' }}>
          {inputField}
          {error ? (
            <p className="errorMessage" data-testid={`error-${name}`}>
              {error}
            </p>
          ) : (
            ''
          )}
        </div>
      ) : (
        inputField
      )}
    </>
  );
};
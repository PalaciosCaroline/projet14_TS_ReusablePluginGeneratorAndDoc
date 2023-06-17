import React, { FC, ReactElement } from 'react';
import EditEmployeeContent from './EditEmployeeContent';
import ArchiveEmployeeContent from './ArchiveEmployeeContent';
import DeleteEmployeeContent from './DeleteEmployeeContent';
import { ModalType } from './TableEmployees';
import { EmployeeBase } from './../employeeTypes';

const employeeDataConfig = [
  {
    label: 'First Name:',
    dataKey: 'firstname',
    className: 'box_nameRight',
  },
  {
    label: 'Last Name:',
    dataKey: 'lastname',
    className: 'box_nameLeft',
  },
  {
    label: 'Date of Birthday:',
    dataKey: 'dateOfBirth',
    className: 'box_nameRight',
  },
  {
    label: 'Start Date:',
    dataKey: 'startDate',
    className: 'box_nameLeft',
  },
];


/**
 * @interface EmployeeDataProps
 * Interface detailing the props for the EmployeeData component.
 * 
 * @property {string} label - Represents the label of the data.
 * @property {string} data - Represents the data associated with the label.
 * @property {string} className - Represents the CSS class to be applied to the component.
 */
interface EmployeeDataProps {
  label: string;
  data: string;
  className: string;
}

/**
 * @function EmployeeData
 * This function component displays label-data pairs about an employee.
 * It takes the EmployeeDataProps as props.
 * 
 * @param {string} label - The label of the data.
 * @param {string} data - The data associated with the label.
 * @param {string} className - The CSS class to be applied to the component.
 */
const EmployeeData: FC<EmployeeDataProps> = ({ label, data, className }) => (
  <div className={className}>
    <div>{label}</div>
    <div className="name">{data}</div>
  </div>
);

/**
 * @function getContentByModalType
 * This function returns the modal content based on the type of modal.
 * 
 * @param {ModalType} modalType - The type of modal.
 * @param {any} handleSubmit - The function to be called when the form is submitted.
 * @param {number} selectedEmployeeId - The ID of the selected employee.
 * @param {boolean} isLoading - Indicates if the form is loading.
 * @param {() => void} handleCancel - The function to be called when the form is cancelled.
 * 
 * @returns {ReactElement} The modal content based on the type of modal.
 */
const getContentByModalType = (
  modalType: ModalType,
  handleSubmit: any,
  selectedEmployeeId: number,
  isLoading: boolean,
  handleCancel: () => void,
): ReactElement => {
  switch (modalType) {
    case 'edit':
      return (
        <EditEmployeeContent
          handleChangeSubmit={handleSubmit}
          selectedEmployeeId={selectedEmployeeId}
          isLoading={isLoading}
        />
      );
    case 'archive':
      return (
        <ArchiveEmployeeContent
          handleArchiveSubmit={handleSubmit}
          selectedEmployeeId={selectedEmployeeId}
          isLoading={isLoading}
        />
      );
    case 'delete':
      return (
        <DeleteEmployeeContent
          handleDeleteSubmit={handleSubmit}
          selectedEmployeeId={selectedEmployeeId}
          handleCancel={handleCancel}
          isLoading={isLoading}
        />
      );
    default:
      return <></>;
  }
};

/**
 * @interface ModalContentProps
 * Interface detailing the props for the ModalEmployeesContent component.
 * 
 * @property {ModalType} modalType - Represents the type of modal.
 * @property {any} handleSubmit - Represents the function to be called when the form is submitted.
 * @property {() => void} handleCancel - Represents the function to be called when the form is cancelled.
 * @property {number} selectedEmployeeId - Represents the ID of the selected employee.
 * @property {boolean} isLoading - Indicates if the form is loading.
 * @property {EmployeeBase} employeeFormEntree - Represents the data of the employee that is being edited.
 */
interface ModalContentProps {
  modalType: ModalType;
  handleSubmit: any;
  handleCancel: () => void;
  selectedEmployeeId: number;
  isLoading: boolean;
  employeeFormEntree: EmployeeBase;
}

/**
 * @function ModalEmployeesContent
 * This function component displays a modal with editable employee information.
 * It takes the ModalContentProps as props.
 * 
 * @param {ModalType} modalType - The type of modal.
 * @param {any} handleSubmit - The function to be called when the form is submitted.
 * @param {() => void} handleCancel - The function to be called when the form is cancelled.
 * @param {number} selectedEmployeeId - The ID of the selected employee.
 * @param {boolean} isLoading - Indicates if the form is loading.
 * @param {EmployeeBase} employeeFormEntree - The data of the employee that is being edited.
 */
const ModalEmployeesContent: FC<ModalContentProps> = ({
  modalType,
  handleSubmit,
  handleCancel,
  selectedEmployeeId,
  isLoading,
  employeeFormEntree,
}) => {
  const modalContent = getContentByModalType(
    modalType,
    handleSubmit,
    selectedEmployeeId,
    isLoading,
    handleCancel,
  );

  const employeeDataComponents = employeeDataConfig.map((config, index) => (
    <EmployeeData
      key={index} 
      label={config.label}
      data={employeeFormEntree[config.dataKey as keyof EmployeeBase]}
      className={config.className}
    />
  ));

  const chunkedDataComponents = [];
  for (let i = 0; i < employeeDataComponents.length; i += 2) {
    chunkedDataComponents.push(employeeDataComponents.slice(i, i + 2));
  }

  return (
    <>
      <div className="box_changeEmployeeData">
         {chunkedDataComponents.map((chunk, index) => (
          <div key={index} className="box_changeModalName">
            {chunk}
          </div>
        ))}
      </div>
      {modalContent}
    </>
  );
};

export default ModalEmployeesContent;

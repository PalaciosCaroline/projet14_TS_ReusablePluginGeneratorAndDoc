import React from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { BiErrorAlt } from 'react-icons/bi';
import { FiEdit3, FiArchive } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

export const CONFIRMATION_MODAL = 'CONFIRMATION_MODAL';
export const ERRORCONFIRMATION_MODAL = 'ERRORCONFIRMATION_MODAL';
export const EDIT_MODAL = 'EDIT_MODAL';
export const ARCHIVE_MODAL = 'ARCHIVE_MODAL';
export const DELETE_MODAL = 'DELETE_MODAL';
export const NONE_MODAL = 'NONE_MODAL';

export const modalAddEmployeeProperties = (employeeName: {firstname: string, lastname: string, dateOfBirth: string}) => ({
  CONFIRMATION_MODAL: {
    icon: <FaUserCheck className="iconCheckedModal" />,
    title: 'Confirmation',
    modalFormAddContent: (
      <p tabIndex={0} id="confirmation-text">
         The new employee, {employeeName.firstname ?? ''} {employeeName.lastname ?? ''},
        has been registered successfully.
      </p>
    ),
  },
  ERRORCONFIRMATION_MODAL: {
    icon: <BiErrorAlt className="iconCheckedModal" />,
    title: 'Error',
    modalFormAddContent: (
      <p tabIndex={0} id="error-text">
         The employee {employeeName.firstname ?? ''} {employeeName.lastname ?? ''}, born on{' '}
        {employeeName.dateOfBirth ?? ''}, already exist.
      </p>
    ),
  },
  NONE_MODAL: {
    icon: null,
    title: '',
    modalFormAddContent: null
  },
});

export const employeeDataConfig = [
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

export const modalEmployeesProperties = (
  handleChangeSubmit: any,
  handleArchiveSubmit: any,
  handleDeleteSubmit: any,
) => ({
  [EDIT_MODAL]: {
    icon: <FiEdit3 className="iconCheckedModal" />,
    title: 'Change Employee Data',
    handleSubmit: handleChangeSubmit,
  },
  [ARCHIVE_MODAL]: {
    icon: <FiArchive className="iconCheckedModal" />,
    title: 'Archive Employee',
    handleSubmit: handleArchiveSubmit,
  },
  [DELETE_MODAL]: {
    icon: <RiDeleteBin6Line className="iconCheckedModal" />,
    title: 'Delete Employee',
    handleSubmit: handleDeleteSubmit,
  },
  [NONE_MODAL]: {
    icon: null,
    title: '',
    handleSubmit: () => {},
  },
});

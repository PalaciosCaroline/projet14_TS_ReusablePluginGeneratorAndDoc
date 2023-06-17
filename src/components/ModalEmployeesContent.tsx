import React, { FC } from 'react';
import EditEmployeeContent from './EditEmployeeContent';
import ArchiveEmployeeContent from './ArchiveEmployeeContent';
import DeleteEmployeeContent from './DeleteEmployeeContent';
import { ModalType } from './TableEmployees';
import { EmployeeBase } from './../employeeTypes'
  
interface ModalContentProps {
    modalType: ModalType;
    handleSubmit: any;
    handleCancel: () => void;
    selectedEmployeeId: number;
    isLoading: boolean;
    employeeFormEntree: EmployeeBase;
}
  
const ModalEmployeesContent: FC<ModalContentProps> = ({modalType, handleSubmit, handleCancel, selectedEmployeeId, isLoading, employeeFormEntree}) => {
      return (
        <>
          <div className="box_changeEmployeeData" >
            <div className="box_changeModalName">
              <div className="box_nameRight">
                <div>First Name:</div>
                <div className="name">{employeeFormEntree.firstname}</div>
              </div>
              <div className="box_nameLeft">
                <div>Last Name:</div>
                <div className="name">{employeeFormEntree.lastname}</div>
              </div>
            </div>
            <div className="box_changeModalDate">
              <div className="box_nameRight">
                <div>Date of Birthday:</div>
                <div className="name">{employeeFormEntree.dateOfBirth}</div>
              </div>
              <div className="box_nameLeft">
                <div>Start Date: </div>
                <div className="name">{employeeFormEntree.startDate}</div>
              </div>
            </div>
          </div>
          {modalType === 'edit' && (
            <EditEmployeeContent handleChangeSubmit={handleSubmit} selectedEmployeeId={selectedEmployeeId} isLoading={isLoading} />
          )}
          {modalType === 'archive' && (
            <ArchiveEmployeeContent handleArchiveSubmit={handleSubmit} selectedEmployeeId={selectedEmployeeId} isLoading={isLoading} />
          )}
          {modalType === 'delete' && (
            <DeleteEmployeeContent handleDeleteSubmit={handleSubmit} selectedEmployeeId={selectedEmployeeId} handleCancel={handleCancel} isLoading={isLoading} />
          )}
        </>
      );
};

export default ModalEmployeesContent;
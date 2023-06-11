import React, { FC, memo, useEffect, useState } from 'react';
import { dataColumnsMock } from '../mocks/data';
import { Table } from 'typescript-table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { archiveEmployee, deleteEmployee } from '../store/employeesSlice';
import { ExportDataComponent } from 'typescript-exportdata';
import { FormNewEmployee } from './FormNewEmployee';
import DatePickerComponent from './DatePickerComponent';
import { updateEmployee } from '../store/employeesSlice';
import {
  clearInput,
  setEmployeeData,
  setError,
} from '../store/employeeFormStateSlice';
import { Employee } from '../store/employeeFormStateSlice';
import Modal from './Modal';
import AddressAndDepartmentForm from './AddressAndDepartmentForm';
import { FiEdit3 } from 'react-icons/fi';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EditEmployeeContent from './EditEmployeeContent';
import ArchiveEmployeeContent from './ArchiveEmployeeContent';
import DeleteEmployeeContent from './DeleteEmployeeContent';

interface DataItem<T> {
  [key: string]: T | undefined;
}
interface Props<T> {
  employees: DataItem<T | undefined>[];
}

interface ColumnManaged {
  label: string;
  property: string;
  isVisible?: boolean;
  dateFormat?: string;
  disableSort?: boolean;
  disableFilter?: boolean;
}

type ModalType = 'edit' | 'archive' | 'delete' | 'none';

const TableEmployees: FC<Props<any>> = memo<Props<any>>(
  ({ employees }) => {
    const dispatch = useDispatch();
    const [modalType, setModalType] = useState<ModalType>('none');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const employeeFormEntree = useSelector(
      (state: RootState) => state.employeeFormState.formValues,
    );
    const employeeEntreeErrors = useSelector(
      (state: RootState) => state.employeeFormState.formErrors,
    );
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
      null,
    );
    // const [isModalChangeOpen, setIsModalChangeOpen] = useState(false);
    // const [isModalArchiveOpen, setIsModalArchiveOpen] = useState(false);
    // const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const archivedEmployees = useSelector(
      (state: RootState) => state.employees.archived,
    );

    useEffect(() => {
      console.log('active employees:', JSON.stringify(employees, null, 2));
      console.log(
        'archived employees:',
        JSON.stringify(archivedEmployees, null, 2),
      );
    }, [employees, archivedEmployees]);

    const handleEditRow = (id: any, e:any) => {
      e.persist();
      openModal(id, 'edit', e);
    };

    const handleArchiveRow = (id: any, e:any) => {
      e.persist();
      openModal(id, 'archive', e);
    };

    const handleDeleteRow = (id: number, e:any) => {
      e.persist();
      openModal(id, 'delete', e);
    };

    const closeModal = () => {
      dispatch(clearInput());
      setIsModalOpen(false);
      setSelectedEmployeeId(null);
      setModalType('none');
    };

    const openModal = (id: number, type: string, e: any) => {
      setSelectedEmployeeId(id);
      const selectedEmployee = employees.find(
        (employee: any) => employee.id === id,
      );
      if (selectedEmployee) {
        const employeeData: any = {
          ...selectedEmployee,
        };
        dispatch(setEmployeeData(employeeData));
        setModalType(type as ModalType);
        setModalPosition({ x: e.clientX, y: e.clientY });
        console.log({ x: e.clientX, y: e.clientY })
        setIsModalOpen(true);
        console.log('delete: ' + id);
      } else {
        console.error('No employee found with id: ', id);
        return;
      }
    };

    const handleChangeSubmit = (employeeId: number) => (e: any) => {
      e.preventDefault();
      dispatch(
        updateEmployee({
          id: employeeId,
          department: employeeFormEntree.department,
          street: employeeFormEntree.street,
          city: employeeFormEntree.city,
          state: employeeFormEntree.state,
          zipCode: employeeFormEntree.zipCode,
        }),
      );
      closeModal();
    };

    const handleArchiveSubmit = (employeeId: number) => (e: any) => {
      e.preventDefault();
      console.log(employeeFormEntree.endDate);
      const endDate = employeeFormEntree.endDate;
      if (!endDate) {
        dispatch(
          setError({
            name: 'endDate',
            message: 'Veuillez sélectionner une date valide',
          }),
        );
        return;
      } else if (employeeEntreeErrors.errorendDate) {
        return;
      } else {
        dispatch(archiveEmployee({ id: employeeId, endDate }));
        closeModal();
      }
    };

    const handleDeleteSubmit = (employeeId: number) => {
      setSelectedEmployeeId(employeeId);
      console.log('delete: ' + employeeId);
      dispatch(deleteEmployee(employeeId));
      closeModal();
    };

    const handleCancel = () => {
      closeModal();
    };

    return (
      <div className="box_table" data-testid="employee-table">
        <h1>Current employees</h1>

        <Table
          data={employees}
          columns={dataColumnsMock}
          editRowColumnVisible
          handleEditRow={handleEditRow}
          archiveRowColumnVisible
          handleArchiveRow={handleArchiveRow}
          deleteRowColumnVisible
          handleDeleteRow={handleDeleteRow}
          renderExportDataComponent={(
            filteredData: DataItem<any | undefined>[],
            columnsManaged: ColumnManaged[],
          ) => (
            <ExportDataComponent
              filteredData={filteredData}
              columnsManaged={columnsManaged}
              headerProperty="label"
              csvExport={true}
              excelExport={true}
              pdfExport={true}
            />
          )}
        />
        {isModalOpen && selectedEmployeeId && (
          <Modal
            style={{
              top: modalPosition.y,
            }}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            className="editEmployeeModal"
          >
            <div className="box_titleModal">
              <FiEdit3 className="iconCheckedModal" />
              <h2 id="modal-TitleChange">
                {' '}
                {modalType === 'edit'
                  ? 'Change Employee Data'
                  : modalType === 'archive'
                  ? 'Archive Employee'
                  : modalType === 'delete'
                  ? 'Delete Employee'
                  : ''}
              </h2>
            </div>
            <div className="box_changeModalName" style={{ display: 'flex' }}>
              <p>
                First Name:
                <span className="name"> {employeeFormEntree.firstname}</span>
              </p>
              <p>
                Last Name:{' '}
                <span className="name">{employeeFormEntree.lastname}</span>
              </p>
            </div>
            <div className="box_changeModalName" style={{ display: 'flex' }}>
              <p>
                Date of Birthday:
                <span className="name"> {employeeFormEntree.dateOfBirth}</span>
              </p>
              <p>
                Start Date:{' '}
                <span className="name">{employeeFormEntree.startDate}</span>
              </p>
            </div>

            {modalType === 'edit' && (
              <EditEmployeeContent
                handleChangeSubmit={handleChangeSubmit}
                selectedEmployeeId={selectedEmployeeId}
                employeeFormEntree={employeeFormEntree}
              />
            )}
            {modalType === 'archive' && (
              <ArchiveEmployeeContent
                handleArchiveSubmit={handleArchiveSubmit}
                selectedEmployeeId={selectedEmployeeId}
                employeeFormEntree={employeeFormEntree}
              />
            )}
            {modalType === 'delete' && (
              <DeleteEmployeeContent
                handleDeleteSubmit={handleDeleteSubmit}
                selectedEmployeeId={selectedEmployeeId}
                handleCancel={handleCancel}
              />
            )}
          </Modal>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.employees === nextProps.employees;
  },
);

export default TableEmployees;

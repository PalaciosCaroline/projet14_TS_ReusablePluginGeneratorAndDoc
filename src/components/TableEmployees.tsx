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
import Modal from './Modal';
import { FiEdit3 } from 'react-icons/fi';
import EditEmployeeContent from './EditEmployeeContent';
import ArchiveEmployeeContent from './ArchiveEmployeeContent';
import DeleteEmployeeContent from './DeleteEmployeeContent';
import isDate from '../utils/controlDate';

/**
 * `DataItem<T>` is a generic interface for key-value pairs.
 * @interface
 * @template T
 * @property {string} key - The key of the data item.
 * @property {T | undefined} value - The value of the data item.
 */
interface DataItem<T> {
  [key: string]: T | undefined;
}

/**
 * `Props<T>` is a generic interface for the TableEmployees component props.
 * @interface
 * @template T
 * @property {DataItem<T | undefined>[]} employees - The employees to be displayed in the table.
 */
interface Props<T> {
  employees: DataItem<T | undefined>[];
}

/**
 * `ColumnManaged` is an interface for a managed column in the table of employees.
 * @interface
 * @property {string} label - The label to display in the header of the column.
 * @property {string} property - The property in the data that this column is responsible for.
 * @property {boolean} [isVisible] - Optional. Indicates whether the column is visible.
 * @property {string} [dateFormat] - Optional. If the column is a date column, this property is used for formatting the date.
 * @property {boolean} [disableSort] - Optional. Indicates whether the sorting functionality for the column is disabled.
 * @property {boolean} [disableFilter] - Optional. Indicates whether the filtering functionality for the column is disabled.
 */
interface ColumnManaged {
  label: string;
  property: string;
  isVisible?: boolean;
  dateFormat?: string;
  disableSort?: boolean;
  disableFilter?: boolean;
}

type ModalType = 'edit' | 'archive' | 'delete' | 'none';

/**
 * `TableEmployees` is a functional React component. It displays a table of employees,
 * and provides functionalities to edit, archive, and delete employees.
 * @component
 * @template T
 * @param {Props<T>} { employees } - The properties for the TableEmployees.
 * @returns {JSX.Element} The rendered TableEmployees.
 */
const TableEmployees: FC<Props<any>> = memo<Props<any>>(
  ({ employees }) => {
    const dispatch = useDispatch();
    const [modalType, setModalType] = useState<ModalType>('none');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const employeeFormEntree = useSelector(
      (state: RootState) => state.employeeFormState?.formValues,
    );
    const employeeEntreeErrors = useSelector(
      (state: RootState) => state.employeeFormState?.formErrors,
    );
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
      null,
    );

    const archivedEmployees = useSelector(
      (state: RootState) => state.employees.archived,
    );

    // seulement pour démonstration 
    // useEffect(() => {
    //   console.log('active employees:', JSON.stringify(employees, null, 2));
    //   console.log(
    //     'archived employees:',
    //     JSON.stringify(archivedEmployees, null, 2),
    //   );
    // }, [employees, archivedEmployees]);

    const handleEditRow = (id: any, e: any) => {
      e.persist();
      openModal(id, 'edit', e);
    };

    const handleArchiveRow = (id: any, e: any) => {
      e.persist();
      openModal(id, 'archive', e);
    };

    const handleDeleteRow = (id: number, e: any) => {
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
        // setModalPosition({ x: e.clientX, y: e.clientY });
        setModalPosition({ x: e.pageX, y: e.pageY });
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
      if (employeeEntreeErrors.errorendDate) {
        return;
      }
      if (!isDate(endDate, setError, 'endDate', dispatch)) {
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
            // style={{
            //   top: modalPosition.y,
            // }}
            style={{
              position: 'absolute', 
              top: modalPosition.y - 100 + 'px', 
            }}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            className={`editEmployeeModal ${
              modalType === 'delete' ? 'deleteEmployeeModal' : ''
            }`}
            dataTestId="modalAction"
          >
            <div className="box_titleModal">
              <FiEdit3 className="iconCheckedModal" />
              <h2 className="modal-titleChange">
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
              <EditEmployeeContent
                handleChangeSubmit={handleChangeSubmit}
                selectedEmployeeId={selectedEmployeeId}
                // employeeFormEntree={employeeFormEntree}
              />
            )}
            {modalType === 'archive' && (
              <ArchiveEmployeeContent
                handleArchiveSubmit={handleArchiveSubmit}
                selectedEmployeeId={selectedEmployeeId}
                // employeeFormEntree={employeeFormEntree}
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

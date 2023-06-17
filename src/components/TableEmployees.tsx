import React, { FC, memo, useEffect, useState, useCallback, useRef } from 'react';
import { dataColumnsMock } from '../mocks/data';
import { Table } from 'typescript-table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import {
  archiveEmployee,
  updateEmployee,
  deleteEmployee,
  setLoading,
} from '../store/employeesSlice';
import { ExportDataComponent } from 'typescript-exportdata';
import {
  clearInput,
  setEmployeeData,
  setError,
} from '../store/employeeFormStateSlice';
import Modal from './Modal';
import { FiEdit3, FiArchive } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ModalEmployeesContent from './ModalEmployeesContent';
import isDate from '../utils/controlDate';
import EditEmployeeContent from './EditEmployeeContent';
import ArchiveEmployeeContent from './ArchiveEmployeeContent';
import DeleteEmployeeContent from './DeleteEmployeeContent';

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

export type ModalType = 'edit' | 'archive' | 'delete' | 'none';

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
    const isLoading = useSelector(
      (state: RootState) => state.employees.isLoading,
    );
    const [modalType, setModalType] = useState<ModalType>('none');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const employeeFormState = useSelector(
      (state: RootState) => state.employeeFormState,
    );
    const employeeFormEntree = employeeFormState?.formValues;
    const employeeEntreeErrors = employeeFormState?.formErrors;
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
      null,
    );
    const lastFocusedElementRef = useRef<Element | null>(null);

    // const archivedEmployees = useSelector(
    //   (state: RootState) => state.employees.archived,
    // );

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
      if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) {
        lastFocusedElementRef.current.focus();
      }
    };

    // const openModal = (id: number, type: ModalType, e: MouseEvent) => {
    //   lastFocusedElementRef.current = document.activeElement;
    //   const selectedEmployee = employees.find((employee) => employee.id === id);
    //   if (!selectedEmployee) {
    //     console.error('No employee found with id: ', id);
    //     return;
    //   }
    //   setSelectedEmployeeId(id);
    //   const employeeData: any = {
    //     ...selectedEmployee,
    //   };
    //   dispatch(setEmployeeData(employeeData));
    //   setModalType(type);
    //   setModalPosition({ x: e.pageX, y: e.pageY });
    //   setIsModalOpen(true);
    // };

    // const openModal = async (id: number, type: ModalType, e: MouseEvent) => {
    //   lastFocusedElementRef.current = document.activeElement;
    //   const selectedEmployee = employees.find((employee) => employee.id === id);
    //   if (!selectedEmployee) {
    //     console.error('No employee found with id: ', id);
    //     return;
    //   }
    //   setSelectedEmployeeId(id);
    //   const employeeData: any = {
    //     ...selectedEmployee,
    //   };
      
    //   await Promise.all([
    //     dispatch(setEmployeeData(employeeData)),
    //     setModalType(type),
    //     setModalPosition({ x: e.pageX, y: e.pageY }),
    //     setIsModalOpen(true)
    //   ]);
    // };
    const openModal = async (id: number, type: ModalType, e: any) => {
    setTimeout(() => {
      lastFocusedElementRef.current = document.activeElement;
      const selectedEmployee = employees.find((employee) => employee.id === id);
      if (!selectedEmployee) {
        console.error('No employee found with id: ', id);
        return;
      }
      setSelectedEmployeeId(id);
      const employeeData: any = {
        ...selectedEmployee,
      };
      dispatch(setEmployeeData(employeeData));
      setModalType(type);
      setModalPosition({ x: e.pageX, y: e.pageY });
      setIsModalOpen(true);
    }, 0);
  };

    const handleChangeSubmit = useCallback(
      (employeeId: number) => (e: any) => {
        e.preventDefault();
        dispatch(setLoading(true));
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
        dispatch(setLoading(false));
        
      },
      [employeeFormEntree, dispatch],
    );

    const handleArchiveSubmit = useCallback(
      (employeeId: number) => (e: any) => {
        e.preventDefault();
        dispatch(setLoading(true));
        const endDate = employeeFormEntree.endDate;
        if (employeeEntreeErrors.errorendDate) {
          dispatch(setLoading(false));
          return;
        }
        if (!isDate(endDate, setError, 'endDate', dispatch)) {
          dispatch(setLoading(false));
          return;
        } else {
          dispatch(archiveEmployee({ id: employeeId, endDate }));
          closeModal();
          dispatch(setLoading(false));
        }
      },
      [employeeFormEntree, employeeEntreeErrors, dispatch],
    );

    const handleDeleteSubmit = useCallback(
      (employeeId: number) => {
        dispatch(setLoading(true));
        setSelectedEmployeeId(employeeId);
        dispatch(deleteEmployee(employeeId));
        closeModal();
        dispatch(setLoading(false));
      },
      [dispatch],
    );

    const handleCancel = () => {
      closeModal();
    };

    const modalProperties = {
      edit: {
        icon: <FiEdit3 className="iconCheckedModal" />,
        title: 'Change Employee Data',
        handleSubmit: handleChangeSubmit,
      },
      archive: {
        icon: <FiArchive className="iconCheckedModal" />,
        title: 'Archive Employee',
        handleSubmit: handleArchiveSubmit,
      },
      delete: {
        icon: <RiDeleteBin6Line className="iconCheckedModal" />,
        title: 'Delete Employee',
        handleSubmit: handleDeleteSubmit,
      },
      none: {
        icon: null, 
        title: '', 
        handleSubmit: () => {}, 
      },
    };

    const { icon, title, handleSubmit } = modalProperties[modalType];

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
              position: 'absolute',
              top: modalPosition.y + 'px',
            }}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            className={`editEmployeeModal ${
              modalType === 'delete' ? 'deleteEmployeeModal' : ''
            }`}
            dataTestId="modalAction"
            icon={icon}
            title={title}
          >
            <ModalEmployeesContent
              modalType={modalType}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              selectedEmployeeId={selectedEmployeeId}
              isLoading={isLoading}
              employeeFormEntree={employeeFormEntree}
            />
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

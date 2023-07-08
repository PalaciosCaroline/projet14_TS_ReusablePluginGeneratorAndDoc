import React, { FC, useEffect, useState, useCallback, useRef } from 'react';
import { Employee, dataColumnsMock } from '../mocks/data';
import { Table } from 'typescript-table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { ExportDataComponent } from 'typescript-exportdata';
import { clearInput, setEmployeeData } from '../store/employeeFormStateSlice';
const Modal = React.lazy(() => import('./Modal'));
import ModalEmployeesContent from './ModalEmployeesContent';
import {
  handleChangeEmployee,
  handleArchiveEmployee,
  handleDeleteEmployee,
} from '../services/employeeService';
import {
  EDIT_MODAL,
  ARCHIVE_MODAL,
  DELETE_MODAL,
  NONE_MODAL,
  modalEmployeesProperties,
} from '../utils/modalConstants';
const ErrorLoadingData = React.lazy(() => import('./ErrorLoadingData'));

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

export type ModalType =
  | typeof EDIT_MODAL
  | typeof ARCHIVE_MODAL
  | typeof DELETE_MODAL
  | typeof NONE_MODAL;

type ModalState = {
    modalType: ModalType;
    isModalOpen: boolean;
    selectedEmployeeId: number | null;
};

/**
 * `TableEmployees` is a functional React component. It displays a table of employees,
 * and provides functionalities to edit, archive, and delete employees.
 * @component
 * @returns {JSX.Element} The rendered TableEmployees.
 */
const TableEmployees: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { active: employees, isLoading } = useSelector(
    (state: RootState) => state.employees,
  );
  const employeeFormState = useSelector(
    (state: RootState) => state.employeeFormState,
  );
  const employeeFormEntree = employeeFormState?.formValues;
  const employeeEntreeErrors = employeeFormState?.formErrors;
  const initialModalState: ModalState = {
    modalType: NONE_MODAL,
    isModalOpen: false,
    selectedEmployeeId: null
  };
  const [modalState, setModalState] = useState<ModalState>(initialModalState);
  const lastFocusedElementRef = useRef<Element | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

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

  const handleEditRow = (id: any) => {
    openModal(id, EDIT_MODAL);
  };

  const handleArchiveRow = (id: any) => {
    openModal(id, ARCHIVE_MODAL);
  };

  const handleDeleteRow = (id: number) => {
    openModal(id, DELETE_MODAL);
  };

  const closeModal = () => {
    dispatch(clearInput());
    setModalProperties(null, NONE_MODAL, false);
    if (
      lastFocusedElementRef.current &&
      lastFocusedElementRef.current instanceof HTMLElement
    ) {
      lastFocusedElementRef.current.focus();
    }
  };

  const handleAnimModal = () => {
    setIsFadingOut(true);
    timeoutId.current = setTimeout(() => {
      setIsFadingOut(false);
      closeModal();
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const openModal = useCallback(
    async (id: number, type: ModalType) => {
      lastFocusedElementRef.current = document.activeElement;
      const selectedEmployee = employees.find(
        (employee: Employee) => employee.id === id,
      );
      if (!selectedEmployee) {
        console.error('No employee found with id: ', id);
        return;
      }
      const employeeData: any = {
        ...selectedEmployee,
      };
      dispatch(setEmployeeData(employeeData));
      setModalProperties(id, type, true);
    },
    [employees, dispatch],
  );

  const setModalProperties = useCallback(
    (id: number | null, modalType: ModalType, modalOpen: boolean) => {
      setModalState({ selectedEmployeeId: id, modalType: modalType, isModalOpen: modalOpen });
    },
    [],
  );

  const handleChangeSubmit = useCallback(
    (employeeId: number) => (e: any) => {
      e.preventDefault();
      handleChangeEmployee(
        dispatch,
        employeeFormEntree,
        closeModal,
        employeeId,
      );
    },
    [employeeFormEntree, dispatch],
  );

  const handleArchiveSubmit = useCallback(
    (employeeId: number) => (e: any) => {
      e.preventDefault();
      handleArchiveEmployee(
        dispatch,
        employeeFormEntree,
        closeModal,
        employeeEntreeErrors,
        employeeId,
      );
    },
    [employeeFormEntree, employeeEntreeErrors, dispatch],
  );

  const handleDeleteSubmit = useCallback(
    (employeeId: number) => {
      handleDeleteEmployee(dispatch, closeModal, employeeId);
    },
    [dispatch],
  );

  const handleCancel = () => {
    closeModal();
  };

  const { icon, title, handleSubmit } = modalEmployeesProperties(
    handleChangeSubmit,
    handleArchiveSubmit,
    handleDeleteSubmit,
)[modalState.modalType];

  return (
    <div className="box_table" data-testid="employee-table">
      <h1 className="pageApp_title">Current employees</h1>
      {employees !== undefined ? (
        <>
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
          <React.Suspense fallback={<></>}>
            {modalState.isModalOpen && modalState.selectedEmployeeId && (
              <Modal
                isModalOpen={modalState.isModalOpen}
                closeModal={handleAnimModal}
                className={`editEmployeeModal formAppModal ${
                  isFadingOut ? 'fadeOut' : ''
                } ${modalState.modalType === DELETE_MODAL ? 'deleteEmployeeModal' : ''}`}
                dataTestId={`modalAction_${modalState.modalType}`}
                icon={icon}
                title={title}
              >
                <ModalEmployeesContent
                  modalType={modalState.modalType}
                  handleSubmit={handleSubmit}
                  handleCancel={handleCancel}
                  selectedEmployeeId={modalState.selectedEmployeeId}
                  isLoading={isLoading}
                  employeeFormEntree={employeeFormEntree}
                />
              </Modal>
            )}
          </React.Suspense>
        </>
      ) : (
        <ErrorLoadingData />
      )}
    </div>
  );
};

export default TableEmployees;

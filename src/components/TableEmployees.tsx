import React, {
  FC,
  memo,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { dataColumnsMock } from '../mocks/data';
import { Table } from 'typescript-table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
// import {
//   archiveEmployee,
//   updateEmployee,
//   deleteEmployee,
//   setLoading,
// } from '../store/employeesSlice';
import { ExportDataComponent } from 'typescript-exportdata';
import {
  clearInput,
  setEmployeeData,
  setError,
} from '../store/employeeFormStateSlice';
// import Modal from './Modal';
const Modal = React.lazy(() => import('./Modal'));
// import { FiEdit3, FiArchive } from 'react-icons/fi';
// import { RiDeleteBin6Line } from 'react-icons/ri';
import ModalEmployeesContent from './ModalEmployeesContent';
// import { modalEmployeesProperties } from './ModalEmployeesContent';
import {
  handleChangeEmployee,
  handleArchiveEmployee,
  handleDeleteEmployee,
} from '../services/employeeService';
// import isDate from '../utils/controlDate';
import {
  EDIT_MODAL,
  ARCHIVE_MODAL,
  DELETE_MODAL,
  NONE_MODAL,
  modalEmployeesProperties
} from '../utils/modalConstants';

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

export type ModalType =
  | typeof EDIT_MODAL
  | typeof ARCHIVE_MODAL
  | typeof DELETE_MODAL
  | typeof NONE_MODAL;

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
    const [modalType, setModalType] = useState<ModalType>(NONE_MODAL);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const employeeFormState = useSelector(
      (state: RootState) => state.employeeFormState,
    );
    const employeeFormEntree = employeeFormState?.formValues;
    const employeeEntreeErrors = employeeFormState?.formErrors;
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
      null,
    );
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
      setModalProperties({id: null, type: NONE_MODAL, modalOpen: false});
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
        if(timeoutId.current) {
          clearTimeout(timeoutId.current); 
        }
      };
    }, []); 

    const openModal = useCallback(
      async (id: number, type: ModalType) => {
        lastFocusedElementRef.current = document.activeElement;
        const selectedEmployee = employees.find(
          (employee) => employee.id === id,
        );
        if (!selectedEmployee) {
          console.error('No employee found with id: ', id);
          return;
        }
        const employeeData: any = {
          ...selectedEmployee,
        };
        dispatch(setEmployeeData(employeeData));
        setModalProperties({id, type, modalOpen: true});
      },
      [employees, dispatch],
    );

    const setModalProperties = ({id, type, modalOpen}: {id: number | null, type: ModalType, modalOpen: boolean}) => {
      setSelectedEmployeeId(id);
      setModalType(type);
      setIsModalOpen(modalOpen);
    }


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
    )[modalType];

    return (
      <div className="box_table" data-testid="employee-table">
        <h1 className="pageApp_title">Current employees</h1>

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
          {isModalOpen && selectedEmployeeId && (
            <Modal
              isModalOpen={isModalOpen}
              closeModal={handleAnimModal}
              className={`editEmployeeModal formAppModal ${
                isFadingOut ? 'fadeOut' : ''
              } ${modalType === DELETE_MODAL ? 'deleteEmployeeModal' : ''}`}
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
        </React.Suspense>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.employees === nextProps.employees;
  },
);

export default TableEmployees;

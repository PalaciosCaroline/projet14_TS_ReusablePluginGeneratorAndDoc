import React, { FC, memo, useEffect } from 'react';
import { dataColumnsMock } from '../mocks/data';
import { Table } from 'typescript-table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { archiveEmployee, deleteEmployee } from '../store/employeesSlice';
import { ExportDataComponent } from 'typescript-exportdata';

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

const TableEmployees: FC<Props<any>> = memo<Props<any>>(
  () => {
    const dispatch = useDispatch();
    const employees = useSelector((state: RootState) => state.employees.active);
    const archivedEmployees = useSelector((state: RootState) => state.employees.archived);
  
    useEffect(() => {
      console.log('active employees:', JSON.stringify(employees, null, 2));
      console.log('archived employees:', JSON.stringify(archivedEmployees, null, 2));
    }, [employees, archivedEmployees])

    const handleEditRow = (id: any) => {
      console.log(id);
    };

    const handleArchiveRow = (id: any) => {
        console.log('archive: ' + id);
        dispatch(archiveEmployee(id));
    };
    
    const handleDeleteRow = (id: number) => {
      console.log('delete: ' + id);
        dispatch(deleteEmployee(id));
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
              headerProperty='label' 
              csvExport={true}
              excelExport={true}
              pdfExport={true}
            />
          )}
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.employees === nextProps.employees;
  },
);

export default TableEmployees;

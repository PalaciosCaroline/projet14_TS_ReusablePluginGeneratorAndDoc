import React, { FC, memo } from 'react';
import { dataColumnsMock } from '../mocks/data';
import { Table } from 'typescript-table';
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
  ({ employees }) => {
    console.log
    return (
      <div className="box_table" data-testid="employee-table">
        <h1>List of current employees</h1>
        <Table
          data={employees}
          columns={dataColumnsMock}
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

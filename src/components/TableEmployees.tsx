import React, { FC, memo } from 'react';
import { dataColumnsMock } from '../mocks/data';
import {Table} from 'typescript-table'
import { ExportDataComponent } from 'typescript-exportdata';

interface Props {
  employees: any[];
  styles?: any;
}

const TableEmployees: FC<Props> = memo(({ employees }) => {

  return (
    <div className='box_table' data-testid="employee-table">
      <h1>List of current employees</h1>
      <Table data={employees} columns={dataColumnsMock}
         renderExportDataComponent={(filteredData, columnsManaged) => (
          <ExportDataComponent
            filteredData={filteredData}
            columnsManaged={columnsManaged}
            csvExport={true}
            excelExport={true}
            pdfExport={true}
          />
        )}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.employees === nextProps.employees ;
});

export default TableEmployees;


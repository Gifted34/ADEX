import { DataTable, DataTableColumnHeader, DataTableRow, TableBody, TableHead } from '@dhis2/ui';
import React,{useEffect} from 'react';
import Datatablerow from './dataTableRow';

function RequestdataTable(props) {
    const orgUnits = props?.orgUnits;
    const indicators = props?.indicators;
    const dataExchange = props?.dataExchange;
    const dataElements = props?.dataElements
    const visualisations = props?.visualisations
    const request = dataExchange?.source?.request
    
    return (
        <div style={{padding: '30px'}}>
            <DataTable>
                <TableHead>
                    <DataTableRow>
                        <DataTableColumnHeader>
                            Name
                        </DataTableColumnHeader>
                        <DataTableColumnHeader>
                            Organisation units
                        </DataTableColumnHeader>
                        <DataTableColumnHeader>
                            Visualisations
                        </DataTableColumnHeader>
                        <DataTableColumnHeader>
                            Data elements / indicators
                        </DataTableColumnHeader>
                        <DataTableColumnHeader>
                            Periods
                        </DataTableColumnHeader>
                        <DataTableColumnHeader>
                            Actions
                        </DataTableColumnHeader>
                    </DataTableRow>
                </TableHead>
                <TableBody>
                    {request !== undefined && request?.map((req) =>{
                        return (
                            <Datatablerow request={req} dataExchange={dataExchange} deleteRequest={props?.deleteRequest} indicators={indicators} orgUnits={orgUnits}
                                    dataElements={dataElements} visualisations={visualisations} />
                    
                        )
                    })
                    }
                </TableBody>
            </DataTable>
            
        </div>
    );
}

export default RequestdataTable;
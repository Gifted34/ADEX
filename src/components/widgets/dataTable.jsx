import {
  DataTable,
  DataTableColumnHeader,
  DataTableRow,
  TableBody,
  TableHead,
} from "@dhis2/ui";
import React, { useEffect } from "react";
import Datatablerow from "./dataTableRow";

function RequestdataTable(props) {
  const orgUnits = props?.orgUnits;
  const indicators = props?.indicators;
  const dataExchange = props?.dataExchange;
  const dataElements = props?.dataElements;
  const visualisations = props?.visualisations;
  const request = dataExchange?.source?.requests;
  

  return (
    <div style={{ padding: "30px" }}>
      <DataTable>
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader></DataTableColumnHeader>
            <DataTableColumnHeader>Name</DataTableColumnHeader>
            <DataTableColumnHeader>Organisation units</DataTableColumnHeader>
            <DataTableColumnHeader>Visualisations</DataTableColumnHeader>
            <DataTableColumnHeader>
              Data elements / indicators
            </DataTableColumnHeader>
            <DataTableColumnHeader>Periods</DataTableColumnHeader>
            <DataTableColumnHeader>Actions</DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
          {request !== undefined &&
            request?.map((req, key) => {
              return (
                <Datatablerow
                  key={key}
                  requests={req}
                  styles={props?.styles}
                  index={key}
                  dataExchange={dataExchange}
                  deleteRequest={props?.deleteRequest}
                  indicators={indicators}
                  orgUnits={orgUnits}
                  dataElements={dataElements}
                  visualisations={visualisations}
                />
              );
            })}
        </TableBody>
      </DataTable>
    </div>
  );
}

export default RequestdataTable;

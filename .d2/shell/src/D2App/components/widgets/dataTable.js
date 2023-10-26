import { DataTable, DataTableColumnHeader, DataTableRow, TableBody, TableHead } from "@dhis2/ui";
import React, { useEffect } from "react";
import Datatablerow from "./dataTableRow";
function RequestdataTable(props) {
  var _dataExchange$source;
  const orgUnits = props === null || props === void 0 ? void 0 : props.orgUnits;
  const indicators = props === null || props === void 0 ? void 0 : props.indicators;
  const dataExchange = props === null || props === void 0 ? void 0 : props.dataExchange;
  const dataElements = props === null || props === void 0 ? void 0 : props.dataElements;
  const visualisations = props === null || props === void 0 ? void 0 : props.visualisations;
  const request = dataExchange === null || dataExchange === void 0 ? void 0 : (_dataExchange$source = dataExchange.source) === null || _dataExchange$source === void 0 ? void 0 : _dataExchange$source.requests;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "30px"
    }
  }, /*#__PURE__*/React.createElement(DataTable, null, /*#__PURE__*/React.createElement(TableHead, null, /*#__PURE__*/React.createElement(DataTableRow, null, /*#__PURE__*/React.createElement(DataTableColumnHeader, null, "Name"), /*#__PURE__*/React.createElement(DataTableColumnHeader, null, "Organisation units"), /*#__PURE__*/React.createElement(DataTableColumnHeader, null, "Visualisations"), /*#__PURE__*/React.createElement(DataTableColumnHeader, null, "Data elements / indicators"), /*#__PURE__*/React.createElement(DataTableColumnHeader, null, "Periods"), /*#__PURE__*/React.createElement(DataTableColumnHeader, null, "Actions"))), /*#__PURE__*/React.createElement(TableBody, null, request !== undefined && (request === null || request === void 0 ? void 0 : request.map((req, key) => {
    return /*#__PURE__*/React.createElement(Datatablerow, {
      key: key,
      requests: req,
      dataExchange: dataExchange,
      deleteRequest: props === null || props === void 0 ? void 0 : props.deleteRequest,
      indicators: indicators,
      orgUnits: orgUnits,
      dataElements: dataElements,
      visualisations: visualisations
    });
  })))));
}
export default RequestdataTable;
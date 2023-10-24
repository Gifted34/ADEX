import { useDataEngine } from "@dhis2/app-runtime";
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, Button, ButtonStrip, NoticeBox } from "@dhis2/ui";
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
export default function DataInitialized(props) {
  var _dexDataStoreValues$d, _dexDataStoreValues$d2, _dexDataStoreValues$d3, _dexDataStoreValues$d4;
  const [dexDataStoreValues, setDexDataStoreValues] = useState([]);
  const getData = () => {
    props && (props === null || props === void 0 ? void 0 : props.dataStoreDexValues().then(res => {
      setDexDataStoreValues(res);
    }));
  };
  const deleteEntry = data => {
    props === null || props === void 0 ? void 0 : props.deleteEntry(data);
  };
  const updateEntry = data => {
    props === null || props === void 0 ? void 0 : props.updateEntry(data);
  };
  const integrateEntry = data => {
    props === null || props === void 0 ? void 0 : props.integrateEntry(data);
  };
  useEffect(() => {
    getData();
  }, [props]);
  return /*#__PURE__*/React.createElement("div", null, dexDataStoreValues && (dexDataStoreValues === null || dexDataStoreValues === void 0 ? void 0 : (_dexDataStoreValues$d = dexDataStoreValues.dataStore) === null || _dexDataStoreValues$d === void 0 ? void 0 : (_dexDataStoreValues$d2 = _dexDataStoreValues$d.entries) === null || _dexDataStoreValues$d2 === void 0 ? void 0 : _dexDataStoreValues$d2.length) > 0 ? /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHead, null, /*#__PURE__*/React.createElement(TableRowHead, null, /*#__PURE__*/React.createElement(TableCellHead, null, "Date created"), /*#__PURE__*/React.createElement(TableCellHead, null, "Name"), /*#__PURE__*/React.createElement(TableCellHead, null, "Target"), /*#__PURE__*/React.createElement(TableCellHead, null))), /*#__PURE__*/React.createElement(TableBody, null, dexDataStoreValues && (dexDataStoreValues === null || dexDataStoreValues === void 0 ? void 0 : (_dexDataStoreValues$d3 = dexDataStoreValues.dataStore) === null || _dexDataStoreValues$d3 === void 0 ? void 0 : (_dexDataStoreValues$d4 = _dexDataStoreValues$d3.entries) === null || _dexDataStoreValues$d4 === void 0 ? void 0 : _dexDataStoreValues$d4.map((aggregateDataExchange, key) => {
    var _aggregateDataExchang, _aggregateDataExchang2, _aggregateDataExchang3, _aggregateDataExchang4, _aggregateDataExchang5, _aggregateDataExchang6;
    return /*#__PURE__*/React.createElement(TableRow, {
      key: key
    }, /*#__PURE__*/React.createElement(TableCell, null, aggregateDataExchange === null || aggregateDataExchange === void 0 ? void 0 : (_aggregateDataExchang = aggregateDataExchange.value) === null || _aggregateDataExchang === void 0 ? void 0 : (_aggregateDataExchang2 = _aggregateDataExchang.createdAt) === null || _aggregateDataExchang2 === void 0 ? void 0 : _aggregateDataExchang2.split(",")[0]), /*#__PURE__*/React.createElement(TableCell, null, aggregateDataExchange === null || aggregateDataExchange === void 0 ? void 0 : (_aggregateDataExchang3 = aggregateDataExchange.value) === null || _aggregateDataExchang3 === void 0 ? void 0 : _aggregateDataExchang3.dexname), /*#__PURE__*/React.createElement(TableCell, null, (aggregateDataExchange === null || aggregateDataExchange === void 0 ? void 0 : (_aggregateDataExchang4 = aggregateDataExchange.value) === null || _aggregateDataExchang4 === void 0 ? void 0 : _aggregateDataExchang4.url) == undefined ? aggregateDataExchange === null || aggregateDataExchange === void 0 ? void 0 : (_aggregateDataExchang5 = aggregateDataExchange.value) === null || _aggregateDataExchang5 === void 0 ? void 0 : _aggregateDataExchang5.type : aggregateDataExchange === null || aggregateDataExchange === void 0 ? void 0 : (_aggregateDataExchang6 = aggregateDataExchange.value) === null || _aggregateDataExchang6 === void 0 ? void 0 : _aggregateDataExchang6.url), /*#__PURE__*/React.createElement(TableCell, {
      dense: true
    }, /*#__PURE__*/React.createElement(ButtonStrip, {
      start: true
    }, /*#__PURE__*/React.createElement(Link, {
      to: `/view/${aggregateDataExchange === null || aggregateDataExchange === void 0 ? void 0 : aggregateDataExchange.key}`,
      style: {
        textDecoration: "none",
        color: "black"
      }
    }, /*#__PURE__*/React.createElement(Button, null, "View")), /*#__PURE__*/React.createElement(Link, {
      to: `/new-request/${aggregateDataExchange === null || aggregateDataExchange === void 0 ? void 0 : aggregateDataExchange.key}`,
      style: {
        textDecoration: "none",
        color: "black"
      }
    }, /*#__PURE__*/React.createElement(Button, null, "Add new")), /*#__PURE__*/React.createElement(Button, {
      secondary: true,
      onClick: () => {
        props === null || props === void 0 ? void 0 : props.setOpenUpdate(!(props !== null && props !== void 0 && props.openUpdate));
        updateEntry(aggregateDataExchange);
      }
    }, "Update"), /*#__PURE__*/React.createElement(Button, {
      destructive: true,
      onClick: () => {
        props === null || props === void 0 ? void 0 : props.setOpenDelete(!(props !== null && props !== void 0 && props.openDelete));
        deleteEntry(aggregateDataExchange);
      }
    }, "Remove"), /*#__PURE__*/React.createElement(Button, {
      primary: true,
      onClick: () => {
        props === null || props === void 0 ? void 0 : props.setOpenIntegration(!(props !== null && props !== void 0 && props.openIntegration));
        integrateEntry(aggregateDataExchange);
      }
    }, "Initialize integration"))));
  })))) : /*#__PURE__*/React.createElement(NoticeBox, {
    title: "Initialized data exchange"
  }, "No data is available"), /*#__PURE__*/React.createElement(Outlet, null));
}
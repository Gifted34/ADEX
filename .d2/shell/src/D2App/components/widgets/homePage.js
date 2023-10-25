import { Button, ButtonStrip, Divider } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import DataInitialized from "./dataInitialized";
import { useDataEngine } from "@dhis2/app-runtime";
import { Link } from "react-router-dom";
export default function HomePage(props) {
  const engine = useDataEngine();
  let dataStorePath = "dataStore/DEX_initializer_values";
  const getDataStoreDexValues = async props => {
    const query = {
      dataStore: {
        resource: dataStorePath,
        params: {
          fields: ["."]
        }
      }
    };
    try {
      const res = await (engine === null || engine === void 0 ? void 0 : engine.query(query));
      return res;
    } catch (e) {}
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    onClick: () => props === null || props === void 0 ? void 0 : props.setOpen(!(props !== null && props !== void 0 && props.open))
  }, "Create new")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    className: "",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement(DataInitialized, {
    setOpenDelete: props === null || props === void 0 ? void 0 : props.setOpenDelete,
    openDelete: props === null || props === void 0 ? void 0 : props.openDelete,
    setOpenUpdate: props === null || props === void 0 ? void 0 : props.setOpenUpdate,
    openIntegration: props === null || props === void 0 ? void 0 : props.openIntegration,
    setOpenIntegration: props === null || props === void 0 ? void 0 : props.setOpenIntegration,
    openUpdate: props === null || props === void 0 ? void 0 : props.openUpdate,
    dataStoreDexValues: getDataStoreDexValues,
    data: [],
    styles: props === null || props === void 0 ? void 0 : props.classes,
    deleteEntry: props === null || props === void 0 ? void 0 : props.deleteEntry,
    updateEntry: props === null || props === void 0 ? void 0 : props.updateEntry,
    integrateEntry: props === null || props === void 0 ? void 0 : props.integrateEntry
  })));
}
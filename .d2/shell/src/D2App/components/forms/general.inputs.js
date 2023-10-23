import { Box, Button, Field, Input, SingleSelect, SingleSelectOption } from "@dhis2/ui";
import React, { useState, useEffect } from "react";
import PeriodsComponent from "./periodsComponent";
export default function GeneralInputs(props) {
  var _props$styles, _props$styles2, _props$styles3, _props$styles4;
  const [type, setType] = useState("EXTERNAL");
  const [formInputs, setFormInputs] = useState({
    dexname: "",
    url: ""
  });
  const inputsHandler = e => {
    setFormInputs({
      ...formInputs,
      [e === null || e === void 0 ? void 0 : e.name]: e === null || e === void 0 ? void 0 : e.value
    });
  };
  const saveToDataStore = () => {
    if (type == null || type == undefined || type == "" || (formInputs === null || formInputs === void 0 ? void 0 : formInputs.dexname) == null || (formInputs === null || formInputs === void 0 ? void 0 : formInputs.dexname) == undefined || (formInputs === null || formInputs === void 0 ? void 0 : formInputs.dexname) == "" || (formInputs === null || formInputs === void 0 ? void 0 : formInputs.url) == null || (formInputs === null || formInputs === void 0 ? void 0 : formInputs.url) == undefined || (formInputs === null || formInputs === void 0 ? void 0 : formInputs.url) == "") {} else {
      props === null || props === void 0 ? void 0 : props.generalInputValues({
        type,
        formInputs
      });
    }
  };
  useEffect(() => {
    console.clear();
  }, [formInputs]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "General Details",
    className: `${props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.padding}`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "700px"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    name: "dexname",
    type: "text",
    onChange: inputsHandler,
    placeholder: "Name of aggregate data exchange. Unique.",
    className: props === null || props === void 0 ? void 0 : (_props$styles2 = props.styles) === null || _props$styles2 === void 0 ? void 0 : _props$styles2.marginBottom
  }), /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$styles3 = props.styles) === null || _props$styles3 === void 0 ? void 0 : _props$styles3.marginBottom
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    className: "select",
    onChange: e => {
      setType(e.selected);
    },
    selected: type
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "Internal",
    value: "INTERNAL"
  }), /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "External",
    value: "EXTERNAL"
  }))), type == "EXTERNAL" && /*#__PURE__*/React.createElement(Input, {
    name: "url",
    type: "text",
    onChange: inputsHandler,
    className: props === null || props === void 0 ? void 0 : (_props$styles4 = props.styles) === null || _props$styles4 === void 0 ? void 0 : _props$styles4.marginBottom,
    placeholder: "Base URL of target DHIS 2 instance, do not include the /api part."
  }), /*#__PURE__*/React.createElement(Button, {
    name: "Primary button",
    onClick: saveToDataStore,
    primary: true,
    value: "save"
  }, "Save to DataStore"))));
}
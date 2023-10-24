import { Box, Button, Field, Input, SingleSelect, SingleSelectOption } from "@dhis2/ui";
import React, { useState, useEffect } from "react";
export default function GeneralInputs(props) {
  var _props$styles, _props$styles2, _props$styles3;
  const inputsHandler = e => {
    props === null || props === void 0 ? void 0 : props.setFormInputValues({
      ...(props === null || props === void 0 ? void 0 : props.formInputValues),
      [e === null || e === void 0 ? void 0 : e.name]: e === null || e === void 0 ? void 0 : e.value
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "General Details"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    name: "dexname",
    type: "text",
    onChange: inputsHandler,
    placeholder: "Name of aggregate data exchange. Unique.",
    className: props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.marginBottom
  }), /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$styles2 = props.styles) === null || _props$styles2 === void 0 ? void 0 : _props$styles2.marginBottom
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    className: "select",
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setType(e.selected);
    },
    selected: props === null || props === void 0 ? void 0 : props.type
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "Internal",
    value: "INTERNAL"
  }), /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "External",
    value: "EXTERNAL"
  }))), (props === null || props === void 0 ? void 0 : props.type) == "EXTERNAL" && /*#__PURE__*/React.createElement(Input, {
    name: "url",
    type: "text",
    onChange: inputsHandler,
    className: props === null || props === void 0 ? void 0 : (_props$styles3 = props.styles) === null || _props$styles3 === void 0 ? void 0 : _props$styles3.marginBottom,
    placeholder: "Base URL of target DHIS 2 instance, do not include the /api part."
  }))));
}
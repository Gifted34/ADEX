import { Button, ButtonStrip } from "@dhis2/ui";
import React from "react";
import { Link } from "react-router-dom";
import GeneralForm from "../forms/general.form";
import GeneralInputs from "../forms/general.inputs";
export default function NewDataInitialization(props) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/",
    style: {
      textDecoration: "none",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true
  }, "Home"))), /*#__PURE__*/React.createElement("div", {
    className: "",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement(GeneralInputs, {
    styles: props === null || props === void 0 ? void 0 : props.styles,
    formInputs: props === null || props === void 0 ? void 0 : props.formInputs,
    formData: props === null || props === void 0 ? void 0 : props.formData,
    generalInputValues: props === null || props === void 0 ? void 0 : props.generalInputValues
  })));
}
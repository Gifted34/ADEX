import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import React from "react";
import GeneralInputs from "../forms/general.inputs";
export default function NewDataInitialization(props) {
  // var val = Math.floor(1000 + Math.random() * 9000);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, (props === null || props === void 0 ? void 0 : props.open) && /*#__PURE__*/React.createElement("div", {
    className: "",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement(Modal, {
    large: true,
    position: "middle"
  }, /*#__PURE__*/React.createElement(ModalTitle, null, "New Initialization"), /*#__PURE__*/React.createElement(ModalContent, null, /*#__PURE__*/React.createElement(GeneralInputs, {
    styles: props === null || props === void 0 ? void 0 : props.styles,
    formInputValues: props === null || props === void 0 ? void 0 : props.formInputValues,
    formData: props === null || props === void 0 ? void 0 : props.formData,
    setType: props === null || props === void 0 ? void 0 : props.setType,
    type: props === null || props === void 0 ? void 0 : props.type,
    setFormInputValues: props === null || props === void 0 ? void 0 : props.setFormInputValues
  })), /*#__PURE__*/React.createElement(ModalActions, null, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      props === null || props === void 0 ? void 0 : props.setOpen(false);
    },
    destructive: true
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      props === null || props === void 0 ? void 0 : props.saveGeneralInputValues();
    },
    primary: true
  }, "Save to DataStore"))))));
}
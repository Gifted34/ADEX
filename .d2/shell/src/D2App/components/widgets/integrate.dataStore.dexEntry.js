import { Box, Button, ButtonStrip, Field, Input, Modal, ModalActions, ModalContent, ModalTitle, SingleSelect, SingleSelectOption } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
export default function IntegrateDataStoreInitializationToDEX(props) {
  var _props$styles, _props$styles2, _props$styles3, _props$styles4, _props$styles5;
  const inputsHandler = e => {
    props === null || props === void 0 ? void 0 : props.setAuthValues({
      ...(props === null || props === void 0 ? void 0 : props.authValues),
      [e === null || e === void 0 ? void 0 : e.name]: e === null || e === void 0 ? void 0 : e.value
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, (props === null || props === void 0 ? void 0 : props.openIntegration) && /*#__PURE__*/React.createElement("div", {
    className: "",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement(Modal, {
    large: true,
    position: "middle"
  }, /*#__PURE__*/React.createElement(ModalTitle, null, "Initialize Integration"), /*#__PURE__*/React.createElement(ModalContent, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "User credentials"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, (props === null || props === void 0 ? void 0 : props.type) == "EXTERNAL" && /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.marginBottom
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    className: props === null || props === void 0 ? void 0 : (_props$styles2 = props.styles) === null || _props$styles2 === void 0 ? void 0 : _props$styles2.marginBottom,
    selected: props === null || props === void 0 ? void 0 : props.authType,
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setAuthType(e.selected);
    }
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "Basic auth",
    value: "BASICAUTH"
  }), /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "Access Token",
    value: "TOKEN"
  })), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, (props === null || props === void 0 ? void 0 : props.authType) == "BASICAUTH" ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: "500px",
      display: "flex",
      flexFlow: "row",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    name: "username",
    type: "text",
    onChange: inputsHandler,
    placeholder: "Username",
    className: props === null || props === void 0 ? void 0 : (_props$styles3 = props.styles) === null || _props$styles3 === void 0 ? void 0 : _props$styles3.marginBottom
  }), /*#__PURE__*/React.createElement(Input, {
    name: "password",
    onChange: inputsHandler,
    type: "password",
    className: props === null || props === void 0 ? void 0 : (_props$styles4 = props.styles) === null || _props$styles4 === void 0 ? void 0 : _props$styles4.marginBottom,
    placeholder: "Password"
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    name: "token",
    type: "text",
    onChange: inputsHandler,
    placeholder: "Paste the access token here...",
    className: props === null || props === void 0 ? void 0 : (_props$styles5 = props.styles) === null || _props$styles5 === void 0 ? void 0 : _props$styles5.marginBottom
  })))))))), /*#__PURE__*/React.createElement(ModalActions, null, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      props === null || props === void 0 ? void 0 : props.setOpenIntegration(false);
    },
    destructive: true
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      props === null || props === void 0 ? void 0 : props.initializeIntegration(props === null || props === void 0 ? void 0 : props.data);
    },
    primary: true
  }, "Save to Initialization"))))));
}
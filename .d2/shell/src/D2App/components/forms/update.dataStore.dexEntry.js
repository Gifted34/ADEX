import { Box, Button, ButtonStrip, Field, Input, Modal, ModalActions, ModalContent, ModalTitle, SingleSelect, SingleSelectOption } from "@dhis2/ui";
import React, { useEffect } from "react";
export default function UpdateDataInitialization(props) {
  var _props$data, _props$data$value, _props$data$value$dat, _props$styles, _props$styles2, _props$data2, _props$data2$value, _props$data2$value$da, _props$styles3;
  // var val = Math.floor(1000 + Math.random() * 9000);
  const inputsHandler = e => {
    props === null || props === void 0 ? void 0 : props.setFormInputValues({
      ...(props === null || props === void 0 ? void 0 : props.formInputValues),
      [e === null || e === void 0 ? void 0 : e.name]: e === null || e === void 0 ? void 0 : e.value
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, (props === null || props === void 0 ? void 0 : props.openUpdate) && /*#__PURE__*/React.createElement("div", {
    className: "",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement(Modal, {
    large: true,
    position: "middle"
  }, /*#__PURE__*/React.createElement(ModalTitle, null, "Update Initialization"), /*#__PURE__*/React.createElement(ModalContent, null, /*#__PURE__*/React.createElement("div", {
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
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setFormInputValues({
        ...(props === null || props === void 0 ? void 0 : props.formInputValues),
        [e === null || e === void 0 ? void 0 : e.name]: e === null || e === void 0 ? void 0 : e.value
      });
    },
    value: props === null || props === void 0 ? void 0 : (_props$data = props.data) === null || _props$data === void 0 ? void 0 : (_props$data$value = _props$data.value) === null || _props$data$value === void 0 ? void 0 : (_props$data$value$dat = _props$data$value.dataValues) === null || _props$data$value$dat === void 0 ? void 0 : _props$data$value$dat.name,
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
    value: props === null || props === void 0 ? void 0 : (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : (_props$data2$value = _props$data2.value) === null || _props$data2$value === void 0 ? void 0 : (_props$data2$value$da = _props$data2$value.dataValues) === null || _props$data2$value$da === void 0 ? void 0 : _props$data2$value$da.url,
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setFormInputValues({
        ...(props === null || props === void 0 ? void 0 : props.formInputValues),
        [e === null || e === void 0 ? void 0 : e.name]: e === null || e === void 0 ? void 0 : e.value
      });
    },
    className: props === null || props === void 0 ? void 0 : (_props$styles3 = props.styles) === null || _props$styles3 === void 0 ? void 0 : _props$styles3.marginBottom,
    placeholder: "Base URL of target DHIS 2 instance, do not include the /api part."
  }))))), /*#__PURE__*/React.createElement(ModalActions, null, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      props === null || props === void 0 ? void 0 : props.setOpenUpdate(false);
    },
    destructive: true
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      props === null || props === void 0 ? void 0 : props.updateGeneralInputValues(props === null || props === void 0 ? void 0 : props.data);
    },
    primary: true
  }, "Save to DataStore"))))));
}
import { Box, Field, Input, SingleSelect, SingleSelectOption } from "@dhis2/ui";
import React, { useState, useEffect } from "react";
import PeriodsComponent from "./periodsComponent";
export default function GeneralForm(props) {
  var _props$styles, _props$styles2, _props$styles3, _props$styles4, _props$styles5, _props$styles6, _props$styles7, _props$styles8, _props$periodTypes, _props$styles9, _props$styles10, _props$styles11, _props$styles12, _props$styles13, _props$styles14;
  const [type, setType] = useState("EXTERNAL");
  const [periodType, setPeriodType] = useState("Monthly");
  const [period1, setPeriod1] = useState();
  const [period2, setPeriod2] = useState();
  const [authType, setAuthType] = useState("BASICAUTH");
  const [formInputs, setFormInputs] = useState({
    dexname: "",
    sourcename: "",
    url: "",
    username: "",
    password: "",
    token: "",
    period: ""
  });
  const inputsHandler = e => {
    setFormInputs({
      ...formInputs,
      [e === null || e === void 0 ? void 0 : e.name]: e === null || e === void 0 ? void 0 : e.value
    });
  };
  useEffect(() => {
    props === null || props === void 0 ? void 0 : props.formInputs({
      type,
      authType,
      formInputs
    });
    console.clear();
  }, [formInputs]);
  return /*#__PURE__*/React.createElement(Field, {
    label: "General",
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
  }), /*#__PURE__*/React.createElement(Input, {
    name: "sourcename",
    type: "text",
    onChange: inputsHandler,
    placeholder: "Name of source request",
    className: props === null || props === void 0 ? void 0 : (_props$styles3 = props.styles) === null || _props$styles3 === void 0 ? void 0 : _props$styles3.marginBottom
  }), /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$styles4 = props.styles) === null || _props$styles4 === void 0 ? void 0 : _props$styles4.marginBottom
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
    className: props === null || props === void 0 ? void 0 : (_props$styles5 = props.styles) === null || _props$styles5 === void 0 ? void 0 : _props$styles5.marginBottom,
    placeholder: "Base URL of target DHIS 2 instance, do not include the /api part."
  }), /*#__PURE__*/React.createElement(Box, {
    className: `${props === null || props === void 0 ? void 0 : (_props$styles6 = props.styles) === null || _props$styles6 === void 0 ? void 0 : _props$styles6.marginBottom} ${props === null || props === void 0 ? void 0 : (_props$styles7 = props.styles) === null || _props$styles7 === void 0 ? void 0 : _props$styles7.periodFields}`
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    className: `${props === null || props === void 0 ? void 0 : (_props$styles8 = props.styles) === null || _props$styles8 === void 0 ? void 0 : _props$styles8.fields}`,
    onChange: e => {
      setPeriodType(e.selected);
    },
    selected: periodType
  }, props === null || props === void 0 ? void 0 : (_props$periodTypes = props.periodTypes) === null || _props$periodTypes === void 0 ? void 0 : _props$periodTypes.map((periods, key) => {
    return /*#__PURE__*/React.createElement(SingleSelectOption, {
      key: key,
      label: periods === null || periods === void 0 ? void 0 : periods.name,
      value: periods === null || periods === void 0 ? void 0 : periods.name
    });
  })), /*#__PURE__*/React.createElement(Box, {
    className: `${props === null || props === void 0 ? void 0 : (_props$styles9 = props.styles) === null || _props$styles9 === void 0 ? void 0 : _props$styles9.fields}`
  }, /*#__PURE__*/React.createElement(PeriodsComponent, {
    periodType: periodType,
    inputHandler: inputsHandler,
    key: periodType,
    styles: props === null || props === void 0 ? void 0 : props.styles
  }))), type == "EXTERNAL" && /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$styles10 = props.styles) === null || _props$styles10 === void 0 ? void 0 : _props$styles10.marginBottom
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    className: props === null || props === void 0 ? void 0 : (_props$styles11 = props.styles) === null || _props$styles11 === void 0 ? void 0 : _props$styles11.marginBottom,
    selected: authType,
    onChange: e => {
      setAuthType(e.selected);
    }
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "Basic auth",
    value: "BASICAUTH"
  }), /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "Access Token",
    value: "TOKEN"
  })), authType == "BASICAUTH" ? /*#__PURE__*/React.createElement("div", {
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
    placeholder: "username",
    className: props === null || props === void 0 ? void 0 : (_props$styles12 = props.styles) === null || _props$styles12 === void 0 ? void 0 : _props$styles12.marginBottom
  }), /*#__PURE__*/React.createElement(Input, {
    name: "password",
    onChange: inputsHandler,
    type: "password",
    className: props === null || props === void 0 ? void 0 : (_props$styles13 = props.styles) === null || _props$styles13 === void 0 ? void 0 : _props$styles13.marginBottom,
    placeholder: "password"
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    name: "token",
    type: "text",
    onChange: inputsHandler,
    placeholder: "Paste the access token here...",
    className: props === null || props === void 0 ? void 0 : (_props$styles14 = props.styles) === null || _props$styles14 === void 0 ? void 0 : _props$styles14.marginBottom
  })))));
}
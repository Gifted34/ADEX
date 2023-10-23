import { Button, ButtonStrip, Box, Field, Input } from "@dhis2/ui";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PeriodsWidget from "../forms/periodLayout";
import DataDimensionsCodes from "../forms/dataDimensionsCodes";
import OrgUnits from "../forms/orgUnits";
export default function AddNewRequests(props) {
  var _props$data, _props$data$organisat, _props$data2, _props$data2$visualiz, _props$data3, _props$data3$dataElem, _props$data4, _props$data4$indicato, _props$style, _props$style2, _props$style3, _props$style4, _props$style5, _props$style6, _props$style7, _props$style8, _props$style9;
  const location = useLocation();
  const data = props === null || props === void 0 ? void 0 : props.data;
  const orgUnits = props === null || props === void 0 ? void 0 : (_props$data = props.data) === null || _props$data === void 0 ? void 0 : (_props$data$organisat = _props$data.organisationUnits) === null || _props$data$organisat === void 0 ? void 0 : _props$data$organisat.organisationUnits;
  const Visualizations = props === null || props === void 0 ? void 0 : (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : (_props$data2$visualiz = _props$data2.visualizations) === null || _props$data2$visualiz === void 0 ? void 0 : _props$data2$visualiz.visualizations;
  const dataElements = props === null || props === void 0 ? void 0 : (_props$data3 = props.data) === null || _props$data3 === void 0 ? void 0 : (_props$data3$dataElem = _props$data3.dataElements) === null || _props$data3$dataElem === void 0 ? void 0 : _props$data3$dataElem.dataElements;
  const indicators = props === null || props === void 0 ? void 0 : (_props$data4 = props.data) === null || _props$data4 === void 0 ? void 0 : (_props$data4$indicato = _props$data4.indicators) === null || _props$data4$indicato === void 0 ? void 0 : _props$data4$indicato.indicators;
  const id = location.pathname.split('/')[2];
  return /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.padding
  }, /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.display
  }, /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style3 = props.style) === null || _props$style3 === void 0 ? void 0 : _props$style3.padding
  }, /*#__PURE__*/React.createElement(OrgUnits, {
    orgUnits: orgUnits
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Box, {
    className: `${props === null || props === void 0 ? void 0 : (_props$style4 = props.style) === null || _props$style4 === void 0 ? void 0 : _props$style4.width} ${props === null || props === void 0 ? void 0 : (_props$style5 = props.style) === null || _props$style5 === void 0 ? void 0 : _props$style5.padding}`
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Name"
  }, /*#__PURE__*/React.createElement(Input, {
    onChange: e => {
      console.log(e);
    },
    placeholder: "Enter request name"
  }))), /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$style6 = props.style) === null || _props$style6 === void 0 ? void 0 : _props$style6.display
  }, /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style7 = props.style) === null || _props$style7 === void 0 ? void 0 : _props$style7.padding
  }, /*#__PURE__*/React.createElement(PeriodsWidget, null)), /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style8 = props.style) === null || _props$style8 === void 0 ? void 0 : _props$style8.padding
  }, /*#__PURE__*/React.createElement(DataDimensionsCodes, {
    dataElements: dataElements,
    indicators: indicators,
    visualizations: Visualizations
  }))), /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$style9 = props.style) === null || _props$style9 === void 0 ? void 0 : _props$style9.padding
  }, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    large: true
  }, "Save"), /*#__PURE__*/React.createElement(Link, {
    to: "/",
    style: {
      textDecoration: "none",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    large: true
  }, "Cancel")))))));
}
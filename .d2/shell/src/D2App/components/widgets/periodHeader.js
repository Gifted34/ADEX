import { Box, Field, Input, SingleSelect, SingleSelectOption, Tab, TabBar } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
export default function LeftHeader(props) {
  var _props$styles, _props$styles2, _props$styles3, _props$periodType, _props$styles4, _props$periodType2;
  const tabs = [{
    id: 1,
    name: 'Relative Periods'
  }, {
    id: 2,
    name: 'Fixed Periods'
  }];
  const [tab, setTab] = useState(1);
  const [year, setYear] = useState(props === null || props === void 0 ? void 0 : props.year);
  const [selectedPeriod, setPeriod] = useState(props === null || props === void 0 ? void 0 : props.period);
  return /*#__PURE__*/React.createElement("div", {
    className: `${props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.marginTop}`
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TabBar, null, tabs === null || tabs === void 0 ? void 0 : tabs.map((tabIndex, key) => {
    return /*#__PURE__*/React.createElement(Tab, {
      className: "tabs",
      key: key,
      onClick: () => {
        props === null || props === void 0 ? void 0 : props.setRelative((tabIndex === null || tabIndex === void 0 ? void 0 : tabIndex.id) === 1);
        setTab(tabIndex === null || tabIndex === void 0 ? void 0 : tabIndex.id);
      },
      selected: tab === (tabIndex === null || tabIndex === void 0 ? void 0 : tabIndex.id)
    }, tabIndex === null || tabIndex === void 0 ? void 0 : tabIndex.name);
  })), tab === 1 ? /*#__PURE__*/React.createElement("div", {
    className: `${props === null || props === void 0 ? void 0 : (_props$styles2 = props.styles) === null || _props$styles2 === void 0 ? void 0 : _props$styles2.marginTop} ${props === null || props === void 0 ? void 0 : (_props$styles3 = props.styles) === null || _props$styles3 === void 0 ? void 0 : _props$styles3.marginBottom}`
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Period Types"
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    className: "select",
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setPeriod(e.selected);
      setPeriod(e.selected);
    },
    placeholder: "Select period",
    selected: selectedPeriod
  }, props === null || props === void 0 ? void 0 : (_props$periodType = props.periodType) === null || _props$periodType === void 0 ? void 0 : _props$periodType.map((periodTyp, index) => {
    return /*#__PURE__*/React.createElement(SingleSelectOption, {
      key: index,
      label: periodTyp === null || periodTyp === void 0 ? void 0 : periodTyp.name,
      value: periodTyp === null || periodTyp === void 0 ? void 0 : periodTyp.name
    });
  })))) : /*#__PURE__*/React.createElement("div", {
    className: `${props === null || props === void 0 ? void 0 : (_props$styles4 = props.styles) === null || _props$styles4 === void 0 ? void 0 : _props$styles4.Row}`
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Period Types"
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    className: "select",
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setPeriod(e.selected);
      setPeriod(e.selected);
    },
    placeholder: "period",
    selected: selectedPeriod
  }, props === null || props === void 0 ? void 0 : (_props$periodType2 = props.periodType) === null || _props$periodType2 === void 0 ? void 0 : _props$periodType2.map((periodTyp, index) => {
    return /*#__PURE__*/React.createElement(SingleSelectOption, {
      key: index,
      label: periodTyp === null || periodTyp === void 0 ? void 0 : periodTyp.name,
      value: periodTyp === null || periodTyp === void 0 ? void 0 : periodTyp.name
    });
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Year"
  }, /*#__PURE__*/React.createElement(Input, {
    name: "year",
    type: "number",
    value: year,
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setPeriods(e.value);
      setYear(e.value);
    }
  }))))));
}
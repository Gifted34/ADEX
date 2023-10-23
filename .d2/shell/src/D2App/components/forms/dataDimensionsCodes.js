import React, { useState, useEffect } from 'react';
import { Button, Field, Transfer } from '@dhis2/ui';
export default function DataDimensionsCodes(props) {
  var _props$styles;
  const [selectedDimensions, setselectedDimensions] = useState([]);
  const getDataDimensions = e => {
    setselectedDimensions(e.selected);
    props === null || props === void 0 ? void 0 : props.setSelectedDataDimensionsCodes(e.selected);
  };
  const defaultRenderOption = () => {
    var _props$indicators, _props$indicators$fil, _props$dataElements, _props$dataElements$f;
    let codes = [];
    props === null || props === void 0 ? void 0 : (_props$indicators = props.indicators) === null || _props$indicators === void 0 ? void 0 : (_props$indicators$fil = _props$indicators.filter(indicator => indicator.code !== undefined)) === null || _props$indicators$fil === void 0 ? void 0 : _props$indicators$fil.map(indicatorWithCode => {
      codes.push({
        label: indicatorWithCode === null || indicatorWithCode === void 0 ? void 0 : indicatorWithCode.name,
        value: indicatorWithCode === null || indicatorWithCode === void 0 ? void 0 : indicatorWithCode.code
      });
    });
    props === null || props === void 0 ? void 0 : (_props$dataElements = props.dataElements) === null || _props$dataElements === void 0 ? void 0 : (_props$dataElements$f = _props$dataElements.filter(dataElement => dataElement.code !== undefined)) === null || _props$dataElements$f === void 0 ? void 0 : _props$dataElements$f.map(dataElementWithCode => {
      codes.push({
        label: dataElementWithCode === null || dataElementWithCode === void 0 ? void 0 : dataElementWithCode.name,
        value: dataElementWithCode === null || dataElementWithCode === void 0 ? void 0 : dataElementWithCode.code
      });
    });
    return codes;
  };
  const defaultFilterCallback = e => {};
  const onChange = e => {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px",
      width: "700px"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Data Dimension",
    className: `${props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.marginBottom}`
  }), /*#__PURE__*/React.createElement(Transfer, {
    filterable: true,
    height: "300px",
    onChange: getDataDimensions,
    options: defaultRenderOption(),
    selected: selectedDimensions,
    selectedEmptyComponent: /*#__PURE__*/React.createElement("p", {
      style: {
        textAlign: 'center',
        fontSize: "14px",
        color: "gray"
      }
    }, "You have not selected anything yet", /*#__PURE__*/React.createElement("br", null))
  }));
}
import React, { useState, useEffect } from 'react';
import { Button, Field, Transfer } from '@dhis2/ui';
import Dxheader from '../widgets/dxHeader';
export default function DataDimensionsCodes(props) {
  var _props$styles;
  const [selectedDimensions, setselectedDimensions] = useState(props === null || props === void 0 ? void 0 : props.selected);
  const [dxType, setDx] = useState();
  const [filterText, setFilterText] = useState();
  const [filterTerm, setFilter] = useState();

  //get selected items
  const getDataDimensions = e => {
    setselectedDimensions(e.selected);
    props === null || props === void 0 ? void 0 : props.setData(e.selected);
  };

  //pushing data elements,indicators,and visualisation into transfer options
  const defaultRenderOption = () => {
    var _props$indicators, _props$indicators$fil, _props$dataElements, _props$dataElements$f, _props$visualizations;
    let codes = [];
    props === null || props === void 0 ? void 0 : (_props$indicators = props.indicators) === null || _props$indicators === void 0 ? void 0 : (_props$indicators$fil = _props$indicators.filter(indicator => indicator.code !== undefined)) === null || _props$indicators$fil === void 0 ? void 0 : _props$indicators$fil.map(indicatorWithCode => {
      codes.push({
        label: indicatorWithCode === null || indicatorWithCode === void 0 ? void 0 : indicatorWithCode.name,
        value: indicatorWithCode === null || indicatorWithCode === void 0 ? void 0 : indicatorWithCode.code,
        type: 'Indicators'
      });
    });
    props === null || props === void 0 ? void 0 : (_props$dataElements = props.dataElements) === null || _props$dataElements === void 0 ? void 0 : (_props$dataElements$f = _props$dataElements.filter(dataElement => dataElement.code !== undefined)) === null || _props$dataElements$f === void 0 ? void 0 : _props$dataElements$f.map(dataElementWithCode => {
      codes.push({
        label: dataElementWithCode === null || dataElementWithCode === void 0 ? void 0 : dataElementWithCode.name,
        value: dataElementWithCode === null || dataElementWithCode === void 0 ? void 0 : dataElementWithCode.code,
        type: 'Data elements'
      });
    });
    props === null || props === void 0 ? void 0 : (_props$visualizations = props.visualizations) === null || _props$visualizations === void 0 ? void 0 : _props$visualizations.map(visualisation => {
      codes.push({
        label: visualisation === null || visualisation === void 0 ? void 0 : visualisation.displayName,
        value: visualisation === null || visualisation === void 0 ? void 0 : visualisation.id,
        type: 'Visualizations'
      });
    });
    return codes;
  };
  const defaultFilterCallback = e => {};

  //filtering options in the dx transfer
  const filterCallback = options => {
    if (dxType === undefined || dxType === 'default') {
      if (filterText !== undefined) {
        return options.filter(object => object.label.includes(filterText));
      }
      return options;
    }
    const opt = options.filter(object => (object === null || object === void 0 ? void 0 : object.type) === dxType);
    if (filterText === undefined) {
      return opt;
    }
    return opt.filter(object => object.label.includes(filterText));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px",
      width: "700px"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Data Dimension",
    className: `${props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.marginBottom}`
  }), /*#__PURE__*/React.createElement(Transfer, {
    leftHeader: /*#__PURE__*/React.createElement(Dxheader, {
      setDx: setDx,
      setFilterText: setFilterText
    }),
    searchTerm: filterTerm,
    onFilterChange: Value => {
      setFilter(Value);
    },
    height: "400px",
    onChange: getDataDimensions,
    options: defaultRenderOption(),
    filterCallback: filterCallback,
    selected: selectedDimensions,
    filterable: true,
    hideFilterInput: true,
    selectedEmptyComponent: /*#__PURE__*/React.createElement("p", {
      style: {
        textAlign: 'center',
        fontSize: "14px",
        color: "gray"
      }
    }, "You have not selected anything yet...", /*#__PURE__*/React.createElement("br", null))
  }));
}
import { DataTableCell, TableBody } from '@dhis2/ui';
import React, { useEffect } from 'react';
function ExpandContent(props) {
  var _props$style, _props$style2, _props$style3;
  useEffect(() => {
    console.log(props);
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(DataTableCell, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold',
      padding: '40px',
      visibility: 'hidden'
    }
  }, " More Org units")), /*#__PURE__*/React.createElement(DataTableCell, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold',
      visibility: 'hidden'
    }
  }, " More Org units")), /*#__PURE__*/React.createElement(DataTableCell, null, /*#__PURE__*/React.createElement("div", {
    className: !(props !== null && props !== void 0 && props.orgUnits) ? props === null || props === void 0 ? void 0 : (_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.visibilityHidden : ''
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, " More Org units"), (props === null || props === void 0 ? void 0 : props.orgUnits) !== false && (props === null || props === void 0 ? void 0 : props.orgUnits))), /*#__PURE__*/React.createElement(DataTableCell, null, /*#__PURE__*/React.createElement("div", {
    className: !(props !== null && props !== void 0 && props.vis) ? props === null || props === void 0 ? void 0 : (_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.visibilityHidden : ''
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, " More Visualisations"), (props === null || props === void 0 ? void 0 : props.vis) !== false && (props === null || props === void 0 ? void 0 : props.vis))), /*#__PURE__*/React.createElement(DataTableCell, null, /*#__PURE__*/React.createElement("div", {
    className: !(props !== null && props !== void 0 && props.dx) ? props === null || props === void 0 ? void 0 : (_props$style3 = props.style) === null || _props$style3 === void 0 ? void 0 : _props$style3.visibilityHidden : ''
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold',
      padding: '20px'
    }
  }, " More data elements/indicator"), (props === null || props === void 0 ? void 0 : props.dx) !== false && (props === null || props === void 0 ? void 0 : props.dx)))));
}
export default ExpandContent;
import { Box, Field, Input, SingleSelect, SingleSelectOption } from '@dhis2/ui';
import React, { useState } from 'react';
const types = [{
  name: 'Data elements'
}, {
  name: 'Indicators'
}, {
  name: 'Visualizations'
}];
function Dxheader(props) {
  const [selected, setSelected] = useState();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '5px'
    }
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Field, null, /*#__PURE__*/React.createElement(SingleSelect, {
    className: "select",
    placeholder: "Select data dimension type",
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setDx(e.selected);
      setSelected(e.selected);
    },
    selected: selected
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "default",
    value: "default"
  }), types.map((type, index) => {
    return /*#__PURE__*/React.createElement(SingleSelectOption, {
      key: index,
      label: type.name,
      value: type.name
    });
  })))), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '10px'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    name: "search",
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setFilterText(e.value);
    },
    placeholder: "Search field"
  }))));
}
export default Dxheader;
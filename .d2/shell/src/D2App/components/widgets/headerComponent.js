import React from 'react';
import { ButtonStrip, SplitButton } from '@dhis2/ui';
export default function HeaderComponent() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid #c4c9cc',
      backgroundColor: "lightblue",
      padding: 8,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(ButtonStrip, null, /*#__PURE__*/React.createElement(SplitButton, null, "Data Exchange Initializer"))));
}
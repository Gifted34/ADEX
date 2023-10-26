import { Box, Button, ButtonStrip, Input, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import React, { useState } from "react";
const CODE = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
export default function DeleteEntry(_ref) {
  var _data$value;
  let {
    openDelete,
    setOpenDelete,
    data,
    deleteDataEntry
  } = _ref;
  const [confirmData, setConfirmData] = useState(null);
  return /*#__PURE__*/React.createElement("div", null, openDelete && /*#__PURE__*/React.createElement(Modal, {
    large: true,
    position: "middle"
  }, /*#__PURE__*/React.createElement(ModalTitle, null, "Delete Entry"), /*#__PURE__*/React.createElement(ModalContent, null, !(data !== null && data !== void 0 && (_data$value = data.value) !== null && _data$value !== void 0 && _data$value.initialized) ? /*#__PURE__*/React.createElement(ModalTitle, null, "This entry is not yet initialized in data exchange!") : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement(ModalTitle, null, "Comfirm with the code to delete this entry."), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontColor: "gray",
      fontSize: 20
    }
  }, "CODE : ", `${CODE}`), /*#__PURE__*/React.createElement(Input, {
    type: "text",
    onChange: e => setConfirmData(e.value),
    placeholder: "Enter the confirmation code"
  })), /*#__PURE__*/React.createElement("p", null, data && (data === null || data === void 0 ? void 0 : data.name))), /*#__PURE__*/React.createElement(ModalActions, null, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => setOpenDelete(false),
    destructive: true
  }, "No"), CODE == confirmData && /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      deleteDataEntry(data);
    },
    primary: true
  }, "Yes"), CODE !== confirmData && /*#__PURE__*/React.createElement(Button, {
    secondary: true,
    disabled: true
  }, "Yes")))));
}
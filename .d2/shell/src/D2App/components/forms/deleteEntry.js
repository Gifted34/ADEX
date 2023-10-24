import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import React from "react";
export default function DeleteEntry(_ref) {
  var _data$value;
  let {
    openDelete,
    setOpenDelete,
    data,
    deleteDataEntry
  } = _ref;
  return /*#__PURE__*/React.createElement("div", null, openDelete && /*#__PURE__*/React.createElement(Modal, {
    large: true,
    position: "middle"
  }, /*#__PURE__*/React.createElement(ModalTitle, null, "Delete Entry"), /*#__PURE__*/React.createElement(ModalContent, null, !(data !== null && data !== void 0 && (_data$value = data.value) !== null && _data$value !== void 0 && _data$value.initialized) ? /*#__PURE__*/React.createElement(ModalTitle, null, "This entry is not yet initialized in data exchange!") : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement(ModalTitle, null, "Are sure you want to delete this entry?"), /*#__PURE__*/React.createElement("p", null, data && (data === null || data === void 0 ? void 0 : data.name))), /*#__PURE__*/React.createElement(ModalActions, null, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => setOpenDelete(false),
    destructive: true
  }, "No"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      deleteDataEntry(data);
    },
    primary: true
  }, "Yes")))));
}
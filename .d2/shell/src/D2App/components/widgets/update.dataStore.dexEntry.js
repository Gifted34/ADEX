import { Box, Button, ButtonStrip, Field, Input, Modal, ModalActions, ModalContent, ModalTitle, SingleSelect, SingleSelectOption } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
export default function UpdateDataInitialization(props) {
  var _props$styles, _props$styles2, _props$data3, _props$data3$value, _props$styles3;
  const [data, setData] = useState({
    dexname: "",
    url: ""
  });
  const update = e => {
    props === null || props === void 0 ? void 0 : props.updateGeneralInputValues({
      data: props === null || props === void 0 ? void 0 : props.data,
      values: data
    });
  };
  useEffect(() => {
    var _props$data, _props$data$value, _props$data2, _props$data2$value;
    setData({
      ...data,
      dexname: props === null || props === void 0 ? void 0 : (_props$data = props.data) === null || _props$data === void 0 ? void 0 : (_props$data$value = _props$data.value) === null || _props$data$value === void 0 ? void 0 : _props$data$value.dexname,
      url: props === null || props === void 0 ? void 0 : (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : (_props$data2$value = _props$data2.value) === null || _props$data2$value === void 0 ? void 0 : _props$data2$value.url
    });
  }, [props]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, (props === null || props === void 0 ? void 0 : props.openUpdate) && /*#__PURE__*/React.createElement("div", {
    className: "",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement(Modal, {
    large: true,
    position: "middle"
  }, /*#__PURE__*/React.createElement(ModalTitle, null, "Update Initialization"), /*#__PURE__*/React.createElement(ModalContent, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "General Details"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    name: "dexname",
    type: "text",
    onChange: e => {
      setData({
        ...data,
        dexname: e.value
      });
    }
    // placeholder={props?.data?.value?.dexname}
    ,
    className: props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.marginBottom,
    value: data === null || data === void 0 ? void 0 : data.dexname
  }), /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$styles2 = props.styles) === null || _props$styles2 === void 0 ? void 0 : _props$styles2.marginBottom
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    className: "select",
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setType(e.selected);
    },
    selected: props === null || props === void 0 ? void 0 : (_props$data3 = props.data) === null || _props$data3 === void 0 ? void 0 : (_props$data3$value = _props$data3.value) === null || _props$data3$value === void 0 ? void 0 : _props$data3$value.type
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "Internal",
    value: "INTERNAL"
  }), /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "External",
    value: "EXTERNAL"
  }))), (props === null || props === void 0 ? void 0 : props.type) == "EXTERNAL" && /*#__PURE__*/React.createElement(Input, {
    name: "url",
    type: "text",
    onChange: e => {
      setData({
        ...data,
        url: e.value
      });
    },
    value: data === null || data === void 0 ? void 0 : data.url,
    className: props === null || props === void 0 ? void 0 : (_props$styles3 = props.styles) === null || _props$styles3 === void 0 ? void 0 : _props$styles3.marginBottom
    // placeholder={props?.data?.value?.url}
  }))))), /*#__PURE__*/React.createElement(ModalActions, null, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      props === null || props === void 0 ? void 0 : props.setOpenUpdate(false);
    },
    destructive: true
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    onClick: update,
    primary: true
  }, "Save to Initialization"))))));
}
import { Button, ButtonStrip, Divider } from "@dhis2/ui";
import React from "react";
import { Link } from "react-router-dom";
export default function ViewDataStoreById() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/",
    style: {
      textDecoration: "none",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true
  }, "Home"))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolore pariatur deserunt voluptatem ipsam dignissimos reiciendis saepe? Excepturi aperiam consectetur, perferendis accusantium, autem porro rerum officia nobis suscipit nemo vel."));
}
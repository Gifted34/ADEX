import { Button, ButtonStrip, Divider } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import DataInitialized from "./dataInitialized";
import { useDataEngine } from "@dhis2/app-runtime";
import { Link } from "react-router-dom";
export default function HomePage(props) {
  const engine = useDataEngine();
  let dataStorePath = "dataStore/DEX_initializer_values";
  const [values, setValues] = useState([]);
  const getDataStoreDexValues = async props => {
    const query = {
      dataStore: {
        resource: dataStorePath,
        params: {
          fields: ["."]
        }
      }
    };
    try {
      const res = await (engine === null || engine === void 0 ? void 0 : engine.query(query));
      return res;
      // res.then((data) => {
      //   setValues(data);
      // });
    } catch (e) {}
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/new"
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true
  }, "Create new"))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    className: "",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement(DataInitialized, {
    dataStoreDexValues: getDataStoreDexValues,
    data: [],
    styles: props === null || props === void 0 ? void 0 : props.classes
  })));
}
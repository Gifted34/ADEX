import React, { useState, useEffect } from "react";
import { DataQuery, useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import classes from "./App.module.css";
import HeaderComponent from "./components/widgets/headerComponent";
import DataDimensionsCodes from "./components/forms/dataDimensionsCodes";
import OrgUnits from "./components/forms/orgUnits";
import GeneralForm from "./components/forms/general.form";
import { AlertBar, Box, Button, CircularLoader, Divider, I } from "@dhis2/ui";
import EmailValidator from "./services/emailValidator";
const query = {
  organisationUnits: {
    resource: "organisationUnits",
    params: {
      paging: false,
      fields: ["id,name,level,path,displayName,code,children,ancestors,created,href,user,users,userAccesses"],
      order: "level"
    }
  },
  indicators: {
    resource: "indicators",
    params: {
      paging: false,
      fields: ["id", "name", "displayName", "code"]
    }
  },
  dataElements: {
    resource: "dataElements",
    params: {
      paging: false,
      fields: ["id", "name", "formName", "displayName", "code"]
    }
  },
  periodTypes: {
    resource: "periodTypes",
    params: {
      fields: ["*"]
    }
  }
};
const validater = new EmailValidator();
const MyApp = () => {
  var _data$periodTypes, _data$indicators, _data$dataElements;
  const engine = useDataEngine();
  const [formData, setFormData] = useState();
  const [selecteOrgUnit, setSelecteOrgUnit] = useState([]);
  const [selectedDataDimensionsCodes, setSelectedDataDimensionsCodes] = useState([]);
  const [hide, setHidden] = useState(true);
  const [message, setMessage] = useState("");
  const [isSuccessMessage, setSuccessMessage] = useState(false);
  const [type, setType] = useState({
    INTERNAL: "INTERNAL",
    EXTERNAL: "EXTERNAL"
  });
  const [authType, setAuthType] = useState({
    TOKEN: "TOKEN",
    BASICAUTH: "BASICAUTH"
  });
  const {
    loading,
    error,
    data,
    refetch
  } = useDataQuery(query);
  // inputs data from general section passed in state
  const formInputs = data => {
    setFormData(data);
  };

  // a post request to the data echange resource
  const mutation = data => {
    engine.mutate(data).then(res => {
      if (res.httpStatusCode == 201) {
        setSuccessMessage(true);
        setHidden(false);
        setMessage("Data exchange initialization is successfull\nPlease use the Data Exchange app to submit the Data.");
      }
    }).catch(e => {
      setHidden(false);
      setMessage("Error occured. Either server or the inputs causes this error.");
    });
  };
  // check if token or password
  const checkIfTokenOrBasiAuth = authTypeValue => {
    if (authTypeValue == authType.BASICAUTH) {
      return true;
    } else {
      return false;
    }
  };

  // constructing a data exchange api layout as defined in the url
  // https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-240/data-exchange.html
  const initializeButton = () => {
    var _formData$formInputs, _formData$formInputs2, _formData$formInputs3, _formData$formInputs4, _formData$formInputs5, _formData$formInputs6, _formData$formInputs7, _formData$formInputs8;
    let payload = {
      resource: "aggregateDataExchanges",
      type: "create",
      data: {
        name: formData === null || formData === void 0 ? void 0 : (_formData$formInputs = formData.formInputs) === null || _formData$formInputs === void 0 ? void 0 : _formData$formInputs.dexname,
        source: {
          requests: [{
            name: formData === null || formData === void 0 ? void 0 : (_formData$formInputs2 = formData.formInputs) === null || _formData$formInputs2 === void 0 ? void 0 : _formData$formInputs2.sourcename,
            dx: selectedDataDimensionsCodes,
            pe: [formData === null || formData === void 0 ? void 0 : (_formData$formInputs3 = formData.formInputs) === null || _formData$formInputs3 === void 0 ? void 0 : _formData$formInputs3.period],
            ou: [selecteOrgUnit === null || selecteOrgUnit === void 0 ? void 0 : selecteOrgUnit.code],
            inputIdScheme: "code",
            outputIdScheme: "code"
          }]
        },
        target: {
          type: formData === null || formData === void 0 ? void 0 : formData.type,
          api: {
            url: formData === null || formData === void 0 ? void 0 : (_formData$formInputs4 = formData.formInputs) === null || _formData$formInputs4 === void 0 ? void 0 : _formData$formInputs4.url,
            username: formData === null || formData === void 0 ? void 0 : (_formData$formInputs5 = formData.formInputs) === null || _formData$formInputs5 === void 0 ? void 0 : _formData$formInputs5.username,
            password: formData === null || formData === void 0 ? void 0 : (_formData$formInputs6 = formData.formInputs) === null || _formData$formInputs6 === void 0 ? void 0 : _formData$formInputs6.password
          },
          request: {
            idScheme: "code"
          }
        }
      }
    };
    if ((formData === null || formData === void 0 ? void 0 : (_formData$formInputs7 = formData.formInputs) === null || _formData$formInputs7 === void 0 ? void 0 : _formData$formInputs7.dexname) == undefined) {
      setMessage("Name is missing");
      setHidden(false);
    } else if ((formData === null || formData === void 0 ? void 0 : (_formData$formInputs8 = formData.formInputs) === null || _formData$formInputs8 === void 0 ? void 0 : _formData$formInputs8.period) == undefined) {
      setMessage("Period is missing");
      setHidden(false);
    } else {
      if ((formData === null || formData === void 0 ? void 0 : formData.type) == (type === null || type === void 0 ? void 0 : type.EXTERNAL)) {
        var _formData$formInputs9;
        // payload?.data?.target?.type == type?.EXTERNAL;
        if ((formData === null || formData === void 0 ? void 0 : (_formData$formInputs9 = formData.formInputs) === null || _formData$formInputs9 === void 0 ? void 0 : _formData$formInputs9.url) == "") {
          setMessage("Please enter target DHIS2 instance url");
          setHidden(false);
        } else {
          var _formData$formInputs10;
          if (validater.isValidUrl(formData === null || formData === void 0 ? void 0 : (_formData$formInputs10 = formData.formInputs) === null || _formData$formInputs10 === void 0 ? void 0 : _formData$formInputs10.url) == false) {
            setMessage("The email format is invalid.");
            setHidden(false);
          } else {
            if (checkIfTokenOrBasiAuth(formData === null || formData === void 0 ? void 0 : formData.authType) == true) {
              var _formData$formInputs11, _formData$formInputs12, _formData$formInputs13, _formData$formInputs14;
              if ((formData === null || formData === void 0 ? void 0 : (_formData$formInputs11 = formData.formInputs) === null || _formData$formInputs11 === void 0 ? void 0 : _formData$formInputs11.username) == undefined || (formData === null || formData === void 0 ? void 0 : (_formData$formInputs12 = formData.formInputs) === null || _formData$formInputs12 === void 0 ? void 0 : _formData$formInputs12.username) == "" || (formData === null || formData === void 0 ? void 0 : (_formData$formInputs13 = formData.formInputs) === null || _formData$formInputs13 === void 0 ? void 0 : _formData$formInputs13.password) == undefined || (formData === null || formData === void 0 ? void 0 : (_formData$formInputs14 = formData.formInputs) === null || _formData$formInputs14 === void 0 ? void 0 : _formData$formInputs14.password) == "") {
                setMessage("Username or password is missing");
                setHidden(false);
              } else {
                mutation(payload);
              }
            } else {}
          }
        }
      } else {
        mutation(payload);
      }
    }
  };
  if (error) {
    return /*#__PURE__*/React.createElement("span", null, " Error : ", error.message);
  }
  if (loading) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(CircularLoader, null));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HeaderComponent, null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: classes.display
  }, /*#__PURE__*/React.createElement(GeneralForm, {
    styles: classes,
    formInputs: formInputs,
    formData: formData,
    periodTypes: data === null || data === void 0 ? void 0 : (_data$periodTypes = data.periodTypes) === null || _data$periodTypes === void 0 ? void 0 : _data$periodTypes.periodTypes
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(DataDimensionsCodes, {
    indicators: data === null || data === void 0 ? void 0 : (_data$indicators = data.indicators) === null || _data$indicators === void 0 ? void 0 : _data$indicators.indicators,
    dataElements: data === null || data === void 0 ? void 0 : (_data$dataElements = data.dataElements) === null || _data$dataElements === void 0 ? void 0 : _data$dataElements.dataElements,
    setSelectedDataDimensionsCodes: setSelectedDataDimensionsCodes
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(OrgUnits, {
    orgUnits: data.organisationUnits.organisationUnits,
    setSelecteOrgUnit: setSelecteOrgUnit,
    styles: classes
  })), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px",
      justifyContent: "start",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    name: "submit",
    primary: true,
    onClick: initializeButton,
    value: "default"
  }, "Initialise Integration"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "50px"
    }
  }, /*#__PURE__*/React.createElement(Box, null, isSuccessMessage == true ? /*#__PURE__*/React.createElement(AlertBar, {
    hidden: hide,
    success: true,
    duration: 4000,
    onHidden: e => {
      setHidden(true);
      window.location.reload(true);
    }
  }, message) : /*#__PURE__*/React.createElement(AlertBar, {
    hidden: hide,
    warning: true,
    duration: 4000,
    onHidden: e => {
      setHidden(true);
    }
  }, message))))));
};
export default MyApp;
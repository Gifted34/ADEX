import React, { useState, useEffect } from "react";
import { DataQuery, useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import classes from "./App.module.css";
import HeaderComponent from "./components/widgets/headerComponent";
import { AlertBar, Box, Button, Center, CircularLoader, Divider, I, Layer } from "@dhis2/ui";
import HomePage from "./components/widgets/homePage";
import NewDataInitialization from "./components/widgets/newDataInitialization";
import NoPageFound from "./components/widgets/noPageFound";
import AddNewRequests from "./components/widgets/addNewRequests";
import ViewDataStoreById from "./components/widgets/view";
import DeleteEntry from "./components/forms/deleteEntry";
import UpdateDataInitialization from "./components/widgets/update.dataStore.dexEntry";
import IntegrateDataStoreInitializationToDEX from "./components/widgets/integrate.dataStore.dexEntry";
import UrlValidator from "./services/urlValidator";
const query = {
  organisationUnits: {
    resource: "organisationUnits",
    params: {
      paging: false,
      fields: ["id,name,level,path,displayName,code,children,ancestors,created,href,user,users,userAccesses"],
      order: "level"
    }
  },
  visualizations: {
    resource: "visualizations",
    params: {
      paging: false,
      field: ["id", "displayName"]
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
  },
  aggregateDataExchanges: {
    resource: "aggregateDataExchanges",
    params: {
      fields: ["*"]
    }
  },
  dataStore: {
    resource: "dataStore",
    params: {
      paging: false,
      fields: ["*"]
    }
  }
};

// const validater = new UrlValidator();
const MyApp = () => {
  const [formInputValues, setFormInputValues] = useState({
    dexname: "",
    url: ""
  });
  const [updateFormInputValues, setUpdateFormInputValues] = useState({
    dexname: "",
    url: ""
  });
  const [authValues, setAuthValues] = useState({
    username: "",
    password: "",
    token: ""
  });

  // updateFormInputValues
  const [type, setType] = useState("EXTERNAL");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openIntegration, setOpenIntegration] = useState(false);
  const [dataToDelete, setDataToDelete] = useState();
  const [dataToUpdate, setDataToUpdate] = useState();
  const [dataToIntegrate, setDataToIntegrate] = useState();
  const [ke, setKey] = useState(Math.random());
  const engine = useDataEngine();
  const [path, setPath] = useState("Home");
  const [formData, setFormData] = useState();
  const [id, setID] = useState();
  const [selecteOrgUnit, setSelecteOrgUnit] = useState([]);
  const [selectedDataDimensionsCodes, setSelectedDataDimensionsCodes] = useState([]);
  const [hide, setHidden] = useState(true);
  const [message, setMessage] = useState("");
  const [isSuccessMessage, setSuccessMessage] = useState(false);
  const [authType, setAuthType] = useState("");
  const [request, setRequest] = useState();
  const {
    loading,
    error,
    data,
    refetch
  } = useDataQuery(query);

  // save to datastore
  const saveGeneralInputValues = () => {
    console.log('save input values');
    if (type == null || type == undefined || type == "" || (formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.dexname) == null || (formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.dexname) == undefined || (formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.dexname) == "" || (formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.url) == null || (formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.url) == undefined || (formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.url) == "") {
      setSuccessMessage(true);
      setHidden(false);
      setMessage("Error occured.");
    } else {
      let payload = {
        resource: `dataStore/DEX_initializer_values/${new Date().getTime()}`,
        type: "create",
        data: {
          createdAt: new Date().toLocaleString(),
          dexname: formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.dexname,
          url: formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.url,
          type: type
        }
      };
      engine.mutate(payload).then(res => {
        if (res.httpStatusCode == 201) {
          setKey(Math.random());
          setOpen(!open);
          setSuccessMessage(true);
          setHidden(false);
          setMessage("Data saved in the datastore successfully.");
        }
      }).catch(e => {
        setHidden(false);
        setMessage("Error occured. Either server or the inputs causes this error.");
      });
    }
  };
  // a post request to the data echange resource
  const mutation = data => {
    engine.mutate(data).then(res => {
      if (res.httpStatusCode == 201) {
        engine.mutate({
          resource: `dataStore/DEX_initializer_values/${dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : dataToIntegrate.key}`,
          type: "update",
          data: _ref => {
            var _dataToIntegrate$valu, _dataToIntegrate$valu2, _dataToIntegrate$valu3, _dataToIntegrate$valu4, _dataToIntegrate$valu5;
            let {} = _ref;
            return {
              createdAt: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu = dataToIntegrate.value) === null || _dataToIntegrate$valu === void 0 ? void 0 : _dataToIntegrate$valu.createdAt,
              updatedAt: new Date().toLocaleDateString(),
              dexname: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu2 = dataToIntegrate.value) === null || _dataToIntegrate$valu2 === void 0 ? void 0 : _dataToIntegrate$valu2.dexname,
              source: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu3 = dataToIntegrate.value) === null || _dataToIntegrate$valu3 === void 0 ? void 0 : _dataToIntegrate$valu3.source,
              type: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu4 = dataToIntegrate.value) === null || _dataToIntegrate$valu4 === void 0 ? void 0 : _dataToIntegrate$valu4.type,
              url: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu5 = dataToIntegrate.value) === null || _dataToIntegrate$valu5 === void 0 ? void 0 : _dataToIntegrate$valu5.url,
              initialized: true
            };
          }
        }).then(res => {
          if (res.httpStatusCode == 200) {
            setOpenIntegration(false);
            setSuccessMessage(true);
            setHidden(false);
            setMessage("Data exchange initialization is successfull\nPlease use the Data Exchange app to submit the Data.");
          }
        }).catch(e => {
          setHidden(false);
          setMessage("Error occured. Either server or the inputs causes this error.");
        });
      }
    }).catch(e => {
      setHidden(false);
      setMessage("Error occured. Either server or the inputs causes this error.");
    });
  };

  // check if token or password
  const checkIfTokenOrBasiAuth = authTypeValue => {
    if (authTypeValue === "BASICAUTH") {
      return true;
    } else {
      return false;
    }
  };

  // constructing a data exchange api layout as defined in the url
  // https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-240/data-exchange.html
  const initializeIntegration = data => {
    if ((formData === null || formData === void 0 ? void 0 : formData.type) == (type === null || type === void 0 ? void 0 : type.EXTERNAL)) {
      var _dataToIntegrate$valu6;
      if ((dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu6 = dataToIntegrate.value) === null || _dataToIntegrate$valu6 === void 0 ? void 0 : _dataToIntegrate$valu6.url) == "") {
        setMessage("Please enter target DHIS2 instance url");
        setHidden(false);
      } else {
        var _dataToIntegrate$valu7;
        if ((UrlValidator === null || UrlValidator === void 0 ? void 0 : UrlValidator.isValidUrl(dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu7 = dataToIntegrate.value) === null || _dataToIntegrate$valu7 === void 0 ? void 0 : _dataToIntegrate$valu7.url)) == false) {
          setMessage("The url format is invalid.");
          setHidden(false);
        } else {
          if (checkIfTokenOrBasiAuth(authType)) {
            var _dataToIntegrate$valu8, _dataToIntegrate$valu9, _dataToIntegrate$valu10;
            if ((dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu8 = dataToIntegrate.value) === null || _dataToIntegrate$valu8 === void 0 ? void 0 : (_dataToIntegrate$valu9 = _dataToIntegrate$valu8.source) === null || _dataToIntegrate$valu9 === void 0 ? void 0 : (_dataToIntegrate$valu10 = _dataToIntegrate$valu9.requests) === null || _dataToIntegrate$valu10 === void 0 ? void 0 : _dataToIntegrate$valu10.length) > 0) {
              var _dataToIntegrate$valu11, _dataToIntegrate$valu12, _dataToIntegrate$valu13;
              let holder = [];
              dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu11 = dataToIntegrate.value) === null || _dataToIntegrate$valu11 === void 0 ? void 0 : (_dataToIntegrate$valu12 = _dataToIntegrate$valu11.source) === null || _dataToIntegrate$valu12 === void 0 ? void 0 : (_dataToIntegrate$valu13 = _dataToIntegrate$valu12.requests) === null || _dataToIntegrate$valu13 === void 0 ? void 0 : _dataToIntegrate$valu13.map(dd => {
                holder.push({
                  name: dd === null || dd === void 0 ? void 0 : dd.name,
                  visualization: dd === null || dd === void 0 ? void 0 : dd.visualizations,
                  dx: dd === null || dd === void 0 ? void 0 : dd.dx,
                  pe: dd === null || dd === void 0 ? void 0 : dd.pe,
                  ou: dd === null || dd === void 0 ? void 0 : dd.ou,
                  inputIdScheme: "code",
                  outputIdScheme: "code"
                });
              });
              if ((authValues === null || authValues === void 0 ? void 0 : authValues.username) == undefined || (authValues === null || authValues === void 0 ? void 0 : authValues.username) == "" || (authValues === null || authValues === void 0 ? void 0 : authValues.password) == undefined || (authValues === null || authValues === void 0 ? void 0 : authValues.password) == "") {
                setMessage("Username or password is missing");
                setHidden(false);
              } else {
                var _dataToIntegrate$valu14, _dataToIntegrate$valu15, _dataToIntegrate$valu16;
                let payload = {
                  resource: "aggregateDataExchanges",
                  type: "create",
                  data: {
                    name: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu14 = dataToIntegrate.value) === null || _dataToIntegrate$valu14 === void 0 ? void 0 : _dataToIntegrate$valu14.dexname,
                    source: {
                      requests: holder
                    },
                    target: {
                      type: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu15 = dataToIntegrate.value) === null || _dataToIntegrate$valu15 === void 0 ? void 0 : _dataToIntegrate$valu15.type,
                      api: {
                        url: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu16 = dataToIntegrate.value) === null || _dataToIntegrate$valu16 === void 0 ? void 0 : _dataToIntegrate$valu16.url,
                        username: authValues === null || authValues === void 0 ? void 0 : authValues.username,
                        password: authValues === null || authValues === void 0 ? void 0 : authValues.password
                      },
                      request: {
                        idScheme: "code"
                      }
                    }
                  }
                };
                mutation(payload);
              }
            } else {
              setMessage("No requests attached");
              setHidden(false);
            }
          } else {
            var _dataToIntegrate$valu17, _dataToIntegrate$valu18, _dataToIntegrate$valu19;
            if ((dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu17 = dataToIntegrate.value) === null || _dataToIntegrate$valu17 === void 0 ? void 0 : (_dataToIntegrate$valu18 = _dataToIntegrate$valu17.source) === null || _dataToIntegrate$valu18 === void 0 ? void 0 : (_dataToIntegrate$valu19 = _dataToIntegrate$valu18.requests) === null || _dataToIntegrate$valu19 === void 0 ? void 0 : _dataToIntegrate$valu19.length) > 0) {
              var _dataToIntegrate$valu20, _dataToIntegrate$valu21, _dataToIntegrate$valu22;
              let holder = [];
              dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu20 = dataToIntegrate.value) === null || _dataToIntegrate$valu20 === void 0 ? void 0 : (_dataToIntegrate$valu21 = _dataToIntegrate$valu20.source) === null || _dataToIntegrate$valu21 === void 0 ? void 0 : (_dataToIntegrate$valu22 = _dataToIntegrate$valu21.requests) === null || _dataToIntegrate$valu22 === void 0 ? void 0 : _dataToIntegrate$valu22.map(dd => {
                holder.push({
                  name: dd === null || dd === void 0 ? void 0 : dd.name,
                  visualization: dd === null || dd === void 0 ? void 0 : dd.visualizations,
                  dx: dd === null || dd === void 0 ? void 0 : dd.dx,
                  pe: dd === null || dd === void 0 ? void 0 : dd.pe,
                  ou: dd === null || dd === void 0 ? void 0 : dd.ou,
                  inputIdScheme: "code",
                  outputIdScheme: "code"
                });
              });
              if ((authValues === null || authValues === void 0 ? void 0 : authValues.token) == undefined || (authValues === null || authValues === void 0 ? void 0 : authValues.token) == "" || (authValues === null || authValues === void 0 ? void 0 : authValues.token) == null) {
                setMessage("Token is missing");
                setHidden(false);
              } else {
                var _dataToIntegrate$valu23, _dataToIntegrate$valu24, _dataToIntegrate$valu25;
                let payload = {
                  resource: "aggregateDataExchanges",
                  type: "create",
                  data: {
                    name: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu23 = dataToIntegrate.value) === null || _dataToIntegrate$valu23 === void 0 ? void 0 : _dataToIntegrate$valu23.dexname,
                    source: {
                      requests: holder
                    },
                    target: {
                      type: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu24 = dataToIntegrate.value) === null || _dataToIntegrate$valu24 === void 0 ? void 0 : _dataToIntegrate$valu24.type,
                      api: {
                        url: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu25 = dataToIntegrate.value) === null || _dataToIntegrate$valu25 === void 0 ? void 0 : _dataToIntegrate$valu25.url,
                        accessToken: authValues === null || authValues === void 0 ? void 0 : authValues.token
                      },
                      request: {
                        idScheme: "code"
                      }
                    }
                  }
                };
                mutation(payload);
              }
            } else {
              setMessage("No requests attached");
              setHidden(false);
            }
          }
        }
      }
    } else {
      var _dataToIntegrate$valu26, _dataToIntegrate$valu27, _dataToIntegrate$valu28, _dataToIntegrate$valu29, _dataToIntegrate$valu30;
      let payload = {
        resource: "aggregateDataExchanges",
        type: "create",
        data: {
          name: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu26 = dataToIntegrate.value) === null || _dataToIntegrate$valu26 === void 0 ? void 0 : _dataToIntegrate$valu26.dexname,
          source: {
            requests: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu27 = dataToIntegrate.value) === null || _dataToIntegrate$valu27 === void 0 ? void 0 : (_dataToIntegrate$valu28 = _dataToIntegrate$valu27.source) === null || _dataToIntegrate$valu28 === void 0 ? void 0 : _dataToIntegrate$valu28.request
          },
          target: {
            type: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu29 = dataToIntegrate.value) === null || _dataToIntegrate$valu29 === void 0 ? void 0 : _dataToIntegrate$valu29.type,
            api: {
              url: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu30 = dataToIntegrate.value) === null || _dataToIntegrate$valu30 === void 0 ? void 0 : _dataToIntegrate$valu30.url,
              accessToken: authValues === null || authValues === void 0 ? void 0 : authValues.token
            },
            request: {
              idScheme: "code"
            }
          }
        }
      };
      mutation(payload);
    }
  };
  if (error) {
    return /*#__PURE__*/React.createElement("span", null, " Error : ", error.message);
  }
  if (loading) {
    return /*#__PURE__*/React.createElement(Center, null, /*#__PURE__*/React.createElement(CircularLoader, {
      large: true
    }));
  }
  const updateEntry = data => {
    setDataToUpdate(data);
  };

  // update the initialized entry in the datastore
  const updateGeneralInputValues = _ref2 => {
    let {
      data,
      values
    } = _ref2;
    if ((values === null || values === void 0 ? void 0 : values.dexname) == "" || (values === null || values === void 0 ? void 0 : values.dexname) == null || (values === null || values === void 0 ? void 0 : values.dexname) == undefined || (values === null || values === void 0 ? void 0 : values.url) == "" || (values === null || values === void 0 ? void 0 : values.url) == null || (values === null || values === void 0 ? void 0 : values.url) == undefined) {} else {
      var _dataToUpdate$value, _dataToUpdate$value2;
      if ((dataToUpdate === null || dataToUpdate === void 0 ? void 0 : (_dataToUpdate$value = dataToUpdate.value) === null || _dataToUpdate$value === void 0 ? void 0 : _dataToUpdate$value.source) == undefined || (dataToUpdate === null || dataToUpdate === void 0 ? void 0 : (_dataToUpdate$value2 = dataToUpdate.value) === null || _dataToUpdate$value2 === void 0 ? void 0 : _dataToUpdate$value2.source) == null) {
        engine.mutate({
          resource: `dataStore/DEX_initializer_values/${data === null || data === void 0 ? void 0 : data.key}`,
          type: "update",
          data: _ref3 => {
            var _dataToUpdate$value3;
            let {} = _ref3;
            return {
              createdAt: dataToUpdate === null || dataToUpdate === void 0 ? void 0 : (_dataToUpdate$value3 = dataToUpdate.value) === null || _dataToUpdate$value3 === void 0 ? void 0 : _dataToUpdate$value3.createdAt,
              updatedAt: new Date().toLocaleDateString(),
              dexname: values === null || values === void 0 ? void 0 : values.dexname,
              type: type,
              url: values === null || values === void 0 ? void 0 : values.url
            };
          }
        }).then(res => {
          if (res.httpStatusCode == 200) {
            setOpenUpdate(!openUpdate);
            setSuccessMessage(true);
            setHidden(false);
            setMessage("Data saved in the datastore successfully.");
          }
        }).catch(e => {
          setHidden(false);
          setMessage("Error occured. Either server or the inputs causes this error.");
        });
      } else {
        engine.mutate({
          resource: `dataStore/DEX_initializer_values/${data === null || data === void 0 ? void 0 : data.key}`,
          type: "update",
          data: _ref4 => {
            var _dataToUpdate$value4, _dataToUpdate$value5;
            let {} = _ref4;
            return {
              createdAt: dataToUpdate === null || dataToUpdate === void 0 ? void 0 : (_dataToUpdate$value4 = dataToUpdate.value) === null || _dataToUpdate$value4 === void 0 ? void 0 : _dataToUpdate$value4.createdAt,
              updatedAt: new Date().toLocaleDateString(),
              dexname: values === null || values === void 0 ? void 0 : values.dexname,
              source: dataToUpdate === null || dataToUpdate === void 0 ? void 0 : (_dataToUpdate$value5 = dataToUpdate.value) === null || _dataToUpdate$value5 === void 0 ? void 0 : _dataToUpdate$value5.source,
              type: type,
              url: values === null || values === void 0 ? void 0 : values.url
            };
          }
        }).then(res => {
          if (res.httpStatusCode == 200) {
            setOpenUpdate(!openUpdate);
            setSuccessMessage(true);
            setHidden(false);
            setMessage("Data saved in the datastore successfully.");
          }
        }).catch(e => {
          setHidden(false);
          setMessage("Error occured. Either server or the inputs causes this error.");
        });
      }
    }
  };
  // delete the initialized entry in datastore
  const deleteEntry = data => {
    setDataToDelete(data);
  };
  const integrateEntry = data => {
    setDataToIntegrate(data);
  };
  const deleteDataEntry = data => {
    if ((data === null || data === void 0 ? void 0 : data.key) == null || (data === null || data === void 0 ? void 0 : data.key) == undefined || (data === null || data === void 0 ? void 0 : data.key) == "") {} else {
      let payload = {
        resource: "dataStore/DEX_initializer_values",
        id: data === null || data === void 0 ? void 0 : data.key,
        type: "delete"
      };
      engine.mutate(payload).then(res => {
        if (res.httpStatusCode == 200) {
          setOpenDelete(!openDelete);
          setSuccessMessage(true);
          setHidden(false);
          setMessage("Data saved in the datastore successfully.");
          setKey(Math.random());
        }
      }).catch(e => {
        setHidden(false);
        setMessage("Error occured. Either server or the inputs causes this error.");
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HeaderComponent, null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px"
    }
  }, path === "Home" ? /*#__PURE__*/React.createElement(HomePage, {
    key: ke,
    data: data,
    setPath: setPath,
    setID: setID,
    setRequest: setRequest,
    styles: classes,
    open: open,
    setOpenUpdate: setOpenUpdate,
    openUpdate: openUpdate,
    openIntegration: openIntegration,
    setOpenIntegration: setOpenIntegration,
    setOpen: setOpen,
    setOpenDelete: setOpenDelete,
    openDelete: openDelete,
    deleteEntry: deleteEntry,
    updateEntry: updateEntry,
    integrateEntry: integrateEntry
    // initializeIntegration={initializeIntegration}
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, path === "View" ? /*#__PURE__*/React.createElement(ViewDataStoreById, {
    id: id,
    setID: setID,
    setRequest: setRequest,
    setPath: setPath,
    data: data,
    styles: classes
  }) : /*#__PURE__*/React.createElement(AddNewRequests, {
    id: id,
    request: request,
    setPath: setPath,
    data: data,
    style: classes
  }))), !hide && /*#__PURE__*/React.createElement(Layer, {
    translucent: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "0px",
      right: "25%",
      left: "35%"
    }
  }, /*#__PURE__*/React.createElement(Box, null, isSuccessMessage == true ? /*#__PURE__*/React.createElement(AlertBar, {
    hidden: hide,
    success: true,
    duration: 4000,
    onHidden: e => {
      setHidden(true);
      // window.location.reload(true);
    }
  }, message) : /*#__PURE__*/React.createElement(AlertBar, {
    hidden: hide,
    warning: true,
    duration: 4000,
    onHidden: e => {
      setHidden(true);
    }
  }, message))))), /*#__PURE__*/React.createElement(NewDataInitialization, {
    open: open,
    setOpen: setOpen,
    styles: classes,
    setType: setType,
    formInputValues: formInputValues,
    type: type,
    setFormInputValues: setFormInputValues,
    saveGeneralInputValues: saveGeneralInputValues
  }), /*#__PURE__*/React.createElement(UpdateDataInitialization, {
    setType: setType,
    styles: classes,
    type: type,
    setOpenUpdate: setOpenUpdate,
    openUpdate: openUpdate,
    setUpdateFormInputValues: setUpdateFormInputValues,
    updateFormInputValues: updateFormInputValues,
    updateGeneralInputValues: updateGeneralInputValues,
    data: dataToUpdate
  }), /*#__PURE__*/React.createElement(IntegrateDataStoreInitializationToDEX, {
    setAuthType: setAuthType,
    styles: classes,
    type: type,
    authType: authType,
    setOpenIntegration: setOpenIntegration,
    openIntegration: openIntegration,
    setAuthValues: setAuthValues,
    authValues: authValues,
    initializeIntegration: initializeIntegration,
    data: dataToIntegrate
  }), /*#__PURE__*/React.createElement(DeleteEntry, {
    setOpenDelete: setOpenDelete,
    openDelete: openDelete,
    deleteDataEntry: deleteDataEntry,
    data: dataToDelete
  }));
};
export default MyApp;
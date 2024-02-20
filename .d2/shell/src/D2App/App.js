import React, { useState, useEffect } from "react";
import { DataQuery, useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import classes from "./App.module.css";
import HeaderComponent from "./components/widgets/headerComponent";
import { AlertBar, Box, Center, CircularLoader, Layer } from "@dhis2/ui";
import HomePage from "./components/widgets/homePage";
import NewDataInitialization from "./components/widgets/newDataInitialization";
import NoPageFound from "./components/widgets/noPageFound";
import AddNewRequests from "./components/widgets/addNewRequests";
import ViewDataStoreById from "./components/widgets/view";
import DeleteEntry from "./components/forms/deleteEntry";
import UpdateDataInitialization from "./components/widgets/update.dataStore.dexEntry";
import IntegrateDataStoreInitializationToDEX from "./components/widgets/integrate.dataStore.dexEntry";
import UrlValidator from "./services/urlValidator";
import DeleteIntegration from "./components/forms/deleteEntryIntegrations";
const query = {
  organisationUnits: {
    resource: "organisationUnits",
    params: {
      paging: false,
      fields: ["id,name,level,path,displayName,code,attributeValues"],
      order: "level"
    }
  },
  attribute: {
    resource: "attributes",
    params: {
      paging: false,
      fields: ['displayName', 'id', 'objectTypes']
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
      fields: ["id", "name", "formName", "displayName", "code", "aggregationType", "domainType"]
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
  var _data$aggregateDataEx2, _data$attribute, _data$aggregateDataEx3;
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
  const [idScheme, setRequestScheme] = useState('UID');
  const [open, setOpen] = useState(false);
  const [openDeleteIntegrations, setOpenDeleteIntegrations] = useState(false);
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
  const [update, setUpdate] = useState(false);
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
          type: type,
          request: {
            idScheme: formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.idScheme,
            orgUnitIdScheme: formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.orgUnitIdScheme,
            dataElementIdScheme: formInputValues === null || formInputValues === void 0 ? void 0 : formInputValues.dataElementIdScheme
          }
        }
      };
      console.log(payload);
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
  const mutation = payload => {
    engine.mutate(payload).then(res => {
      if (res.httpStatusCode == 201 || res.httpStatusCode == 200) {
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
          if (res.httpStatusCode == 200 || res.httpStatusCode == 201) {
            setOpenIntegration(false);
            setSuccessMessage(true);
            setHidden(false);
            if (update) {
              setMessage("Data exchange initialization updated successifully\nPlease use the Data Exchange app to submit the Data.");
              setUpdate(false);
            } else {
              setMessage("Data exchange initialization is successfull\nPlease use the Data Exchange app to submit the Data.");
            }
          }
        }).catch(e => {
          setSuccessMessage(true);
          setHidden(false);
          setMessage("Error occured. Either server or the inputs causes this error.");
        });
      }
    }).catch(e => {
      setSuccessMessage(true);
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
  const initializeIntegration = dataValues => {
    var _data$aggregateDataEx;
    let aggregateDataExchanges = data === null || data === void 0 ? void 0 : (_data$aggregateDataEx = data.aggregateDataExchanges) === null || _data$aggregateDataEx === void 0 ? void 0 : _data$aggregateDataEx.aggregateDataExchanges;
    let existingDEX = aggregateDataExchanges === null || aggregateDataExchanges === void 0 ? void 0 : aggregateDataExchanges.filter(allDEX => {
      var _dataToIntegrate$valu6;
      return (allDEX === null || allDEX === void 0 ? void 0 : allDEX.name) === (dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu6 = dataToIntegrate.value) === null || _dataToIntegrate$valu6 === void 0 ? void 0 : _dataToIntegrate$valu6.dexname);
    });
    if ((formData === null || formData === void 0 ? void 0 : formData.type) == (type === null || type === void 0 ? void 0 : type.EXTERNAL)) {
      var _dataToIntegrate$valu7;
      if ((dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu7 = dataToIntegrate.value) === null || _dataToIntegrate$valu7 === void 0 ? void 0 : _dataToIntegrate$valu7.url) == "") {
        setMessage("Please enter target DHIS2 instance url");
        setHidden(false);
      } else {
        var _dataToIntegrate$valu8;
        if ((UrlValidator === null || UrlValidator === void 0 ? void 0 : UrlValidator.isValidUrl(dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu8 = dataToIntegrate.value) === null || _dataToIntegrate$valu8 === void 0 ? void 0 : _dataToIntegrate$valu8.url)) == false) {
          setMessage("The url format is invalid.");
          setHidden(false);
        } else {
          if (checkIfTokenOrBasiAuth(authType)) {
            var _dataToIntegrate$valu9, _dataToIntegrate$valu10, _dataToIntegrate$valu11;
            console.log(dataToIntegrate);
            if ((dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu9 = dataToIntegrate.value) === null || _dataToIntegrate$valu9 === void 0 ? void 0 : (_dataToIntegrate$valu10 = _dataToIntegrate$valu9.source) === null || _dataToIntegrate$valu10 === void 0 ? void 0 : (_dataToIntegrate$valu11 = _dataToIntegrate$valu10.requests) === null || _dataToIntegrate$valu11 === void 0 ? void 0 : _dataToIntegrate$valu11.length) > 0) {
              var _dataToIntegrate$valu12, _dataToIntegrate$valu13, _dataToIntegrate$valu14;
              let holder = [];
              dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu12 = dataToIntegrate.value) === null || _dataToIntegrate$valu12 === void 0 ? void 0 : (_dataToIntegrate$valu13 = _dataToIntegrate$valu12.source) === null || _dataToIntegrate$valu13 === void 0 ? void 0 : (_dataToIntegrate$valu14 = _dataToIntegrate$valu13.requests) === null || _dataToIntegrate$valu14 === void 0 ? void 0 : _dataToIntegrate$valu14.map(dd => {
                holder.push({
                  name: dd === null || dd === void 0 ? void 0 : dd.name,
                  dx: dd === null || dd === void 0 ? void 0 : dd.dx,
                  pe: dd === null || dd === void 0 ? void 0 : dd.pe,
                  ou: dd === null || dd === void 0 ? void 0 : dd.ou,
                  inputIdScheme: dd.inputIdScheme,
                  outputIdScheme: dd.outputIdScheme,
                  orgUnitIdScheme: dd.orgUnitIdScheme,
                  dataElementIdScheme: dd.dataElementIdScheme,
                  outputDataElementIdScheme: dd.outputDataElementIdScheme,
                  outputOrgUnitIdScheme: dd.outputOrgUnitIdScheme
                });
              });
              if ((authValues === null || authValues === void 0 ? void 0 : authValues.username) == undefined || (authValues === null || authValues === void 0 ? void 0 : authValues.username) == "" || (authValues === null || authValues === void 0 ? void 0 : authValues.password) == undefined || (authValues === null || authValues === void 0 ? void 0 : authValues.password) == "") {
                setMessage("Username or password is missing");
                setHidden(false);
              } else {
                if ((existingDEX === null || existingDEX === void 0 ? void 0 : existingDEX.length) == 1) {
                  var _existingDEX$, _dataToIntegrate$valu15, _dataToIntegrate$valu16, _dataToIntegrate$valu17, _dataToIntegrate$valu18, _dataToIntegrate$valu19, _dataToIntegrate$valu20, _dataToIntegrate$valu21, _dataToIntegrate$valu22, _dataToIntegrate$valu23;
                  setUpdate(true);
                  console.log(dataToIntegrate);
                  let payload = {
                    resource: `aggregateDataExchanges/${(_existingDEX$ = existingDEX[0]) === null || _existingDEX$ === void 0 ? void 0 : _existingDEX$.id}`,
                    type: "update",
                    data: {
                      name: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu15 = dataToIntegrate.value) === null || _dataToIntegrate$valu15 === void 0 ? void 0 : _dataToIntegrate$valu15.dexname,
                      source: {
                        requests: holder
                      },
                      target: {
                        type: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu16 = dataToIntegrate.value) === null || _dataToIntegrate$valu16 === void 0 ? void 0 : _dataToIntegrate$valu16.type,
                        api: {
                          url: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu17 = dataToIntegrate.value) === null || _dataToIntegrate$valu17 === void 0 ? void 0 : _dataToIntegrate$valu17.url,
                          username: authValues === null || authValues === void 0 ? void 0 : authValues.username,
                          password: authValues === null || authValues === void 0 ? void 0 : authValues.password
                        },
                        request: {
                          idScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu18 = dataToIntegrate.value) === null || _dataToIntegrate$valu18 === void 0 ? void 0 : (_dataToIntegrate$valu19 = _dataToIntegrate$valu18.request) === null || _dataToIntegrate$valu19 === void 0 ? void 0 : _dataToIntegrate$valu19.idScheme,
                          orgUnitIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu20 = dataToIntegrate.value) === null || _dataToIntegrate$valu20 === void 0 ? void 0 : (_dataToIntegrate$valu21 = _dataToIntegrate$valu20.request) === null || _dataToIntegrate$valu21 === void 0 ? void 0 : _dataToIntegrate$valu21.orgUnitIdScheme,
                          dataElementIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu22 = dataToIntegrate.value) === null || _dataToIntegrate$valu22 === void 0 ? void 0 : (_dataToIntegrate$valu23 = _dataToIntegrate$valu22.request) === null || _dataToIntegrate$valu23 === void 0 ? void 0 : _dataToIntegrate$valu23.dataElementIdScheme
                        }
                      }
                    }
                  };
                  mutation(payload);
                } else {
                  var _dataToIntegrate$valu24, _dataToIntegrate$valu25, _dataToIntegrate$valu26, _dataToIntegrate$valu27, _dataToIntegrate$valu28, _dataToIntegrate$valu29, _dataToIntegrate$valu30, _dataToIntegrate$valu31, _dataToIntegrate$valu32;
                  console.log(dataToIntegrate);
                  let payload = {
                    resource: "aggregateDataExchanges",
                    type: "create",
                    data: {
                      name: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu24 = dataToIntegrate.value) === null || _dataToIntegrate$valu24 === void 0 ? void 0 : _dataToIntegrate$valu24.dexname,
                      source: {
                        requests: holder
                      },
                      target: {
                        type: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu25 = dataToIntegrate.value) === null || _dataToIntegrate$valu25 === void 0 ? void 0 : _dataToIntegrate$valu25.type,
                        api: {
                          url: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu26 = dataToIntegrate.value) === null || _dataToIntegrate$valu26 === void 0 ? void 0 : _dataToIntegrate$valu26.url,
                          username: authValues === null || authValues === void 0 ? void 0 : authValues.username,
                          password: authValues === null || authValues === void 0 ? void 0 : authValues.password
                        },
                        request: {
                          idScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu27 = dataToIntegrate.value) === null || _dataToIntegrate$valu27 === void 0 ? void 0 : (_dataToIntegrate$valu28 = _dataToIntegrate$valu27.request) === null || _dataToIntegrate$valu28 === void 0 ? void 0 : _dataToIntegrate$valu28.idScheme,
                          orgUnitIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu29 = dataToIntegrate.value) === null || _dataToIntegrate$valu29 === void 0 ? void 0 : (_dataToIntegrate$valu30 = _dataToIntegrate$valu29.request) === null || _dataToIntegrate$valu30 === void 0 ? void 0 : _dataToIntegrate$valu30.orgUnitIdScheme,
                          dataElementIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu31 = dataToIntegrate.value) === null || _dataToIntegrate$valu31 === void 0 ? void 0 : (_dataToIntegrate$valu32 = _dataToIntegrate$valu31.request) === null || _dataToIntegrate$valu32 === void 0 ? void 0 : _dataToIntegrate$valu32.dataElementIdScheme
                        }
                      }
                    }
                  };
                  mutation(payload);
                }
              }
            } else {
              setMessage("No requests attached");
              setHidden(false);
            }
          } else {
            var _dataToIntegrate$valu33, _dataToIntegrate$valu34, _dataToIntegrate$valu35;
            if ((dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu33 = dataToIntegrate.value) === null || _dataToIntegrate$valu33 === void 0 ? void 0 : (_dataToIntegrate$valu34 = _dataToIntegrate$valu33.source) === null || _dataToIntegrate$valu34 === void 0 ? void 0 : (_dataToIntegrate$valu35 = _dataToIntegrate$valu34.requests) === null || _dataToIntegrate$valu35 === void 0 ? void 0 : _dataToIntegrate$valu35.length) > 0) {
              var _dataToIntegrate$valu36, _dataToIntegrate$valu37, _dataToIntegrate$valu38;
              let holder = [];
              dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu36 = dataToIntegrate.value) === null || _dataToIntegrate$valu36 === void 0 ? void 0 : (_dataToIntegrate$valu37 = _dataToIntegrate$valu36.source) === null || _dataToIntegrate$valu37 === void 0 ? void 0 : (_dataToIntegrate$valu38 = _dataToIntegrate$valu37.requests) === null || _dataToIntegrate$valu38 === void 0 ? void 0 : _dataToIntegrate$valu38.map(dd => {
                holder.push({
                  name: dd === null || dd === void 0 ? void 0 : dd.name,
                  // visualization: dd?.visualizations,
                  dx: dd === null || dd === void 0 ? void 0 : dd.dx,
                  pe: dd === null || dd === void 0 ? void 0 : dd.pe,
                  ou: dd === null || dd === void 0 ? void 0 : dd.ou,
                  inputIdScheme: dd.inputIdScheme,
                  outputIdScheme: dd.outputIdScheme,
                  orgUnitIdScheme: dd.orgUnitIdScheme,
                  dataElementIdScheme: dd.dataElementIdScheme,
                  outputDataElementIdScheme: dd.outputDataElementIdScheme,
                  outputOrgUnitIdScheme: dd.outputOrgUnitIdScheme
                });
              });
              if ((authValues === null || authValues === void 0 ? void 0 : authValues.token) == undefined || (authValues === null || authValues === void 0 ? void 0 : authValues.token) == "" || (authValues === null || authValues === void 0 ? void 0 : authValues.token) == null) {
                setMessage("Token is missing");
                setHidden(false);
              } else {
                if ((existingDEX === null || existingDEX === void 0 ? void 0 : existingDEX.length) == 1) {
                  var _existingDEX$2, _dataToIntegrate$valu39, _dataToIntegrate$valu40, _dataToIntegrate$valu41, _dataToIntegrate$valu42, _dataToIntegrate$valu43, _dataToIntegrate$valu44, _dataToIntegrate$valu45, _dataToIntegrate$valu46, _dataToIntegrate$valu47;
                  console.log(2);
                  console.log(dataToIntegrate);
                  let payload = {
                    resource: `aggregateDataExchanges/${(_existingDEX$2 = existingDEX[0]) === null || _existingDEX$2 === void 0 ? void 0 : _existingDEX$2.id}`,
                    type: "update",
                    data: {
                      name: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu39 = dataToIntegrate.value) === null || _dataToIntegrate$valu39 === void 0 ? void 0 : _dataToIntegrate$valu39.dexname,
                      source: {
                        requests: holder
                      },
                      target: {
                        type: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu40 = dataToIntegrate.value) === null || _dataToIntegrate$valu40 === void 0 ? void 0 : _dataToIntegrate$valu40.type,
                        api: {
                          url: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu41 = dataToIntegrate.value) === null || _dataToIntegrate$valu41 === void 0 ? void 0 : _dataToIntegrate$valu41.url,
                          accessToken: authValues === null || authValues === void 0 ? void 0 : authValues.token
                        },
                        request: {
                          idScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu42 = dataToIntegrate.value) === null || _dataToIntegrate$valu42 === void 0 ? void 0 : (_dataToIntegrate$valu43 = _dataToIntegrate$valu42.request) === null || _dataToIntegrate$valu43 === void 0 ? void 0 : _dataToIntegrate$valu43.idScheme,
                          orgUnitIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu44 = dataToIntegrate.value) === null || _dataToIntegrate$valu44 === void 0 ? void 0 : (_dataToIntegrate$valu45 = _dataToIntegrate$valu44.request) === null || _dataToIntegrate$valu45 === void 0 ? void 0 : _dataToIntegrate$valu45.orgUnitIdScheme,
                          dataElementIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu46 = dataToIntegrate.value) === null || _dataToIntegrate$valu46 === void 0 ? void 0 : (_dataToIntegrate$valu47 = _dataToIntegrate$valu46.request) === null || _dataToIntegrate$valu47 === void 0 ? void 0 : _dataToIntegrate$valu47.dataElementIdScheme
                        }
                      }
                    }
                  };
                  mutation(payload);
                } else {
                  var _dataToIntegrate$valu48, _dataToIntegrate$valu49, _dataToIntegrate$valu50, _dataToIntegrate$valu51, _dataToIntegrate$valu52, _dataToIntegrate$valu53, _dataToIntegrate$valu54, _dataToIntegrate$valu55, _dataToIntegrate$valu56, _dataToIntegrate$valu57, _dataToIntegrate$valu58;
                  console.log(3);
                  console.log(dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu48 = dataToIntegrate.value) === null || _dataToIntegrate$valu48 === void 0 ? void 0 : (_dataToIntegrate$valu49 = _dataToIntegrate$valu48.request) === null || _dataToIntegrate$valu49 === void 0 ? void 0 : _dataToIntegrate$valu49.idScheme);
                  let payload = {
                    resource: `aggregateDataExchanges/`,
                    type: "create",
                    data: {
                      name: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu50 = dataToIntegrate.value) === null || _dataToIntegrate$valu50 === void 0 ? void 0 : _dataToIntegrate$valu50.dexname,
                      source: {
                        requests: holder
                      },
                      target: {
                        type: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu51 = dataToIntegrate.value) === null || _dataToIntegrate$valu51 === void 0 ? void 0 : _dataToIntegrate$valu51.type,
                        api: {
                          url: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu52 = dataToIntegrate.value) === null || _dataToIntegrate$valu52 === void 0 ? void 0 : _dataToIntegrate$valu52.url,
                          accessToken: authValues === null || authValues === void 0 ? void 0 : authValues.token
                        },
                        request: {
                          idScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu53 = dataToIntegrate.value) === null || _dataToIntegrate$valu53 === void 0 ? void 0 : (_dataToIntegrate$valu54 = _dataToIntegrate$valu53.request) === null || _dataToIntegrate$valu54 === void 0 ? void 0 : _dataToIntegrate$valu54.idScheme,
                          orgUnitIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu55 = dataToIntegrate.value) === null || _dataToIntegrate$valu55 === void 0 ? void 0 : (_dataToIntegrate$valu56 = _dataToIntegrate$valu55.request) === null || _dataToIntegrate$valu56 === void 0 ? void 0 : _dataToIntegrate$valu56.orgUnitIdScheme,
                          dataElementIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu57 = dataToIntegrate.value) === null || _dataToIntegrate$valu57 === void 0 ? void 0 : (_dataToIntegrate$valu58 = _dataToIntegrate$valu57.request) === null || _dataToIntegrate$valu58 === void 0 ? void 0 : _dataToIntegrate$valu58.dataElementIdScheme
                        }
                      }
                    }
                  };
                  mutation(payload);
                }
              }
            } else {
              setMessage("No requests attached");
              setHidden(false);
            }
          }
        }
      }
    } else {
      if ((existingDEX === null || existingDEX === void 0 ? void 0 : existingDEX.length) == 1) {
        var _existingDEX$3, _dataToIntegrate$valu59, _dataToIntegrate$valu60, _dataToIntegrate$valu61, _dataToIntegrate$valu62, _dataToIntegrate$valu63, _dataToIntegrate$valu64, _dataToIntegrate$valu65, _dataToIntegrate$valu66, _dataToIntegrate$valu67, _dataToIntegrate$valu68, _dataToIntegrate$valu69;
        console.log(4);
        console.log(dataToIntegrate);
        let payload = {
          resource: `aggregateDataExchanges/${(_existingDEX$3 = existingDEX[0]) === null || _existingDEX$3 === void 0 ? void 0 : _existingDEX$3.id}`,
          type: "update",
          data: {
            name: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu59 = dataToIntegrate.value) === null || _dataToIntegrate$valu59 === void 0 ? void 0 : _dataToIntegrate$valu59.dexname,
            source: {
              requests: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu60 = dataToIntegrate.value) === null || _dataToIntegrate$valu60 === void 0 ? void 0 : (_dataToIntegrate$valu61 = _dataToIntegrate$valu60.source) === null || _dataToIntegrate$valu61 === void 0 ? void 0 : _dataToIntegrate$valu61.request
            },
            target: {
              type: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu62 = dataToIntegrate.value) === null || _dataToIntegrate$valu62 === void 0 ? void 0 : _dataToIntegrate$valu62.type,
              api: {
                url: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu63 = dataToIntegrate.value) === null || _dataToIntegrate$valu63 === void 0 ? void 0 : _dataToIntegrate$valu63.url,
                accessToken: authValues === null || authValues === void 0 ? void 0 : authValues.token
              },
              request: {
                idScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu64 = dataToIntegrate.value) === null || _dataToIntegrate$valu64 === void 0 ? void 0 : (_dataToIntegrate$valu65 = _dataToIntegrate$valu64.request) === null || _dataToIntegrate$valu65 === void 0 ? void 0 : _dataToIntegrate$valu65.idScheme,
                orgUnitIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu66 = dataToIntegrate.value) === null || _dataToIntegrate$valu66 === void 0 ? void 0 : (_dataToIntegrate$valu67 = _dataToIntegrate$valu66.request) === null || _dataToIntegrate$valu67 === void 0 ? void 0 : _dataToIntegrate$valu67.orgUnitIdScheme,
                dataElementIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu68 = dataToIntegrate.value) === null || _dataToIntegrate$valu68 === void 0 ? void 0 : (_dataToIntegrate$valu69 = _dataToIntegrate$valu68.request) === null || _dataToIntegrate$valu69 === void 0 ? void 0 : _dataToIntegrate$valu69.dataElementIdScheme
              }
            }
          }
        };
        mutation(payload);
      } else {
        var _dataToIntegrate$valu70, _dataToIntegrate$valu71, _dataToIntegrate$valu72, _dataToIntegrate$valu73, _dataToIntegrate$valu74, _dataToIntegrate$valu75, _dataToIntegrate$valu76, _dataToIntegrate$valu77, _dataToIntegrate$valu78, _dataToIntegrate$valu79, _dataToIntegrate$valu80;
        console.log(dataToIntegrate);
        let payload = {
          resource: "aggregateDataExchanges",
          type: "create",
          data: {
            name: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu70 = dataToIntegrate.value) === null || _dataToIntegrate$valu70 === void 0 ? void 0 : _dataToIntegrate$valu70.dexname,
            source: {
              requests: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu71 = dataToIntegrate.value) === null || _dataToIntegrate$valu71 === void 0 ? void 0 : (_dataToIntegrate$valu72 = _dataToIntegrate$valu71.source) === null || _dataToIntegrate$valu72 === void 0 ? void 0 : _dataToIntegrate$valu72.request
            },
            target: {
              type: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu73 = dataToIntegrate.value) === null || _dataToIntegrate$valu73 === void 0 ? void 0 : _dataToIntegrate$valu73.type,
              api: {
                url: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu74 = dataToIntegrate.value) === null || _dataToIntegrate$valu74 === void 0 ? void 0 : _dataToIntegrate$valu74.url,
                accessToken: authValues === null || authValues === void 0 ? void 0 : authValues.token
              },
              request: {
                idScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu75 = dataToIntegrate.value) === null || _dataToIntegrate$valu75 === void 0 ? void 0 : (_dataToIntegrate$valu76 = _dataToIntegrate$valu75.request) === null || _dataToIntegrate$valu76 === void 0 ? void 0 : _dataToIntegrate$valu76.idScheme,
                orgUnitIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu77 = dataToIntegrate.value) === null || _dataToIntegrate$valu77 === void 0 ? void 0 : (_dataToIntegrate$valu78 = _dataToIntegrate$valu77.request) === null || _dataToIntegrate$valu78 === void 0 ? void 0 : _dataToIntegrate$valu78.orgUnitIdScheme,
                dataElementIdScheme: dataToIntegrate === null || dataToIntegrate === void 0 ? void 0 : (_dataToIntegrate$valu79 = dataToIntegrate.value) === null || _dataToIntegrate$valu79 === void 0 ? void 0 : (_dataToIntegrate$valu80 = _dataToIntegrate$valu79.request) === null || _dataToIntegrate$valu80 === void 0 ? void 0 : _dataToIntegrate$valu80.dataElementIdScheme
              }
            }
          }
        };
        mutation(payload);
      }
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
    console.log(values);
    console.log(data);
    // if (
    //   values?.dexname == "" ||
    //   values?.dexname == null ||
    //   values?.dexname == undefined ||
    //   values?.url == "" ||
    //   values?.url == null ||
    //   values?.url == undefined
    // ) {
    // } else {

    //   if (
    //     dataToUpdate?.value?.source == undefined ||
    //     dataToUpdate?.value?.source == null
    //   ) {
    //     console.log(dataToUpdate)
    //       engine
    //         .mutate({
    //           resource: `dataStore/DEX_initializer_values/${data?.key}`,
    //           type: "update",
    //           data: ({}) => ({
    //             createdAt: dataToUpdate?.value?.createdAt,
    //             updatedAt: new Date().toLocaleDateString(),
    //             dexname: values?.dexname,
    //             type: type,
    //             url: values?.url,
    //             request:{
    //               idScheme : values?.request?.idScheme,
    //               orgUnitIdScheme : values?.request?.orgUnitIdScheme,
    //               dataElementIdScheme : values?.request?.dataElementIdScheme                
    //             }
    //           }),
    //         })
    //         .then((res) => {
    //           if (res.httpStatusCode == 200) {
    //             setKey(Math.random());
    //             setOpenUpdate(!openUpdate);
    //             setSuccessMessage(true);
    //             setHidden(false);
    //             setMessage("Data saved in the datastore successfully.");
    //           }
    //         })
    //         .catch((e) => {
    //           setSuccessMessage(false);
    //           setHidden(false);
    //           setMessage(
    //             "Error occured. Either server or the inputs causes this error."
    //           );
    //         });
    //   } else {
    //     engine
    //       .mutate({
    //         resource: `dataStore/DEX_initializer_values/${data?.key}`,
    //         type: "update",
    //         data: ({}) => ({
    //           createdAt: values?.createdAt,
    //           updatedAt: new Date().toLocaleDateString(),
    //           dexname: values?.dexname,
    //           source: values?.source,
    //           type: values?.type,
    //           url: values?.url,
    //           request:{
    //             idScheme : values?.request?.idScheme,
    //             orgUnitIdScheme : values?.request?.orgUnitIdScheme,
    //             dataElementIdScheme : values?.request?.dataElementIdScheme
    //           }
    //         }),
    //       })
    //       .then((res) => {
    //         if (res.httpStatusCode == 200) {
    //           setOpenUpdate(!openUpdate);
    //           setKey(Math.random());
    //           setSuccessMessage(true);
    //           setHidden(false);
    //           setMessage("Data saved in the datastore successfully.");
    //         }
    //       })
    //       .catch((e) => {
    //         setHidden(false);
    //         setMessage(
    //           "Error occured. Either server or the inputs causes this error."
    //         );
    //       });
    //   }
    // }
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
        refetch();
        if (res.httpStatusCode == 200) {
          setOpenDelete(!openDelete);
          setSuccessMessage(true);
          setHidden(false);
          setMessage("Data saved in the datastore successfully.");
          setKey(Math.random());
        }
      }).catch(e => {
        setSuccessMessage(false);
        setHidden(false);
        setMessage("Error occured. Either server or the inputs causes this error.");
      });
    }
  };
  const deleteDexIntegrations = id => {
    if (id == null || id == undefined || id == "") {} else {
      let payload = {
        resource: `aggregateDataExchanges`,
        id: id,
        type: "delete"
      };
      engine.mutate(payload).then(res => {
        if (res.httpStatusCode == 200) {
          setOpenDeleteIntegrations(!openDeleteIntegrations);
          setSuccessMessage(true);
          setHidden(false);
          setMessage("Data deleted in dhis2 successfully.");
          setKey(Math.random());
          // window.location.reload();
        }
      }).catch(e => {
        setSuccessMessage(false);
        setHidden(false);
        setMessage("Error occured. Either server or the id causes this error.");
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
    aggregateDataExchanges: data === null || data === void 0 ? void 0 : (_data$aggregateDataEx2 = data.aggregateDataExchanges) === null || _data$aggregateDataEx2 === void 0 ? void 0 : _data$aggregateDataEx2.aggregateDataExchanges,
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
    integrateEntry: integrateEntry,
    setOpenDeleteIntegrations: setOpenDeleteIntegrations,
    openDeleteIntegrations: openDeleteIntegrations
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, path === "View" ? /*#__PURE__*/React.createElement(ViewDataStoreById, {
    id: id,
    setID: setID,
    setRequest: setRequest,
    setPath: setPath,
    data: data,
    styles: classes
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, path === "new request" ? /*#__PURE__*/React.createElement(AddNewRequests, {
    id: id,
    request: request,
    setPath: setPath,
    data: data,
    style: classes
  }) : /*#__PURE__*/React.createElement(NoPageFound, null)))), !hide && /*#__PURE__*/React.createElement(Layer, {
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
    data: data,
    setOpen: setOpen,
    styles: classes,
    idScheme: idScheme,
    setRequestScheme: setRequestScheme,
    setType: setType,
    formInputValues: formInputValues,
    type: type,
    setFormInputValues: setFormInputValues,
    saveGeneralInputValues: saveGeneralInputValues
  }), openUpdate && /*#__PURE__*/React.createElement(UpdateDataInitialization, {
    setType: setType,
    styles: classes,
    type: type,
    setRequestScheme: setRequestScheme,
    setOpenUpdate: setOpenUpdate,
    idScheme: idScheme,
    openUpdate: openUpdate,
    setUpdateFormInputValues: setUpdateFormInputValues,
    updateFormInputValues: updateFormInputValues,
    updateGeneralInputValues: updateGeneralInputValues,
    data: dataToUpdate,
    attributes: data === null || data === void 0 ? void 0 : (_data$attribute = data.attribute) === null || _data$attribute === void 0 ? void 0 : _data$attribute.attributes
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
  }), /*#__PURE__*/React.createElement(DeleteIntegration, {
    deleteDexIntegrations: deleteDexIntegrations,
    openDeleteIntegrations: openDeleteIntegrations,
    setOpenDeleteIntegrations: setOpenDeleteIntegrations,
    aggregateDataExchanges: data === null || data === void 0 ? void 0 : (_data$aggregateDataEx3 = data.aggregateDataExchanges) === null || _data$aggregateDataEx3 === void 0 ? void 0 : _data$aggregateDataEx3.aggregateDataExchanges
  }));
};
export default MyApp;
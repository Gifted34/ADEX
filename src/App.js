import React, { useState, useEffect } from "react";
import { DataQuery, useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import classes from "./App.module.css";
import HeaderComponent from "./components/widgets/headerComponent";
import { AlertBar, Box, Center, CircularLoader, Layer, NoticeBox } from "@dhis2/ui";
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
  me: {
    resource : 'me',
    params : {
      fields : ['id','username','userRoles(name,authorities)']
    }
  },
  organisationUnits: {
    resource: "organisationUnits",
    params: {
      paging: false,
      fields: ["id,name,level,path,displayName,code,attributeValues"],
      order: "level",
    },
  },
  attribute: {
    resource : "attributes",
    params : {
      paging : false,
      fields : ['displayName','id','objectTypes']
    }
  },
  
  indicators: {
    resource: "indicators",
    params: {
      paging: false,
      fields: ["id", "name", "displayName", "code"],
    },
  },
  dataElements: {
    resource: "dataElements",
    params: {
      paging: false,
      fields: [
        "id",
        "name",
        "formName",
        "displayName",
        "code",
        "aggregationType",
        "domainType",
      ],
    },
  },
  periodTypes: {
    resource: "periodTypes",
    params: {
      fields: ["*"],
    },
  },
  aggregateDataExchanges: {
    resource: "aggregateDataExchanges",
    params: {
      fields: ["*"],
    },
  },
  dataStore: {
    resource: "dataStore",
    params: {
      paging: false,
      fields: ["*"],
    },
  },
};

// const validater = new UrlValidator();
const MyApp = () => {
  const [formInputValues, setFormInputValues] = useState({
    dexname: "",
    url: "",
  });
  const [updateFormInputValues, setUpdateFormInputValues] = useState({
    dexname: "",
    url: "",
    
  });
  const [authValues, setAuthValues] = useState({
    username: "",
    password: "",
    token: "",
  });

  // updateFormInputValues
  const [type, setType] = useState("EXTERNAL");
  const [idScheme, setRequestScheme] = useState('UID')
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
  const [notAuth, setNotAuth] = useState(true)
  const [formData, setFormData] = useState();
  const [id, setID] = useState();
  const [selecteOrgUnit, setSelecteOrgUnit] = useState([]);
  const [update, setUpdate] = useState(false);
  const [selectedDataDimensionsCodes, setSelectedDataDimensionsCodes] =
    useState([]);
  const [hide, setHidden] = useState(true);
  const [message, setMessage] = useState("");

  const [isSuccessMessage, setSuccessMessage] = useState(false);
  const [authType, setAuthType] = useState("");
  const [request, setRequest] = useState();
  const { loading, error, data, refetch } = useDataQuery(query);

  // this function checks if the user has the F_AGGREGATE_DATA_EXCHANGE_PUBLIC_ADD athourity
  const checkADEXAuth = (userRole) =>{
    userRole?.map(role => {
      if(role?.authorities?.includes('F_AGGREGATE_DATA_EXCHANGE_PUBLIC_ADD')){
        setNotAuth(false);
      }
    })
    setNotAuth(true);
  }

  // save to datastore
  const saveGeneralInputValues = () => {
    if (
      type == null ||
      type == undefined ||
      type == "" ||
      formInputValues?.dexname == null ||
      formInputValues?.dexname == undefined ||
      formInputValues?.dexname == "" ||
      formInputValues?.url == null ||
      formInputValues?.url == undefined ||
      formInputValues?.url == ""
    ) {
      setSuccessMessage(true);
      setHidden(false);
      setMessage("Error occured.");
    } else {
      let payload = {
        resource: `dataStore/DEX_initializer_values/${new Date().getTime()}`,
        type: "create",
        data: {
          createdAt: new Date().toLocaleString(),
          dexname: formInputValues?.dexname,
          url: formInputValues?.url,
          type: type,
          request : {
            idScheme : formInputValues?.idScheme,
            orgUnitIdScheme : formInputValues?.orgUnitIdScheme,
            dataElementIdScheme : formInputValues?.dataElementIdScheme
          }
        },
      };
      console.log(payload)
      engine
        .mutate(payload)
        .then((res) => {
          if (res.httpStatusCode == 201) {
            setKey(Math.random());
            setOpen(!open);
            setSuccessMessage(true);
            setHidden(false);
            setMessage("Data saved in the datastore successfully.");
          }
        })
        .catch((e) => {
          setHidden(false);
          setMessage(
            "Error occured. Either server or the inputs causes this error."
          );
        });
    }
  };
  // a post request to the data echange resource
  const mutation = (payload) => {
    engine
      .mutate(payload)
      .then((res) => {
        if (res.httpStatusCode == 201 || res.httpStatusCode == 200) {
          engine
            .mutate({
              resource: `dataStore/DEX_initializer_values/${dataToIntegrate?.key}`,
              type: "update",
              data: ({}) => ({
                createdAt: dataToIntegrate?.value?.createdAt,
                updatedAt: new Date().toLocaleDateString(),
                dexname: dataToIntegrate?.value?.dexname,
                source: dataToIntegrate?.value?.source,
                type: dataToIntegrate?.value?.type,
                url: dataToIntegrate?.value?.url,
                initialized: true,
              }),
            })
            .then((res) => {
              if (res.httpStatusCode == 200 || res.httpStatusCode == 201) {
                setOpenIntegration(false);
                setSuccessMessage(true);
                setHidden(false);
                if (update) {
                  setMessage(
                    "Data exchange initialization updated successifully\nPlease use the Data Exchange app to submit the Data."
                  );
                  setUpdate(false);
                } else {
                  setMessage(
                    "Data exchange initialization is successfull\nPlease use the Data Exchange app to submit the Data."
                  );
                }
              }
            })
            .catch((e) => {
              setSuccessMessage(true);
              setHidden(false);
              setMessage(
                "Error occured. Either server or the inputs causes this error."
              );
            });
        }
      })
      .catch((e) => {
        setSuccessMessage(true);
        setHidden(false);
        setMessage(
          "Error occured. Either server or the inputs causes this error."
        );
      });
  };

  // check if token or password
  const checkIfTokenOrBasiAuth = (authTypeValue) => {
    if (authTypeValue === "BASICAUTH") {
      return true;
    } else {
      return false;
    }
  };

  // constructing a data exchange api layout as defined in the url
  // https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-240/data-exchange.html
  const initializeIntegration = (dataValues) => {
    let aggregateDataExchanges =
      data?.aggregateDataExchanges?.aggregateDataExchanges;
    let existingDEX = aggregateDataExchanges?.filter(
      (allDEX) => allDEX?.name === dataToIntegrate?.value?.dexname
    );
    if (formData?.type == type?.EXTERNAL) {
      if (dataToIntegrate?.value?.url == "") {
        setMessage("Please enter target DHIS2 instance url");
        setHidden(false);
      } else {
        if (UrlValidator?.isValidUrl(dataToIntegrate?.value?.url) == false) {
          setMessage("The url format is invalid.");
          setHidden(false);
        } else {
          if (checkIfTokenOrBasiAuth(authType)) {
            console.log(dataToIntegrate)
            if (dataToIntegrate?.value?.source?.requests?.length > 0) {
              let holder = [];
              dataToIntegrate?.value?.source?.requests?.map((dd) => {
                holder.push({
                  name: dd?.name,
                  dx: dd?.dx,
                  pe: dd?.pe,
                  ou: dd?.ou,
                  inputIdScheme: dd.inputIdScheme,
                  outputIdScheme: dd.outputIdScheme,
                  orgUnitIdScheme : dd.orgUnitIdScheme,
                  dataElementIdScheme : dd.dataElementIdScheme,
                  outputDataElementIdScheme : dd.outputDataElementIdScheme,
                  outputOrgUnitIdScheme : dd.outputOrgUnitIdScheme                  
                });
              });
              if (
                authValues?.username == undefined ||
                authValues?.username == "" ||
                authValues?.password == undefined ||
                authValues?.password == ""
              ) {
                setMessage("Username or password is missing");
                setHidden(false);
              } else {
                if (existingDEX?.length == 1) {
                  setUpdate(true);
                  console.log(dataToIntegrate)
                  let payload = {
                    resource: `aggregateDataExchanges/${existingDEX[0]?.id}`,
                    type: "update",
                    data: {
                      name: dataToIntegrate?.value?.dexname,
                      source: {
                        requests: holder,
                      },
                      target: {
                        type: dataToIntegrate?.value?.type,
                        api: {
                          url: dataToIntegrate?.value?.url,
                          username: authValues?.username,
                          password: authValues?.password,
                        },
                        request : {
                          idScheme : dataToIntegrate?.value?.request?.idScheme,
                          orgUnitIdScheme : dataToIntegrate?.value?.request?.orgUnitIdScheme,
                          dataElementIdScheme : dataToIntegrate?.value?.request?.dataElementIdScheme
                        }
                      },
                    },
                  };
                  mutation(payload);
                } else {
                  console.log(dataToIntegrate)
                  let payload = {
                    resource: "aggregateDataExchanges",
                    type: "create",
                    data: {
                      name: dataToIntegrate?.value?.dexname,
                      source: {
                        requests: holder,
                      },
                      target: {
                        type: dataToIntegrate?.value?.type,
                        api: {
                          url: dataToIntegrate?.value?.url,
                          username: authValues?.username,
                          password: authValues?.password,
                        },
                        request : {
                          idScheme : dataToIntegrate?.value?.request?.idScheme,
                          orgUnitIdScheme : dataToIntegrate?.value?.request?.orgUnitIdScheme,
                          dataElementIdScheme : dataToIntegrate?.value?.request?.dataElementIdScheme
                        }
                      },
                    },
                  };
                  mutation(payload);
                }
              }
            } else {
              setMessage("No requests attached");
              setHidden(false);
            }
          } else {
            if (dataToIntegrate?.value?.source?.requests?.length > 0) {
              let holder = [];
              dataToIntegrate?.value?.source?.requests?.map((dd) => {
                holder.push({
                  name: dd?.name,
                  // visualization: dd?.visualizations,
                  dx: dd?.dx,
                  pe: dd?.pe,
                  ou: dd?.ou,
                  inputIdScheme: dd.inputIdScheme,
                  outputIdScheme: dd.outputIdScheme,
                  orgUnitIdScheme : dd.orgUnitIdScheme,
                  dataElementIdScheme : dd.dataElementIdScheme,
                  outputDataElementIdScheme : dd.outputDataElementIdScheme,
                  outputOrgUnitIdScheme : dd.outputOrgUnitIdScheme
                });
              });
              if (
                authValues?.token == undefined ||
                authValues?.token == "" ||
                authValues?.token == null
              ) {
                setMessage("Token is missing");
                setHidden(false);
              } else {
                if (existingDEX?.length == 1) {
                  console.log(2)
                  console.log(dataToIntegrate)
                  let payload = {
                    resource: `aggregateDataExchanges/${existingDEX[0]?.id}`,
                    type: "update",
                    data: {
                      name: dataToIntegrate?.value?.dexname,
                      source: {
                        requests: holder,
                      },
                      target: {
                        type: dataToIntegrate?.value?.type,
                        api: {
                          url: dataToIntegrate?.value?.url,
                          accessToken: authValues?.token,
                        },
                        request : {
                          idScheme : dataToIntegrate?.value?.request?.idScheme,
                          orgUnitIdScheme : dataToIntegrate?.value?.request?.orgUnitIdScheme,
                          dataElementIdScheme : dataToIntegrate?.value?.request?.dataElementIdScheme
                        }
                      },
                    },
                  };
                  mutation(payload);
                } else {
                  console.log(3)
                  console.log(dataToIntegrate?.value?.request?.idScheme)
                  let payload = {
                    resource: `aggregateDataExchanges/`,
                    type: "create",
                    data: {
                      name: dataToIntegrate?.value?.dexname,
                      source: {
                        requests: holder,
                      },
                      target: {
                        type: dataToIntegrate?.value?.type,
                        api: {
                          url: dataToIntegrate?.value?.url,
                          accessToken: authValues?.token,
                        },
                        request : {
                          idScheme : dataToIntegrate?.value?.request?.idScheme,
                          orgUnitIdScheme : dataToIntegrate?.value?.request?.orgUnitIdScheme,
                          dataElementIdScheme : dataToIntegrate?.value?.request?.dataElementIdScheme
                        }
                      },
                    },
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
      if (existingDEX?.length == 1) {
        console.log(4)
        console.log(dataToIntegrate)
        let payload = {
          resource: `aggregateDataExchanges/${existingDEX[0]?.id}`,
          type: "update",
          data: {
            name: dataToIntegrate?.value?.dexname,
            source: { requests: dataToIntegrate?.value?.source?.request },
            target: {
              type: dataToIntegrate?.value?.type,
              api: {
                url: dataToIntegrate?.value?.url,
                accessToken: authValues?.token,
              },
              request : {
                idScheme : dataToIntegrate?.value?.request?.idScheme,
                orgUnitIdScheme : dataToIntegrate?.value?.request?.orgUnitIdScheme,
                dataElementIdScheme : dataToIntegrate?.value?.request?.dataElementIdScheme
              }
            },
          },
        };
        mutation(payload);
      } else {
        console.log(dataToIntegrate)
        let payload = {
          resource: "aggregateDataExchanges",
          type: "create",
          data: {
            name: dataToIntegrate?.value?.dexname,
            source: { requests: dataToIntegrate?.value?.source?.request },
            target: {
              type: dataToIntegrate?.value?.type,
              api: {
                url: dataToIntegrate?.value?.url,
                accessToken: authValues?.token,
              },
              request : {
                idScheme : dataToIntegrate?.value?.request?.idScheme,
                orgUnitIdScheme : dataToIntegrate?.value?.request?.orgUnitIdScheme,
                dataElementIdScheme : dataToIntegrate?.value?.request?.dataElementIdScheme
              }
            },
          },
        };
        mutation(payload);
      }
    }
  };

  if (error) {
    return <span> Error : {error.message}</span>;
  }
  if (loading) {
    return (
      <Center>
        <CircularLoader large />
      </Center>
    );
  }
  const updateEntry = (data) => {
    setDataToUpdate(data);
  };

  // update the initialized entry in the datastore
  const updateGeneralInputValues = ({ data, values }) => {
    console.log(values)
    setDataToUpdate(values)
    if (
      values?.dexname == "" ||
      values?.dexname == null ||
      values?.dexname == undefined ||
      values?.url == "" ||
      values?.url == null ||
      values?.url == undefined
    ) {
    } else {

      if (
        dataToUpdate?.value?.source == undefined ||
        dataToUpdate?.value?.source == null
      ) {
          engine
            .mutate({
              resource: `dataStore/DEX_initializer_values/${data?.key}`,
              type: "update",
              data: ({}) => ({
                createdAt: dataToUpdate?.value?.createdAt,
                updatedAt: new Date().toLocaleDateString(),
                dexname: values?.dexname,
                type: type,
                url: values?.url,
                request:{
                  idScheme : values?.request?.idScheme,
                  orgUnitIdScheme : values?.request?.orgUnitIdScheme,
                  dataElementIdScheme : values?.request?.dataElementIdScheme                
                }
              }),
            })
            .then((res) => {
              if (res.httpStatusCode == 200) {
                setKey(Math.random());
                setOpenUpdate(!openUpdate);
                setSuccessMessage(true);
                setHidden(false);
                setMessage("Data saved in the datastore successfully.");
              }
            })
            .catch((e) => {
              setSuccessMessage(false);
              setHidden(false);
              setMessage(
                "Error occured. Either server or the inputs causes this error."
              );
            });
      } else {
        engine
          .mutate({
            resource: `dataStore/DEX_initializer_values/${data?.key}`,
            type: "update",
            data: ({}) => ({
              createdAt: values?.createdAt,
              updatedAt: new Date().toLocaleDateString(),
              dexname: values?.dexname,
              source: values?.source,
              type: values?.type,
              url: values?.url,
              request:{
                idScheme : values?.request?.idScheme,
                orgUnitIdScheme : values?.request?.orgUnitIdScheme,
                dataElementIdScheme : values?.request?.dataElementIdScheme
              }
            }),
          })
          .then((res) => {
            if (res.httpStatusCode == 200) {
              setOpenUpdate(!openUpdate);
              setKey(Math.random());
              setSuccessMessage(true);
              setHidden(false);
              setMessage("Data saved in the datastore successfully.");
            }
          })
          .catch((e) => {
            setHidden(false);
            setMessage(
              "Error occured. Either server or the inputs causes this error."
            );
          });
      }
    }
  };
  // delete the initialized entry in datastore
  const deleteEntry = (data) => {
    setDataToDelete(data);
  };

  const integrateEntry = (data) => {
    setDataToIntegrate(data);
  };

  const deleteDataEntry = (data) => {
    if (data?.key == null || data?.key == undefined || data?.key == "") {
    } else {
      let payload = {
        resource: "dataStore/DEX_initializer_values",
        id: data?.key,
        type: "delete",
      };
      engine
        .mutate(payload)
        .then((res) => {
          refetch();
          if (res.httpStatusCode == 200) {
            setOpenDelete(!openDelete);
            setSuccessMessage(true);
            setHidden(false);
            setMessage("Data saved in the datastore successfully.");
            setKey(Math.random());
          }
        })
        .catch((e) => {
          setSuccessMessage(false);
          setHidden(false);
          setMessage(
            "Error occured. Either server or the inputs causes this error."
          );
        });
    }
  };

  const deleteDexIntegrations = (id) => {
    if (id == null || id == undefined || id == "") {
    } else {
      let payload = {
        resource: `aggregateDataExchanges`,
        id: id,
        type: "delete",
      };
      engine
        .mutate(payload)
        .then((res) => {
          if (res.httpStatusCode == 200) {
            setOpenDeleteIntegrations(!openDeleteIntegrations);
            setSuccessMessage(true);
            setHidden(false);
            setMessage("Data deleted in dhis2 successfully.");
            setKey(Math.random());
            // window.location.reload();
          }
        })
        .catch((e) => {
          setSuccessMessage(false);
          setHidden(false);
          setMessage(
            "Error occured. Either server or the id causes this error."
          );
        });
    }
  };
  
  useEffect(()=>{
    checkADEXAuth(data?.me?.userRoles)
  },[data])
  
  return (
    <div>
      <div>
        <HeaderComponent />
        <br />
        <div style={{ padding: "20px" }}>
          {path === "Home" ? (
            <HomePage
              key={ke}
              notAuth={notAuth}
              data={data}
              setPath={setPath}
              setID={setID}
              aggregateDataExchanges={
                data?.aggregateDataExchanges?.aggregateDataExchanges
              }
              setRequest={setRequest}
              styles={classes}
              open={open}
              setOpenUpdate={setOpenUpdate}
              openUpdate={openUpdate}
              openIntegration={openIntegration}
              setOpenIntegration={setOpenIntegration}
              setOpen={setOpen}
              setOpenDelete={setOpenDelete}
              openDelete={openDelete}
              deleteEntry={deleteEntry}
              updateEntry={updateEntry}
              integrateEntry={integrateEntry}
              setOpenDeleteIntegrations={setOpenDeleteIntegrations}
              openDeleteIntegrations={openDeleteIntegrations}
            />
          ) : (
            <>
              {path === "View" ? (
                <ViewDataStoreById
                  id={id}
                  setID={setID}
                  setRequest={setRequest}
                  setPath={setPath}
                  data={data}
                  styles={classes}
                />
              ) : (
                <>
                  {path === "new request" ? (
                    <AddNewRequests
                      id={id}
                      request={request}
                      setPath={setPath}
                      data={data}
                      style={classes}
                    />
                  ) : (
                    <NoPageFound />
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* <div style={{ marginLeft: "50px" }}> */}
        {!hide && (
          <Layer translucent>
            <div
              style={{
                position: "absolute",
                bottom: "0px",
                right: "25%",
                left: "35%",
              }}
            >
              <Box>
                {isSuccessMessage ? (
                  <AlertBar
                    hidden={hide}
                    success
                    duration={4000}
                    onHidden={(e) => {
                      setHidden(true);
                      // window.location.reload(true);
                    }}
                  >
                    {message}
                  </AlertBar>
                ) : (
                  <AlertBar
                    hidden={hide}
                    warning
                    duration={4000}
                    onHidden={(e) => {
                      setHidden(true);
                    }}
                  >
                    {message}
                  </AlertBar>
                )}
              </Box>
            </div>
          </Layer>
        )}
      </div>
      <NewDataInitialization
        open={open}
        data={data}
        setOpen={setOpen}
        styles={classes}
        idScheme={idScheme}
        setRequestScheme={setRequestScheme}
        setType={setType}
        formInputValues={formInputValues}
        type={type}
        setFormInputValues={setFormInputValues}
        saveGeneralInputValues={saveGeneralInputValues}
      />
      {openUpdate &&
      <UpdateDataInitialization
        setType={setType}
        styles={classes}
        type={type}
        setRequestScheme={setRequestScheme}
        setOpenUpdate={setOpenUpdate}
        idScheme={idScheme}
        openUpdate={openUpdate}
        setUpdateFormInputValues={setUpdateFormInputValues}
        updateFormInputValues={updateFormInputValues}
        updateGeneralInputValues={updateGeneralInputValues}
        data={dataToUpdate}
        attributes={data?.attribute?.attributes}
      />}
      <IntegrateDataStoreInitializationToDEX
        setAuthType={setAuthType}
        styles={classes}
        type={type}
        authType={authType}
        setOpenIntegration={setOpenIntegration}
        openIntegration={openIntegration}
        setAuthValues={setAuthValues}
        authValues={authValues}
        initializeIntegration={initializeIntegration}
        data={dataToIntegrate}
      />
      <DeleteEntry
        setOpenDelete={setOpenDelete}
        openDelete={openDelete}
        deleteDataEntry={deleteDataEntry}
        data={dataToDelete}
      />
      <DeleteIntegration
        deleteDexIntegrations={deleteDexIntegrations}
        openDeleteIntegrations={openDeleteIntegrations}
        setOpenDeleteIntegrations={setOpenDeleteIntegrations}
        aggregateDataExchanges={
          data?.aggregateDataExchanges?.aggregateDataExchanges
        }
      />
    </div>
  );
};

export default MyApp;

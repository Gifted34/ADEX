import React, { useState, useEffect } from "react";
import { DataQuery, useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import classes from "./App.module.css";
import HeaderComponent from "./components/widgets/headerComponent";
import {
  AlertBar,
  Box,
  Button,
  Center,
  CircularLoader,
  Divider,
  I,
} from "@dhis2/ui";
import EmailValidator from "./services/emailValidator";
import HomePage from "./components/widgets/homePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewDataInitialization from "./components/widgets/newDataInitialization";
import NoPageFound from "./components/widgets/noPageFound";
import AddNewRequests from "./components/widgets/addNewRequests";
import ViewDataStoreById from "./components/widgets/view";
import DeleteEntry from "./components/forms/deleteEntry";
import UpdateDataInitialization from "./components/forms/update.dataStore.dexEntry";

const query = {
  organisationUnits: {
    resource: "organisationUnits",
    params: {
      paging: false,
      fields: [
        "id,name,level,path,displayName,code,children,ancestors,created,href,user,users,userAccesses",
      ],
      order: "level",
    },
  },
  visualizations: {
    resource: "visualizations",
    params: {
      paging: false,
      field: ["id", "displayName"],
    },
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
      fields: ["id", "name", "formName", "displayName", "code"],
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

const validater = new EmailValidator();
const MyApp = () => {
  const [formInputValues, setFormInputValues] = useState({
    dexname: "",
    url: "",
  });

  // updateFormInputValues
  const [type, setType] = useState("EXTERNAL");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dataToDelete, setDataToDelete] = useState();
  const [dataToUpdate, setDataToUpdate] = useState();

  const engine = useDataEngine();
  const [formData, setFormData] = useState();
  const [selecteOrgUnit, setSelecteOrgUnit] = useState([]);
  const [selectedDataDimensionsCodes, setSelectedDataDimensionsCodes] =
    useState([]);
  const [hide, setHidden] = useState(true);
  const [message, setMessage] = useState("");

  const [isSuccessMessage, setSuccessMessage] = useState(false);
  // const [type, setType] = useState({
  //   INTERNAL: "INTERNAL",
  //   EXTERNAL: "EXTERNAL",
  // });
  // const [authType, setAuthType] = useState({
  //   TOKEN: "TOKEN",
  //   BASICAUTH: "BASICAUTH",
  // });

  const { loading, error, data, refetch } = useDataQuery(query);
  // inputs data from general section passed in state
  const formInputs = (data) => {
    setFormData(data);
  };

  // a post request to the data echange resource
  const mutation = (data) => {
    engine
      .mutate(data)
      .then((res) => {
        if (res.httpStatusCode == 201) {
          setSuccessMessage(true);
          setHidden(false);
          setMessage(
            "Data exchange initialization is successfull\nPlease use the Data Exchange app to submit the Data."
          );
        }
      })
      .catch((e) => {
        setHidden(false);
        setMessage(
          "Error occured. Either server or the inputs causes this error."
        );
      });
  };
  // check if token or password
  const checkIfTokenOrBasiAuth = (authTypeValue) => {
    if (authTypeValue == authType.BASICAUTH) {
      return true;
    } else {
      return false;
    }
  };

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
          name: formInputValues?.dexname,
          url: formInputValues?.url,
          type: type,
        },
      };
      engine
        .mutate(payload)
        .then((res) => {
          if (res.httpStatusCode == 201) {
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
  // constructing a data exchange api layout as defined in the url
  // https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-240/data-exchange.html
  const initializeButton = () => {
    let payload = {
      resource: "aggregateDataExchanges",
      type: "create",
      data: {
        name: formData?.formInputs?.dexname,
        source: {
          requests: [
            {
              name: formData?.formInputs?.sourcename,
              dx: selectedDataDimensionsCodes,
              pe: [formData?.formInputs?.period],
              ou: [selecteOrgUnit?.code],
              inputIdScheme: "code",
              outputIdScheme: "code",
            },
          ],
        },
        target: {
          type: formData?.type,
          api: {
            url: formData?.formInputs?.url,
            username: formData?.formInputs?.username,
            password: formData?.formInputs?.password,
          },
          request: {
            idScheme: "code",
          },
        },
      },
    };

    if (formData?.formInputs?.dexname == undefined) {
      setMessage("Name is missing");
      setHidden(false);
    } else if (formData?.formInputs?.period == undefined) {
      setMessage("Period is missing");
      setHidden(false);
    } else {
      if (formData?.type == type?.EXTERNAL) {
        // payload?.data?.target?.type == type?.EXTERNAL;
        if (formData?.formInputs?.url == "") {
          setMessage("Please enter target DHIS2 instance url");
          setHidden(false);
        } else {
          if (validater.isValidUrl(formData?.formInputs?.url) == false) {
            setMessage("The email format is invalid.");
            setHidden(false);
          } else {
            if (checkIfTokenOrBasiAuth(formData?.authType) == true) {
              if (
                formData?.formInputs?.username == undefined ||
                formData?.formInputs?.username == "" ||
                formData?.formInputs?.password == undefined ||
                formData?.formInputs?.password == ""
              ) {
                setMessage("Username or password is missing");
                setHidden(false);
              } else {
                mutation(payload);
              }
            } else {
            }
          }
        }
      } else {
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
  const updateGeneralInputValues = (data) => {
    const payload = {
      resource: "dataStore/DEX_initializer_values",
      id: data?.key,
      type: "update",
      partial: true,
      data: ({ name, type, url }) => ({
        name: data?.name,
        type: data?.type,
        url: data?.url,
      }),
    };

    // engine
    // .mutate(payload)
    // .then((res) => {
    //   console.log(res);
    //   if (res.httpStatusCode == 200) {
    //     setOpenDelete(!openDelete);
    //     setSuccessMessage(true);
    //     setHidden(false);
    //     setMessage("Data saved in the datastore successfully.");
    //   }
    // })
    // .catch((e) => {
    //   setHidden(false);
    //   setMessage(
    //     "Error occured. Either server or the inputs causes this error."
    //   );
    // });
  };
  // delete the initialized entry in datastore
  const deleteEntry = (data) => {
    setDataToDelete(data);
  };
  const deleteDataEntry = (data) => {
    let payload = {
      resource: "dataStore/DEX_initializer_values",
      id: data?.key,
      type: "delete",
    };

    engine
      .mutate(payload)
      .then((res) => {
        console.log(res);
        if (res.httpStatusCode == 200) {
          setOpenDelete(!openDelete);
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
  };
  return (
    <div>
      <div>
        <HeaderComponent />
        <br />
        <div style={{ padding: "20px" }}>
          <BrowserRouter>
            <Routes>
              <Route
                index
                element={
                  <HomePage
                    data={data}
                    styles={classes}
                    open={open}
                    setOpenUpdate={setOpenUpdate}
                    openUpdate={openUpdate}
                    setOpen={setOpen}
                    setOpenDelete={setOpenDelete}
                    openDelete={openDelete}
                    deleteEntry={deleteEntry}
                    updateEntry={updateEntry}
                  />
                }
              />
              <Route
                path="/view/:key"
                element={<ViewDataStoreById data={data} styles={classes} />}
              />
              <Route
                path="/new-request/:key"
                element={<AddNewRequests data={data} style={classes} />}
              />
              <Route path="*" element={<NoPageFound />} />
            </Routes>
          </BrowserRouter>
        </div>

        <div
          style={{
            padding: "20px",
            justifyContent: "start",
            display: "flex",
            display: "none",
          }}
        >
          <Button
            name="submit"
            primary
            onClick={initializeButton}
            value="default"
          >
            Initialise Integration
          </Button>
          <div style={{ marginLeft: "50px" }}>
            <Box>
              {isSuccessMessage == true ? (
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
        </div>
      </div>
      <NewDataInitialization
        open={open}
        setOpen={setOpen}
        styles={classes}
        setType={setType}
        formInputValues={formInputValues}
        type={type}
        setFormInputValues={setFormInputValues}
        saveGeneralInputValues={saveGeneralInputValues}
      />
      <UpdateDataInitialization
        setType={setType}
        styles={classes}
        type={type}
        setOpenUpdate={setOpenUpdate}
        openUpdate={openUpdate}
        setFormInputValues={setFormInputValues}
        formInputValues={formInputValues}
        updateGeneralInputValues={updateGeneralInputValues}
        data={dataToUpdate}
      />
      <DeleteEntry
        setOpenDelete={setOpenDelete}
        openDelete={openDelete}
        deleteDataEntry={deleteDataEntry}
        data={dataToDelete}
      />
    </div>
  );
};

export default MyApp;

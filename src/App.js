import React, { useState, useEffect } from "react";
import { DataQuery, useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import classes from "./App.module.css";
import HeaderComponent from "./components/widgets/headerComponent";
import DataDimensionsCodes from "./components/forms/dataDimensionsCodes";
import OrgUnits from "./components/forms/orgUnits";
import GeneralForm from "./components/forms/general.form";
import { AlertBar, Box, Button, CircularLoader, Divider, I } from "@dhis2/ui";
import EmailValidator from "./services/emailValidator";
import Request from "./request/[id]";

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
  visualizations:{
    resource : 'visualizations',
    params:{
      paging: false,
      field: ["id","displayName"],
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
      fields: ["id", "name", "formName", "displayName", "code"],
    },
  },
  periodTypes: {
    resource: "periodTypes",
    params: {
      fields: ["*"],
    },
  },
};

const validater = new EmailValidator();
const MyApp = () => {
  const engine = useDataEngine();
  const [formData, setFormData] = useState();
  const [selecteOrgUnit, setSelecteOrgUnit] = useState([]);
  const [selectedDataDimensionsCodes, setSelectedDataDimensionsCodes] =
    useState([]);
  const [hide, setHidden] = useState(true);
  const [message, setMessage] = useState("");

  const [isSuccessMessage, setSuccessMessage] = useState(false);
  const [type, setType] = useState({
    INTERNAL: "INTERNAL",
    EXTERNAL: "EXTERNAL",
  });
  const [authType, setAuthType] = useState({
    TOKEN: "TOKEN",
    BASICAUTH: "BASICAUTH",
  });

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
      <span
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularLoader />
      </span>
    );
  }

  return (
    <div>
      <div>
        <HeaderComponent />
        <br />
        <Divider />
        <Request data={data} style={classes} />
      </div>
    </div>
  );
};

export default MyApp;

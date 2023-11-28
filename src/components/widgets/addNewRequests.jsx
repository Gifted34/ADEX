import {
  Button,
  ButtonStrip,
  Box,
  Field,
  Input,
  AlertBar,
  Layer,
  SingleSelect,
  SingleSelectOption,
  Center,
  CircularLoader,
} from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PeriodsWidget from "../forms/periodLayout";
import DataDimensionsCodes from "../forms/dataDimensionsCodes";
import OrgUnits from "../forms/orgUnits";
import { useDataEngine, useDataMutation } from "@dhis2/app-runtime";
import CustomScheme from "./customScheme";

export default function AddNewRequests(props) {
  const engine = useDataEngine();

  const orgUnits = props?.data?.organisationUnits?.organisationUnits;
  const Visualizations = props?.data?.visualizations?.visualizations;
  const dataElements = props?.data?.dataElements?.dataElements;
  const indicators = props?.data?.indicators?.indicators;
  const attributes = props?.data?.attribute?.attributes
  const path = location.pathname.split("/").slice(-1)[0];
  const dataStorePath = `dataStore/DEX_initializer_values/${props?.id}`;
  const [selectVisualisations, setVisualisation] = useState(props?.request?.visualization);
  const [dx, setDx] = useState(props?.request?.dx);
  const [name, setName] = useState(props?.request?.name);
  const [periods, setPeriods] = useState(props?.request?.pe);
  const [orgS, setOrg] = useState(props?.request?.ou);
  const [hide, setHidden] = useState(true);
  const [errorHidden, setErrorHidden] = useState(true);
  const [errorMessage, setMessage] = useState();
  const [dataStore, setDataStore] = useState();
  const [loading, setLoading] = useState(false);
  const [Dx, setdx] = useState(props?.request?.dx);
  const [inputIDScheme, setInputIDScheme] = useState()
  const [outputIDScheme, setOutputIDScheme] = useState()

  const [orgInputSchema,setOrgInputSchema] = useState()
  const [dxInputSchema, setDxInput] = useState()

  const setData = (selected) => {
    setdx(selected);
    const visualisationId = [];
    Visualizations.map((Viz) => visualisationId.push(Viz.id));
    setVisualisation(_.intersection(selected, visualisationId));
    setDx(_.difference(selected, _.intersection(selected, visualisationId)));
  };

  const setOrgUnits = (orgs) => {
    let array = [];
    orgs?.map((object) => {
      const arr = object.split("/");
      array.push(...arr.slice(-1));
    });
    let orgCode = [];
    orgUnits.map((org) => {
      if (array.includes(org.id)) {
        orgCode.push(org.code);
      }
    });
    setOrg(orgCode);
  };

  // //fetchig data store values using the datastore key passed in the locations path
  const fetchData = async () => {
    const query = {
      dataStore: {
        resource: dataStorePath,
        params: {
          fields: ["."],
        },
      },
    };
    try {
      try {
        const res = await engine.query(query);
        setDataStore(res.dataStore);
      } catch (e) {}
    } catch (e) {}
  };
  //pushing data to dataStore
  const send = async (data) => {
    const myMutation = {
      resource: dataStorePath,
      type: "update",
      data: data,
    };
    setLoading(false);
    await engine
      .mutate(myMutation)
      .then((res) => {
        if (res.httpStatusCode == 200) {
          setLoading(false);
          setHidden(false);
        }
      })
      .catch((e) => {
        setMessage(e);
        setLoading(false);
        setErrorHidden(false);
      });
  };
  //updating the dataStore object in dataStore
  const saveData = () => {
    setLoading(true);
    if (name === undefined || name === null) {
      setLoading(false);
      setMessage("Request name is required");
      setErrorHidden(false);
    } else if (Dx === undefined || Dx?.length < 1) {
      setLoading(false);
      setMessage("No data elements,indicators,or visualisations selected");
      setErrorHidden(false);
    } else if (orgS === undefined || orgS?.length < 1) {
      setLoading(false);
      setMessage("No organisation units selected");
      setErrorHidden(false);
    } else if (periods === undefined || periods?.length < 1) {
      setLoading(false);
      setMessage("No periods selected");
      setErrorHidden(false);
    } else {
      if (dataStore?.source?.requests === undefined) {
        var dStore = {
          createdAt: dataStore.createdAt,
          dexname: dataStore.dexname,
          type: dataStore.type,
          url: dataStore.url,
          source: {
            requests: [
              {
                name: name,
                visualization: selectVisualisations,
                dx: dx,
                pe: periods,
                ou: orgS,
                inputIdScheme: "code",
                outputIdScheme: "code",
              },
            ],
          },
        };
        send(dStore);
      } else {
        let arr = dataStore?.source?.requests?.filter(req => req.name !== name)
        arr.push({
          name: name,
          visualization: selectVisualisations,
          dx: dx,
          pe: periods,
          ou: orgS,
          inputIdScheme: "code",
          outputIdScheme: "code",
        });
        send({
          createdAt: dataStore.createdAt,
          dexname: dataStore.dexname,
          type: dataStore.type,
          url: dataStore.url,
          source: { requests: arr },
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={props?.style?.padding}>
      {loading && (
        <Layer translucent>
          <Center>
            <CircularLoader large />
          </Center>
        </Layer>
      )}
      <Box className={props?.style?.display}>
        <Box className={props?.style?.padding}>
          <OrgUnits orgUnits={orgUnits} setOrg={setOrgUnits} selected={props?.request?.ou} />
        </Box>
        <div>
          <Box className={`${props?.style?.width} ${props?.style?.padding}`}>
            <Field label="Name">
              <Input
                onChange={(e) => {
                  setName(e.value);
                }}
                placeholder="Enter request name"
                value={name}
              />
            </Field>
            <br/>
            <Field label = "Input IDScheme">
              <SingleSelect selected={inputIDScheme} className='select' onChange={
                (e)=> setInputIDScheme(e.selected)
              } prefix="Select input Id scheme">
                <SingleSelectOption label="UID" value="UID"/>
                <SingleSelectOption label="CODE" value="CODE"/>
              </SingleSelect>
              <br/>
            </Field>
            <Field label="Output IDScheme">
            <SingleSelect selected={outputIDScheme} className='select' onChange={
                (e)=> setOutputIDScheme(e.selected)
              } prefix="Select output Id scheme">
                <SingleSelectOption label="UID" value="UID"/>
                <SingleSelectOption label="CODE" value="CODE"/>
              </SingleSelect>
            </Field>
            <br/>
            <div className={`${props?.style?.padding}`}>
              <CustomScheme style={props?.style} attributes={attributes} setOrgInputSchema={setOrgInputSchema} setDxInput={setDxInput}/>
            </div>
          </Box>
          <div className={props?.style?.display}>
            <Box className={props?.style?.padding}>
              <PeriodsWidget setPeriods={setPeriods} selected={props?.request?.pe} />
            </Box>
            <Box className={props?.style?.padding}>
              <DataDimensionsCodes
                setData={setData}
                selectedDx={props?.request?.dx}
                selectedVis={props?.request?.visualization}
                dataElements={dataElements}
                indicators={indicators}
                visualizations={Visualizations}
              />
            </Box>
          </div>
          <div className={props?.style?.padding}>
            <ButtonStrip end>
              <Button destructive large onClick={() => props?.setPath("Home")}>
                Cancel
              </Button>
              <Button primary large onClick={() => saveData()}>
                Save
              </Button>
            </ButtonStrip>
            <AlertBar
              warning
              hidden={errorHidden}
              onHidden={() => setErrorHidden(true)}
              duration={2000}
            >
              {errorMessage}
            </AlertBar>
            <AlertBar
              success
              hidden={hide}
              duration={2000}
              onHidden={() => {
                setHidden(true);
                setTimeout(() => props?.setPath("Home"), 1000);
              }}
            >
              Innitialisation saved succesifuly
            </AlertBar>
          </div>
        </div>
      </Box>
    </div>
  );
}

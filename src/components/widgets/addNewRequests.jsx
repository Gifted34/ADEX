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
  const attributes = props?.data?.attribute?.attributes;
  const path = location.pathname.split("/").slice(-1)[0];
  const dataStorePath = `dataStore/DEX_initializer_values/${props?.id}`;
  const [selectVisualisations, setVisualisation] = useState(
    props?.request?.visualization
  );
  const [dx, setDx] = useState(props?.request?.dx);
  const [name, setName] = useState(props?.request?.name);
  const [periods, setPeriods] = useState(props?.request?.pe);
  const [orgS, setOrg] = useState(props?.request?.ou);
  const [hide, setHidden] = useState(true);
  const [errorHidden, setErrorHidden] = useState(true);
  const [errorMessage, setMessage] = useState();
  const [dxattributes,setAttributes] = useState()
  const [dataStore, setDataStore] = useState();
  const [loading, setLoading] = useState(false);
  const [Dx, setdx] = useState(props?.request?.dx);
  const [selectedAttr,setSelected] = useState()
  const [inputIDScheme, setInputIDScheme] = useState(props?.request?.inputIdScheme);
  const [outputIDScheme, setOutputIDScheme] = useState();

  const [orgInputScheme,setOrgInputSchema] = useState(props?.orgUnitIdScheme)
  const [dxInputScheme, setDxInput] = useState(props?.dataElementIdScheme)

  const [orgOutputScheme, setOrgOutputScheme] = useState(props?.outputOrgUnitIdScheme)
  const [dxOutputScheme, setDxOutputScheme] = useState(props?.outputDataElementIdScheme)

  const setData = (selected) => {
    setdx(selected);
      };

  const orgPath = () => {
    const path = []
    const orgss = orgUnits?.filter(org => orgS?.includes(org.id) || orgS?.includes(org.code))
    orgss.map(or => path.push(or.path))
    return path
  }

  const setOrgUnits = (orgs) => {
    let array = [];
    orgs?.map((object) => {
      const arr = object.split("/");
      array.push(...arr.slice(-1));
    });    
    setOrg(array);
  };

  //set Data elements and indicators based on input scheme whether UID or Code
  const returnDx = () => {
    if(inputIDScheme === "CODE" || dxInputScheme === "CODE"){
      const indicator = indicators?.filter(indicator => Dx.includes(indicator.id))
      const dataElement = dataElements?.filter(dataElement => Dx.includes(dataElement.id))
      const arr = [...indicator,...dataElement]
      const newArr = []
      arr.map(ele => newArr.push(ele.code))
      return newArr
            
    }else{
      return (Dx) 
    }    
  }

  //set Orgunits based on input scheme whether UID or Code
  const Orgs = () => {
    if(orgInputScheme === "CODE" || inputIDScheme === "CODE"){
      const orgUn = orgUnits?.filter(orgUnit => orgS.includes(orgUnit.id))    
      const newArr = []
      orgUn.map(org => newArr.push(org.code))
      return newArr
      }else{
        return orgS
      }      
    }
  
  //get dx from codes or ids for editing
  const getDX = () => {
    const dx = [...dataElements,...indicators]
    const sele =  dx?.filter(dx =>  props?.request?.dx?.includes(dx.id) || props?.request?.dx?.includes(dx.code))
    const arr = []
    sele.map(sel => arr.push(sel.id))
    return arr
  }

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
        console.log(res)
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
    }else if(inputIDScheme === undefined || outputIDScheme === undefined){
      setLoading(false);
      setMessage("Specify input or output scheme");
      setErrorHidden(false);
    } 
    else if (Dx === undefined || Dx?.length < 1) {
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
      console.log(Orgs().length)
      if(returnDx().length === 0){
        setLoading(false);
        setMessage("Selected data elements and indicators do not have codes");
        setErrorHidden(false);
      }else if(Orgs().length === 0){
        setLoading(false);
        setMessage("Selected Organization units do not have codes");
        setErrorHidden(false);
      }else{
        console.log(dataStore)
      if (dataStore?.source?.requests === undefined) {
        let outp = selectedAttr !== undefined ? `${outputIDScheme}:${selectedAttr}` : outputIDScheme
        var dStore = {...dataStore,
          source: {
            requests: [
              {
                name: name,
                dx: returnDx(),
                pe: periods,
                ou: Orgs(),
                inputIdScheme: inputIDScheme,
                outputIdScheme: outp,
                orgUnitIdScheme : orgInputScheme,
                dataElementIdScheme :dxInputScheme,
                outputDataElementIdScheme : dxOutputScheme,
                outputOrgUnitIdScheme : orgOutputScheme
              },
            ],
          },
        };
        console.log(dStore)
        //send(dStore);
      } else {
        let outp = selectedAttr !== undefined ? `${outputIDScheme}:${selectedAttr}` : outputIDScheme
        let arr = dataStore?.source?.requests?.filter(
          (req) => req.name !== name
        );
        arr.push({
          name: name,
          dx: returnDx(),
          pe: periods,
          ou: Orgs(),
          inputIdScheme: inputIDScheme,
          outputIdScheme: outp,
          orgUnitIdScheme : orgInputScheme,
          dataElementIdScheme :dxInputScheme,
          outputDataElementIdScheme : dxOutputScheme,
          outputOrgUnitIdScheme : orgOutputScheme
        });
        send({...dataStore,source: { requests: arr },
        });
      }
    }
    }
  };

  useEffect(() => {
    fetchData();
    setAttributes(attributes?.filter( attr => attr?.objectTypes?.includes('DATA_ELEMENT') || attr?.objectTypes?.includes('INDICATOR')))
    if(props?.request?.outputIdScheme?.includes('attribute')){
      const strings = props?.request?.outputIdScheme?.split(':')
      setOutputIDScheme(strings[0])
      setSelected(strings[1])
    }else{
      setOutputIDScheme(props?.request?.outputIdScheme)
    }
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
          <OrgUnits
            orgUnits={orgUnits}
            setOrg={setOrgUnits}
            selected={orgPath()}
          />
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
              } placeholder="Select input Id scheme">
                <SingleSelectOption label="UID" value="UID"/>
                <SingleSelectOption label="CODE" value="CODE"/>
              </SingleSelect>
              <br/>
            </Field>
            <Field label="Output IDScheme">
            <SingleSelect selected={outputIDScheme === 'attribute'? outputIDScheme.split(':')[0] : outputIDScheme } className='select' onChange={
                (e)=> setOutputIDScheme(e.selected)
              } placeholder="Select output Id scheme">
                <SingleSelectOption label="UID" value="UID"/>
                <SingleSelectOption label="CODE" value="CODE"/>
                <SingleSelectOption label="attribute" value="attribute"/>
              </SingleSelect>
            </Field>
            <br/>
            {outputIDScheme?.includes('attribute') && 
            <Field label="Output IDScheme">
            <SingleSelect selected={selectedAttr}  className='select' onChange={
                (e)=>{ 
                  setSelected(e.selected)
                }
              } placeholder="Select output Id scheme">
                {dxattributes?.map(attr => <SingleSelectOption label={attr.displayName} value={attr.id}/>)}
              </SingleSelect>
            </Field>}
            <div className={`${props?.style?.padding}`}>
              <CustomScheme style={props?.style} 
                attributes={attributes}
                dataElementIdScheme={props?.request?.dataElementIdScheme}
                orgUnitIdScheme = {props?.request?.orgUnitIdScheme}
                outputDataElementIdScheme={props?.request?.outputDataElementIdScheme}
                outputOrgUnitIdScheme={props?.request?.outputOrgUnitIdScheme}
                setOrgInputSchema={setOrgInputSchema} 
                setDxInput={setDxInput}
                setOrgOutputScheme={setOrgOutputScheme}
                setDxOutputScheme={setDxOutputScheme}
                />
            </div>
          </Box>
          <div className={props?.style?.display}>
            <Box className={props?.style?.padding}>
              <PeriodsWidget
                setPeriods={setPeriods}
                selected={props?.request?.pe}
              />
            </Box>
            <Box className={props?.style?.padding}>
              <DataDimensionsCodes
                setData={setData}
                selectedDx={getDX()}
                selectedVis={props?.request?.visualization}
                dataElements={dataElements}
                indicators={indicators}
                // visualizations={Visualizations}
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
              Initialisation saved succesifuly
            </AlertBar>
          </div>
        </div>
      </Box>
    </div>
  );
}

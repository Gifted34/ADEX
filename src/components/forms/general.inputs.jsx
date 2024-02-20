import {
  Box,
  Button,
  Field,
  Input,
  SingleSelect,
  SingleSelectOption,
} from "@dhis2/ui";
import React, { useState, useEffect } from "react";

export default function GeneralInputs(props) {
  const [orgUnitIdScheme,setorgUnitIdScheme] = useState()
  const [dataElementIdScheme,setdataElementIdScheme] = useState()
  const [idScheme,setIdScheme] = useState()

  const [orgAttributes,setOrgAttributes] = useState()
  const [dxAttributes,setdxAttributes] = useState()
  const inputsHandler = (e) => {
    props?.setFormInputValues({
      ...props?.formInputValues,
      [e?.name]: e?.value,
    });
  };

  useEffect(()=>{

    console.log('general')
    console.log(props)
  },[])


  return (
    <div
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Field label="General Details">
        <div style={{ width: "100%" }}>
          <Field label = 'Data exchange name'>
          <Input
            name="dexname"
            type="text"
            onChange={inputsHandler}
            placeholder="Name of aggregate data exchange. Unique."
            className={props?.styles?.marginBottom}
          />
          </Field>
          <Box className={props?.styles?.marginBottom}>
          <Field label = 'Data exchange id scheme'>
            <SingleSelect
              className="select"
              placeholder="Select request id scheme"
              onChange={(e) => {
                setIdScheme(e.selected);
                inputsHandler({name :'idScheme',value : e.selected})
              }}
              selected={idScheme}
            >
              <SingleSelectOption label="UID" value="UID" />
              <SingleSelectOption label="Code" value="code" />
            </SingleSelect>
            </Field>
          </Box>
          <Box className={props?.styles?.marginBottom}>
          <Field label = 'Exchange type'>
            <SingleSelect
              className="select"
              onChange={(e) => {
                props?.setType(e.selected);
              }}
              selected={props?.type}
            >
              <SingleSelectOption label="Internal" value="INTERNAL" />
              <SingleSelectOption label="External" value="EXTERNAL" />
            </SingleSelect>
            </Field>
          </Box>          
          {props?.type == "EXTERNAL" && (
            <Field label = 'Destination URL'>
            <Input
              name="url"
              type="text"
              onChange={inputsHandler}
              className={props?.styles?.marginBottom}
              placeholder="Base URL of target DHIS 2 instance, do not include the /api part."
            />
            </Field>
          )}
          <Box className={props?.styles?.marginBottom}>
          <Field label = 'Data element id scheme'>
            <SingleSelect
              className="select"
              name='dataElementIdScheme'
              placeholder="Select request dataElementIdScheme"
              onChange={(e) => {
                setdataElementIdScheme(e.selected)
                if(e.selected !== 'attribute'){
                  inputsHandler({name :'dataElementIdScheme',value : e.selected})
                }
              }}
              selected={dataElementIdScheme}
            >
              <SingleSelectOption label="UID" value="UID" />
              <SingleSelectOption label="Code" value="code" />
              <SingleSelectOption label="Attribute" value="attribute" />
            </SingleSelect>
            </Field>
          </Box>
          {dataElementIdScheme === 'attribute' &&
          <Box className={props?.styles?.marginBottom}>
            <Field label = 'Data element id scheme attribute'>
            <SingleSelect
            className="select"
            placeholder="select request dataElementIdScheme attribute"
            onChange={(e)=>{
              setdxAttributes(e.selected)
              inputsHandler({name :'dataElementIdScheme',value : `attribute:${e.selected}`})
            }}
              selected={dxAttributes}>
              {props?.attributes?.filter(att => att?.objectTypes.includes('DATA_ELEMENT') ||att?.objectTypes.includes('INDICATOR'))
              .map(att=> <SingleSelectOption label={att.displayName} value={att.id} />)}</SingleSelect>
              </Field></Box>}
          <Box className={props?.styles?.marginBottom}>
          <Field label = 'Organisation unit id scheme'>
            <SingleSelect
              className="select"
              placeholder="Select request orgUnitIdScheme"
              onChange={(e) => {
                setorgUnitIdScheme(e.selected)
                if(e.selected !== 'attribute'){
                  inputsHandler({name:'orgUnitIdScheme',value : e.selected})
                }
              }}
              selected={orgUnitIdScheme}
            >
              <SingleSelectOption label="UID" value="UID" />
              <SingleSelectOption label="Code" value="code" />
              <SingleSelectOption label="Attribute" value="attribute" />
            </SingleSelect>
            </Field>
          </Box>
          {orgUnitIdScheme === 'attribute' &&
          <Box className={props?.styles?.marginBottom}>
            <Field label = 'Organisation unit id scheme attribute'>
            <SingleSelect
            className="select"
            placeholder="select request orgUnitIdScheme attribute"
            onChange={(e)=>{
              setOrgAttributes(e.selected)
              inputsHandler({name :'orgUnitIdScheme',value : `attribute:${e.selected}`})}
            }
              selected={orgAttributes}>
              {props?.attributes?.filter(att => att?.objectTypes.includes('ORGANISATION_UNIT'))
              .map(att=> <SingleSelectOption label={att.displayName} value={att.id} />)}</SingleSelect>
              </Field></Box>}
        </div>
      </Field>
    </div>
  );
}

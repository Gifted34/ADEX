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


  return (
    <div
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Field label="General Details">
        <div style={{ width: "100%" }}>
          <Input
            name="dexname"
            type="text"
            onChange={inputsHandler}
            placeholder="Name of aggregate data exchange. Unique."
            className={props?.styles?.marginBottom}
          />
          <Box className={props?.styles?.marginBottom}>
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
          </Box>
          <Box className={props?.styles?.marginBottom}>
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
          </Box>          
          {props?.type == "EXTERNAL" && (
            <Input
              name="url"
              type="text"
              onChange={inputsHandler}
              className={props?.styles?.marginBottom}
              placeholder="Base URL of target DHIS 2 instance, do not include the /api part."
            />
          )}
          <Box className={props?.styles?.marginBottom}>
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
          </Box>
          {dataElementIdScheme === 'attribute' &&
          <Box className={props?.styles?.marginBottom}>
            <SingleSelect
            className="select"
            placeholder="select request dataElementIdScheme attribute"
            onChange={(e)=>{
              setdxAttributes(e.selected)
              inputsHandler({name :'dataElementIdScheme',value : `attribute:${e.selected}`})
            }}
              selected={dxAttributes}>
              {props?.attributes?.filter(att => att?.objectTypes.includes('DATA_ELEMENT') ||att?.objectTypes.includes('INDICATOR'))
              .map(att=> <SingleSelectOption label={att.displayName} value={att.id} />)}</SingleSelect></Box>}
          <Box className={props?.styles?.marginBottom}>
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
          </Box>
          {orgUnitIdScheme === 'attribute' &&
          <Box className={props?.styles?.marginBottom}>
            <SingleSelect
            className="select"
            placeholder="select request orgUnitIdScheme attribute"
            onChange={(e)=>{
              setOrgAttributes(e.selected)
              inputsHandler({name :'orgUnitIdScheme',value : `attribute:${e.selected}`})}
            }
              selected={orgAttributes}>
              {props?.attributes?.filter(att => att?.objectTypes.includes('ORGANISATION_UNIT'))
              .map(att=> <SingleSelectOption label={att.displayName} value={att.id} />)}</SingleSelect></Box>}
        </div>
      </Field>
    </div>
  );
}

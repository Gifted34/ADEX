import {
  AlertBar,
  Box,
  Button,
  ButtonStrip,
  Field,
  Input,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  SingleSelect,
  SingleSelectOption,
} from "@dhis2/ui";
import React, { useEffect, useState } from "react";

export default function UpdateDataInitialization(props) {
  const [data, setData] = useState({
    dexname: "",
    url: "",
  });
  const [selected,setSelected] = useState()
  const [request,setRequest] = useState()

  const [orgUnitIdScheme,setorgUnitIdScheme] = useState()
  const [dataElementIdScheme,setdataElementIdScheme] = useState()

  const [orgAttributes,setOrgAttributes] = useState()
  const [dxAttributes,setdxAttributes] = useState()

  const [message,setMessage] = useState()
  const [open,setOpen] = useState(false)
  const update = (e) => {
    setData({...data,request: request})
    if(orgUnitIdScheme === 'attribute' && orgAttributes === undefined){
      setMessage('Please select the organisation input attribute')
      setOpen(true)
    }else if(dataElementIdScheme === 'attribute' && dxAttributes === undefined){
      setMessage('Please select the data input attribute')
      setOpen(true)
    }else{
    props?.updateGeneralInputValues({ data: props?.data, values: {...data,request: request} });
    }
  };

  const initialisingState = () => {
    if(request?.dataElementIdScheme !== 'UID' || request?.dataElementIdScheme !== 'code'){
      const strings = request?.dataElementIdScheme?.split(':')
      if(strings?.length > 0){
      setdataElementIdScheme(strings[0])
      setdxAttributes(strings[1])
      } 
    }else{
      setdataElementIdScheme(request?.dataElementIdScheme)
    }
    if(request?.orgUnitIdScheme !== 'UID' || request?.orgUnitIdScheme !== 'code'){
      const strings = request?.orgUnitIdScheme?.split(':')
      if(strings?.length > 0){
      setorgUnitIdScheme (strings[0])
      setOrgAttributes (strings[1])
      } 
    }else{
      setorgUnitIdScheme (request?.orgUnitIdScheme)
    }
  }

  useEffect(() => {
    setRequest(props?.data?.value?.request)
    setData(props?.data?.value)
    setSelected(props?.data?.value?.request?.idScheme)
    initialisingState()
  }, [props]);

  useEffect(()=>{
    initialisingState()
    console.log(request)
  },[request])

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {props?.openUpdate && (
        <div className="" style={{ marginTop: "10px" }}>
          <Modal large position="middle">
            <ModalTitle>Update Initialization</ModalTitle>
            <ModalContent>
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Field label="General Details">
                  <div style={{ width: "100%" }}>
                    <Input
                      name="dexname"
                      type="text"
                      onChange={(e) => {
                        setData({ ...data, dexname: e.value });
                      }}
                      className={props?.styles?.marginBottom}
                      value={data?.dexname}
                    />
                    <Box className={props?.styles?.marginBottom}>
                    <SingleSelect
                      className="select"
                      placeholder="Select request id scheme"
                      onChange={(e) => {
                        setSelected(e.selected)
                        request.idScheme = e.selected
                      }}
                      selected={selected}
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
                        selected={props?.data?.value?.type}
                      >
                        <SingleSelectOption label="Internal" value="INTERNAL" />
                        <SingleSelectOption label="External" value="EXTERNAL" />
                      </SingleSelect>
                    </Box>
                    {props?.type == "EXTERNAL" && (
                      <Input
                        name="url"
                        type="text"
                        onChange={(e) => {
                          setData({ ...data, url: e.value });
                        }}
                        value={data?.url}
                        className={props?.styles?.marginBottom}
                        // placeholder={props?.data?.value?.url}
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
                  request.dataElementIdScheme = e.selected
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
              request.dataElementIdScheme = `attribute:${e.selected}`
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
                  request.orgUnitIdScheme =  e.selected
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
              request.orgUnitIdScheme = `attribute:${e.selected}`
            }
            }
              selected={orgAttributes}>
              {props?.attributes?.filter(att => att?.objectTypes.includes('ORGANISATION_UNIT'))
              .map(att=> <SingleSelectOption label={att.displayName} value={att.id} />)}</SingleSelect></Box>}
                  </div>
                </Field>
              </div>
            </ModalContent>
            <ModalActions>
              <ButtonStrip end>
                <Button
                  onClick={() => {
                    props?.setOpenUpdate(false);
                  }}
                  destructive
                >
                  Cancel
                </Button>
                <Button onClick={update} primary>
                  Update Initialization
                </Button>
              </ButtonStrip>
            </ModalActions>
          </Modal>
        </div>
      )}
      {open &&
      <div className={props?.styles?.alertBtm}>
        <AlertBar
          warning
          duration={2000}
          onHidden={(e)=> setOpen(false)}>
            {message}
          </AlertBar>
        </div>}
    </div>
  );
}

import { ButtonStrip,Button, Modal, ModalTitle, ModalActions, ModalContent, Box, TabBar, Tab, Field, SingleSelect, SingleSelectOption, AlertBar, Layer } from '@dhis2/ui';
import React,{useState,useEffect} from 'react';

export default function CustomScheme(props) {
    const [open, setOpen] = useState(false)
    const [layerOpen, setLayer] = useState(false)

    const [tabSelected,setTab] = useState(1)
    //input schemee
    const [dxinIDScheme, setDxInScheme] = useState()
    const [orginIDScheme,setOrgIn] = useState()

    // output data element and org scheme
    const [dxoutIDScheme, setDxoutScheme] = useState()
    const [orgoutIDScheme,setOrgOut] = useState()

    //Input org and data element attribute
    const [orgAttribute, setOrgAt] = useState()
    const [dxAttribute, setDx] = useState()

    //output org and data element attributes
    const [dxOutAttr, setDxOutAt] = useState()
    const [orgOutAtr, setOrgOutAt] = useState()
    
    //attributes from DHIS2 instance
    const [orgAttr,setOrgAttr] = useState()
    const [dxAttr, setDxAttr] = useState()


    const [message,setMessage] = useState()

    const preSetValues = () =>{
        if(props?.dataElementIdScheme !== undefined){
        if(props?.dataElementIdScheme !== 'CODE' || props?.dataElementIdScheme !== 'UID'){
            const arr = props?.dataElementIdScheme?.split(":")
            setDxInScheme(arr[0])
            setDx(arr[1])
        }else{
            setDxInScheme(props?.dataElementIdScheme) 
        }
        }
        if(props?.orgUnitIdScheme !== undefined){
        if(props?.orgUnitIdScheme !== 'CODE' || props?.orgUnitIdScheme !== 'UID'){
            const arr = props?.orgUnitIdScheme?.split(":")
            setOrgIn(arr[0])
            setOrgAt(arr[1])
        }else{
            setOrgIn(props?.orgUnitIdScheme) 
        }
        }
        if(props?.outputDataElementIdScheme !== undefined){           
        if(props?.outputDataElementIdScheme !== 'CODE' || props?.outputDataElementIdScheme        !== 'UID'){
            const arr = props?.outputDataElementIdScheme?.split(":")
            setDxoutScheme(arr[0])
            setDxOutAt(arr[1])
        }else{
            setDxoutScheme(props?.outputDataElementIdScheme) 
        }
        }
        if(props?.outputOrgUnitIdScheme !== undefined){        
        if(props?.outputOrgUnitIdScheme !== 'CODE' || props?.outputOrgUnitIdScheme        !== 'UID'){
            const arr = props?.outputOrgUnitIdScheme?.split(":")
            setOrgOut(arr[0])
            setOrgOutAt(arr[1])
        }else{
            setOrgOut(props?.outputOrgUnitIdScheme) 
        }
    }
    }

    
    useEffect(()=>{
        setOrgAttr(props?.attributes?.filter(attr => attr?.objectTypes?.includes('ORGANISATION_UNIT')))
        setDxAttr(props?.attributes?.filter(attr => attr?.objectTypes?.includes('DATA_ELEMENT') || attr?.objectTypes?.includes('INDICATOR') ))
        console.log(props)
        preSetValues()
    },[])

    const saveScheme = () => {
        if((dxinIDScheme === 'attribute' && dxAttribute === undefined) || (dxoutIDScheme === 'attribute' && dxOutAttr === undefined)){
            setMessage("Data element attribute is missing")
            setLayer(true)
        }else if((orginIDScheme === 'attribute' && orgAttribute === undefined) || (orgoutIDScheme === 'attribute' && orgOutAtr === undefined)){
            setMessage("Organisation unit attribut is missing")
            setLayer(true)
        }else{
            if(dxinIDScheme === 'attribute'){
                props?.setDxInput(`attribute:${dxAttribute}`)
            }else{
                props?.setDxInput(dxinIDScheme)
            }
            if(orginIDScheme === 'attribute'){
                props?.setOrgInputSchema(`attribute:${orgAttribute}`)
            }else{
                props?.setOrgInputSchema(orginIDScheme)
            }
            if(dxoutIDScheme === 'attribute'){
                props?.setDxOutputScheme(`attribute:${dxOutAttr}`)
            }else{
                props?.setDxOutputScheme(dxoutIDScheme)
            }
            if(orgoutIDScheme === 'attribute'){
                props?.setOrgOutputScheme(`attribute:${orgOutAtr}`)
            }else{
                props?.setOrgOutputScheme(orgoutIDScheme)
            }
            setOpen(false)
        }
    }

    return (
        <>
         {open && (
            <Modal position='middle'>
                <ModalTitle>
                    Custom Input/OutPut Scheme
                </ModalTitle>
                 <ModalContent>
                    <Box>
                    <TabBar>
                        <Tab onClick={()=> setTab(1)} selected={tabSelected === 1}>
                            Input Scheme
                        </Tab>
                        <Tab onClick={()=> setTab(2)} selected={tabSelected === 2}>
                            Output Scheme
                        </Tab>
                    </TabBar>
                    {tabSelected === 1 ?
                             <div className={`${props?.style?.padding}`}>
                             <Box> 
                                 
                                 <Field label='dataElementIDScheme'>
                                     <SingleSelect className='select' selected={dxinIDScheme} onChange={(e) => setDxInScheme(e.selected)}> 
                                         <SingleSelectOption label="UID" value="UID"/>
                                         <SingleSelectOption label="CODE" value="CODE"/>
                                         <SingleSelectOption label="attribute" value="attribute"/>
                                     </SingleSelect>
                                 </Field>
                                 <br/>
                                 {dxinIDScheme === 'attribute' && <Field label='data element attribute'>
                                    <SingleSelect className='select' selected={dxAttribute} onChange={e => setDx(e.selected)} empty="No data element attributes at present" >
                                      {dxAttr.map(dx => <SingleSelectOption label={dx.displayName} value={dx.id} />)}  
                                    </SingleSelect>
                                 </Field>}
                                 <br/>
                                 <Field label='orgUnitIDScheme'>
                                 <SingleSelect className='select' selected={orginIDScheme}  onChange={(e) => setOrgIn(e.selected)}>
                                         <SingleSelectOption label="UID" value="UID"/>
                                         <SingleSelectOption label="CODE" value="CODE"/>
                                         <SingleSelectOption label="attribute" value="attribute"/>
                                     </SingleSelect>
                                 </Field>
                                 <br/>
                                 {orginIDScheme === 'attribute' && <Field label='Organisation unit Input attribute scheme'>
                                 <SingleSelect className='select' selected={orgAttribute} onChange={e => setOrgAt(e.selected)} empty="No org unit attributes at present"     >
                                 {orgAttr.map(org => <SingleSelectOption label={org.displayName} value={org.id} />)}
                                    </SingleSelect>   
                                 </Field>}
                             </Box>
                         </div>    
                         : <div className={`${props?.style?.padding}`}>
                         <Box> 
                             
                             <Field label='outputDataElementIdScheme'>
                                 <SingleSelect className='select' selected={dxoutIDScheme} onChange={(e) => setDxoutScheme(e.selected)}> 
                                     <SingleSelectOption label="UID" value="UID"/>
                                     <SingleSelectOption label="CODE" value="CODE"/>
                                     <SingleSelectOption label="attribute" value="attribute"/>
                                 </SingleSelect>
                             </Field>
                             <br/>
                             {dxoutIDScheme === 'attribute' && <Field label='data element attribute'>
                                <SingleSelect className='select' selected={dxOutAttr} onChange={e => setDxOutAt(e.selected)} empty="No data element attributes at present" >
                                  {dxAttr.map(dx => <SingleSelectOption label={dx.displayName} value={dx.id} />)}  
                                </SingleSelect>
                             </Field>}
                             <br/>
                             <Field label='outputOrgUnitIdScheme'>
                             <SingleSelect className='select' selected={orgoutIDScheme}  onChange={(e) => setOrgOut(e.selected)}>
                                     <SingleSelectOption label="UID" value="UID"/>
                                     <SingleSelectOption label="CODE" value="CODE"/>
                                     <SingleSelectOption label="attribute" value="attribute"/>
                                 </SingleSelect>
                             </Field>
                             <br/>
                             {orgoutIDScheme === 'attribute' && <Field label='Organisation unit Input attribute scheme'>
                             <SingleSelect className='select' selected={orgOutAtr} onChange={e => setOrgOutAt(e.selected)} empty="No org unit attributes at present"     >
                             {orgAttr.map(org => <SingleSelectOption label={org.displayName} value={org.id} />)}
                                </SingleSelect>   
                             </Field>}
                         </Box>
                     </div>}
                    </Box>
                </ModalContent>
                <ModalActions>
                    <ButtonStrip end>
                        <Button destructive onClick={(e)=> setOpen(false)}>
                            Close
                        </Button>
                        <Button primary onClick={() =>saveScheme()}>
                            Save
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )} 
         <ButtonStrip end> 
         
            <Button onClick={() => setOpen(true)}>
                Custom Scheme
            </Button>
        </ButtonStrip>
        {layerOpen && <Layer>
        <div className={`${props.style.alertBtm}`}>
            <AlertBar warning duration={2000} onHidden={()=>{
                setLayer(false)
            }}>
                {message}
            </AlertBar>
        </div>
        </Layer>}
        </>
    );
}

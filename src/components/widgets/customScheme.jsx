import { ButtonStrip,Button, Modal, ModalTitle, ModalActions, ModalContent, Box, TabBar, Tab, Field, SingleSelect, SingleSelectOption } from '@dhis2/ui';
import React,{useState,useEffect} from 'react';

export default function CustomScheme(props) {
    const [open, setOpen] = useState(false)
    const [tabSelected,setTab] = useState(1)
    const [dxinIDScheme, setDxInScheme] = useState()
    const [orginIDScheme,setOrgIn] = useState()
    const [dxoutIDScheme, setDxoutScheme] = useState()
    const [orgoutIDScheme,setOrgOut] = useState()
    
    const [orgAttr,setOrgAttr] = useState()
    const [dxAttr, setDxAttr] = useState()
    const [orgAttribute, setOrgAt] = useState()
    const [dxAttribute, setDx] = useState()

    
    useEffect(()=>{
        setOrgAttr(props?.attributes?.filter(attr => attr?.objectTypes?.includes('ORGANISATION_UNIT')))
        setDxAttr(props?.attributes?.filter(attr => attr?.objectTypes?.includes('DATA_ELEMENT') || attr?.objectTypes?.includes('INDICATOR') ))
    },[])

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
                                <SingleSelect className='select' selected={dxAttribute} onChange={e => setDx(e.selected)} empty="No data element attributes at present" >
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
                             <SingleSelect className='select' selected={orgAttribute} onChange={e => setOrgAt(e.selected)} empty="No org unit attributes at present"     >
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
                        <Button primary onClick={(e) =>setOpen(false)}>
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
        </>
    );
}

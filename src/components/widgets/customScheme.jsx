import { Box, Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle, TabBar,Tab,Box, Field, SingleSelect, SingleSelectOption } from '@dhis2/ui';
import { set } from 'lodash';
import React,{useState} from 'react';

function CustomScheme(props) {
    const [open, setOpen] = useState(false)
    const [tabSelected,setTab] = useState(1)

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
                                    <div className={`${props?.style?.padding}`}>
                                    <Field label='dataElementIDScheme'>
                                        <SingleSelect className='select' onChange={(e) => console.log(e)}>
                                            <SingleSelectOption label="UID" value="UID"/>
                                            <SingleSelectOption label="CODE" value="CODE"/>
                                            <SingleSelectOption label="attribute" value="attribute"/>
                                        </SingleSelect>
                                    </Field>
                                    </div>
                                    <div className={`${props?.style?.padding}`}>
                                    <Field label='orgUnitIDScheme'>
                                    <SingleSelect className='select' onChange={(e) => console.log(e)}>
                                            <SingleSelectOption label="UID" value="UID"/>
                                            <SingleSelectOption label="CODE" value="CODE"/>
                                            <SingleSelectOption label="attribute" value="attribute"/>
                                        </SingleSelect>
                                    </Field>
                                    </div>
                                </Box>
                            </div>   
                         : <></>}
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

export default CustomScheme;
import { Box, Button, ButtonStrip, Field, Input, OrganisationUnitTree } from '@dhis2/ui';
import React,{useEffect,useState} from 'react';
import OrgUnits from '../components/forms/orgUnits';
import PeriodsWidget from '../components/forms/periodLayout';
import DataDimensionsCodes from '../components/forms/dataDimensionsCodes';

function Request(props) {
    const data = props?.data
    const orgUnits = props?.data?.organisationUnits?.organisationUnits
    const Visualizations = props?.data?.visualizations?.visualizations
    const dataElements = props?.data?.dataElements?.dataElements
    const indicators = props?.data?.indicators?.indicators
    
    
    return (
        <div className={props?.style?.padding}>
            <Box className={props?.style?.display}>
                <Box className={props?.style?.padding}>
                       <OrgUnits orgUnits={orgUnits} /> 
                </Box>
                <div>
                    <Box className={`${props?.style?.width} ${props?.style?.padding}`}>
                        <Field label="Name">
                            <Input
                            onChange={(e)=>{
                                console.log(e)
                            }}
                            placeholder="Enter request name" />
                        </Field>
                    </Box>
                <div className={props?.style?.display}>
                <Box className={props?.style?.padding}>
                <PeriodsWidget />
                </Box>
                <Box className={props?.style?.padding}>
                    <DataDimensionsCodes dataElements={dataElements} indicators={indicators} visualizations={Visualizations}/>
                </Box>
                </div>
                <div className={props?.style?.padding}>
                <ButtonStrip>
                    <Button primary large>Save</Button>
                    <Button large>Cancel</Button>

                </ButtonStrip>
                </div>
                </div>
            </Box>
            
        </div>
    );
}

export default Request;
import { Button, ButtonStrip, Box,Field, Input} from "@dhis2/ui";
import React,{useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import PeriodsWidget from "../forms/periodLayout";
import DataDimensionsCodes from "../forms/dataDimensionsCodes";
import OrgUnits from "../forms/orgUnits";
export default function AddNewRequests(props) {
  const location = useLocation()
  const data = props?.data
  const orgUnits = props?.data?.organisationUnits?.organisationUnits
  const Visualizations = props?.data?.visualizations?.visualizations
  const dataElements = props?.data?.dataElements?.dataElements
  const indicators = props?.data?.indicators?.indicators
  const id = location.pathname.split('/')[2]

  useEffect(()=>{
    console.log(id)
  },[])
  
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
                <ButtonStrip end>
                    <Button primary large>Save</Button>
                    <Link to={"/"}  style={{ textDecoration: "none", color: "white" }}>
                    <Button large>Cancel</Button>
                    </Link>

                </ButtonStrip>
                </div>
                </div>
            </Box>
            
        </div>
  );
}

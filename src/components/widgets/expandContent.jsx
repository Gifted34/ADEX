import {DataTableCell,TableBody
    } from '@dhis2/ui';
import React ,{useEffect}from 'react';

function ExpandContent(props) {
    useEffect(()=>{
        console.log(props)
    },[])
    return (
        <div>
            <TableBody>
            
            <DataTableCell>
            <span style={{fontWeight: 'bold',padding:'40px',visibility:'hidden'}}> More Org units</span>
            </DataTableCell>
            <DataTableCell>
            <span style={{fontWeight: 'bold',visibility:'hidden'}}> More Org units</span>
            </DataTableCell>
            <DataTableCell>
                <div className={!props?.orgUnits ? props?.style?.visibilityHidden : ''}>
                <span style={{fontWeight: 'bold',}}> More Org units</span>
                {props?.orgUnits !== false && props?.orgUnits}
                </div>
            </DataTableCell>
            <DataTableCell>
            <div className={!props?.vis ? props?.style?.visibilityHidden : ''}>
            <span style={{fontWeight: 'bold', }}> More Visualisations</span>
                {props?.vis !== false && props?.vis}
            </div>
            </DataTableCell>
            <DataTableCell>
            <div className={!props?.dx ? props?.style?.visibilityHidden : ''}>
            <span style={{fontWeight: 'bold', padding: '20px'}}> More data elements/indicator</span>
                {props?.dx !== false && props?.dx}
                </div>
            </DataTableCell>
            
            </TableBody>
            
        </div>
    );
}

export default ExpandContent;
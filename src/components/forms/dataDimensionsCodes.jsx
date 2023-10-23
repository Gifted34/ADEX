import React, { useState, useEffect } from 'react'
import { Button, Field, Transfer } from '@dhis2/ui'

export default function DataDimensionsCodes(props) {
    const [selectedDimensions, setselectedDimensions] = useState([])

    const getDataDimensions = (e) => {
        setselectedDimensions(
            e.selected
        )
        props?.setSelectedDataDimensionsCodes(e.selected)
    }

    const defaultRenderOption = () => {
        let codes = []
        props?.indicators?.filter((indicator) => indicator.code !== undefined)?.map(indicatorWithCode => {
            codes.push({
                label: indicatorWithCode?.name,
                value: indicatorWithCode?.code
            })
        })
        props?.dataElements?.filter((dataElement) => dataElement.code !== undefined)?.map(dataElementWithCode => {
        
            codes.push({
                label: dataElementWithCode?.name,
                value: dataElementWithCode?.code
            })
        })

        return codes
    }

    const defaultFilterCallback = (e) => {
    
    }
    const onChange = (e) => {
       
    }
    return (
        <div style={{ padding: "10px", width: "700px" }}>
            <Field label="Data Dimension" className={`${props?.styles?.marginBottom}`}>

            </Field>
            <Transfer
                filterable
                height
                ="300px"
                onChange={getDataDimensions}
                options={defaultRenderOption()}
                selected={selectedDimensions}
                selectedEmptyComponent
                ={<p style={{ textAlign: 'center', fontSize: "14px", color: "gray" }}>You have not selected anything yet<br /></p>}
            />


        </div>
    )
}

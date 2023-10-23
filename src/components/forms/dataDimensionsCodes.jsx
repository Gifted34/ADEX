import React, { useState, useEffect } from 'react'
import { Button, Field, Transfer } from '@dhis2/ui'
import Dxheader from '../widgets/dxHeader'

export default function DataDimensionsCodes(props) {
    const [selectedDimensions, setselectedDimensions] = useState([])
    const [dxType, setDx] = useState()
    const [filterText, setFilterText] = useState()
    const [filterTerm, setFilter] = useState()

    useEffect(()=>{
        
    },[])
    //get selected items
    const getDataDimensions = (e) => {
        setselectedDimensions(
            e.selected
        )
    }

    //pushing data elements,indicators,and visualisation into transfer options
    const defaultRenderOption = () => {
        let codes = []
        props?.indicators?.filter((indicator) => indicator.code !== undefined)?.map(indicatorWithCode => {
            codes.push({
                label: indicatorWithCode?.name,
                value: indicatorWithCode?.code,
                type: 'Indicators'
            })
        })
        props?.dataElements?.filter((dataElement) => dataElement.code !== undefined)?.map(dataElementWithCode => {
        
            codes.push({
                label: dataElementWithCode?.name,
                value: dataElementWithCode?.code,
                type: 'Data elements'
            })
        })
        props?.visualizations?.map((visualisation)=>{
            codes.push({
                label: visualisation?.displayName,
                value: visualisation?.id,
                type : 'Visualizations'
            })
        })
        return codes
    }

    const defaultFilterCallback = (e) => {
    
    }
    //filtering options in the dx transfer
    const filterCallback = (options) =>{
        if(dxType === undefined || dxType === 'default'){
            return options
        }
         const opt = options.filter((object)=> object?.type === dxType)
         return opt.filter((object)=> object.label.includes(filterText))        
    }
    return (
        <div style={{ padding: "10px", width: "700px" }}>
            <Field label="Data Dimension" className={`${props?.styles?.marginBottom}`}>

            </Field>
            <Transfer
                leftHeader={<Dxheader setDx={setDx} setFilterText={setFilterText}/>}
                searchTerm={filterTerm}
                onFilterChange={(Value)=>{setFilter(Value)}}
                height="400px"
                onChange={getDataDimensions}
                options={defaultRenderOption()}
                filterCallback = {filterCallback}
                selected={selectedDimensions}
                filterable
                hideFilterInput
                selectedEmptyComponent
                ={<p style={{ textAlign: 'center', fontSize: "14px", color: "gray" }}>You have not selected anything yet...<br /></p>}
            />


        </div>
    )
}

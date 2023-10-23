import { Box, Field, Input, SingleSelect, SingleSelectOption } from '@dhis2/ui';
import React,{useState} from 'react';
const types = [
    {name: 'Data elements'},
    {name: 'Indicators'},
    {name : 'Visualizations'}
]
function Dxheader(props) {
    const [selected,setSelected] = useState()
    return (
        <div style={{padding :'5px'}}>
            
            <Box>
                <Field >
                    <SingleSelect
                    className='select'
                    placeholder= 'Select data dimension type'
                    onChange={(e)=>{
                        props?.setDx(e.selected)
                        setSelected(e.selected)
                    }}
                    selected={selected}>
                    <SingleSelectOption label="default" value='default' />
                    {types.map((type,index)=>{
                        return <SingleSelectOption
                                key={index}
                                label={type.name}
                                value={type.name}/>
                    })}
                    </SingleSelect>
                </Field>
            </Box>
            <Box>
                <div style={{marginTop : '10px'}}> 
                <Input name="search" 
                       onChange={(e)=>{
                        props?.setFilterText(e.value)}}
                       placeholder="Search field" />
                </div>       
            </Box>
        </div>
    );
}

export default Dxheader;
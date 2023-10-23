import React, { useState } from 'react'
import { OrganisationUnitTree, Field } from '@dhis2/ui'

export default function OrgUnits(props) {
    const [selectedOrgUnit, setSelectedOrgUnit] = useState([])
    const orgUnitLevels = (orgs) => {
        let orgsList = []
        orgs?.map(org => {
            org?.level == 1 && orgsList?.push(org?.id)
        })
        return orgsList
    }
    return (
        <div className={props?.styles?.orgHeight}>
            <Field
                label='Organization units'
            >
                <OrganisationUnitTree
                    name="Organisation Units"
                    onChange={(e) => {
                        // props?.setSelecteOrgUnit(e.selected)
                        setSelectedOrgUnit(e.selected)
                        props?.setSelecteOrgUnit(props?.orgUnits?.filter((orgUn) => orgUn?.id == e?.id)[0])
                        
                    }
                    }
                    roots={orgUnitLevels(props?.orgUnits)}
                    singleSelection
                    hideMemberCount={false}
                    onSelectClick={(orgUnit) => { }}
                    selected={selectedOrgUnit}
                />

            </Field>


        </div>
    )
}

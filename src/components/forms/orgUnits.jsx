import React, { useState } from "react";
import { OrganisationUnitTree, Field } from "@dhis2/ui";

export default function OrgUnits(props) {
  const [selectedOrgUnit, setSelectedOrgUnit] = useState([]);
  const orgUnitLevels = (orgs) => {
    let orgsList = [];
    orgs?.map((org) => {
      org?.level == 1 && orgsList?.push(org?.code);
    });
    return orgsList;
  };
  return (
    <div className={props?.styles?.orgHeight}>
      <Field label="Organization units">
        <OrganisationUnitTree
          name="Organisation Units"
          onChange={(e) => {
            props?.setOrg(e.selected);
            setSelectedOrgUnit(e.selected);
            console.log(e.selected);
          }}
          roots={orgUnitLevels(props?.orgUnits)}
          hideMemberCount={false}
          onSelectClick={(orgUnit) => {}}
          selected={selectedOrgUnit}
        />
      </Field>
    </div>
  );
}

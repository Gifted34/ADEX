import React, { useState } from 'react';
import { OrganisationUnitTree, Field } from '@dhis2/ui';
export default function OrgUnits(props) {
  var _props$styles;
  const [selectedOrgUnit, setSelectedOrgUnit] = useState([]);
  const orgUnitLevels = orgs => {
    let orgsList = [];
    orgs === null || orgs === void 0 ? void 0 : orgs.map(org => {
      (org === null || org === void 0 ? void 0 : org.level) == 1 && (orgsList === null || orgsList === void 0 ? void 0 : orgsList.push(org === null || org === void 0 ? void 0 : org.id));
    });
    return orgsList;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.orgHeight
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Organization units"
  }, /*#__PURE__*/React.createElement(OrganisationUnitTree, {
    name: "Organisation Units",
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.setOrg(e.selected);
      setSelectedOrgUnit(e.selected);
      console.log(e.selected);
    },
    roots: orgUnitLevels(props === null || props === void 0 ? void 0 : props.orgUnits),
    hideMemberCount: false,
    onSelectClick: orgUnit => {},
    selected: selectedOrgUnit
  })));
}
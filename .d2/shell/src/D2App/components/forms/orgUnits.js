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
      var _props$orgUnits;
      // props?.setSelecteOrgUnit(e.selected)
      setSelectedOrgUnit(e.selected);
      props === null || props === void 0 ? void 0 : props.setSelecteOrgUnit(props === null || props === void 0 ? void 0 : (_props$orgUnits = props.orgUnits) === null || _props$orgUnits === void 0 ? void 0 : _props$orgUnits.filter(orgUn => (orgUn === null || orgUn === void 0 ? void 0 : orgUn.id) == (e === null || e === void 0 ? void 0 : e.id))[0]);
    },
    roots: orgUnitLevels(props === null || props === void 0 ? void 0 : props.orgUnits),
    singleSelection: true,
    hideMemberCount: false,
    onSelectClick: orgUnit => {},
    selected: selectedOrgUnit
  })));
}
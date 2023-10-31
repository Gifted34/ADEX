import { Box, Button, ButtonStrip, DataTableCell, DataTableRow, Modal, ModalActions, ModalContent } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import ExpandContent from "./expandContent";
function Datatablerow(props) {
  var _filterOrgUnits, _filterOrgUnits2, _filterOrgUnits3, _dx, _dx2, _visualizations, _visualizations2, _visualisations, _filterOrgUnits4, _visualizations3, _dx3, _props$styles;
  const request = props === null || props === void 0 ? void 0 : props.requests;
  const indicators = props === null || props === void 0 ? void 0 : props.indicators;
  const dataElements = props === null || props === void 0 ? void 0 : props.dataElements;
  const orgUnits = props === null || props === void 0 ? void 0 : props.orgUnits;
  const visualisations = props === null || props === void 0 ? void 0 : props.visualisations;
  const [open, setOpen] = useState(false);
  const [expndd, setExpanded] = useState(false);
  const update = () => {
    props === null || props === void 0 ? void 0 : props.setID(props === null || props === void 0 ? void 0 : props.id);
    props === null || props === void 0 ? void 0 : props.setRequest(request);
    props === null || props === void 0 ? void 0 : props.setPath('new request');
  };
  const filterOrgUnits = () => {
    var _request$ou;
    let arr = [];
    request === null || request === void 0 ? void 0 : (_request$ou = request.ou) === null || _request$ou === void 0 ? void 0 : _request$ou.map(ou => {
      const orgs = orgUnits === null || orgUnits === void 0 ? void 0 : orgUnits.filter(org => org.code === ou);
      const name = orgs[0].name;
      arr === null || arr === void 0 ? void 0 : arr.push(name);
    });
    return arr === null || arr === void 0 ? void 0 : arr.map(ou => /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "5px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        fontSize: "15px"
      }
    }, ou)));
  };
  const visualizations = () => {
    var _request$visualizatio;
    let arr = [];
    request === null || request === void 0 ? void 0 : (_request$visualizatio = request.visualization) === null || _request$visualizatio === void 0 ? void 0 : _request$visualizatio.map(vi => {
      var _vis$;
      const vis = visualisations === null || visualisations === void 0 ? void 0 : visualisations.filter(obj => obj.id === vi);
      arr.push((_vis$ = vis[0]) === null || _vis$ === void 0 ? void 0 : _vis$.displayName);
    });
    return arr === null || arr === void 0 ? void 0 : arr.map(vis => /*#__PURE__*/React.createElement("div", {
      key: vis,
      style: {
        padding: "5px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        fontSize: "15px"
      }
    }, vis)));
  };
  const dx = () => {
    var _request$dx;
    return request === null || request === void 0 ? void 0 : (_request$dx = request.dx) === null || _request$dx === void 0 ? void 0 : _request$dx.map(dE => {
      const dataElement = dataElements === null || dataElements === void 0 ? void 0 : dataElements.filter(de => de.code === dE);
      if ((dataElement === null || dataElement === void 0 ? void 0 : dataElement.length) < 1) {
        var _ind$, _ind$2;
        const ind = indicators === null || indicators === void 0 ? void 0 : indicators.filter(ind => ind.code === dE);
        return /*#__PURE__*/React.createElement("div", {
          key: (_ind$ = ind[0]) === null || _ind$ === void 0 ? void 0 : _ind$.displayName,
          style: {
            padding: "5px"
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: "sans-serif",
            fontWeight: "normal",
            fontSize: "15px"
          }
        }, (_ind$2 = ind[0]) === null || _ind$2 === void 0 ? void 0 : _ind$2.displayName));
      } else {
        var _dataElement$, _dataElement$2;
        return /*#__PURE__*/React.createElement("div", {
          key: (_dataElement$ = dataElement[0]) === null || _dataElement$ === void 0 ? void 0 : _dataElement$.displayName,
          style: {
            padding: "5px"
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: "sans-serif",
            fontWeight: "normal",
            fontSize: "15px"
          }
        }, (_dataElement$2 = dataElement[0]) === null || _dataElement$2 === void 0 ? void 0 : _dataElement$2.displayName));
      }
    });
  };
  const periods = () => {
    var _request$pe;
    return request === null || request === void 0 ? void 0 : (_request$pe = request.pe) === null || _request$pe === void 0 ? void 0 : _request$pe.map(pe => /*#__PURE__*/React.createElement("div", {
      key: pe,
      style: {
        padding: "5px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        fontSize: "15px"
      }
    }, pe)));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, open && /*#__PURE__*/React.createElement(Modal, {
    fluid: true,
    position: "middle"
  }, /*#__PURE__*/React.createElement(ModalContent, null, /*#__PURE__*/React.createElement(Box, null, "Are you sure you want to delete Request", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "bold"
    }
  }, request === null || request === void 0 ? void 0 : request.name), " ?...")), /*#__PURE__*/React.createElement(ModalActions, null, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    onClick: () => setOpen(false)
  }, "No"), /*#__PURE__*/React.createElement(Button, {
    destructive: true,
    onClick: () => {
      setOpen(false);
      props === null || props === void 0 ? void 0 : props.deleteRequest(request);
    }
  }, "Yes")))), /*#__PURE__*/React.createElement(DataTableRow, {
    expanded: expndd,
    expandableContent: /*#__PURE__*/React.createElement(ExpandContent, {
      style: props === null || props === void 0 ? void 0 : props.styles,
      orgUnits: orgUnits !== undefined && ((_filterOrgUnits = filterOrgUnits()) === null || _filterOrgUnits === void 0 ? void 0 : _filterOrgUnits.length) > 4 && ((_filterOrgUnits2 = filterOrgUnits()) === null || _filterOrgUnits2 === void 0 ? void 0 : _filterOrgUnits2.splice(4, ((_filterOrgUnits3 = filterOrgUnits()) === null || _filterOrgUnits3 === void 0 ? void 0 : _filterOrgUnits3.length) - 4)),
      dx: dataElements !== undefined && ((_dx = dx()) === null || _dx === void 0 ? void 0 : _dx.length) > 4 && ((_dx2 = dx()) === null || _dx2 === void 0 ? void 0 : _dx2.splice(4, dx().length - 4)),
      vis: visualisations !== undefined && ((_visualizations = visualizations()) === null || _visualizations === void 0 ? void 0 : _visualizations.length) > 4 && ((_visualizations2 = visualizations()) === null || _visualizations2 === void 0 ? void 0 : _visualizations2.splice(4, ((_visualisations = visualisations()) === null || _visualisations === void 0 ? void 0 : _visualisations.length) - 4))
    }),
    onExpandToggle: payload => {
      setExpanded(!expndd);
    }
  }, /*#__PURE__*/React.createElement(DataTableCell, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
      fontSize: "15px"
    }
  }, request === null || request === void 0 ? void 0 : request.name)), /*#__PURE__*/React.createElement(DataTableCell, null, orgUnits !== undefined && ((_filterOrgUnits4 = filterOrgUnits()) === null || _filterOrgUnits4 === void 0 ? void 0 : _filterOrgUnits4.splice(0, 4))), /*#__PURE__*/React.createElement(DataTableCell, null, visualisations !== undefined && ((_visualizations3 = visualizations()) === null || _visualizations3 === void 0 ? void 0 : _visualizations3.splice(0, 4))), /*#__PURE__*/React.createElement(DataTableCell, null, dataElements !== undefined && indicators !== undefined && ((_dx3 = dx()) === null || _dx3 === void 0 ? void 0 : _dx3.splice(0, 4))), /*#__PURE__*/React.createElement(DataTableCell, null, periods()), /*#__PURE__*/React.createElement(DataTableCell, null, /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.actionBtns
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    onClick: () => update()
  }, "Edit"), /*#__PURE__*/React.createElement(Button, {
    destructive: true,
    onClick: () => setOpen(true)
  }, "Delete")))));
}
export default Datatablerow;
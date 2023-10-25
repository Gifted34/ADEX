import { Box, Button, ButtonStrip, DataTableCell, DataTableRow, Modal, ModalActions, ModalContent } from '@dhis2/ui';
import React, { useEffect, useState } from 'react';
function Datatablerow(props) {
  const request = props === null || props === void 0 ? void 0 : props.request;
  const indicators = props === null || props === void 0 ? void 0 : props.indicators;
  const dataElements = props === null || props === void 0 ? void 0 : props.dataElements;
  const orgUnits = props === null || props === void 0 ? void 0 : props.orgUnits;
  const visualisations = props === null || props === void 0 ? void 0 : props.visualisations;
  const [open, setOpen] = useState(false);
  const filterOrgUnits = () => {
    var _request$ou;
    let arr = [];
    request === null || request === void 0 ? void 0 : (_request$ou = request.ou) === null || _request$ou === void 0 ? void 0 : _request$ou.map(ou => {
      const orgs = orgUnits === null || orgUnits === void 0 ? void 0 : orgUnits.filter(org => org.id === ou);
      const name = orgs[0].name;
      arr === null || arr === void 0 ? void 0 : arr.push(name);
    });
    return arr === null || arr === void 0 ? void 0 : arr.map(ou => /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '5px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
        fontSize: '15px'
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
        padding: '5px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
        fontSize: '15px'
      }
    }, vis)));
  };
  const dx = () => {
    var _request$dx;
    return request === null || request === void 0 ? void 0 : (_request$dx = request.dx) === null || _request$dx === void 0 ? void 0 : _request$dx.map(dE => {
      const dataElement = dataElements === null || dataElements === void 0 ? void 0 : dataElements.filter(de => de.id === dE);
      if ((dataElement === null || dataElement === void 0 ? void 0 : dataElement.length) < 1) {
        var _ind$, _ind$2;
        const ind = indicators === null || indicators === void 0 ? void 0 : indicators.filter(ind => ind.id === dE);
        return /*#__PURE__*/React.createElement("div", {
          key: (_ind$ = ind[0]) === null || _ind$ === void 0 ? void 0 : _ind$.displayName,
          style: {
            padding: '5px'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
            fontSize: '15px'
          }
        }, (_ind$2 = ind[0]) === null || _ind$2 === void 0 ? void 0 : _ind$2.displayName));
      } else {
        var _dataElement$, _dataElement$2;
        return /*#__PURE__*/React.createElement("div", {
          key: (_dataElement$ = dataElement[0]) === null || _dataElement$ === void 0 ? void 0 : _dataElement$.displayName,
          style: {
            padding: '5px'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
            fontSize: '15px'
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
        padding: '5px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
        fontSize: '15px'
      }
    }, pe)));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, open && /*#__PURE__*/React.createElement(Modal, {
    fluid: true,
    position: "middle"
  }, /*#__PURE__*/React.createElement(ModalContent, null, /*#__PURE__*/React.createElement(Box, null, "Are you sure you want to delete Request ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, request === null || request === void 0 ? void 0 : request.name), " ?...")), /*#__PURE__*/React.createElement(ModalActions, null, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    onClick: () => setOpen(false)
  }, "No"), /*#__PURE__*/React.createElement(Button, {
    destructive: true,
    onClick: () => props === null || props === void 0 ? void 0 : props.deleteRequest(request)
  }, "Yes")))), /*#__PURE__*/React.createElement(DataTableRow, null, /*#__PURE__*/React.createElement(DataTableCell, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      fontSize: '15px'
    }
  }, request === null || request === void 0 ? void 0 : request.name)), /*#__PURE__*/React.createElement(DataTableCell, null, orgUnits !== undefined && filterOrgUnits()), /*#__PURE__*/React.createElement(DataTableCell, null, visualisations !== undefined && visualizations()), /*#__PURE__*/React.createElement(DataTableCell, null, dataElements !== undefined && indicators !== undefined && dx()), /*#__PURE__*/React.createElement(DataTableCell, null, periods()), /*#__PURE__*/React.createElement(DataTableCell, null, /*#__PURE__*/React.createElement(Button, {
    destructive: true,
    onClick: () => setOpen(true)
  }, "Delete Request"))));
}
export default Datatablerow;
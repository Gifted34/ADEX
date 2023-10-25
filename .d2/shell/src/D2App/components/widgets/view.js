import { useDataEngine } from "@dhis2/app-runtime";
import { AlertBar, Box, Button, ButtonStrip, Center, CircularLoader, Divider, Layer, StackedTable, StackedTableBody, StackedTableCell, StackedTableCellHead, StackedTableHead, StackedTableRow, StackedTableRowHead } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RequestdataTable from "./dataTable";
const query = {
  organisationUnits: {
    resource: "organisationUnits",
    params: {
      paging: false,
      fields: ["id,name,level,path,displayName,code,children,ancestors,created,href,user,users,userAccesses"],
      order: "level"
    }
  },
  visualizations: {
    resource: "visualizations",
    params: {
      paging: false,
      field: ["id", "displayName"]
    }
  },
  indicators: {
    resource: "indicators",
    params: {
      paging: false,
      fields: ["id", "name", "displayName", "code"]
    }
  },
  dataElements: {
    resource: "dataElements",
    params: {
      paging: false,
      fields: ["id", "name", "formName", "displayName", "code"]
    }
  },
  periodTypes: {
    resource: "periodTypes",
    params: {
      fields: ["*"]
    }
  },
  aggregateDataExchanges: {
    resource: "aggregateDataExchanges",
    params: {
      fields: ["*"]
    }
  },
  dataStore: {
    resource: "dataStore",
    params: {
      paging: false,
      fields: ["*"]
    }
  }
};
export default function ViewDataStoreById(props) {
  const location = useLocation();
  const path = location.pathname.split("/").slice(-1)[0];
  const dataStorePath = `dataStore/DEX_initializer_values/${path}`;
  const [dataExchange, setExchange] = useState();
  const [indicators, setIndicators] = useState();
  const [dataElements, setDataElements] = useState();
  const [visualisations, setVis] = useState();
  const [orgUnits, setOrgUnits] = useState();
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [errorHide, setErrorHide] = useState(true);
  const query = {
    organisationUnits: {
      resource: "organisationUnits",
      params: {
        paging: false,
        fields: ["id,name,displayName"]
      }
    },
    visualizations: {
      resource: "visualizations",
      params: {
        paging: false,
        field: ["id", "displayName"]
      }
    },
    indicators: {
      resource: "indicators",
      params: {
        paging: false,
        fields: ["id", "name", "displayName", "code"]
      }
    },
    dataElements: {
      resource: "dataElements",
      params: {
        paging: false,
        fields: ["id", "name", "formName", "displayName", "code"]
      }
    },
    periodTypes: {
      resource: "periodTypes",
      params: {
        fields: ["*"]
      }
    },
    dataStore: {
      resource: dataStorePath,
      params: {
        paging: false,
        fields: ["*"]
      }
    }
  };
  const engine = useDataEngine();
  const fetch = async () => {
    var _res$visualizations, _res$indicators, _res$dataElements, _res$organisationUnit;
    const res = await engine.query(query);
    setExchange(res === null || res === void 0 ? void 0 : res.dataStore);
    setVis(res === null || res === void 0 ? void 0 : (_res$visualizations = res.visualizations) === null || _res$visualizations === void 0 ? void 0 : _res$visualizations.visualizations);
    setIndicators(res === null || res === void 0 ? void 0 : (_res$indicators = res.indicators) === null || _res$indicators === void 0 ? void 0 : _res$indicators.indicators);
    setDataElements(res === null || res === void 0 ? void 0 : (_res$dataElements = res.dataElements) === null || _res$dataElements === void 0 ? void 0 : _res$dataElements.dataElements);
    setOrgUnits(res === null || res === void 0 ? void 0 : (_res$organisationUnit = res.organisationUnits) === null || _res$organisationUnit === void 0 ? void 0 : _res$organisationUnit.organisationUnits);
  };
  useEffect(() => {
    fetch();
  }, []);
  const deleteRequest = async filter => {
    var _dataExchange$source;
    setLoading(true);
    const requests = dataExchange === null || dataExchange === void 0 ? void 0 : (_dataExchange$source = dataExchange.source) === null || _dataExchange$source === void 0 ? void 0 : _dataExchange$source.requests.filter(req => req.name !== filter.name);
    const myMutation = {
      resource: dataStorePath,
      type: "update",
      data: {
        createdAt: dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.createdAt,
        dexname: dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.dexname,
        type: dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.type,
        url: dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.url,
        source: {
          requests: requests
        }
      }
    };
    setExchange(myMutation === null || myMutation === void 0 ? void 0 : myMutation.data);
    await engine.mutate(myMutation).then(res => {
      if (res.httpStatusCode === 200) {
        setLoading(false);
        setHidden(false);
      }
    }).catch(e => {
      setLoading(false);
      setErrorHide(false);
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, loading && /*#__PURE__*/React.createElement(Layer, {
    translucent: true
  }, /*#__PURE__*/React.createElement(Center, null, /*#__PURE__*/React.createElement(CircularLoader, {
    large: true
  }))), /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/",
    style: {
      textDecoration: "none",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true
  }, "Home"))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    className: `${props === null || props === void 0 ? void 0 : props.styles.padding}`
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "10px",
      fontFamily: "sans-serif",
      fontWeight: "bold",
      fontSize: "20px"
    }
  }, " ", "Agreggate exchange Details", " "), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(StackedTable, null, /*#__PURE__*/React.createElement(StackedTableHead, null, /*#__PURE__*/React.createElement(StackedTableRowHead, null, /*#__PURE__*/React.createElement(StackedTableCellHead, null, "Created at"), /*#__PURE__*/React.createElement(StackedTableCellHead, null, "Name"), /*#__PURE__*/React.createElement(StackedTableCellHead, null, "Target"), /*#__PURE__*/React.createElement(StackedTableCellHead, null, "Type"))), /*#__PURE__*/React.createElement(StackedTableBody, null, /*#__PURE__*/React.createElement(StackedTableRow, null, /*#__PURE__*/React.createElement(StackedTableCell, null, dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.createdAt), /*#__PURE__*/React.createElement(StackedTableCell, null, dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.dexname), /*#__PURE__*/React.createElement(StackedTableCell, null, dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.url), /*#__PURE__*/React.createElement(StackedTableCell, null, dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.type))))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "20px",
      fontFamily: "sans-serif",
      fontWeight: "normal",
      fontSize: "20px"
    }
  }, " ", "Requests", " "), /*#__PURE__*/React.createElement(RequestdataTable, {
    key: dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.url,
    deleteRequest: deleteRequest,
    orgUnits: orgUnits,
    indicators: indicators,
    dataExchange: dataExchange,
    dataElements: dataElements,
    visualisations: visualisations
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      alignContent: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Center, null, /*#__PURE__*/React.createElement(AlertBar, {
    success: true,
    hidden: hidden,
    duration: 2000,
    onhidden: () => setHidden(true)
  }, "Request deleted succesifuly"), /*#__PURE__*/React.createElement(AlertBar, {
    warning: true,
    hidden: errorHide,
    duration: 2000,
    onhidden: () => setErrorHide(true)
  }, "Failled to delete request"))));
}
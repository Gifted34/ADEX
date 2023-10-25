import { useDataEngine } from "@dhis2/app-runtime";
import { Box, Button, ButtonStrip, Center, CircularLoader, Divider, Layer, StackedTable, StackedTableBody, StackedTableCell, StackedTableCellHead, StackedTableHead, StackedTableRow, StackedTableRowHead } from "@dhis2/ui";
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
  const path = location.pathname.split('/').slice(-1)[0];
  const dataStorePath = `dataStore/DEX_initializer_values/${path}`;
  const [dataExchange, setExchange] = useState();
  const [indicators, setIndicators] = useState();
  const [dataElements, setDataElements] = useState();
  const [visualisations, setVis] = useState();
  const [orgUnits, setOrgUnits] = useState();
  const [loading, setLoading] = useState(false);
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
    const res = await engine.query(query);
    setExchange(res.dataStore);
    setVis(res.visualizations.visualizations);
    setIndicators(res.indicators.indicators);
    setDataElements(res.dataElements.dataElements);
    setOrgUnits(res.organisationUnits.organisationUnits);
  };
  useEffect(() => {
    fetch();
  }, []);
  const deleteRequest = requestName => {
    console.log(dataExchange.source.request);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, loading && /*#__PURE__*/React.createElement(Layer, null, /*#__PURE__*/React.createElement(Center, null, /*#__PURE__*/React.createElement(CircularLoader, {
    large: true
  }))), /*#__PURE__*/React.createElement(ButtonStrip, null, /*#__PURE__*/React.createElement(Link, {
    to: "/",
    style: {
      textDecoration: "none",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement(Button, null, "Home"))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    className: `${props === null || props === void 0 ? void 0 : props.styles.padding}`
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '10px',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      fontSize: '20px'
    }
  }, " Agreggate exchange Details "), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(StackedTable, null, /*#__PURE__*/React.createElement(StackedTableHead, null, /*#__PURE__*/React.createElement(StackedTableRowHead, null, /*#__PURE__*/React.createElement(StackedTableCellHead, null, "Created at"), /*#__PURE__*/React.createElement(StackedTableCellHead, null, "Name"), /*#__PURE__*/React.createElement(StackedTableCellHead, null, "Target"), /*#__PURE__*/React.createElement(StackedTableCellHead, null, "Type"))), /*#__PURE__*/React.createElement(StackedTableBody, null, /*#__PURE__*/React.createElement(StackedTableRow, null, /*#__PURE__*/React.createElement(StackedTableCell, null, dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.createdAt), /*#__PURE__*/React.createElement(StackedTableCell, null, dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.dexname), /*#__PURE__*/React.createElement(StackedTableCell, null, dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.url), /*#__PURE__*/React.createElement(StackedTableCell, null, dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.type))))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '20px',
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      fontSize: '20px'
    }
  }, " Requests "), /*#__PURE__*/React.createElement(RequestdataTable, {
    key: dataExchange === null || dataExchange === void 0 ? void 0 : dataExchange.url,
    deleteRequest: deleteRequest,
    orgUnits: orgUnits,
    indicators: indicators,
    dataExchange: dataExchange,
    dataElements: dataElements,
    visualisations: visualisations
  })))));
}
import { useDataEngine } from "@dhis2/app-runtime";
import { Box, Button, ButtonStrip, Center, CircularLoader, Divider, Layer, StackedTable, StackedTableBody, StackedTableCell, StackedTableCellHead, StackedTableHead, StackedTableRow, StackedTableRowHead } from "@dhis2/ui";
import React,{useEffect,useState} from "react";
import { Link, useLocation } from "react-router-dom";
import RequestdataTable from "./dataTable";

const query = {
  organisationUnits: {
    resource: "organisationUnits",
    params: {
      paging: false,
      fields: [
        "id,name,level,path,displayName,code,children,ancestors,created,href,user,users,userAccesses",
      ],
      order: "level",
    },
  },
  visualizations: {
    resource: "visualizations",
    params: {
      paging: false,
      field: ["id", "displayName"],
    },
  },
  indicators: {
    resource: "indicators",
    params: {
      paging: false,
      fields: ["id", "name", "displayName", "code"],
    },
  },
  dataElements: {
    resource: "dataElements",
    params: {
      paging: false,
      fields: ["id", "name", "formName", "displayName", "code"],
    },
  },
  periodTypes: {
    resource: "periodTypes",
    params: {
      fields: ["*"],
    },
  },
  aggregateDataExchanges: {
    resource: "aggregateDataExchanges",
    params: {
      fields: ["*"],
    },
  },
  dataStore: {
    resource: "dataStore",
    params: {
      paging: false,
      fields: ["*"],
    },
  },
};
export default function ViewDataStoreById(props) {
  const location = useLocation()
  const path = location.pathname.split('/').slice(-1)[0]  
  const dataStorePath = `dataStore/DEX_initializer_values/${path}` 
  const [dataExchange,setExchange] = useState()
  const [indicators,setIndicators] = useState()
  const [dataElements, setDataElements] = useState()
  const[ visualisations,setVis] = useState()
  const [orgUnits, setOrgUnits] = useState()
  const [loading,setLoading] = useState(false)

  const query = {
    organisationUnits: {
      resource: "organisationUnits",
      params: {
        paging: false,
        fields: [
          "id,name,displayName",
        ],
      },
    },
    visualizations: {
      resource: "visualizations",
      params: {
        paging: false,
        field: ["id", "displayName"],
      },
    },
    indicators: {
      resource: "indicators",
      params: {
        paging: false,
        fields: ["id", "name", "displayName", "code"],
      },
    },
    dataElements: {
      resource: "dataElements",
      params: {
        paging: false,
        fields: ["id", "name", "formName", "displayName", "code"],
      },
    },
    periodTypes: {
      resource: "periodTypes",
      params: {
        fields: ["*"],
      },
    },
    dataStore: {
      resource: dataStorePath,
      params: {
        paging: false,
        fields: ["*"],
      },
    },
  };

  const engine = useDataEngine()

  const fetch = async() => {   
          const res = await engine.query(query)
          setExchange(res.dataStore)
          setVis(res.visualizations.visualizations)
          setIndicators(res.indicators.indicators)
          setDataElements(res.dataElements.dataElements)  
          setOrgUnits(res.organisationUnits.organisationUnits)        
  }
  useEffect(()=>{
    fetch()    
  },[])

  const deleteRequest = (requestName) => {
    console.log(dataExchange.source.request) 
  }

  
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {loading && <Layer>
          <Center>
            <CircularLoader large />
          </Center>
        </Layer>}
      <ButtonStrip >
        <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
          <Button >Home</Button>
        </Link>
      </ButtonStrip>
      <Divider />
      <div className={`${props?.styles.padding}`}>
        <Box>
          <span style={{padding: '10px',fontFamily: 'sans-serif',fontWeight:'bold',fontSize: '20px'}}> Agreggate exchange Details </span>
          <Divider />
          <Box >
            <StackedTable>
              <StackedTableHead>
                <StackedTableRowHead>
                  <StackedTableCellHead>
                      Created at
                  </StackedTableCellHead>
                  <StackedTableCellHead>
                    Name
                  </StackedTableCellHead>
                  <StackedTableCellHead>
                    Target
                  </StackedTableCellHead>
                  <StackedTableCellHead>
                    Type
                  </StackedTableCellHead>
                </StackedTableRowHead>
              </StackedTableHead>
              <StackedTableBody>
                <StackedTableRow>
                  <StackedTableCell>
                    {dataExchange?.createdAt}
                  </StackedTableCell>
                  <StackedTableCell>
                    {dataExchange?.dexname}
                  </StackedTableCell>
                  <StackedTableCell>
                    {dataExchange?.url}
                  </StackedTableCell>
                  <StackedTableCell>
                    {dataExchange?.type}
                  </StackedTableCell>
                </StackedTableRow>
              </StackedTableBody>
            </StackedTable>
          </Box>
          <Divider />
          <Box>
            <span style={{padding: '20px',fontFamily: 'sans-serif',fontWeight:'normal',fontSize: '20px'}}> Requests </span>
            <RequestdataTable key={dataExchange?.url} deleteRequest={deleteRequest} orgUnits={orgUnits} indicators={indicators} dataExchange={dataExchange} dataElements={dataElements} visualisations={visualisations}/>
          </Box>
          
        </Box>
      </div>
    </div>
  );
}

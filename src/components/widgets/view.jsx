import { useDataEngine } from "@dhis2/app-runtime";
import {
  AlertBar,
  Box,
  Button,
  ButtonStrip,
  Center,
  CircularLoader,
  Divider,
  Layer,
  StackedTable,
  StackedTableBody,
  StackedTableCell,
  StackedTableCellHead,
  StackedTableHead,
  StackedTableRow,
  StackedTableRowHead,
} from "@dhis2/ui";
import React, { useEffect, useState } from "react";
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
  const dataStorePath = `dataStore/DEX_initializer_values/${props?.id}`;
  const [dataExchange, setExchange] = useState();
  const [indicators, setIndicators] = useState();
  const [dataElements, setDataElements] = useState();
  const [visualisations, setVis] = useState();
  const [orgUnits, setOrgUnits] = useState();
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [errorHide, setErrorHide] = useState(true);
  const [isSuccessMessage, setSuccessMessage] = useState(false);

  const query = {
    organisationUnits: {
      resource: "organisationUnits",
      params: {
        paging: false,
        fields: ["id,name,displayName,code"],
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

  const engine = useDataEngine();

  const fetch = async () => {
    const res = await engine.query(query);
    setExchange(res?.dataStore);
    setVis(res?.visualizations?.visualizations);
    setIndicators(res?.indicators?.indicators);
    setDataElements(res?.dataElements?.dataElements);
    setOrgUnits(res?.organisationUnits?.organisationUnits);
  };
  useEffect(() => {
    fetch();
  }, []);

  const deleteRequest = async (filter) => {
    setLoading(true);
    const requests = dataExchange?.source?.requests.filter(
      (req) => req.name !== filter.name
    );
    const myMutation = {
      resource: dataStorePath,
      type: "update",
      data: {
        createdAt: dataExchange?.createdAt,
        dexname: dataExchange?.dexname,
        type: dataExchange?.type,
        url: dataExchange?.url,
        source: {
          requests: requests,
        },
      },
    };
    setExchange(myMutation?.data);
    await engine
      .mutate(myMutation)
      .then((res) => {
        if (res.httpStatusCode === 200) {
          setSuccessMessage(true);
          setLoading(false);
          setHidden(false);
        }
      })
      .catch((e) => {
        setSuccessMessage(false);
        setLoading(false);
        setErrorHide(false);
      });
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {loading && (
        <Layer translucent>
          <Center>
            <CircularLoader large />
          </Center>
        </Layer>
      )}
      <ButtonStrip start>
        <Button secondary onClick={() => props?.setPath("Home")}>
          Back
        </Button>
      </ButtonStrip>
      <Divider />
      <div className={`${props?.styles.padding}`}>
        <Box>
          <span
            style={{
              padding: "10px",
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {" "}
            Agreggate exchange Details{" "}
          </span>
          <Divider />
          <Box>
            <StackedTable>
              <StackedTableHead>
                <StackedTableRowHead>
                  <StackedTableCellHead>Created</StackedTableCellHead>
                  <StackedTableCellHead>Name</StackedTableCellHead>
                  <StackedTableCellHead>Target</StackedTableCellHead>
                  <StackedTableCellHead>Type</StackedTableCellHead>
                </StackedTableRowHead>
              </StackedTableHead>
              <StackedTableBody>
                <StackedTableRow>
                  <StackedTableCell>{dataExchange?.createdAt}</StackedTableCell>
                  <StackedTableCell>{dataExchange?.dexname}</StackedTableCell>
                  <StackedTableCell>{dataExchange?.url}</StackedTableCell>
                  <StackedTableCell>{dataExchange?.type}</StackedTableCell>
                </StackedTableRow>
              </StackedTableBody>
            </StackedTable>
          </Box>
          <Divider />
          <Box>
            <span
              style={{
                padding: "20px",
                fontFamily: "sans-serif",
                fontWeight: "normal",
                fontSize: "20px",
              }}
            >
              {" "}
              Requests{" "}
            </span>
            <RequestdataTable
              id={props?.id}
              styles={props?.styles}
              setID={props?.setID}
              setRequest={props?.setRequest}
              key={dataExchange?.url}
              deleteRequest={deleteRequest}
              setPath={props?.setPath}
              orgUnits={orgUnits}
              indicators={indicators}
              dataExchange={dataExchange}
              dataElements={dataElements}
              visualisations={visualisations}
            />
          </Box>
        </Box>
      </div>
      <div style={{ alignContent: "center", justifyContent: "center" }}>
        <Center>
          {isSuccessMessage ? (
            <AlertBar
              success
              hidden={hidden}
              duration={2000}
              onhidden={() => setHidden(true)}
            >
              Request deleted succesifuly
            </AlertBar>
          ) : (
            <AlertBar
              warning
              hidden={errorHide}
              duration={2000}
              onhidden={() => setErrorHide(true)}
            >
              Failled to delete request
            </AlertBar>
          )}
        </Center>
      </div>
    </div>
  );
}

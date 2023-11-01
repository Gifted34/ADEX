import { useDataEngine } from "@dhis2/app-runtime";
import {
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ButtonStrip,
  NoticeBox,
} from "@dhis2/ui";
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

export default function DataInitialized(props) {
  const [dexDataStoreValues, setDexDataStoreValues] = useState([]);
  const [entries, setEntries]= useState()
  const getData = () => {
    props &&
      props?.dataStoreDexValues().then((res) => {
        setDexDataStoreValues(res);
        setEntries(res?.dataStore?.entries?.reverse())
      });
  };

  const checkIfInitialised = (exchange)=>{
    let arr = []
    props?.aggregateDataExchanges?.map(exch =>{
      if(exch.name === exchange){
        arr.push(exch)
      }
    })
    if(arr.length > 0){
      return 'Update integration'
    }
    return 'Initialize integration'
  }

  const deleteEntry = (data) => {
    props?.deleteEntry(data);
  };
  const updateEntry = (data) => {
    props?.updateEntry(data);
  };
  const integrateEntry = (data) => {
    props?.integrateEntry(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {dexDataStoreValues &&
      dexDataStoreValues?.dataStore?.entries?.length > 0 ? (
        <Table>
          <TableHead>
            <TableRowHead>
              <TableCellHead>Date created</TableCellHead>
              <TableCellHead>Name</TableCellHead>
              <TableCellHead>Target</TableCellHead>
              <TableCellHead></TableCellHead>
            </TableRowHead>
          </TableHead>
          <TableBody>
            {dexDataStoreValues &&
              entries?.map((aggregateDataExchange, key) => {
                  return (
                    <TableRow key={key}>
                      <TableCell>
                        {aggregateDataExchange?.value?.createdAt?.split(",")[0]}
                      </TableCell>
                      <TableCell>
                        {aggregateDataExchange?.value?.dexname}
                      </TableCell>
                      <TableCell>
                        {aggregateDataExchange?.value?.url == undefined
                          ? aggregateDataExchange?.value?.type
                          : aggregateDataExchange?.value?.url}
                      </TableCell>

                      <TableCell dense>
                        <ButtonStrip start>
                          <Button
                            onClick={() => {
                              props?.setPath("View");
                              props.setID(aggregateDataExchange.key);
                            }}
                          >
                            View
                          </Button>

                          <button
                            className={props?.styles?.newRequestBtn}
                            onClick={() => {                              
                              props?.setRequest(undefined)
                              props.setID(aggregateDataExchange.key);
                              props?.setPath("new request");
                            }}
                          >
                            New request
                          </button>
                          <button
                            className={props?.styles?.updateBtn}
                            onClick={() => {
                              props?.setOpenUpdate(!props?.openUpdate);
                              updateEntry(aggregateDataExchange);
                            }}
                          >
                            Update
                          </button>

                          <Button
                            destructive
                            onClick={() => {
                              props?.setOpenDelete(!props?.openDelete);
                              deleteEntry(aggregateDataExchange);
                            }}
                          >
                            Remove
                          </Button>
                          {aggregateDataExchange?.value?.source == undefined ||
                          aggregateDataExchange?.value?.source?.requests
                            ?.length < 1 ? (
                            <Button secondary disabled>
                              No request(s) attached
                            </Button>
                          ) : (
                            <Button
                              primary
                              onClick={() => {
                                props?.setOpenIntegration(
                                  !props?.openIntegration
                                );
                                integrateEntry(aggregateDataExchange);
                              }}
                            >
                              {checkIfInitialised(aggregateDataExchange?.value?.dexname)}
                            </Button>
                          )}
                        </ButtonStrip>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      ) : (
        <NoticeBox title="Initialized data exchange">
          No data is available
        </NoticeBox>
      )}
      <Outlet />
    </div>
  );
}

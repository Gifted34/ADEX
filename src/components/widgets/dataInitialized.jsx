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
  const getData = () => {
    props &&
      props?.dataStoreDexValues().then((res) => {
        setDexDataStoreValues(res);
      });
  };

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
              dexDataStoreValues?.dataStore?.entries?.reverse()?.map(
                (aggregateDataExchange, key) => {
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
                          
                            <Button onClick={()=> {
                              props?.setPath('View')
                              props.setID(aggregateDataExchange.key)
                            }}>View</Button>
                          
                            <button className={props?.styles?.newRequestBtn}  onClick={()=>{
                              props?.setPath('new request')
                              props.setID(aggregateDataExchange.key)
                            }}>New request</button>
                            <button className={props?.styles?.updateBtn} onClick={() => {
                              props?.setOpenUpdate(!props?.openUpdate);
                              updateEntry(aggregateDataExchange);
                            }}>
                              Update
                            </button>
                          {/* <Button
                            secondary
                            style={{
                              
                            }}
                            onClick={() => {
                              props?.setOpenUpdate(!props?.openUpdate);
                              updateEntry(aggregateDataExchange);
                            }}
                          >
                            Update
                          </Button> */}
                          <Button
                            destructive
                            onClick={() => {
                              props?.setOpenDelete(!props?.openDelete);
                              deleteEntry(aggregateDataExchange);
                            }}
                          >
                            Remove
                          </Button>
                          <Button
                            primary
                            onClick={() => {
                              props?.setOpenIntegration(
                                !props?.openIntegration
                              );
                              integrateEntry(aggregateDataExchange);
                            }}
                          >
                            Initialize integration
                          </Button>
                        </ButtonStrip>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
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

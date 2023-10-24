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
  }, [props]);

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
              dexDataStoreValues?.dataStore?.entries?.map(
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
                          <Link
                            to={`/view/${aggregateDataExchange?.key}&${aggregateDataExchange?.value?.dataValues?.name}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Button>View</Button>
                          </Link>

                          <Link
                            to={`/new-request/${aggregateDataExchange?.key}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Button>Add new</Button>
                          </Link>
                          <Button
                            secondary
                            onClick={() => {
                              props?.setOpenUpdate(!props?.openUpdate);
                              updateEntry(aggregateDataExchange);
                            }}
                          >
                            Update
                          </Button>
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

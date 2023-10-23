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
} from "@dhis2/ui";
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

export default function DataInitialized(props) {
  const [dexDataStoreValues, setDexDataStoreValues] = useState([]);
  // props?.getDataStoreDexValues()?.filter((store) => store === "DEX_values")
  const getData = () => {
    // return console.log(props?.dataStoreDexValues());
    props &&
      props?.dataStoreDexValues().then((res) => {
        setDexDataStoreValues(res);
        console.log(res);
      });
  };
  useEffect(() => {
    getData();
  }, [props]);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>Date created</TableCellHead>
            <TableCellHead>Name</TableCellHead>
            <TableCellHead>Target</TableCellHead>
            <TableCellHead>Last updated</TableCellHead>
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
                      {aggregateDataExchange?.value?.dataValues?.name}
                    </TableCell>
                    <TableCell>
                      {aggregateDataExchange?.value?.dataValues?.url ==
                      undefined
                        ? aggregateDataExchange?.value?.dataValues?.type
                        : aggregateDataExchange?.value?.dataValues?.url}
                    </TableCell>
                    <TableCell>01/03/2006</TableCell>
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
                        <Button destructive>Remove</Button>
                        <Button primary>Initialize integration</Button>
                      </ButtonStrip>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
        </TableBody>
      </Table>
      <Outlet />
    </div>
  );
}

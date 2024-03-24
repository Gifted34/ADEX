import { Button, ButtonStrip, Center, Divider, Layer, NoticeBox } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import DataInitialized from "./dataInitialized";
import { useDataEngine } from "@dhis2/app-runtime";

export default function HomePage(props) {
  const engine = useDataEngine();
  let dataStorePath = "dataStore/DEX_initializer_values";

  const getDataStoreDexValues = async (props) => {
    const query = {
      dataStore: {
        resource: dataStorePath,
        params: {
          fields: ["."],
        },
      },
    };

    try {
      const res = await engine?.query(query);
      return res;
    } catch (e) {}
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {props?.notAuth && <Layer transluscent>
        <Center>
        <NoticeBox title="Unauthorised Access" warning >
                You do not have metadata access(Create) for Aggregate data exchange: Please contact your admin 
              </NoticeBox>
          </Center></Layer>}
      <ButtonStrip end>
        <Button primary onClick={() => props?.setOpen(!props?.open)}>
          Create new
        </Button>
      </ButtonStrip>
      <Divider />
      <div className="" style={{ marginTop: "10px" }}>
        <DataInitialized
          setPath={props?.setPath}
          aggregateDataExchanges={props?.aggregateDataExchanges}
          setID={props?.setID}
          setRequest={props?.setRequest}
          setOpenDelete={props?.setOpenDelete}
          openDelete={props?.openDelete}
          setOpenUpdate={props?.setOpenUpdate}
          openIntegration={props?.openIntegration}
          setOpenIntegration={props?.setOpenIntegration}
          openUpdate={props?.openUpdate}
          dataStoreDexValues={getDataStoreDexValues}
          data={[]}
          styles={props?.styles}
          deleteEntry={props?.deleteEntry}
          updateEntry={props?.updateEntry}
          integrateEntry={props?.integrateEntry}
        />
      </div>
    </div>
  );
}

import {
  Box,
  Button,
  ButtonStrip,
  DataTableCell,
  DataTableRow,
  Modal,
  ModalActions,
  ModalContent,
} from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import ExpandContent from "./expandContent";

function Datatablerow(props) {
  const request = props?.requests;
  const indicators = props?.indicators;
  const dataElements = props?.dataElements;
  const orgUnits = props?.orgUnits;
  const visualisations = props?.visualisations;
  const [open, setOpen] = useState(false);
  const [expndd,setExpanded] = useState(false)

  const update = () =>{
    props?.setID(props?.id)
    props?.setRequest(request)
    props?.setPath('new request')
  }

  const filterOrgUnits = () => {
    let arr = [];
    request?.ou?.map((ou) => {
      const orgs = orgUnits?.filter((org) => org.code === ou);
      const name = orgs[0].name;
      arr?.push(name);
    });
    return arr?.map((ou) => (
      <div style={{ padding: "5px" }}>
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: "normal",
            fontSize: "15px",
          }}
        >
          {ou}
        </span>
      </div>
    ));
  };

  const visualizations = () => {
    let arr = [];
    request?.visualization?.map((vi) => {
      const vis = visualisations?.filter((obj) => obj.id === vi);
      arr.push(vis[0]?.displayName);
    });
    return arr?.map((vis) => (
      <div key={vis} style={{ padding: "5px" }}>
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: "normal",
            fontSize: "15px",
          }}
        >
          {vis}
        </span>
      </div>
    ));
  };

  const dx = () => {
    return request?.dx?.map((dE) => {
      const dataElement = dataElements?.filter((de) => de.code === dE);
      if (dataElement?.length < 1) {
        const ind = indicators?.filter((ind) => ind.code === dE);
        return (
          <div key={ind[0]?.displayName} style={{ padding: "5px" }}>
            <span
              style={{
                fontFamily: "sans-serif",
                fontWeight: "normal",
                fontSize: "15px",
              }}
            >
              {ind[0]?.displayName}
            </span>
          </div>
        );
      } else {
        return (
          <div key={dataElement[0]?.displayName} style={{ padding: "5px" }}>
            <span
              style={{
                fontFamily: "sans-serif",
                fontWeight: "normal",
                fontSize: "15px",
              }}
            >
              {dataElement[0]?.displayName}
            </span>
          </div>
        );
      }
    });
  };

  const periods = () => {
    return request?.pe?.map((pe) => (
      <div key={pe} style={{ padding: "5px" }}>
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: "normal",
            fontSize: "15px",
          }}
        >
          {pe}
        </span>
      </div>
    ));
  };

  return (
    <>
      {open && (
        <Modal fluid position="middle">
          <ModalContent>
            <Box>
              Are you sure you want to delete Request{" "}
              <span style={{ fontWeight: "bold" }}>{request?.name}</span> ?...
            </Box>
          </ModalContent>
          <ModalActions>
            <ButtonStrip end>
              <Button primary onClick={() => setOpen(false)}>
                No
              </Button>
              <Button
                destructive
                onClick={() => {
                  setOpen(false);
                  props?.deleteRequest(request);
                }}
              >
                Yes
              </Button>
            </ButtonStrip>
          </ModalActions>
        </Modal>
      )}
      <DataTableRow expanded={expndd}  expandableContent={<ExpandContent style={props?.styles} orgUnits={orgUnits !== undefined&&filterOrgUnits()?.length > 4 && filterOrgUnits()?.splice(4,filterOrgUnits()?.length -4)} dx={dataElements !== undefined && dx()?.length > 4 && dx()?.splice(4,dx().length - 4)} vis={visualisations !== undefined && visualizations()?.length >4 && visualizations()?.splice(4,visualisations()?.length -4)} />} onExpandToggle={(payload)=>{
         setExpanded(!expndd)
      }}>
        <DataTableCell>
          <span
            style={{
              fontFamily: "sans-serif",
              fontWeight: "normal",
              fontSize: "15px",
            }}
          >
            {request?.name}
          </span>
        </DataTableCell>
        <DataTableCell >
          {orgUnits !== undefined && filterOrgUnits()?.splice(0,4)}
        </DataTableCell>
        <DataTableCell>
          {visualisations !== undefined && visualizations()?.splice(0,4)}
        </DataTableCell>
        <DataTableCell>
          {dataElements !== undefined && indicators !== undefined && dx()?.splice(0,4)}
        </DataTableCell>
        <DataTableCell>{periods()}</DataTableCell>
        <DataTableCell>
          <div className={props?.styles?.actionBtns}>
          <Button primary  onClick={()=>update()} >Edit</Button> 
          <Button destructive onClick={() => setOpen(true)}>
            Delete 
          </Button>
          </div>
        </DataTableCell>
      </DataTableRow>
    </>
  );
}

export default Datatablerow;

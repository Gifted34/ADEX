import { Button, ButtonStrip } from "@dhis2/ui";
import React from "react";
import { Link } from "react-router-dom";
import GeneralForm from "../forms/general.form";
import GeneralInputs from "../forms/general.inputs";

export default function NewDataInitialization(props) {
 
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ButtonStrip end>
        <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
          <Button primary>Home</Button>
        </Link>
      </ButtonStrip>
      <div className="" style={{ marginTop: "10px" }}>
        <GeneralInputs
          styles={props?.styles}
          formInputs={props?.formInputs}
          formData={props?.formData}
          generalInputValues={props?.generalInputValues}
        />
      </div>
    </div>
  );
}

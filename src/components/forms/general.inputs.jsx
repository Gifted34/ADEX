import {
  Box,
  Button,
  Field,
  Input,
  SingleSelect,
  SingleSelectOption,
} from "@dhis2/ui";
import React, { useState, useEffect } from "react";
import PeriodsComponent from "./periodsComponent";

export default function GeneralInputs(props) {
  const [type, setType] = useState("EXTERNAL");
  const [formInputs, setFormInputs] = useState({
    dexname: "",
    url: "",
  });

  const inputsHandler = (e) => {
    setFormInputs({
      ...formInputs,
      [e?.name]: e?.value,
    });
  };
  const saveToDataStore = () => {
    if (
      type == null ||
      type == undefined ||
      type == "" ||
      formInputs?.dexname == null ||
      formInputs?.dexname == undefined ||
      formInputs?.dexname == "" ||
      formInputs?.url == null ||
      formInputs?.url == undefined ||
      formInputs?.url == ""
    ) {
    } else {
      props?.generalInputValues({ type, formInputs });
    }
  };
  useEffect(() => {
    console.clear();
  }, [formInputs]);

  return (
    <div
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Field label="General Details" className={`${props?.styles?.padding}`}>
        <div style={{ width: "700px" }}>
          <Input
            name="dexname"
            type="text"
            onChange={inputsHandler}
            placeholder="Name of aggregate data exchange. Unique."
            className={props?.styles?.marginBottom}
          />
          <Box className={props?.styles?.marginBottom}>
            <SingleSelect
              className="select"
              onChange={(e) => {
                setType(e.selected);
              }}
              selected={type}
            >
              <SingleSelectOption label="Internal" value="INTERNAL" />
              <SingleSelectOption label="External" value="EXTERNAL" />
            </SingleSelect>
          </Box>
          {type == "EXTERNAL" && (
            <Input
              name="url"
              type="text"
              onChange={inputsHandler}
              className={props?.styles?.marginBottom}
              placeholder="Base URL of target DHIS 2 instance, do not include the /api part."
            />
          )}

          <Button
            name="Primary button"
            onClick={saveToDataStore}
            primary
            value="save"
          >
            Save to DataStore
          </Button>
        </div>
      </Field>
    </div>
  );
}

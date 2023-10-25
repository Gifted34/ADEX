import {
  Box,
  Button,
  Field,
  Input,
  SingleSelect,
  SingleSelectOption,
} from "@dhis2/ui";
import React, { useState, useEffect } from "react";

export default function GeneralInputs(props) {
  const inputsHandler = (e) => {
    props?.setFormInputValues({
      ...props?.formInputValues,
      [e?.name]: e?.value,
    });
  };

  return (
    <div
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Field label="General Details">
        <div style={{ width: "100%" }}>
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
                props?.setType(e.selected);
              }}
              selected={props?.type}
            >
              <SingleSelectOption label="Internal" value="INTERNAL" />
              <SingleSelectOption label="External" value="EXTERNAL" />
            </SingleSelect>
          </Box>
          {props?.type == "EXTERNAL" && (
            <Input
              name="url"
              type="text"
              onChange={inputsHandler}
              className={props?.styles?.marginBottom}
              placeholder="Base URL of target DHIS 2 instance, do not include the /api part."
            />
          )}
        </div>
      </Field>
    </div>
  );
}

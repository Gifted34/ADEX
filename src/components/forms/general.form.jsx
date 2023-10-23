import { Box, Field, Input, SingleSelect, SingleSelectOption } from "@dhis2/ui";
import React, { useState, useEffect } from "react";
import PeriodsComponent from "./periodsComponent";

export default function GeneralForm(props) {
  const [type, setType] = useState("EXTERNAL");
  const [periodType, setPeriodType] = useState("Monthly");
  const [period1, setPeriod1] = useState();
  const [period2, setPeriod2] = useState();
  const [authType, setAuthType] = useState("BASICAUTH");
  const [formInputs, setFormInputs] = useState({
    dexname: "",
    sourcename: "",
    url: "",
    username: "",
    password: "",
    token: "",
    period: "",
  });

  const inputsHandler = (e) => {
    setFormInputs({
      ...formInputs,
      [e?.name]: e?.value,
    });
  };
  useEffect(() => {
    props?.formInputs({ type, authType, formInputs });
    console.clear();
  }, [formInputs]);

  return (
    <Field label="General" className={`${props?.styles?.padding}`}>
      <div style={{ width: "700px" }}>
        <Input
          name="dexname"
          type="text"
          onChange={inputsHandler}
          placeholder="Name of aggregate data exchange. Unique."
          className={props?.styles?.marginBottom}
        />
        <Input
          name="sourcename"
          type="text"
          onChange={inputsHandler}
          placeholder="Name of source request"
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
        <Box
          className={`${props?.styles?.marginBottom} ${props?.styles?.periodFields}`}
        >
          <SingleSelect
            className={`${props?.styles?.fields}`}
            onChange={(e) => {
              setPeriodType(e.selected);
            }}
            selected={periodType}
          >
            {props?.periodTypes?.map((periods, key) => {
              return (
                <SingleSelectOption
                  key={key}
                  label={periods?.name}
                  value={periods?.name}
                />
              );
            })}
          </SingleSelect>

          <Box className={`${props?.styles?.fields}`}>
            <PeriodsComponent
              periodType={periodType}
              inputHandler={inputsHandler}
              key={periodType}
              styles={props?.styles}
            />
          </Box>
        </Box>
        {type == "EXTERNAL" && (
          <Box className={props?.styles?.marginBottom}>
            <SingleSelect
              className={props?.styles?.marginBottom}
              selected={authType}
              onChange={(e) => {
                setAuthType(e.selected);
              }}
            >
              <SingleSelectOption label="Basic auth" value="BASICAUTH" />
              <SingleSelectOption label="Access Token" value="TOKEN" />
            </SingleSelect>
            {authType == "BASICAUTH" ? (
              <div
                style={{
                  width: "500px",
                  display: "flex",
                  flexFlow: "row",
                  gap: "10px",
                }}
              >
                <Input
                  name="username"
                  type="text"
                  onChange={inputsHandler}
                  placeholder="username"
                  className={props?.styles?.marginBottom}
                />
                <Input
                  name="password"
                  onChange={inputsHandler}
                  type="password"
                  className={props?.styles?.marginBottom}
                  placeholder="password"
                />
              </div>
            ) : (
              <div>
                <Input
                  name="token"
                  type="text"
                  onChange={inputsHandler}
                  placeholder="Paste the access token here..."
                  className={props?.styles?.marginBottom}
                />
              </div>
            )}
          </Box>
        )}
      </div>
    </Field>
  );
}

import {
  Box,
  Button,
  ButtonStrip,
  Field,
  Input,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  SingleSelect,
  SingleSelectOption,
} from "@dhis2/ui";
import React, { useEffect, useState } from "react";

export default function IntegrateDataStoreInitializationToDEX(props) {
  const inputsHandler = (e) => {
    props?.setAuthValues({
      ...props?.authValues,
      [e?.name]: e?.value,
    });
  };
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {props?.openIntegration && (
        <div className="" style={{ marginTop: "10px" }}>
          <Modal large position="middle">
            <ModalTitle>Initialize Integration</ModalTitle>
            <ModalContent>
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Field label="User credentials">
                  <div style={{ width: "100%" }}>
                    {props?.type == "EXTERNAL" && (
                      <Box className={props?.styles?.marginBottom}>
                        <SingleSelect
                          className={props?.styles?.marginBottom}
                          selected={props?.authType}
                          onChange={(e) => {
                            props?.setAuthType(e.selected);
                          }}
                        >
                          <SingleSelectOption
                            label="Basic auth"
                            value="BASICAUTH"
                          />
                          <SingleSelectOption
                            label="Access Token"
                            value="TOKEN"
                          />
                        </SingleSelect>
                        <div className="">
                          {props?.authType == "BASICAUTH" ? (
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
                                placeholder="Username"
                                className={props?.styles?.marginBottom}
                              />
                              <Input
                                name="password"
                                onChange={inputsHandler}
                                type="password"
                                className={props?.styles?.marginBottom}
                                placeholder="Password"
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
                        </div>
                      </Box>
                    )}
                  </div>
                </Field>
              </div>
            </ModalContent>
            <ModalActions>
              <ButtonStrip end>
                <Button
                  onClick={() => {
                    props?.setOpenIntegration(false);
                  }}
                  destructive
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    props?.initializeIntegration(props?.data);
                  }}
                  primary
                >
                  Save to Initialization
                </Button>
              </ButtonStrip>
            </ModalActions>
          </Modal>
        </div>
      )}
    </div>
  );
}

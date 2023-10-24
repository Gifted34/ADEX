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

export default function UpdateDataInitialization(props) {
  const inputsHandler = (e) => {
    props?.setUpdateFormInputValues({
      ...props?.updateFormInputValues,
      [e?.name]: e?.value,
    });
  };
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {props?.openUpdate && (
        <div className="" style={{ marginTop: "10px" }}>
          <Modal large position="middle">
            <ModalTitle>Update Initialization</ModalTitle>
            <ModalContent>
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Field label="General Details">
                  <div style={{ width: "100%" }}>
                    <Input
                      name="dexname"
                      type="text"
                      onChange={inputsHandler}
                      placeholder={props?.data?.value?.name}
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
                        placeholder={props?.data?.value?.url}
                      />
                    )}
                  </div>
                </Field>
              </div>
            </ModalContent>
            <ModalActions>
              <ButtonStrip end>
                <Button
                  onClick={() => {
                    props?.setOpenUpdate(false);
                  }}
                  destructive
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    props?.updateGeneralInputValues(props?.data);
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

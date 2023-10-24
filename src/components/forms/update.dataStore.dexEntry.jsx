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
import React, { useEffect } from "react";

export default function UpdateDataInitialization(props) {
  // var val = Math.floor(1000 + Math.random() * 9000);
  const inputsHandler = (e) => {
    props?.setFormInputValues({
      ...props?.formInputValues,
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
                      onChange={(e) => {
                        props?.setFormInputValues({
                          ...props?.formInputValues,
                          [e?.name]: e?.value,
                        });
                      }}
                      value={props?.data?.value?.dataValues?.name}
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
                        value={props?.data?.value?.dataValues?.url}
                        onChange={(e) => {
                          props?.setFormInputValues({
                            ...props?.formInputValues,
                            [e?.name]: e?.value,
                          });
                        }}
                        className={props?.styles?.marginBottom}
                        placeholder="Base URL of target DHIS 2 instance, do not include the /api part."
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
                  Save to DataStore
                </Button>
              </ButtonStrip>
            </ModalActions>
          </Modal>
        </div>
      )}
    </div>
  );
}

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
  const [data, setData] = useState({
    dexname: "",
    url: "",
  });
  const update = (e) => {
    props?.updateGeneralInputValues({ data: props?.data, values: data });
  };

  useEffect(() => {
    setData({
      ...data,
      dexname: props?.data?.value?.dexname,
      url: props?.data?.value?.url,
    });
  }, [props]);

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
                        setData({ ...data, dexname: e.value });
                      }}
                      // placeholder={props?.data?.value?.dexname}
                      className={props?.styles?.marginBottom}
                      value={data?.dexname}
                    />
                    <Box className={props?.styles?.marginBottom}>
                      <SingleSelect
                        className="select"
                        onChange={(e) => {
                          props?.setType(e.selected);
                        }}
                        selected={props?.data?.value?.type}
                      >
                        <SingleSelectOption label="Internal" value="INTERNAL" />
                        <SingleSelectOption label="External" value="EXTERNAL" />
                      </SingleSelect>
                    </Box>
                    {props?.type == "EXTERNAL" && (
                      <Input
                        name="url"
                        type="text"
                        onChange={(e) => {
                          setData({ ...data, url: e.value });
                        }}
                        value={data?.url}
                        className={props?.styles?.marginBottom}
                        // placeholder={props?.data?.value?.url}
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
                <Button onClick={update} primary>
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

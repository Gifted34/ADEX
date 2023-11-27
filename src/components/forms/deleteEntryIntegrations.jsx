import {
  Box,
  Button,
  ButtonStrip,
  DropdownButton,
  FlyoutMenu,
  Input,
  MenuItem,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Radio,
} from "@dhis2/ui";
import React, { useState, useEffect } from "react";

const CODE = (Math.floor(Math.random() * 10000) + 10000)
  .toString()
  .substring(1);
export default function DeleteIntegration({
  openDeleteIntegrations,
  setOpenDeleteIntegrations,
  aggregateDataExchanges,
  deleteDexIntegrations,
}) {
  const [confirmData, setConfirmData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [dropDownName, setDropDownName] = useState("Aggregate data echanges");

  // const
  return (
    <div>
      {openDeleteIntegrations && (
        <Modal large position="middle">
          <ModalTitle>Delete Data Exchange Integrations</ModalTitle>
          <ModalContent>
            <div className="" style={{ marginBottom: "20px" }}>
              <DropdownButton
                component={
                  <FlyoutMenu>
                    {aggregateDataExchanges?.map((dex, key) => {
                      return (
                        <MenuItem
                          label={dex?.displayName}
                          onClick={() => {
                            setDropDownName(dex?.displayName);
                            setSelected(dex?.id);
                          }}
                          value={dex?.id}
                        />
                      );
                    })}
                  </FlyoutMenu>
                }
                name="buttonName"
                value="buttonValue"
              >
                {dropDownName}
              </DropdownButton>
            </div>
            <ModalTitle>Comfirm with the code.</ModalTitle>
            <div className="">
              <p style={{ fontColor: "gray", fontSize: 20 }}>
                CODE : {`${CODE}`}
              </p>

              <Input
                type="text"
                onChange={(e) => setConfirmData(e.value)}
                placeholder="Enter the confirmation code"
              />
            </div>
            {/* <p>{data && data?.name}</p> */}
          </ModalContent>
          <ModalActions>
            <ButtonStrip end>
              <Button
                onClick={() => setOpenDeleteIntegrations(false)}
                destructive
              >
                No
              </Button>
              {CODE == confirmData && (
                <Button
                  onClick={() => {
                    deleteDexIntegrations(selected);
                  }}
                  primary
                >
                  Yes
                </Button>
              )}
              {CODE !== confirmData && (
                <Button secondary disabled>
                  Yes
                </Button>
              )}
            </ButtonStrip>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
}

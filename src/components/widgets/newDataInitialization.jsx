import {
  Button,
  ButtonStrip,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
} from "@dhis2/ui";
import React from "react";
import GeneralInputs from "../forms/general.inputs";

export default function NewDataInitialization(props) {
  // var val = Math.floor(1000 + Math.random() * 9000);
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {props?.open && (
        <div className="" style={{ marginTop: "10px" }}>
          <Modal large position="middle">
            <ModalTitle>New Initialization</ModalTitle>
            <ModalContent>
              <GeneralInputs
                styles={props?.styles}
                formInputValues={props?.formInputValues}
                formData={props?.formData}
                setRequestScheme={props?.setRequestScheme}
                setType={props?.setType}
                type={props?.type}
                idScheme={props?.idScheme}
                setFormInputValues={props?.setFormInputValues}
              />
            </ModalContent>
            <ModalActions>
              <ButtonStrip end>
                <Button
                  onClick={() => {
                    props?.setOpen(false);
                  }}
                  destructive
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    props?.saveGeneralInputValues();
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

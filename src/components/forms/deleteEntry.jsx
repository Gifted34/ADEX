import {
  Button,
  ButtonStrip,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
} from "@dhis2/ui";
import React from "react";

export default function DeleteEntry({
  openDelete,
  setOpenDelete,
  data,
  deleteDataEntry,
}) {
  return (
    <div>
      {openDelete && (
        <Modal large position="middle">
          <ModalTitle>Delete Entry</ModalTitle>
          <ModalContent>
            {!data?.value?.initialized ? (
              <ModalTitle>
                This entry is not yet initialized in data exchange!
              </ModalTitle>
            ) : (
              <></>
            )}
            <ModalTitle>Are sure you want to delete this entry?</ModalTitle>

            <p>{data && data?.name}</p>
          </ModalContent>
          <ModalActions>
            <ButtonStrip end>
              <Button onClick={() => setOpenDelete(false)} destructive>
                No
              </Button>
              <Button
                onClick={() => {
                  deleteDataEntry(data);
                }}
                primary
              >
                Yes
              </Button>
            </ButtonStrip>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
}

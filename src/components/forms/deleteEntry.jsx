import {
  Box,
  Button,
  ButtonStrip,
  Input,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
} from "@dhis2/ui";
import React, { useState } from "react";

const CODE = (Math.floor(Math.random() * 10000) + 10000)
  .toString()
  .substring(1);
export default function DeleteEntry({
  openDelete,
  setOpenDelete,
  data,
  deleteDataEntry,
}) {
  const [confirmData, setConfirmData] = useState(null);

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
            <ModalTitle>Comfirm with the code to delete this entry.</ModalTitle>
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
            <p>{data && data?.name}</p>
          </ModalContent>
          <ModalActions>
            <ButtonStrip end>
              <Button onClick={() => setOpenDelete(false)} destructive>
                No
              </Button>
              {CODE == confirmData && (
                <Button
                  onClick={() => {
                    deleteDataEntry(data);
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

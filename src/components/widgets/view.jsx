import { Button, ButtonStrip, Divider } from "@dhis2/ui";
import React from "react";
import { Link } from "react-router-dom";

export default function ViewDataStoreById() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ButtonStrip end>
        <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
          <Button primary>Home</Button>
        </Link>
      </ButtonStrip>
      <Divider />
      <div className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolore
        pariatur deserunt voluptatem ipsam dignissimos reiciendis saepe?
        Excepturi aperiam consectetur, perferendis accusantium, autem porro
        rerum officia nobis suscipit nemo vel.
      </div>
    </div>
  );
}

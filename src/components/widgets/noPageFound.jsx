import React from "react";

export default function NoPageFound() {
  return (
    <div
      style={{
        margin: "auto",
        width: "100%",
        height: "500px",
        display: "flex",
        textAlign:"center",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 32,
      }}
    >
      Error 404
      <br />
      No page found
    </div>
  );
}

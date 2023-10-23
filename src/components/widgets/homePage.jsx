import { Button, ButtonStrip, Divider } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import DataInitialized from "./dataInitialized";
import { useDataEngine } from "@dhis2/app-runtime";
import { Link } from "react-router-dom";

export default function HomePage(props) {
  const engine = useDataEngine();
  let dataStorePath = "dataStore/DEX_initializer_values";
  const [values, setValues] = useState([]);
  const getDataStoreDexValues = async (props) => {
    const query = {
      dataStore: {
        resource: dataStorePath,
        params: {
          fields: ["."],
        },
      },
    };

    try {
      const res = await engine?.query(query);
      return res;
      // res.then((data) => {
      //   setValues(data);
      // });
    } catch (e) {}
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ButtonStrip end>
        <Link to={"/new"}>
          <Button primary>Create new</Button>
        </Link>
      </ButtonStrip>
      <Divider />
      <div className="" style={{ marginTop: "10px" }}>
        <DataInitialized
          dataStoreDexValues={getDataStoreDexValues}
          data={[]}
          styles={props?.classes}
        />
      </div>
    </div>
  );
}

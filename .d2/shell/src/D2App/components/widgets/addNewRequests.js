import { Button, ButtonStrip, Box, Field, Input, AlertBar, Layer, SingleSelect, SingleSelectOption, Center, CircularLoader } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PeriodsWidget from "../forms/periodLayout";
import DataDimensionsCodes from "../forms/dataDimensionsCodes";
import OrgUnits from "../forms/orgUnits";
import { useDataEngine, useDataMutation } from "@dhis2/app-runtime";
import CustomScheme from "./customScheme";
export default function AddNewRequests(props) {
  var _props$data, _props$data$organisat, _props$data2, _props$data2$visualiz, _props$data3, _props$data3$dataElem, _props$data4, _props$data4$indicato, _props$data5, _props$data5$attribut, _props$request, _props$request2, _props$request3, _props$request4, _props$request5, _props$request6, _props$style, _props$style2, _props$style3, _props$request7, _props$style4, _props$style5, _props$style6, _props$style7, _props$style8, _props$request8, _props$style9, _props$request9, _props$request10, _props$style10;
  const engine = useDataEngine();
  const orgUnits = props === null || props === void 0 ? void 0 : (_props$data = props.data) === null || _props$data === void 0 ? void 0 : (_props$data$organisat = _props$data.organisationUnits) === null || _props$data$organisat === void 0 ? void 0 : _props$data$organisat.organisationUnits;
  const Visualizations = props === null || props === void 0 ? void 0 : (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : (_props$data2$visualiz = _props$data2.visualizations) === null || _props$data2$visualiz === void 0 ? void 0 : _props$data2$visualiz.visualizations;
  const dataElements = props === null || props === void 0 ? void 0 : (_props$data3 = props.data) === null || _props$data3 === void 0 ? void 0 : (_props$data3$dataElem = _props$data3.dataElements) === null || _props$data3$dataElem === void 0 ? void 0 : _props$data3$dataElem.dataElements;
  const indicators = props === null || props === void 0 ? void 0 : (_props$data4 = props.data) === null || _props$data4 === void 0 ? void 0 : (_props$data4$indicato = _props$data4.indicators) === null || _props$data4$indicato === void 0 ? void 0 : _props$data4$indicato.indicators;
  const attributes = props === null || props === void 0 ? void 0 : (_props$data5 = props.data) === null || _props$data5 === void 0 ? void 0 : (_props$data5$attribut = _props$data5.attribute) === null || _props$data5$attribut === void 0 ? void 0 : _props$data5$attribut.attributes;
  const path = location.pathname.split("/").slice(-1)[0];
  const dataStorePath = `dataStore/DEX_initializer_values/${props === null || props === void 0 ? void 0 : props.id}`;
  const [selectVisualisations, setVisualisation] = useState(props === null || props === void 0 ? void 0 : (_props$request = props.request) === null || _props$request === void 0 ? void 0 : _props$request.visualization);
  const [dx, setDx] = useState(props === null || props === void 0 ? void 0 : (_props$request2 = props.request) === null || _props$request2 === void 0 ? void 0 : _props$request2.dx);
  const [name, setName] = useState(props === null || props === void 0 ? void 0 : (_props$request3 = props.request) === null || _props$request3 === void 0 ? void 0 : _props$request3.name);
  const [periods, setPeriods] = useState(props === null || props === void 0 ? void 0 : (_props$request4 = props.request) === null || _props$request4 === void 0 ? void 0 : _props$request4.pe);
  const [orgS, setOrg] = useState(props === null || props === void 0 ? void 0 : (_props$request5 = props.request) === null || _props$request5 === void 0 ? void 0 : _props$request5.ou);
  const [hide, setHidden] = useState(true);
  const [errorHidden, setErrorHidden] = useState(true);
  const [errorMessage, setMessage] = useState();
  const [dataStore, setDataStore] = useState();
  const [loading, setLoading] = useState(false);
  const [Dx, setdx] = useState(props === null || props === void 0 ? void 0 : (_props$request6 = props.request) === null || _props$request6 === void 0 ? void 0 : _props$request6.dx);
  const [inputIDScheme, setInputIDScheme] = useState();
  const [outputIDScheme, setOutputIDScheme] = useState();
  const setData = selected => {
    setdx(selected);
    // const visualisationId = [];
    // Visualizations.map((Viz) => visualisationId.push(Viz.id));
    // setVisualisation(_.intersection(selected, visualisationId));
    // setDx(_.difference(selected, _.intersection(selected, visualisationId)));
  };

  const setOrgUnits = orgs => {
    let array = [];
    orgs === null || orgs === void 0 ? void 0 : orgs.map(object => {
      const arr = object.split("/");
      array.push(...arr.slice(-1));
    });
    let orgCode = [];
    orgUnits.map(org => {
      if (array.includes(org.id)) {
        orgCode.push(org.code);
      }
    });
    setOrg(orgCode);
  };

  // //fetchig data store values using the datastore key passed in the locations path
  const fetchData = async () => {
    const query = {
      dataStore: {
        resource: dataStorePath,
        params: {
          fields: ["."]
        }
      }
    };
    try {
      try {
        const res = await engine.query(query);
        setDataStore(res.dataStore);
      } catch (e) {}
    } catch (e) {}
  };
  //pushing data to dataStore
  const send = async data => {
    const myMutation = {
      resource: dataStorePath,
      type: "update",
      data: data
    };
    setLoading(false);
    await engine.mutate(myMutation).then(res => {
      if (res.httpStatusCode == 200) {
        setLoading(false);
        setHidden(false);
      }
    }).catch(e => {
      setMessage(e);
      setLoading(false);
      setErrorHidden(false);
    });
  };
  //updating the dataStore object in dataStore
  const saveData = () => {
    setLoading(true);
    if (name === undefined || name === null) {
      setLoading(false);
      setMessage("Request name is required");
      setErrorHidden(false);
    } else if (Dx === undefined || (Dx === null || Dx === void 0 ? void 0 : Dx.length) < 1) {
      setLoading(false);
      setMessage("No data elements,indicators,or visualisations selected");
      setErrorHidden(false);
    } else if (orgS === undefined || (orgS === null || orgS === void 0 ? void 0 : orgS.length) < 1) {
      setLoading(false);
      setMessage("No organisation units selected");
      setErrorHidden(false);
    } else if (periods === undefined || (periods === null || periods === void 0 ? void 0 : periods.length) < 1) {
      setLoading(false);
      setMessage("No periods selected");
      setErrorHidden(false);
    } else {
      var _dataStore$source;
      if ((dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$source = dataStore.source) === null || _dataStore$source === void 0 ? void 0 : _dataStore$source.requests) === undefined) {
        var dStore = {
          createdAt: dataStore.createdAt,
          dexname: dataStore.dexname,
          type: dataStore.type,
          url: dataStore.url,
          source: {
            requests: [{
              name: name,
              // visualization: selectVisualisations,
              dx: dx,
              pe: periods,
              ou: orgS,
              inputIdScheme: "code",
              outputIdScheme: "code"
            }]
          }
        };
        send(dStore);
      } else {
        var _dataStore$source2, _dataStore$source2$re;
        let arr = dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$source2 = dataStore.source) === null || _dataStore$source2 === void 0 ? void 0 : (_dataStore$source2$re = _dataStore$source2.requests) === null || _dataStore$source2$re === void 0 ? void 0 : _dataStore$source2$re.filter(req => req.name !== name);
        arr.push({
          name: name,
          // visualization: selectVisualisations,
          dx: dx,
          pe: periods,
          ou: orgS,
          inputIdScheme: "code",
          outputIdScheme: "code"
        });
        send({
          createdAt: dataStore.createdAt,
          dexname: dataStore.dexname,
          type: dataStore.type,
          url: dataStore.url,
          source: {
            requests: arr
          }
        });
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.padding
  }, loading && /*#__PURE__*/React.createElement(Layer, {
    translucent: true
  }, /*#__PURE__*/React.createElement(Center, null, /*#__PURE__*/React.createElement(CircularLoader, {
    large: true
  }))), /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.display
  }, /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style3 = props.style) === null || _props$style3 === void 0 ? void 0 : _props$style3.padding
  }, /*#__PURE__*/React.createElement(OrgUnits, {
    orgUnits: orgUnits,
    setOrg: setOrgUnits,
    selected: props === null || props === void 0 ? void 0 : (_props$request7 = props.request) === null || _props$request7 === void 0 ? void 0 : _props$request7.ou
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Box, {
    className: `${props === null || props === void 0 ? void 0 : (_props$style4 = props.style) === null || _props$style4 === void 0 ? void 0 : _props$style4.width} ${props === null || props === void 0 ? void 0 : (_props$style5 = props.style) === null || _props$style5 === void 0 ? void 0 : _props$style5.padding}`
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Name"
  }, /*#__PURE__*/React.createElement(Input, {
    onChange: e => {
      setName(e.value);
    },
    placeholder: "Enter request name",
    value: name
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Input IDScheme"
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    className: "select",
    onChange: e => setInputIDScheme(e.selected),
    prefix: "Select input Id scheme"
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "UID",
    value: "UID"
  }), /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "CODE",
    value: "CODE"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Output IDScheme"
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    className: "select",
    onChange: e => setOutputIDScheme(e.selected),
    prefix: "Select output Id scheme"
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "UID",
    value: "UID"
  }), /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "CODE",
    value: "CODE"
  }))), /*#__PURE__*/React.createElement("div", {
    className: `${props === null || props === void 0 ? void 0 : (_props$style6 = props.style) === null || _props$style6 === void 0 ? void 0 : _props$style6.padding}`
  }, /*#__PURE__*/React.createElement(CustomScheme, {
    style: props === null || props === void 0 ? void 0 : props.style,
    attributes: attributes
  }))), /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$style7 = props.style) === null || _props$style7 === void 0 ? void 0 : _props$style7.display
  }, /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style8 = props.style) === null || _props$style8 === void 0 ? void 0 : _props$style8.padding
  }, /*#__PURE__*/React.createElement(PeriodsWidget, {
    setPeriods: setPeriods,
    selected: props === null || props === void 0 ? void 0 : (_props$request8 = props.request) === null || _props$request8 === void 0 ? void 0 : _props$request8.pe
  })), /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style9 = props.style) === null || _props$style9 === void 0 ? void 0 : _props$style9.padding
  }, /*#__PURE__*/React.createElement(DataDimensionsCodes, {
    setData: setData,
    selectedDx: props === null || props === void 0 ? void 0 : (_props$request9 = props.request) === null || _props$request9 === void 0 ? void 0 : _props$request9.dx,
    selectedVis: props === null || props === void 0 ? void 0 : (_props$request10 = props.request) === null || _props$request10 === void 0 ? void 0 : _props$request10.visualization,
    dataElements: dataElements,
    indicators: indicators
    // visualizations={Visualizations}
  }))), /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$style10 = props.style) === null || _props$style10 === void 0 ? void 0 : _props$style10.padding
  }, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    destructive: true,
    large: true,
    onClick: () => props === null || props === void 0 ? void 0 : props.setPath("Home")
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    primary: true,
    large: true,
    onClick: () => saveData()
  }, "Save")), /*#__PURE__*/React.createElement(AlertBar, {
    warning: true,
    hidden: errorHidden,
    onHidden: () => setErrorHidden(true),
    duration: 2000
  }, errorMessage), /*#__PURE__*/React.createElement(AlertBar, {
    success: true,
    hidden: hide,
    duration: 2000,
    onHidden: () => {
      setHidden(true);
      setTimeout(() => props === null || props === void 0 ? void 0 : props.setPath("Home"), 1000);
    }
  }, "Initialisation saved succesifuly")))));
}
import { Button, ButtonStrip, Box, Field, Input, AlertBar, Layer, SingleSelect, SingleSelectOption, Center, CircularLoader } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PeriodsWidget from "../forms/periodLayout";
import DataDimensionsCodes from "../forms/dataDimensionsCodes";
import OrgUnits from "../forms/orgUnits";
import { useDataEngine, useDataMutation } from "@dhis2/app-runtime";
import CustomScheme from "./customScheme";
export default function AddNewRequests(props) {
  var _props$data, _props$data$organisat, _props$data2, _props$data2$visualiz, _props$data3, _props$data3$dataElem, _props$data4, _props$data4$indicato, _props$data5, _props$data5$attribut, _props$request, _props$request2, _props$request3, _props$request4, _props$request5, _props$request6, _props$request7, _props$style, _props$style2, _props$style3, _props$style4, _props$style5, _props$style6, _props$request13, _props$request14, _props$request15, _props$request16, _props$style7, _props$style8, _props$request17, _props$style9, _props$request18, _props$style10;
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
  const [dxattributes, setAttributes] = useState();
  const [dataStore, setDataStore] = useState();
  const [loading, setLoading] = useState(false);
  const [Dx, setdx] = useState(props === null || props === void 0 ? void 0 : (_props$request6 = props.request) === null || _props$request6 === void 0 ? void 0 : _props$request6.dx);
  const [selectedAttr, setSelected] = useState();
  const [inputIDScheme, setInputIDScheme] = useState(props === null || props === void 0 ? void 0 : (_props$request7 = props.request) === null || _props$request7 === void 0 ? void 0 : _props$request7.inputIdScheme);
  const [outputIDScheme, setOutputIDScheme] = useState();
  const [orgInputScheme, setOrgInputSchema] = useState(props === null || props === void 0 ? void 0 : props.orgUnitIdScheme);
  const [dxInputScheme, setDxInput] = useState(props === null || props === void 0 ? void 0 : props.dataElementIdScheme);
  const [orgOutputScheme, setOrgOutputScheme] = useState(props === null || props === void 0 ? void 0 : props.outputOrgUnitIdScheme);
  const [dxOutputScheme, setDxOutputScheme] = useState(props === null || props === void 0 ? void 0 : props.outputDataElementIdScheme);
  const setData = selected => {
    setdx(selected);
  };
  const orgPath = () => {
    const path = [];
    const orgss = orgUnits === null || orgUnits === void 0 ? void 0 : orgUnits.filter(org => (orgS === null || orgS === void 0 ? void 0 : orgS.includes(org.id)) || (orgS === null || orgS === void 0 ? void 0 : orgS.includes(org.code)));
    orgss.map(or => path.push(or.path));
    return path;
  };
  const setOrgUnits = orgs => {
    let array = [];
    orgs === null || orgs === void 0 ? void 0 : orgs.map(object => {
      const arr = object.split("/");
      array.push(...arr.slice(-1));
    });
    setOrg(array);
  };

  //set Data elements and indicators based on input scheme whether UID or Code
  const returnDx = () => {
    if (inputIDScheme === "CODE" || dxInputScheme === "CODE") {
      const indicator = indicators === null || indicators === void 0 ? void 0 : indicators.filter(indicator => Dx.includes(indicator.id));
      const dataElement = dataElements === null || dataElements === void 0 ? void 0 : dataElements.filter(dataElement => Dx.includes(dataElement.id));
      const arr = [...indicator, ...dataElement];
      const newArr = [];
      arr.map(ele => newArr.push(ele.code));
      return newArr;
    } else {
      return Dx;
    }
  };

  //set Orgunits based on input scheme whether UID or Code
  const Orgs = () => {
    if (orgInputScheme === "CODE" || inputIDScheme === "CODE") {
      const orgUn = orgUnits === null || orgUnits === void 0 ? void 0 : orgUnits.filter(orgUnit => orgS.includes(orgUnit.id));
      const newArr = [];
      orgUn.map(org => newArr.push(org.code));
      return newArr;
    } else {
      return orgS;
    }
  };

  //get dx from codes or ids for editing
  const getDX = () => {
    const dx = [...dataElements, ...indicators];
    const sele = dx === null || dx === void 0 ? void 0 : dx.filter(dx => {
      var _props$request8, _props$request8$dx, _props$request9, _props$request9$dx;
      return (props === null || props === void 0 ? void 0 : (_props$request8 = props.request) === null || _props$request8 === void 0 ? void 0 : (_props$request8$dx = _props$request8.dx) === null || _props$request8$dx === void 0 ? void 0 : _props$request8$dx.includes(dx.id)) || (props === null || props === void 0 ? void 0 : (_props$request9 = props.request) === null || _props$request9 === void 0 ? void 0 : (_props$request9$dx = _props$request9.dx) === null || _props$request9$dx === void 0 ? void 0 : _props$request9$dx.includes(dx.code));
    });
    const arr = [];
    sele.map(sel => arr.push(sel.id));
    return arr;
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
    } else if (inputIDScheme === undefined || outputIDScheme === undefined) {
      setLoading(false);
      setMessage("Specify input or output scheme");
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
      console.log(Orgs().length);
      if (returnDx().length === 0) {
        setLoading(false);
        setMessage("Selected data elements and indicators do not have codes");
        setErrorHidden(false);
      } else if (Orgs().length === 0) {
        setLoading(false);
        setMessage("Selected Organization units do not have codes");
        setErrorHidden(false);
      } else {
        var _dataStore$source;
        if ((dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$source = dataStore.source) === null || _dataStore$source === void 0 ? void 0 : _dataStore$source.requests) === undefined) {
          var _dataStore$request, _dataStore$request2, _dataStore$request3;
          let outp = selectedAttr !== undefined ? `${outputIDScheme}:${selectedAttr}` : outputIDScheme;
          var dStore = {
            createdAt: dataStore.createdAt,
            dexname: dataStore.dexname,
            type: dataStore.type,
            url: dataStore.url,
            request: {
              idScheme: dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$request = dataStore.request) === null || _dataStore$request === void 0 ? void 0 : _dataStore$request.idScheme,
              dataElementIdScheme: dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$request2 = dataStore.request) === null || _dataStore$request2 === void 0 ? void 0 : _dataStore$request2.dataElementIdScheme,
              orgUnitIdScheme: dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$request3 = dataStore.request) === null || _dataStore$request3 === void 0 ? void 0 : _dataStore$request3.orgUnitIdScheme
            },
            source: {
              requests: [{
                name: name,
                dx: returnDx(),
                pe: periods,
                ou: Orgs(),
                inputIdScheme: inputIDScheme,
                outputIdScheme: outp,
                orgUnitIdScheme: orgInputScheme,
                dataElementIdScheme: dxInputScheme,
                outputDataElementIdScheme: dxOutputScheme,
                outputOrgUnitIdScheme: orgOutputScheme
              }]
            }
          };
          send(dStore);
        } else {
          var _dataStore$source2, _dataStore$source2$re, _dataStore$request4, _dataStore$request5, _dataStore$request6;
          let outp = selectedAttr !== undefined ? `${outputIDScheme}:${selectedAttr}` : outputIDScheme;
          let arr = dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$source2 = dataStore.source) === null || _dataStore$source2 === void 0 ? void 0 : (_dataStore$source2$re = _dataStore$source2.requests) === null || _dataStore$source2$re === void 0 ? void 0 : _dataStore$source2$re.filter(req => req.name !== name);
          arr.push({
            name: name,
            dx: returnDx(),
            pe: periods,
            ou: Orgs(),
            inputIdScheme: inputIDScheme,
            outputIdScheme: outp,
            orgUnitIdScheme: orgInputScheme,
            dataElementIdScheme: dxInputScheme,
            outputDataElementIdScheme: dxOutputScheme,
            outputOrgUnitIdScheme: orgOutputScheme
          });
          send({
            createdAt: dataStore.createdAt,
            dexname: dataStore.dexname,
            type: dataStore.type,
            url: dataStore.url,
            request: {
              idScheme: dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$request4 = dataStore.request) === null || _dataStore$request4 === void 0 ? void 0 : _dataStore$request4.idScheme,
              dataElementIdScheme: dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$request5 = dataStore.request) === null || _dataStore$request5 === void 0 ? void 0 : _dataStore$request5.dataElementIdScheme,
              orgUnitIdScheme: dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$request6 = dataStore.request) === null || _dataStore$request6 === void 0 ? void 0 : _dataStore$request6.orgUnitIdScheme
            },
            source: {
              requests: arr
            }
          });
        }
      }
    }
  };
  useEffect(() => {
    var _props$request10, _props$request10$outp;
    fetchData();
    setAttributes(attributes === null || attributes === void 0 ? void 0 : attributes.filter(attr => {
      var _attr$objectTypes, _attr$objectTypes2;
      return (attr === null || attr === void 0 ? void 0 : (_attr$objectTypes = attr.objectTypes) === null || _attr$objectTypes === void 0 ? void 0 : _attr$objectTypes.includes('DATA_ELEMENT')) || (attr === null || attr === void 0 ? void 0 : (_attr$objectTypes2 = attr.objectTypes) === null || _attr$objectTypes2 === void 0 ? void 0 : _attr$objectTypes2.includes('INDICATOR'));
    }));
    if (props !== null && props !== void 0 && (_props$request10 = props.request) !== null && _props$request10 !== void 0 && (_props$request10$outp = _props$request10.outputIdScheme) !== null && _props$request10$outp !== void 0 && _props$request10$outp.includes('attribute')) {
      var _props$request11, _props$request11$outp;
      const strings = props === null || props === void 0 ? void 0 : (_props$request11 = props.request) === null || _props$request11 === void 0 ? void 0 : (_props$request11$outp = _props$request11.outputIdScheme) === null || _props$request11$outp === void 0 ? void 0 : _props$request11$outp.split(':');
      setOutputIDScheme(strings[0]);
      setSelected(strings[1]);
    } else {
      var _props$request12;
      setOutputIDScheme(props === null || props === void 0 ? void 0 : (_props$request12 = props.request) === null || _props$request12 === void 0 ? void 0 : _props$request12.outputIdScheme);
    }
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
    selected: orgPath()
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
  })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Field, {
    label: "Input IDScheme"
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    selected: inputIDScheme,
    className: "select",
    onChange: e => setInputIDScheme(e.selected),
    placeholder: "Select input Id scheme"
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "UID",
    value: "UID"
  }), /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "CODE",
    value: "CODE"
  })), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement(Field, {
    label: "Output IDScheme"
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    selected: outputIDScheme === 'attribute' ? outputIDScheme.split(':')[0] : outputIDScheme,
    className: "select",
    onChange: e => setOutputIDScheme(e.selected),
    placeholder: "Select output Id scheme"
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "UID",
    value: "UID"
  }), /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "CODE",
    value: "CODE"
  }), /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "attribute",
    value: "attribute"
  }))), /*#__PURE__*/React.createElement("br", null), (outputIDScheme === null || outputIDScheme === void 0 ? void 0 : outputIDScheme.includes('attribute')) && /*#__PURE__*/React.createElement(Field, {
    label: "Output IDScheme"
  }, /*#__PURE__*/React.createElement(SingleSelect, {
    selected: selectedAttr,
    className: "select",
    onChange: e => {
      setSelected(e.selected);
    },
    placeholder: "Select output Id scheme"
  }, dxattributes === null || dxattributes === void 0 ? void 0 : dxattributes.map(attr => /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: attr.displayName,
    value: attr.id
  })))), /*#__PURE__*/React.createElement("div", {
    className: `${props === null || props === void 0 ? void 0 : (_props$style6 = props.style) === null || _props$style6 === void 0 ? void 0 : _props$style6.padding}`
  }, /*#__PURE__*/React.createElement(CustomScheme, {
    style: props === null || props === void 0 ? void 0 : props.style,
    attributes: attributes,
    dataElementIdScheme: props === null || props === void 0 ? void 0 : (_props$request13 = props.request) === null || _props$request13 === void 0 ? void 0 : _props$request13.dataElementIdScheme,
    orgUnitIdScheme: props === null || props === void 0 ? void 0 : (_props$request14 = props.request) === null || _props$request14 === void 0 ? void 0 : _props$request14.orgUnitIdScheme,
    outputDataElementIdScheme: props === null || props === void 0 ? void 0 : (_props$request15 = props.request) === null || _props$request15 === void 0 ? void 0 : _props$request15.outputDataElementIdScheme,
    outputOrgUnitIdScheme: props === null || props === void 0 ? void 0 : (_props$request16 = props.request) === null || _props$request16 === void 0 ? void 0 : _props$request16.outputOrgUnitIdScheme,
    setOrgInputSchema: setOrgInputSchema,
    setDxInput: setDxInput,
    setOrgOutputScheme: setOrgOutputScheme,
    setDxOutputScheme: setDxOutputScheme
  }))), /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$style7 = props.style) === null || _props$style7 === void 0 ? void 0 : _props$style7.display
  }, /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style8 = props.style) === null || _props$style8 === void 0 ? void 0 : _props$style8.padding
  }, /*#__PURE__*/React.createElement(PeriodsWidget, {
    setPeriods: setPeriods,
    selected: props === null || props === void 0 ? void 0 : (_props$request17 = props.request) === null || _props$request17 === void 0 ? void 0 : _props$request17.pe
  })), /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style9 = props.style) === null || _props$style9 === void 0 ? void 0 : _props$style9.padding
  }, /*#__PURE__*/React.createElement(DataDimensionsCodes, {
    setData: setData,
    selectedDx: getDX(),
    selectedVis: props === null || props === void 0 ? void 0 : (_props$request18 = props.request) === null || _props$request18 === void 0 ? void 0 : _props$request18.visualization,
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
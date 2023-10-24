import { Button, ButtonStrip, Box, Field, Input, AlertBar, Layer, Center, CircularLoader } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PeriodsWidget from "../forms/periodLayout";
import DataDimensionsCodes from "../forms/dataDimensionsCodes";
import OrgUnits from "../forms/orgUnits";
import { useDataEngine, useDataMutation } from "@dhis2/app-runtime";
export default function AddNewRequests(props) {
  var _props$data, _props$data$organisat, _props$data2, _props$data2$visualiz, _props$data3, _props$data3$dataElem, _props$data4, _props$data4$indicato, _props$style, _props$style2, _props$style3, _props$style4, _props$style5, _props$style6, _props$style7, _props$style8, _props$style9;
  const engine = useDataEngine();
  const location = useLocation();
  const orgUnits = props === null || props === void 0 ? void 0 : (_props$data = props.data) === null || _props$data === void 0 ? void 0 : (_props$data$organisat = _props$data.organisationUnits) === null || _props$data$organisat === void 0 ? void 0 : _props$data$organisat.organisationUnits;
  const Visualizations = props === null || props === void 0 ? void 0 : (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : (_props$data2$visualiz = _props$data2.visualizations) === null || _props$data2$visualiz === void 0 ? void 0 : _props$data2$visualiz.visualizations;
  const dataElements = props === null || props === void 0 ? void 0 : (_props$data3 = props.data) === null || _props$data3 === void 0 ? void 0 : (_props$data3$dataElem = _props$data3.dataElements) === null || _props$data3$dataElem === void 0 ? void 0 : _props$data3$dataElem.dataElements;
  const indicators = props === null || props === void 0 ? void 0 : (_props$data4 = props.data) === null || _props$data4 === void 0 ? void 0 : (_props$data4$indicato = _props$data4.indicators) === null || _props$data4$indicato === void 0 ? void 0 : _props$data4$indicato.indicators;
  const path = location.pathname.split('/').slice(-1)[0];
  const dataStorePath = `dataStore/DEX_initializer_values/${path}`;
  const navigate = useNavigate();
  const [selectVisualisations, setVisualisation] = useState();
  const [dx, setDx] = useState();
  const [name, setName] = useState();
  const [periods, setPeriods] = useState();
  const [orgS, setOrg] = useState();
  const [hide, setHidden] = useState(true);
  const [errorHidden, setErrorHidden] = useState(true);
  const [errorMessage, setMessage] = useState();
  const [dataStore, setDataStore] = useState();
  const [loading, setLoading] = useState(false);
  const [Dx, setdx] = useState();
  const setData = selected => {
    setdx(selected);
    const visualisationId = [];
    Visualizations.map(Viz => visualisationId.push(Viz.id));
    setVisualisation(_.intersection(selected, visualisationId));
    setDx(_.difference(selected, _.intersection(selected, visualisationId)));
  };
  const setorgUnits = orgUnits => {
    let array = [];
    orgUnits === null || orgUnits === void 0 ? void 0 : orgUnits.map(object => {
      const arr = object.split('/');
      array.push(...arr.slice(-1));
    });
    setOrg(array);
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
      setMessage('Request name is required');
      setErrorHidden(false);
    } else if (Dx === undefined || (Dx === null || Dx === void 0 ? void 0 : Dx.length) < 1) {
      setLoading(false);
      setMessage('No data elements,indicators,or visualisations selected');
      setErrorHidden(false);
    } else if (orgS === undefined || (orgS === null || orgS === void 0 ? void 0 : orgS.length) < 1) {
      setLoading(false);
      setMessage('No organisation units selected');
      setErrorHidden(false);
    } else if (periods === undefined || (periods === null || periods === void 0 ? void 0 : periods.length) < 1) {
      setLoading(false);
      setMessage('No periods selected');
      setErrorHidden(false);
    } else {
      var _dataStore$source;
      if ((dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$source = dataStore.source) === null || _dataStore$source === void 0 ? void 0 : _dataStore$source.request) === undefined) {
        var dStore = {
          'createdAt': dataStore.createdAt,
          'dexname': dataStore.dexname,
          'type': dataStore.type,
          'url': dataStore.url,
          'source': {
            'request': [{
              'name': name,
              "visualization": selectVisualisations,
              'dx': dx,
              'pe': periods,
              'ou': orgS,
              'inputIdScheme': "code",
              'outputIdScheme': "code"
            }]
          }
        };
        send(dStore);
      } else {
        var _dataStore$source2;
        let arr = dataStore === null || dataStore === void 0 ? void 0 : (_dataStore$source2 = dataStore.source) === null || _dataStore$source2 === void 0 ? void 0 : _dataStore$source2.request;
        arr.push({
          'name': name,
          "visualization": selectVisualisations,
          'dx': dx,
          'pe': periods,
          'ou': orgS,
          'inputIdScheme': "code",
          'outputIdScheme': "code"
        });
        send({
          'createdAt': dataStore.createdAt,
          'dexname': dataStore.dexname,
          'type': dataStore.type,
          'url': dataStore.url,
          'source': {
            'request': arr
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
    setOrg: setorgUnits
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Box, {
    className: `${props === null || props === void 0 ? void 0 : (_props$style4 = props.style) === null || _props$style4 === void 0 ? void 0 : _props$style4.width} ${props === null || props === void 0 ? void 0 : (_props$style5 = props.style) === null || _props$style5 === void 0 ? void 0 : _props$style5.padding}`
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Name"
  }, /*#__PURE__*/React.createElement(Input, {
    onChange: e => {
      setName(e.value);
    },
    placeholder: "Enter request name"
  }))), /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$style6 = props.style) === null || _props$style6 === void 0 ? void 0 : _props$style6.display
  }, /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style7 = props.style) === null || _props$style7 === void 0 ? void 0 : _props$style7.padding
  }, /*#__PURE__*/React.createElement(PeriodsWidget, {
    setPeriods: setPeriods
  })), /*#__PURE__*/React.createElement(Box, {
    className: props === null || props === void 0 ? void 0 : (_props$style8 = props.style) === null || _props$style8 === void 0 ? void 0 : _props$style8.padding
  }, /*#__PURE__*/React.createElement(DataDimensionsCodes, {
    setData: setData,
    dataElements: dataElements,
    indicators: indicators,
    visualizations: Visualizations
  }))), /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$style9 = props.style) === null || _props$style9 === void 0 ? void 0 : _props$style9.padding
  }, /*#__PURE__*/React.createElement(ButtonStrip, {
    end: true
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    large: true,
    onClick: () => saveData()
  }, "Save"), /*#__PURE__*/React.createElement(Link, {
    to: "/",
    style: {
      textDecoration: "none",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    large: true
  }, "Cancel"))), /*#__PURE__*/React.createElement(AlertBar, {
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
      navigate('/');
    }
  }, "Innitialisation saved succesifuly")))));
}
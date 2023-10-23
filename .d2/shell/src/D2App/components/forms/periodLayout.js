import React, { useState, useEffect } from "react";
import { Field, Transfer } from "@dhis2/ui";
import { Periods } from "../../Services/fixedPeriods";
import periodsSelectedController from "../../services/periods.service";
import { RelativePeriods } from "../../Services/relativePeriods";
import LeftHeader from "../widgets/periodHeader";
import Period from "../../Services/getPeriod";
const relativePeriodtypes = [{
  name: "Weeks"
}, {
  name: "Bi-weeks"
}, {
  name: "Months"
}, {
  name: "Bi-months"
}, {
  name: "Quarters"
}, {
  name: "Six-months"
}, {
  name: "Financial Years"
}, {
  name: "Years"
}];
const periIod = new Period();
export default function PeriodsWidget(props) {
  var _props$style;
  const [selectedDimensions, setselectedDimensions] = useState([]);
  const [filterTerm, setFilter] = useState('');
  const [year, setValue] = useState(new Date().getFullYear());
  const [periodType, setPeriodType] = useState("Months");
  const [periodTypes, setPeriodTypes] = useState(relativePeriodtypes);
  const [relative, setRelative] = useState(true);
  const [periodOption, setPeriodOtpions] = useState([...periIod.relativePeriod(), ...periIod.fixedPeriod(year)]);
  const setPeriods = year => {
    setValue(year);
    let Periods = periodOption;
    Periods.push(...periIod.fixedPeriod(year));
    setPeriodOtpions(_.uniqBy(Periods, 'value'));
  };
  const filterCallback = (options, filter) => {
    if (relative) {
      const opt = options.filter(object => (object === null || object === void 0 ? void 0 : object.dimension) === 'relative' && object.type === periodType);
      return opt;
    } else {
      const opt = options.filter(object => object.dimension === undefined && object.type === periodType);
      if (periodType === 'Years') {
        return opt;
      } else {
        return opt.filter(object => object.label.includes(year));
      }
    }
  };
  const useEffect = (() => {
    console.log(props);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: props === null || props === void 0 ? void 0 : (_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.marginLeft
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Periods"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px",
      width: "700px"
    }
  }, /*#__PURE__*/React.createElement(Transfer, {
    leftHeader: /*#__PURE__*/React.createElement(LeftHeader, {
      styles: props === null || props === void 0 ? void 0 : props.styles,
      periodOption: periodOption,
      periodType: periodTypes,
      period: periodType,
      setPeriod: setPeriodType,
      setPeriodOtpions: setPeriodOtpions,
      year: year,
      setRelative: setRelative,
      setPeriods: setPeriods
    }),
    height: "400px",
    filterable: true,
    hideFilterInput: true,
    onChange: e => {
      props === null || props === void 0 ? void 0 : props.selectedPeriod(e.selected);
      setselectedDimensions(e.selected);
    },
    searchTerm: filterTerm,
    onFilterChange: Value => {
      setFilter(Value);
    },
    filterCallback: filterCallback,
    options: periodOption,
    selected: selectedDimensions,
    selectedEmptyComponent: /*#__PURE__*/React.createElement("p", {
      style: {
        textAlign: "center",
        fontSize: "14px",
        color: "gray"
      }
    }, "You have not selected anything yet...", /*#__PURE__*/React.createElement("br", null))
  }))));
}
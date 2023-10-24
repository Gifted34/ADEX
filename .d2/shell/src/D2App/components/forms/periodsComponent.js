import { CalendarInput, Field, Input, SingleSelect, SingleSelectOption } from "@dhis2/ui";
import React, { useState, useEffect, useRef } from "react";
import Periods from "../../services/periods.service";
import { async } from "q";
import { flushSync } from "react-dom";
const periods = new Periods();
export default function PeriodsComponent(props) {
  const year = useRef(0);
  const [periodValue1, setPeriodValue1] = useState();
  const [periodValue2, setPeriodValue2] = useState();
  const periodsSelect = periodType => {
    if (periodType == "WeeklyWednesday") {
      var _periods$GetWeekly;
      return /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue2(e.selected);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: `${year.current}${e.selected}`
          });
        },
        selected: periodValue2
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetWeekly = periods.GetWeekly()) === null || _periods$GetWeekly === void 0 ? void 0 : _periods$GetWeekly.map((week, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: week === null || week === void 0 ? void 0 : week.name,
          value: "Wed" + (week === null || week === void 0 ? void 0 : week.value)
        });
      }));
    } else if (periodType == "Weekly") {
      var _periods$GetWeekly2;
      return /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue2(e.selected);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: `${year.current}${e.selected}`
          });
        },
        selected: periodValue2
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetWeekly2 = periods.GetWeekly()) === null || _periods$GetWeekly2 === void 0 ? void 0 : _periods$GetWeekly2.map((week, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: week === null || week === void 0 ? void 0 : week.name,
          value: week === null || week === void 0 ? void 0 : week.value
        });
      }));
    } else if (periodType == "WeeklyThursday") {
      var _periods$GetWeekly3;
      return /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue2(e.selected);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: `${year.current}${e.selected}`
          });
        },
        selected: periodValue2
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetWeekly3 = periods.GetWeekly()) === null || _periods$GetWeekly3 === void 0 ? void 0 : _periods$GetWeekly3.map((week, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: week === null || week === void 0 ? void 0 : week.name,
          value: "Thu" + (week === null || week === void 0 ? void 0 : week.value)
        });
      }));
    } else if (periodType == "WeeklySaturday") {
      var _periods$GetWeekly4;
      return /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue2(e.selected);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: `${year.current}${e.selected}`
          });
        },
        selected: periodValue2
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetWeekly4 = periods.GetWeekly()) === null || _periods$GetWeekly4 === void 0 ? void 0 : _periods$GetWeekly4.map((week, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: week === null || week === void 0 ? void 0 : week.name,
          value: "Sat" + (week === null || week === void 0 ? void 0 : week.value)
        });
      }));
    } else if (periodType == "WeeklySunday") {
      var _periods$GetWeekly5;
      return /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue2(e.selected);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: `${year.current}${e.selected}`
          });
        },
        selected: periodValue2
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetWeekly5 = periods.GetWeekly()) === null || _periods$GetWeekly5 === void 0 ? void 0 : _periods$GetWeekly5.map((week, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: week === null || week === void 0 ? void 0 : week.name,
          value: "Sun" + (week === null || week === void 0 ? void 0 : week.value)
        });
      }));
    } else if (periodType == "BiWeekly") {
      var _periods$GetBiWeekly;
      return /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue2(e.selected);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: `${year.current}${e.selected}`
          });
        },
        selected: periodValue2
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetBiWeekly = periods.GetBiWeekly()) === null || _periods$GetBiWeekly === void 0 ? void 0 : _periods$GetBiWeekly.map((biWeekly, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: biWeekly === null || biWeekly === void 0 ? void 0 : biWeekly.name,
          value: biWeekly === null || biWeekly === void 0 ? void 0 : biWeekly.value
        });
      }));
    } else if (periodType == "Monthly") {
      var _periods$GetMonthly;
      return /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue2(e.selected);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: `${year.current}${e.selected}`
          });
        },
        selected: periodValue2
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetMonthly = periods.GetMonthly()) === null || _periods$GetMonthly === void 0 ? void 0 : _periods$GetMonthly.map((month, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: month === null || month === void 0 ? void 0 : month.name,
          value: month === null || month === void 0 ? void 0 : month.value
        });
      }));
    } else if (periodType == "BiMonthly") {
      var _periods$GetBiMonthly;
      return /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue2(e.selected);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: `${year.current}${e.selected}`
          });
        },
        selected: periodValue2
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetBiMonthly = periods.GetBiMonthly()) === null || _periods$GetBiMonthly === void 0 ? void 0 : _periods$GetBiMonthly.map((biMonthly, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: biMonthly === null || biMonthly === void 0 ? void 0 : biMonthly.name,
          value: biMonthly === null || biMonthly === void 0 ? void 0 : biMonthly.value
        });
      }));
    } else if (periodType == "Quarterly") {
      var _periods$GetQuarterly;
      return /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue2(e.selected);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: `${year.current}${e.selected}`
          });
        },
        selected: periodValue2
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetQuarterly = periods.GetQuarterly()) === null || _periods$GetQuarterly === void 0 ? void 0 : _periods$GetQuarterly.map((quarterly, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: quarterly === null || quarterly === void 0 ? void 0 : quarterly.name,
          value: quarterly === null || quarterly === void 0 ? void 0 : quarterly.value
        });
      }));
    } else if (periodType == "SixMonthly") {
      var _periods$GetSixMonthl;
      return /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue2(e.selected);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: `${year.current}${e.selected}`
          });
        },
        selected: periodValue2
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetSixMonthl = periods.GetSixMonthly()) === null || _periods$GetSixMonthl === void 0 ? void 0 : _periods$GetSixMonthl.map((sixMonthly, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: sixMonthly === null || sixMonthly === void 0 ? void 0 : sixMonthly.name,
          value: sixMonthly === null || sixMonthly === void 0 ? void 0 : sixMonthly.value
        });
      }));
    } else if (periodType == "SixMonthlyApril") {} else if (periodType == "SixMonthlyNov") {} else if (periodType == "FinancialApril") {} else if (periodType == "FinancialJuly") {} else if (periodType == "FinancialOct") {} else if (periodType == "FinancialNov") {}
  };
  const periodTypeHandler = periodType => {
    if (periodType == "Daily") {
      var _props$styles, _props$styles2;
      return /*#__PURE__*/React.createElement("div", {
        className: `${props === null || props === void 0 ? void 0 : (_props$styles = props.styles) === null || _props$styles === void 0 ? void 0 : _props$styles.fieldSelected}`
      }, /*#__PURE__*/React.createElement(Input, {
        name: "daily",
        type: "date",
        onChange: e => {
          let date = e.value.replace(/-/g, "");
          setPeriodValue1(date);
          props === null || props === void 0 ? void 0 : props.inputHandler({
            name: "period",
            value: date
          });
        },
        placeholder: "Date",
        className: props === null || props === void 0 ? void 0 : (_props$styles2 = props.styles) === null || _props$styles2 === void 0 ? void 0 : _props$styles2.marginBottom
      }));
    } else {
      var _props$styles3, _periods$GetYearly;
      return /*#__PURE__*/React.createElement("div", {
        className: `${props === null || props === void 0 ? void 0 : (_props$styles3 = props.styles) === null || _props$styles3 === void 0 ? void 0 : _props$styles3.fieldSelected}`
      }, /*#__PURE__*/React.createElement(SingleSelect, {
        className: "select",
        onChange: e => {
          setPeriodValue1(e.selected);
          year.current = e.selected;
          if (periodType === "Yearly") {
            props === null || props === void 0 ? void 0 : props.inputHandler({
              name: "period",
              value: e.selected
            });
          }
        },
        placeholder: "--- Select year ---",
        selected: periodValue1
      }, periods === null || periods === void 0 ? void 0 : (_periods$GetYearly = periods.GetYearly()) === null || _periods$GetYearly === void 0 ? void 0 : _periods$GetYearly.map((year, key) => {
        return /*#__PURE__*/React.createElement(SingleSelectOption, {
          key: key,
          label: year,
          value: year.toString()
        });
      })), periodsSelect(periodType));
    }
  };
  return /*#__PURE__*/React.createElement("div", null, periodTypeHandler(props === null || props === void 0 ? void 0 : props.periodType));
}
import {
  CalendarInput,
  Field,
  Input,
  SingleSelect,
  SingleSelectOption,
} from "@dhis2/ui";
import React, { useState, useEffect, useRef } from "react";
import Periods from "../../services/periods.service";
import { async } from "q";
import { flushSync } from "react-dom";
const periods = new Periods();

export default function PeriodsComponent(props) {
  const year = useRef(0);
  const [periodValue1, setPeriodValue1] = useState();
  const [periodValue2, setPeriodValue2] = useState();

  const periodsSelect = (periodType) => {
    if (periodType == "WeeklyWednesday") {
      return (
        <SingleSelect
          className="select"
          onChange={(e) => {
            setPeriodValue2(e.selected);
            props?.inputHandler({
              name: "period",
              value: `${year.current}${e.selected}`,
            });
          }}
          selected={periodValue2}
        >
          {periods?.GetWeekly()?.map((week, key) => {
            return (
              <SingleSelectOption
                key={key}
                label={week?.name}
                value={"Wed" + week?.value}
              />
            );
          })}
        </SingleSelect>
      );
    } else if (periodType == "Weekly") {
      return (
        <SingleSelect
          className="select"
          onChange={(e) => {
            setPeriodValue2(e.selected);
            props?.inputHandler({
              name: "period",
              value: `${year.current}${e.selected}`,
            });
          }}
          selected={periodValue2}
        >
          {periods?.GetWeekly()?.map((week, key) => {
            return (
              <SingleSelectOption
                key={key}
                label={week?.name}
                value={week?.value}
              />
            );
          })}
        </SingleSelect>
      );
    } else if (periodType == "WeeklyThursday") {
      return (
        <SingleSelect
          className="select"
          onChange={(e) => {
            setPeriodValue2(e.selected);
            props?.inputHandler({
              name: "period",
              value: `${year.current}${e.selected}`,
            });
          }}
          selected={periodValue2}
        >
          {periods?.GetWeekly()?.map((week, key) => {
            return (
              <SingleSelectOption
                key={key}
                label={week?.name}
                value={"Thu" + week?.value}
              />
            );
          })}
        </SingleSelect>
      );
    } else if (periodType == "WeeklySaturday") {
      return (
        <SingleSelect
          className="select"
          onChange={(e) => {
            setPeriodValue2(e.selected);
            props?.inputHandler({
              name: "period",
              value: `${year.current}${e.selected}`,
            });
          }}
          selected={periodValue2}
        >
          {periods?.GetWeekly()?.map((week, key) => {
            return (
              <SingleSelectOption
                key={key}
                label={week?.name}
                value={"Sat" + week?.value}
              />
            );
          })}
        </SingleSelect>
      );
    } else if (periodType == "WeeklySunday") {
      return (
        <SingleSelect
          className="select"
          onChange={(e) => {
            setPeriodValue2(e.selected);
            props?.inputHandler({
              name: "period",
              value: `${year.current}${e.selected}`,
            });
          }}
          selected={periodValue2}
        >
          {periods?.GetWeekly()?.map((week, key) => {
            return (
              <SingleSelectOption
                key={key}
                label={week?.name}
                value={"Sun" + week?.value}
              />
            );
          })}
        </SingleSelect>
      );
    } else if (periodType == "BiWeekly") {
      return (
        <SingleSelect
          className="select"
          onChange={(e) => {
            setPeriodValue2(e.selected);
            props?.inputHandler({
              name: "period",
              value: `${year.current}${e.selected}`,
            });
          }}
          selected={periodValue2}
        >
          {periods?.GetBiWeekly()?.map((biWeekly, key) => {
            return (
              <SingleSelectOption
                key={key}
                label={biWeekly?.name}
                value={biWeekly?.value}
              />
            );
          })}
        </SingleSelect>
      );
    } else if (periodType == "Monthly") {
      return (
        <SingleSelect
          className="select"
          onChange={(e) => {
            setPeriodValue2(e.selected);
            props?.inputHandler({
              name: "period",
              value: `${year.current}${e.selected}`,
            });
          }}
          selected={periodValue2}
        >
          {periods?.GetMonthly()?.map((month, key) => {
            return (
              <SingleSelectOption
                key={key}
                label={month?.name}
                value={month?.value}
              />
            );
          })}
        </SingleSelect>
      );
    } else if (periodType == "BiMonthly") {
      return (
        <SingleSelect
          className="select"
          onChange={(e) => {
            setPeriodValue2(e.selected);
            props?.inputHandler({
              name: "period",
              value: `${year.current}${e.selected}`,
            });
          }}
          selected={periodValue2}
        >
          {periods?.GetBiMonthly()?.map((biMonthly, key) => {
            return (
              <SingleSelectOption
                key={key}
                label={biMonthly?.name}
                value={biMonthly?.value}
              />
            );
          })}
        </SingleSelect>
      );
    } else if (periodType == "Quarterly") {
      return (
        <SingleSelect
          className="select"
          onChange={(e) => {
            setPeriodValue2(e.selected);
            props?.inputHandler({
              name: "period",
              value: `${year.current}${e.selected}`,
            });
          }}
          selected={periodValue2}
        >
          {periods?.GetQuarterly()?.map((quarterly, key) => {
            return (
              <SingleSelectOption
                key={key}
                label={quarterly?.name}
                value={quarterly?.value}
              />
            );
          })}
        </SingleSelect>
      );
    } else if (periodType == "SixMonthly") {
      return (
        <SingleSelect
          className="select"
          onChange={(e) => {
            setPeriodValue2(e.selected);
            props?.inputHandler({
              name: "period",
              value: `${year.current}${e.selected}`,
            });
          }}
          selected={periodValue2}
        >
          {periods?.GetSixMonthly()?.map((sixMonthly, key) => {
            return (
              <SingleSelectOption
                key={key}
                label={sixMonthly?.name}
                value={sixMonthly?.value}
              />
            );
          })}
        </SingleSelect>
      );
    } else if (periodType == "SixMonthlyApril") {
    } else if (periodType == "SixMonthlyNov") {
    } else if (periodType == "FinancialApril") {
    } else if (periodType == "FinancialJuly") {
    } else if (periodType == "FinancialOct") {
    } else if (periodType == "FinancialNov") {
    }
  };

  const periodTypeHandler = (periodType) => {
    if (periodType == "Daily") {
      return (
        <div className={`${props?.styles?.fieldSelected}`}>
          <Input
            name="daily"
            type="date"
            onChange={(e) => {
              let date = e.value.replace(/-/g, "");
              setPeriodValue1(date);
              props?.inputHandler({ name: "period", value: date });
            }}
            placeholder="Date"
            className={props?.styles?.marginBottom}
          />
        </div>
      );
    } else {
      return (
        <div className={`${props?.styles?.fieldSelected}`}>
          <SingleSelect
            className="select"
            onChange={(e) => {
              setPeriodValue1(e.selected);
              year.current = e.selected;
              if (periodType === "Yearly") {
                props?.inputHandler({ name: "period", value: e.selected });
              }
            }}
            placeholder="--- Select year ---"
            selected={periodValue1}
          >
            {periods?.GetYearly()?.map((year, key) => {
              return (
                <SingleSelectOption
                  key={key}
                  label={year}
                  value={year.toString()}
                />
              );
            })}
          </SingleSelect>
          {periodsSelect(periodType)}
        </div>
      );
    }
  };

  return <div>{periodTypeHandler(props?.periodType)}</div>;
}

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export default class Periods {
  constructor() {
    _defineProperty(this, "GetYearly", () => {
      let years = [];
      let year = new Date().getFullYear();
      for (let index = 0; index < 40; index++) {
        years.push(year - index);
      }
      return years;
    });
    _defineProperty(this, "getFirstPosition", list => {
      return list[0];
    });
    _defineProperty(this, "GetWeekly", () => {
      let weeks = [];
      for (let index = 0; index < 56; index++) {
        weeks.push({
          name: `Week${index + 1}`,
          value: `${index + 1}`
        });
      }
      return weeks;
    });
    _defineProperty(this, "GetBiWeekly", () => {
      let weeks = [];
      for (let index = 0; index < 28; index++) {
        weeks.push({
          name: `Week${index + 1}`,
          value: `BI${index + 1}`
        });
      }
      return weeks;
    });
    _defineProperty(this, "GetDaily", () => {
      const days = [{
        name: 'Monday',
        value: '01'
      }, {
        name: 'Tuesday',
        value: '02'
      }, {
        name: 'Wednesday',
        value: '03'
      }, {
        name: 'Thursday',
        value: '04'
      }, {
        name: 'Friday',
        value: '05'
      }, {
        name: 'Saturday',
        value: '06'
      }, {
        name: 'Sunday',
        value: '07'
      }];
      return days;
    });
    _defineProperty(this, "GetMonthly", () => {
      const months = [{
        name: 'January',
        value: '01'
      }, {
        name: 'February',
        value: '02'
      }, {
        name: 'March',
        value: '03'
      }, {
        name: 'April',
        value: '04'
      }, {
        name: 'May',
        value: '05'
      }, {
        name: 'June',
        value: '06'
      }, {
        name: 'July',
        value: '07'
      }, {
        name: 'August',
        value: '08'
      }, {
        name: 'September',
        value: '09'
      }, {
        name: 'October',
        value: '10'
      }, {
        name: 'November',
        value: '11'
      }, {
        name: 'December',
        value: '12'
      }];
      return months;
    });
    _defineProperty(this, "GetBiMonthly", () => {
      const months = [{
        name: 'January-February',
        value: '01'
      }, {
        name: 'March-April',
        value: '02'
      }, {
        name: 'May-June',
        value: '03'
      }, {
        name: 'July-August',
        value: '04'
      }, {
        name: 'September-October',
        value: '05'
      }, {
        name: 'November-December',
        value: '06'
      }];
      return months;
    });
    _defineProperty(this, "GetQuarterly", () => {
      const quarterly = [{
        name: 'January-March',
        value: 'Q1'
      }, {
        name: 'April-June',
        value: 'Q2'
      }, {
        name: 'July-September',
        value: 'Q3'
      }, {
        name: 'October-December',
        value: 'Q4'
      }];
      return quarterly;
    });
    _defineProperty(this, "GetSixMonthly", () => {
      const sixMonthly = [{
        name: 'January-June',
        value: 'S1'
      }, {
        name: 'July-December',
        value: 'S2'
      }];
      return sixMonthly;
    });
  }
}
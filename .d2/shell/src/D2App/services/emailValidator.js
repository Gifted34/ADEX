function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export default class EmailValidator {
  constructor() {
    _defineProperty(this, "isValidUrl", urlString => {
      var urlPattern = new RegExp("^(https?:\\/\\/)?" +
      // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      // validate query string
      "(\\#[-a-z\\d_]*)?$", "i"); // validate fragment locator
      return urlPattern.test(urlString);
    });
  }
}
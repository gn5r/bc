import { flattenToMergedRecord, getKeys } from "./objects";

function debugLog(debug?: boolean, ...args: any[]) {
  if (debug) {
    console.debug("[debug]", ...args);
  }
}

function flatten<T extends {}>(item: T) {
  return Object.values(flattenToMergedRecord(item)).join(",");
}

function csvLog<T extends {}>(data: T | T[]) {
  const headers = getKeys(data instanceof Array ? data[0] : data);
  console.log(headers.join(","));
  if (Array.isArray(data)) {
    data.forEach((item) => console.log(flatten(item)));
  } else {
    console.log(flatten(data));
  }
}

export default {
  debug: debugLog,
  csv: csvLog,
};

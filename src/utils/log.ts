import { flattenToMergedRecord, getKeys } from "./objects";

function debugLog(debug?: boolean, ...args: any[]) {
  if (debug) {
    console.debug("[debug]", ...args);
  }
}

function csvLog<T extends {}>(data: T | T[]) {
  const headers = getKeys(data instanceof Array ? data[0] : data);
  console.log(headers.join(","));
  if (Array.isArray(data)) {
    data.forEach((item) => {
      console.log(Object.values(flattenToMergedRecord(item)).join(","));
    });
  } else {
    console.log(Object.values(flattenToMergedRecord(data)).join(","));
  }
}

export default {
  debug: debugLog,
  csv: csvLog,
};

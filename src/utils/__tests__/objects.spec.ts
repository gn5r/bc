import { flattenToMergedRecord, getKeys } from "../objects";
import { describe, it, expect } from "vitest";

describe("flatten.ts", () => {
  it("should flatten nested objects into a single record", () => {
    const data = {
      id: 1,
      userId: "admin",
      name: "admin",
      roleType: 1,
      lang: "ja",
      nulabAccount: {
        nulabId: "Prm9ZD9DQD5snNWcSYSwZiQoA9WFBUEa2ySznrSnSQRhdC2X8G",
        name: "admin",
        uniqueId: "admin",
      },
      mailAddress: "eguchi@nulab.example",
      lastLoginTime: "2022-09-01T06:35:39Z",
    };

    const expected = {
      id: 1,
      userId: "admin",
      name: "admin",
      roleType: 1,
      lang: "ja",
      nulabAccount: JSON.stringify({
        nulabId: "Prm9ZD9DQD5snNWcSYSwZiQoA9WFBUEa2ySznrSnSQRhdC2X8G",
        name: "admin",
        uniqueId: "admin",
      }),
      mailAddress: "eguchi@nulab.example",
      lastLoginTime: "2022-09-01T06:35:39Z",
    };

    const actual = flattenToMergedRecord(data);
    expect(actual).toEqual(expected);
  });

  it("should return keys of an object", () => {
    const data = {
      id: 1,
      userId: "admin",
      name: "admin",
      roleType: 1,
      lang: "ja",
      nulabAccount: {
        nulabId: "Prm9ZD9DQD5snNWcSYSwZiQoA9WFBUEa2ySznrSnSQRhdC2X8G",
        name: "admin",
        uniqueId: "admin",
      },
      mailAddress: "eguchi@nulab.example",
      lastLoginTime: "2022-09-01T06:35:39Z",
    };

    const expected = [
      "id",
      "userId",
      "name",
      "roleType",
      "lang",
      "nulabAccount",
      "mailAddress",
      "lastLoginTime",
    ];

    const actual = getKeys(data);
    expect(actual).toEqual(expected);
  });
});

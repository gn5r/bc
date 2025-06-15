import log, { flatten } from "../log";
import { describe, it, vi, expect } from "vitest";

describe("log.ts", () => {
  it("should flatten output correct string format", () => {
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

    const actual = flatten(data);
    const expected =
      '1,admin,admin,1,ja,{"nulabId":"Prm9ZD9DQD5snNWcSYSwZiQoA9WFBUEa2ySznrSnSQRhdC2X8G","name":"admin","uniqueId":"admin"},eguchi@nulab.example,2022-09-01T06:35:39Z';
    expect(actual).toBe(expected);
  });

  it("should csvLog output correct CSV format", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const data = [
      {
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
      },
    ];

    log.csv(data);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "id,userId,name,roleType,lang,nulabAccount,mailAddress,lastLoginTime"
      )
    );

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '1,admin,admin,1,ja,{"nulabId":"Prm9ZD9DQD5snNWcSYSwZiQoA9WFBUEa2ySznrSnSQRhdC2X8G","name":"admin","uniqueId":"admin"},eguchi@nulab.example,2022-09-01T06:35:39Z'
      )
    );

    logSpy.mockRestore();
  });
});

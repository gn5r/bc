import { myselfCommand } from "../users";
import { vi, describe, it, expect } from "vitest";
import client from "../../../client";

describe("users.ts", () => {
  it("should call myselfCommand with correct arguments", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const data: any = {
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

    // mock the client.getMyself method to return the data
    const getMyselfSpy = vi
      .spyOn(client, "getMyself")
      .mockImplementation(async () => data);

    await myselfCommand.handler({
      _: [],
      $0: "",
    });

    expect(getMyselfSpy).toHaveBeenCalled();

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
    getMyselfSpy.mockRestore();
  });
});

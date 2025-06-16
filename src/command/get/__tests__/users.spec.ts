import { myselfCommand, usersCommand, getUserCommand } from "../users";
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

  it("should call usersCommand with correct arguments", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const data: any[] = [
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

    // mock the client.getUsers method to return the data
    const getUsersSpy = vi
      .spyOn(client, "getUsers")
      .mockImplementation(async () => data);

    await usersCommand.handler({
      _: [],
      $0: "",
    });

    expect(getUsersSpy).toHaveBeenCalled();

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
    getUsersSpy.mockRestore();
  });

  it("should call getUserCommand with correct arguments", async () => {
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
    const getUserSpy = vi
      .spyOn(client, "getUser")
      .mockImplementation(async (userId: number) => data);

    await getUserCommand.handler({
      _: [],
      $0: "",
      userId: 1, // Simulating the userId option
    });

    expect(getUserSpy).toHaveBeenCalled();

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
    getUserSpy.mockRestore();
  });
});

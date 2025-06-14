import { CommandModule } from "yargs";

export const helloCommand: CommandModule = {
  command: "hello",
  handler: () => {
    console.log("hello world");
  },
};

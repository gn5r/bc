import { withProfileOption, ProfileOption } from "../../options/profile";
import { isExistsConfigFile, readProfiles, getProfile } from "../../utils/profile";

import type { CommandModule } from "yargs";

export function createListCommand(): CommandModule<unknown, ProfileOption> {
  return {
    command: "list",
    describe: "プロファイルの一覧を表示します",
    builder: (yargs) => withProfileOption(yargs).wrap(null).strict().showHelpOnFail(false),
    handler: async (args) => {
      if (!isExistsConfigFile()) return;

      const profileName = args.profile;
      if (profileName) {
        const profile = getProfile(profileName);
        if (profile) {
          console.log(profile);
        } else {
          console.error(`Profile "${profileName}" does not exist.`);
        }
      } else {
        console.log(readProfiles());
      }
    },
  };
}

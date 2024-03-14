import os from "os";
import path from "path";
import fs from "fs-extra"

const isGitconfigExists = () => {
    const gitconfigPath = path.join(os.homedir(), ".gitconfig");
    return fs.existsSync(gitconfigPath);
};

export default isGitconfigExists;

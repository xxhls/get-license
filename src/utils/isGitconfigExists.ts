import os from 'os';
import path from 'path';
import fs from 'fs-extra';

/**
 * 判断全局配置是否存在
 * @returns {boolean}
 */
const isGitconfigExists = () => {
  const gitconfigPath = path.join(os.homedir(), '.gitconfig');
  return fs.existsSync(gitconfigPath);
};

export default isGitconfigExists;

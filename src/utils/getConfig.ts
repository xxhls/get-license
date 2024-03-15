import os from 'os';
import ini from 'ini';
import path from 'path';
import fs from 'fs-extra';
import question from './question';
import { info, warn } from '../log';
import isGitconfigExists from './isGitconfigExists';
import { licensesNeedConfig } from '../templates';

interface IConfig {
  name: string;
  email: string;
}

const getConfig = async (license: string) => {
  const config: IConfig = {
    name: 'username',
    email: 'xxx@email.com',
  };

  // Check .gitconfig
  const isExists = isGitconfigExists();
  if (isExists) {
    info('Check .gitconfig Successfully');
    // Read Config
    const configPath = path.join(os.homedir(), '.gitconfig');
    const configStr = fs.readFileSync(configPath, 'utf-8');
    const configTemp = ini.parse(configStr);
    config.name = configTemp.user.name;
    config.email = configTemp.user.email;

    info(`Username: ${config.name}`);
    info(`Email: ${config.email}`);
  } else {
    if (!licensesNeedConfig.includes(license)) {
      info('No Need Config');
      return config;
    }

    warn('Can not Check .gitconfig');
    // Create Config
    const name = await question('Please Enter the Username: ');
    const email = await question('Please Enter the Email: ');

    config.name = name;
    config.email = email;
  }

  return config;
};

export default getConfig;

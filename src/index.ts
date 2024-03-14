import fs from 'fs-extra';
import getConfig from './utils/getConfig';
import { info, debug, warn, error } from './log';
import licenseMap, { License } from './templates';

import { Command } from 'commander';
import { name, version, description } from '../package.json';

const main = async () => {
  const program = new Command();

  /**
   * 设置命令行
   *
   * 1. 设置命令行名称
   * 2. 设置命令行描述
   * 3. 设置命令行版本
   * 4. 设置命令行选项
   * 5. 解析命令行参数
   */
  program
    .name(name)
    .description(description)
    .version(version)
    .requiredOption('--license <license>', '选择 License 类型, 可选值: mit')
    .parse(process.argv);

  const options = program.opts();
  const { license } = options;

  if (!license) {
    error('未选择 License 类型');
    process.exit(1);
  } else if (license === 'mit' || license === 'MIT') {
    info('成功选择 MIT License');
    const generator = licenseMap[License.MIT];
    const config = await getConfig();
    const licenseStr = generator(config.name, config.email);
    const licensePath = `${process.cwd()}/LICENSE`;
    fs.outputFileSync(licensePath, licenseStr);
  } else {
    error('未知的 License 类型');
    process.exit(1);
  }
};

main();

import fs from 'fs-extra';
import getConfig from './utils/getConfig';
import getGenerator, { licenses } from './templates';
import { Command } from 'commander';
import { name, version, description } from '../package.json';

/**
 * 主函数
 */
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
    .requiredOption(`--license <license>', '选择 License 类型, 可选值: ${licenses.join(' | ')}`)
    .parse(process.argv);

  /**
   * 获取 license
   */
  const options = program.opts();
  const { license } = options;

  /**
   * 获取生成器
   */
  const generator = getGenerator(license);

  /**
   * 获取用户配置
   */
  const config = await getConfig();

  /**
   * 生成字符串
   */
  const licenseStr = generator(config.name, config.email);

  /**
   * 生成 LICENSE 文件
   */
  const licensePath = `${process.cwd()}/LICENSE`;
  fs.outputFileSync(licensePath, licenseStr);
};

main();

import mit from './MIT-License';
import apache2 from './Apache-License-2.0';
import gpl3 from './GNU-General-Public-License-v3.0';
import bsd2 from './BSD-2-Clause-License';
import { error, info, warn } from '../log';

// 生成器类型
type Generator = (name: string, email: string) => string;

// License 生成器 Map
const licenseGeneratorMap: Map<string, Generator> = new Map([
  ['mit', mit],
  ['apache2', apache2],
  ['gpl3', gpl3],
  ['bsd2', bsd2],
]);
const licenses = Array.from(licenseGeneratorMap.keys());

// 若要新增 License，3/3 需要在这里添加判断条件
const getGenerator = (license: null | string) => {
  let generator: Generator | null = null;
  if (!license) {
    warn('未选择 License 类型');
    process.exit(1);
  } else if (licenseGeneratorMap.has(license)) {
    info(`成功选择 ${license.toUpperCase()} License`);
    const temp = licenseGeneratorMap.get(license);
    if (temp) {
      generator = temp;
    } else {
      error('查询 License 生成器失败');
      process.exit(1);
    }
  } else {
    warn('未知的 License 类型');
    process.exit(1);
  }
  return generator;
};

export { licenses };
export default getGenerator;

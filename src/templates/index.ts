import path from 'path';
import mit from './MIT';
import apache2 from './Apache2';
import { error, info } from '../log';

// 生成器类型
type Generator = (name: string, email: string) => string;

// 若要新增 License，1/3 需要在这里添加名称
// 获取所有的 License 路径
const licensesPath = ['Apache2.ts', 'MIT.ts'];
// 获取所有的 License 名称
const licenses = licensesPath.map(license => path.parse(license).name).map(license => license.toLowerCase());

// 若要新增 License，2/3 需要在这里添加 License 枚举 & 对应的生成器
enum License {
  MIT,
  Apache2,
}
const licenseMap: { [key in License]: Generator } = {
  [License.MIT]: mit,
  [License.Apache2]: apache2,
};

// 若要新增 License，3/3 需要在这里添加判断条件
const getGenerator = (license: null | string) => {
  let generator: (typeof licenseMap)[License.MIT];
  if (!license) {
    error('未选择 License 类型');
    process.exit(1);
  } else if (license === 'mit') {
    info('成功选择 MIT License');
    generator = licenseMap[License.MIT];
  } else if (license === 'apache2') {
    info('成功选择 Apache2 License');
    generator = licenseMap[License.Apache2];
  } else {
    error('未知的 License 类型');
    process.exit(1);
  }
  return generator;
};

export { License, licenses };
export default getGenerator;

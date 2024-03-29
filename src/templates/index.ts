import mit from './MIT-License';
import apache2 from './Apache-License-2.0';
import gpl3 from './GNU-General-Public-License-v3.0';
import bsd2 from './BSD-2-Clause-License';
import bsd3 from './BSD-3-Clause-License';
import bsl1 from './Boost-Software-License-Version-1.0';
import cc01 from './Creative-Commons-Zero-v1.0';
import epl2 from './Eclipse-Public-License-v2.0';
import agpl3 from './GNU-Affero-General-Public-License-v3.0';
import gpl2 from './GNU-General-Public-License-v2.0';
import lgpl2 from './GNU-Lesser-General-Public-License-v2.1';
import mpl2 from './Mozilla-Public-License-2.0';
import un from './The-Unlicense';
import { error, info, warn } from '../log';

type Generator = (name: string, email: string) => string;

const licenseGeneratorMap: Map<string, Generator> = new Map([
  ['mit', mit],
  ['apache2', apache2],
  ['gpl3', gpl3],
  ['bsd2', bsd2],
  ['bsd3', bsd3],
  ['bsl1', bsl1],
  ['cc01', cc01],
  ['epl2', epl2],
  ['agpl3', agpl3],
  ['gpl2', gpl2],
  ['lgpl2', lgpl2],
  ['mpl2', mpl2],
  ['un', un],
]);
const licenseNameMap: Map<string, string> = new Map([
  ['mit', 'MIT License'],
  ['apache2', 'Apache License 2.0'],
  ['gpl3', 'GNU General Public License v3.0'],
  ['bsd2', 'BSD 2-Clause "Simplified" License'],
  ['bsd3', 'BSD 3-Clause "New" or "Revised" License'],
  ['bsl1', 'Boost Software License 1.0'],
  ['cc01', 'Creative Commons Zero v1.0 Universal'],
  ['epl2', 'Eclipse Public License 2.0'],
  ['agpl3', 'GNU Affero General Public License v3.0'],
  ['gpl2', 'GNU General Public License v2.0'],
  ['lgpl2', 'GNU Lesser General Public License v2.1'],
  ['mpl2', 'Mozilla Public License 2.0'],
  ['un', 'The Unlicense'],
]);
const licenses = Array.from(licenseGeneratorMap.keys());
const licensesNeedConfig = ['mit', 'bsd2', 'bsd3'];

const getGenerator = (license: null | string) => {
  let generator: Generator | null = null;
  if (!license) {
    warn('Not Choose License');
    process.exit(1);
  } else if (licenseGeneratorMap.has(license)) {
    info(`Successfully Choose ${licenseNameMap.get(license)} License`);
    const temp = licenseGeneratorMap.get(license);
    if (temp) {
      generator = temp;
    } else {
      error('Fail to Finding License Generator');
      process.exit(1);
    }
  } else {
    warn('Unknown License');
    process.exit(1);
  }
  return generator;
};

export { licenses, licensesNeedConfig };
export default getGenerator;

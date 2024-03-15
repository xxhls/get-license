import fs from 'fs-extra';
import getConfig from './utils/getConfig';
import getGenerator, { licenses } from './templates';
import { Command } from 'commander';
import { name, version, description } from '../package.json';

const main = async () => {
  const program = new Command();

  program
    .name(name)
    .description(description)
    .version(version)
    .requiredOption(`--license <license>', 'Choose License, available: ${licenses.join(' | ')}`)
    .parse(process.argv);

  const options = program.opts();
  const { license } = options;

  const generator = getGenerator(license);

  const config = await getConfig();

  const licenseStr = generator(config.name, config.email);

  const licensePath = `${process.cwd()}/LICENSE`;
  fs.outputFileSync(licensePath, licenseStr);
};

main();

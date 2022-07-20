import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * Retrieves CLI Arguments for use
 */
export const retrieveCLIArguments = () =>
  yargs(hideBin(process.argv))
    .option('input', {
      alias: 'i',
      demandOption: true,
      default: 'schmeas/*.avsc',
      describe: 'The input patterns',
      type: 'array',
    })
    .option('outputDir', {
      alias: 'o',
      demandOption: true,
      default: 'types/',
      describe: 'The directory to where the typescript output should be located',
      type: 'string',
    })
    .option('configFile', {
      alias: 'c',
      demandOption: true,
      default: 'avro-typescript.config.json',
      describe: 'The path to your config file.',
      type: 'string',
    })
    .help()
    .parseSync();

/**
 * Validates output directory path and removes the trailing slash
 * @param path The path to validate
 * @returns The validated path
 */
export const validateOutputDir = (path: string) =>
  path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;

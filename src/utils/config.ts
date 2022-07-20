import { readFile } from 'fs';
import { join } from 'path';

export type ConfigurationOptions = {
  inputPath: string;
  outputDir: string;
  logicalTypes: { [key: string]: string | number | boolean };
};

/**
 * Loads the configuration file
 *
 * @param configPath The path the configuration file
 * @returns The configuration object
 */
export const loadConfig = (configPath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    readFile(configPath, (err, data) => {
      if (err) reject(err);

      try {
        const parsedData = data.toString();
        return resolve(parsedData);
      } catch (err) {
        reject(err);
      }
    });
  });

/**
 * Validates configuration file and retrieves only options we need
 * @param config Parsed configuration
 * @returns A valid configuration
 */
export const validateConfig = (config: { [key: string]: any }): ConfigurationOptions => {
  const inputPath = config.inputPath;

  if (!inputPath || typeof inputPath !== 'string')
    throw new Error('Invalid input path. Please add a valid input path in your config file.');

  if (config.logicalTypes)
    Object.keys(config.logicalTypes).forEach((key) => {
      const logicalTypeValue = config.logicalTypes[key];

      if (
        typeof logicalTypeValue !== 'string' ||
        typeof logicalTypeValue !== 'number' ||
        typeof logicalTypeValue !== 'boolean'
      )
        throw new Error(
          `Type ${typeof logicalTypeValue} for ${key} is invalid. Logical types must be converted to strings, numbers, or booleans.`
        );
    });

  return {
    inputPath: join(__dirname, '../../', config.inputPath),
    outputDir: join(__dirname, '../../', config.outputDir) || join(__dirname, '../../', './types'),
    logicalTypes: { ...config.logicalTypes },
  };
};

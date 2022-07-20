import { retrieveFileNameFromPath, retrieveFilesFromGlob } from './utils/file';
import { retrieveCLIArguments, validateOutputDir } from './utils/cli';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { toTypeScript } from '@ovotech/avro-ts';

export const convertAvroCli = async () => {
  const cliArguments = retrieveCLIArguments();

  const config = {
    inputs: cliArguments.input as unknown as string[], // yargs incorrectly types this as a string
    outputDir: validateOutputDir(cliArguments.outputDir),
  };

  try {
    const schemaFilepaths = (
      await Promise.all(config.inputs.map((inputGlob) => retrieveFilesFromGlob(inputGlob)))
    ).reduce<string[]>((all, files) => all.concat(files), []);

    const typeOutput = await Promise.all(
      schemaFilepaths.map(
        (filepath) =>
          new Promise<{ path: string; types: string }>(async (resolve, reject) => {
            try {
              const data = await readFile(filepath);
              resolve({
                path: filepath,
                types: toTypeScript(JSON.parse(data.toString())),
              });
            } catch (err) {
              reject(err);
            }
          })
      )
    );

    typeOutput.forEach(async (typeData) => {
      await mkdir(config.outputDir, {
        recursive: true,
      });
      await writeFile(
        `${config.outputDir}/${retrieveFileNameFromPath(typeData.path)}.d.ts`,
        typeData.types
      );
    });
  } catch (err) {
    console.error(err);
    return;
  }
};

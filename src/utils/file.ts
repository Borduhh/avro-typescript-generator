import { glob } from 'glob';

/**
 * Retrieves filepaths based on glob pattern
 * @param globPattern The glob pattern to match
 * @returns An array of matched file paths
 */
export const retrieveFilesFromGlob = (globPattern: string): Promise<string[]> =>
  new Promise<string[]>((resolve, reject) => {
    glob(globPattern, (err, matches) => {
      if (err) reject(err);

      return resolve(matches);
    });
  });

/**
 * Parses a file path to retrive only the file name
 * @param filePath The path to parse
 * @returns The name of the file
 */
export const retrieveFileNameFromPath = (filePath: string) => {
  const paths = filePath.split('/');
  return paths[paths.length - 1].split('.')[0];
};

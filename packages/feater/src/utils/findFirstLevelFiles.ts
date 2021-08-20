import fs from 'fs';
import path from 'path';

export default function findFirstLevelFiles(
  dirName: string,
  suffix?: string[]
): string[] {
  let files = fs.readdirSync(dirName);

  if (Array.isArray(suffix) && suffix.length > 0) {
    files = files.filter((file) => {
      const filePath = path.join(dirName, file);
      const fileStat = fs.statSync(filePath);
      if (fileStat.isFile() && suffix.includes(path.extname(filePath))) {
        return true;
      }
    });
  }

  return files;
}

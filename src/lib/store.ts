import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(dataDir, filename);

  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    await writeFile(filePath, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  await writeFile(path.join(dataDir, filename), JSON.stringify(data, null, 2), "utf8");
}

export async function appendJsonRecord<T>(filename: string, record: T): Promise<T> {
  const records = await readJsonFile<T[]>(filename, []);
  records.push(record);
  await writeJsonFile(filename, records);
  return record;
}

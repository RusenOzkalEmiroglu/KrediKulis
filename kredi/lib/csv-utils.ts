import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'

export async function readCSVFile(filePath: string): Promise<any[]> {
  const records: any[] = []
  
  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({
      columns: true,
      skip_empty_lines: true
    }))

  for await (const record of parser) {
    records.push(record)
  }

  return records
}

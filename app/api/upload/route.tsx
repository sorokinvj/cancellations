import { NextRequest, NextResponse } from 'next/server';
import { CsvError, parse } from 'csv-parse';
import { CSVResponse } from '@/components/UploadCSV/upload.types';

const CSV_DELIMITER = [',', ';', '|', ':', '\t'];
const MAX_NUMBER_OR_ROWS = 500;

export async function POST(request: NextRequest): Promise<void | Response> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    if (file.type !== 'text/csv') {
      return NextResponse.json(
        { error: 'Invalid file type.' },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const results: string[][] = [];

    return new Promise(resolve => {
      parse(buffer, { delimiter: CSV_DELIMITER })
        .on('data', data => results.push(data))
        .on('error', err => {
          if (err instanceof CsvError) {
            const response: CSVResponse = {
              status: 'failed',
              message: `Row ${err?.records} contains invalid amount of columns. There might be a typo with an extra delimiter in one of the cells.`,
              data: [],
            };
            resolve(NextResponse.json(response, { status: 500 }));
          } else {
            resolve(NextResponse.json({ error: err.message }, { status: 500 }));
          }
        })
        .on('end', () => {
          if (results.length <= 1) {
            resolve(
              NextResponse.json(
                {
                  status: 'failed',
                  message:
                    'The file uploaded does not contain any data, please check the file and try again.',
                },
                { status: 400 },
              ),
            );
          } else if (results.length > MAX_NUMBER_OR_ROWS) {
            resolve(
              NextResponse.json(
                {
                  status: 'failed',
                  message: `Please ensure your file has ${MAX_NUMBER_OR_ROWS} rows or fewer and try again.`,
                },
                { status: 400 },
              ),
            );
          } else {
            resolve(NextResponse.json({ status: 'success', data: results }));
          }
        });
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}

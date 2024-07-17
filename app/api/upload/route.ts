// file: app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CsvError, parse } from 'csv-parse';
import { StructuredCSVResponse } from '@/components/UploadCSV/upload.types';

const CSV_DELIMITER = [',', ';', '|', ':', '\t'];
const MAX_NUMBER_OF_ROWS = 500;

export async function POST(request: NextRequest): Promise<void | Response> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded.', status: 'error', headers: [], data: [] },
        { status: 400 },
      );
    }

    if (file.type !== 'text/csv') {
      return NextResponse.json(
        { error: 'Invalid file type.', status: 'error', headers: [], data: [] },
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
            const response: StructuredCSVResponse = {
              status: 'error',
              error: `Row ${err?.records} contains invalid amount of columns. There might be a typo with an extra delimiter in one of the cells.`,
              headers: [],
              data: [],
            };
            return resolve(NextResponse.json(response, { status: 500 }));
          }
          return resolve(
            NextResponse.json(
              {
                status: 'error',
                error: err.message,
                headers: [],
                data: [],
              },
              { status: 500 },
            ),
          );
        })
        .on('end', () => {
          if (results.length <= 1) {
            return resolve(
              NextResponse.json(
                {
                  status: 'error',
                  error:
                    'The file uploaded does not contain any data, please check the file and try again.',
                  headers: [],
                  data: [],
                },
                { status: 400 },
              ),
            );
          }
          if (results.length > MAX_NUMBER_OF_ROWS + 1) {
            return resolve(
              NextResponse.json(
                {
                  status: 'error',
                  error: `Please ensure your file has ${MAX_NUMBER_OF_ROWS} rows or fewer and try again.`,
                  headers: [],
                  data: [],
                },
                { status: 400 },
              ),
            );
          }
          const headers = results[0];
          const data = results.slice(1).map(row => {
            const rowData: Record<string, string> = {};
            headers.forEach((header, index) => {
              rowData[header] = row[index] || '';
            });
            return rowData;
          });

          const response: StructuredCSVResponse = {
            status: 'success',
            error: null,
            headers,
            data,
          };
          return resolve(NextResponse.json(response, { status: 200 }));
        });
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: 'error',
        error: 'An unexpected error occurred',
        headers: [],
        data: [],
      },
      { status: 500 },
    );
  }
}

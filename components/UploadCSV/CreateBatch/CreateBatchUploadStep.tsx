import { FC, useState } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';
import { FileUploader } from 'react-drag-drop-files';
import { FaRegTrashAlt } from 'react-icons/fa';

// import { CreateBatchTable } from './CreateBatchTable';
import { CreateBatchUploadErrors } from './CreateBatchUploadErrors';
import { useUploadBatch } from '../UploadBatchProvider/upload.hooks';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import Spinner from '@/components/ui/spinner';
import { CSVResponse } from '../upload.types';

export const CreateBatchUploadStep: FC = () => {
  const {
    csv,
    filename,
    setCsvResponse,
    resetCsvFile,
    setUploadedFilename,
    setCsvFormData,
  } = useUploadBatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | undefined>();

  const hasValidationError = csv?.status === 'failed';
  const csvValidationErrorMessage = hasValidationError
    ? csv?.message
    : undefined;

  const deleteFile = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setUploadError(undefined);
    resetCsvFile();
    setIsLoading(false);
  };

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    try {
      if (filename) {
        setUploadError(undefined);
        resetCsvFile();
      }
      setUploadedFilename(file.name);
      const formData = new FormData();
      formData.append('file', file);
      setCsvFormData(formData);

      const response = await axios.post<CSVResponse>('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('response', response);

      setCsvResponse(response.data);
    } catch (error) {
      console.log('catch error', error);
      if (axios.isAxiosError(error) && error.response) {
        setUploadError(error.response.data.message);
      } else {
        setUploadError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log('csv', csv);

  const headers = csv?.data[0] as string[];
  const rows = csv?.data.slice(1) as string[][];

  return (
    <div className="p-4 max-w-xl w-full">
      <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col gap-4">
        <Text>
          Upload a CSV file with the refund data. Make sure your CSV file
          follows the required format.{' '}
          <Link
            href="/template.csv"
            download
            className="text-blue-500 hover:underline"
          >
            Download template
          </Link>
        </Text>
        <Text className="text-sm text-gray-600">
          Please ensure all payment information is correct before submitting.
          For any issues or support, please contact our customer service team.
        </Text>

        <FileUploader
          handleChange={handleUpload}
          name="file"
          types={['CSV']}
          disabled={isLoading}
        >
          <div className="flex flex-col gap-4 items-center p-16 border-dashed border-2 border-gray-300 rounded-lg">
            <Text>Drag and drop your file here or click to upload.</Text>
            {csv && filename ? (
              <div className="flex items-center justify-between p-2 border rounded gap-4">
                <Text>{filename}</Text>
                <Button onClick={deleteFile} outline={true}>
                  <FaRegTrashAlt />
                </Button>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <Button disabled={isLoading} className="justify-center">
                  {isLoading ? (
                    <Spinner className="mr-2" />
                  ) : (
                    <Upload className="mr-2" />
                  )}
                  {isLoading ? 'Uploading...' : 'Upload File'}
                </Button>
              </div>
            )}
          </div>
        </FileUploader>
        <CreateBatchUploadErrors
          message={uploadError ?? csvValidationErrorMessage}
        />
      </div>
      {csv?.data?.length && (
        <table>
          <thead>
            <tr>
              {headers?.map((header: string) => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row?.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

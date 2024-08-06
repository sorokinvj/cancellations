import { FC, useCallback, useState } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';
import { FileUploader } from 'react-drag-drop-files';
import { FaRegTrashAlt } from 'react-icons/fa';

import { useUpload } from './UploadCSVProvider/upload.hooks';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import Spinner from '@/components/ui/spinner';

import UploadErrors from './UploadErrors';
import { SelectItem, Select as SelectTremor } from '@tremor/react';
import useFirebase from '@/hooks/useFirebase';
import { generateHeaders } from '@/utils/template.utils';

const FileUpload: FC = () => {
  const {
    csv,
    filename,
    setCsvResponse,
    resetCsvFile,
    setUploadedFilename,
    setCsvFormData,
    setSelectedProvider,
    selectedProviderId,
  } = useUpload();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | undefined>();

  const hasValidationError = csv?.status === 'error';
  const csvValidationErrorMessage = hasValidationError ? csv?.error : undefined;

  const { data: tenants, loading: providersLoading } = useFirebase({
    collectionName: 'tenants',
    filterBy: 'type',
    filterValue: 'provider',
  });

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

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCsvResponse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setUploadError(error.response.data.message);
      } else {
        setUploadError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProvider = (value: string) => {
    setSelectedProvider(value);
  };

  const generateCSVTemplate = useCallback(() => {
    if (!selectedProviderId || !tenants) return '';

    const selectedProvider = tenants.find(p => p.id === selectedProviderId);
    if (!selectedProvider || !selectedProvider.requiredCustomerInfo) return '';

    return generateHeaders(selectedProvider.requiredCustomerInfo);
  }, [selectedProviderId, tenants]);

  const handleDownloadTemplate = useCallback(() => {
    const csvContent = generateCSVTemplate();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const providerName = tenants?.find(p => p.id === selectedProviderId)?.name;
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${providerName} template.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [generateCSVTemplate, selectedProviderId, tenants]);

  return (
    <div className="max-w-xl w-full">
      <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col gap-4">
        <SelectTremor
          enableClear={false}
          className="z-30 w-52"
          defaultValue="1"
          disabled={providersLoading}
          placeholder="Select a provider"
          onValueChange={handleSelectProvider}
        >
          {tenants?.map(tenant => (
            <SelectItem value={tenant.id} key={tenant.id}>
              {tenant.name}
            </SelectItem>
          ))}
        </SelectTremor>
        <Text>
          Upload a CSV file with the refund data. Make sure your CSV file
          follows the required format.
        </Text>
        <Button
          onClick={handleDownloadTemplate}
          disabled={!selectedProviderId}
          className="text-blue-500 hover:underline disabled:text-gray-400 disabled:no-underline w-fit"
        >
          Download template
        </Button>
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
                <Button
                  disabled={
                    isLoading || providersLoading || !selectedProviderId
                  }
                  className="justify-center"
                >
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
        <UploadErrors message={uploadError ?? csvValidationErrorMessage} />
      </div>
    </div>
  );
};

export default FileUpload;

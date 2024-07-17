import { FC } from 'react';
import { useUpload } from './UploadCSVProvider/upload.hooks';

const UploadErrors: FC<{ message?: string | null }> = ({ message }) => {
  const { csv } = useUpload();

  const emptyData = csv?.data.length === 0;
  const invalidRowsMessage = emptyData ? 'Invalid row found' : null;
  const invalidHeaderMessage = csv?.error ?? null;
  const hasFieldsError =
    invalidRowsMessage !== null || invalidHeaderMessage !== null;

  if (!message && !hasFieldsError) return null;

  return (
    <div className="text-sm text-gray-600 mb-2 bg-pink-50 p-4 rounded-lg">
      {message && <span>{message}</span>}
      {invalidRowsMessage && <span>{invalidRowsMessage}</span>}
      {invalidHeaderMessage && <span>{invalidHeaderMessage}</span>}
      {hasFieldsError && (
        <span>Invalid file, please change the .csv and upload again.</span>
      )}
    </div>
  );
};

export default UploadErrors;

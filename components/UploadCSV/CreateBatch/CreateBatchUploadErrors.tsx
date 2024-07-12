import { FC } from 'react';
import { useUploadBatch } from '../UploadBatchProvider/upload.hooks';

export const CreateBatchUploadErrors: FC<{ message?: string }> = ({
  message,
}) => {
  const { csv } = useUploadBatch();

  const invalidRows = csv?.data.length === 0;
  const invalidRowsMessage = invalidRows ? 'Invalid row found' : null;
  const invalidHeaderMessage = csv?.message;
  const hasFieldsError =
    invalidRowsMessage !== null || invalidHeaderMessage !== undefined;

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

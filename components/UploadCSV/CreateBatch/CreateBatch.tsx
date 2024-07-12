'use client';
import { FC } from 'react';
import { CreateBatchUploadStep } from './CreateBatchUploadStep';
import { BATCH_UPLOAD_STEPS } from '../upload.types';
import { useUploadBatch } from '../UploadBatchProvider/upload.hooks';

export const CreateBatch: FC = () => {
  const { step } = useUploadBatch();

  const isUploadStep = step === BATCH_UPLOAD_STEPS.UPLOAD;

  return (
    <div className="flex w-full">
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <div className="flex h-[72px] flex-none items-center gap-2 border-b bg-white px-[20px]">
          <h1 className="truncate">Upload CSV</h1>
        </div>

        <div className="p-4 flex flex-col space-y-4">
          {isUploadStep && <CreateBatchUploadStep />}
        </div>
      </div>
    </div>
  );
};

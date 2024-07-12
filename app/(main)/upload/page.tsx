import { Metadata } from 'next';
import { CreateBatch } from '@/components/UploadCSV/CreateBatch/CreateBatch';
import { UploadBatchProvider } from '@/components/UploadCSV/UploadBatchProvider/UploadBatchProvider';

export const metadata: Metadata = {
  title: 'Upload CSV',
};

export default function UploadPage() {
  return (
    <UploadBatchProvider>
      <CreateBatch />;
    </UploadBatchProvider>
  );
}

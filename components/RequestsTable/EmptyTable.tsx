import { FolderOpen } from 'lucide-react';

const EmptyRequestsState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FolderOpen size={48} className="text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        No Requests Found
      </h3>
      <p className="text-gray-500">
        There are currently no requests to display.
      </p>
    </div>
  );
};

export default EmptyRequestsState;

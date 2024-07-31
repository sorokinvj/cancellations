import { Trophy } from 'lucide-react';

const CongratsEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Trophy
        size={48}
        className="mb-4"
        strokeWidth={1.5}
        style={{
          stroke: '#FCD34D', // Tailwind's yellow-300
          fill: '#FDE68A', // Tailwind's yellow-200
        }}
      />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Congratulations!
      </h3>
      <p className="text-gray-500">
        You have successfully resolved all requests that require action.
      </p>
    </div>
  );
};

export default CongratsEmpty;

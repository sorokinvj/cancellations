import { FC } from 'react';
import { Request } from '@/lib/db/schema';

interface UserInfoCardProps {
  request: Request;
}

const UserInfoCard: FC<UserInfoCardProps> = ({ request: { customerInfo } }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">User Information</h2>
      <div className="space-y-3">
        <p>
          <span className="font-medium">Customer Name:</span>{' '}
          {customerInfo.customerName}
        </p>
        <p>
          <span className="font-medium">Customer Email:</span>{' '}
          {customerInfo.customerEmail}
        </p>
        <p>
          <span className="font-medium">Account Number:</span>{' '}
          {customerInfo.accountNumber}
        </p>
        <p>
          <span className="font-medium">Last Four CC Digits:</span>{' '}
          {customerInfo.lastFourCCDigits}
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;

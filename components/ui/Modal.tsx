import clsx from 'clsx';
import { FC } from 'react';

export const Modal: FC<{
  shown: boolean;
  onClickBackdrop?: () => void;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}> = ({ shown, onClickBackdrop, children, size = 'sm' }) => {
  return (
    <div className={clsx('modal', shown && 'modal-open')}>
      <div
        className={clsx(
          'modal-box relative',
          size === 'md' && 'w-[1024px] max-w-[95vw]',
          size === 'lg' && 'w-[1800px] max-w-[95vw]',
        )}
      >
        <div className="bg-flair-600 absolute left-0 top-0 h-[8px] w-full" />
        {onClickBackdrop && (
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-5"
            onClick={onClickBackdrop}
          >
            ✕
          </button>
        )}
        {children}
      </div>
      <div className="modal-backdrop" onClick={onClickBackdrop} />
    </div>
  );
};

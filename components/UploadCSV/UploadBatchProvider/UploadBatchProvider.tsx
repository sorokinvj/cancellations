'use client';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useMemo,
  useReducer,
} from 'react';

import { BatchUploadState, BatchUploadAction } from '../upload.types';

import { initialState, batchReducer } from './upload.reducer';

export const UploadBatchContext = createContext<{
  state: BatchUploadState;
  dispatch: Dispatch<BatchUploadAction>;
} | null>(null);

export const UploadBatchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(batchReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <UploadBatchContext.Provider value={value}>
      {children}
    </UploadBatchContext.Provider>
  );
};

'use client';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useMemo,
  useReducer,
} from 'react';

import { UploadState, BatchUploadAction } from '../upload.types';

import { initialState, uploadReducer } from './upload.reducer';

export const UploadCSVContext = createContext<{
  state: UploadState;
  dispatch: Dispatch<BatchUploadAction>;
} | null>(null);

export const UploadCSVProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uploadReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <UploadCSVContext.Provider value={value}>
      {children}
    </UploadCSVContext.Provider>
  );
};

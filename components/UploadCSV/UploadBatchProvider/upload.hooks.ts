'use client';
import { useContext } from 'react';
import {
  CSVResponse,
  BATCH_UPLOAD_STEPS,
  BATCH_UPLOAD_ACTION_TYPES,
} from '../upload.types';
import { UploadBatchContext } from './UploadBatchProvider';

export const useUploadBatch = () => {
  const context = useContext(UploadBatchContext);

  if (context === null) {
    throw new Error('useUploadBatch must be used within an UploadBatchContext');
  }

  const { state, dispatch } = context;

  /**
   * Wraps the dispatch function with a transition function before executing the action.
   *
   * @param {BatchUploadAction} action - The action to be dispatched.
   * @returns {void}
   *
   * @description
   * The `action` will only be dispatched after the transition has started, which ensures that the transition completes before the state change occurs.
   *
   * Transitions let you keep the user interface updates responsive even on slow devices. With a transition,
   * your UI stays responsive in the middle of a re-render, which improves the user experience and gives the impression
   * of a smoother transition between UI states.
   * @see https://beta.reactjs.org/reference/react/useTransition#marking-a-state-update-as-a-non-blocking-transition
   */

  const setCsvFormData = (payload: FormData) => {
    dispatch({ type: BATCH_UPLOAD_ACTION_TYPES.SET_CSV_FORM_DATA, payload });
  };

  const setUploadStep = (payload: BATCH_UPLOAD_STEPS) => {
    dispatch({ type: BATCH_UPLOAD_ACTION_TYPES.SET_STEP, payload });
  };

  const setCsvResponse = (payload: CSVResponse) => {
    dispatch({ type: BATCH_UPLOAD_ACTION_TYPES.SET_CSV_RESPONSE, payload });
  };

  const setUploadedFilename = (payload: string) => {
    dispatch({
      type: BATCH_UPLOAD_ACTION_TYPES.SET_UPLOADED_FILENAME,
      payload,
    });
  };

  const resetCsvFile = () => {
    dispatch({ type: BATCH_UPLOAD_ACTION_TYPES.RESET_CSV_UPLOAD });
    dispatch({
      type: BATCH_UPLOAD_ACTION_TYPES.SET_UPLOADED_FILENAME,
      payload: '',
    });
  };

  return {
    ...state,
    dispatch,
    setUploadStep,
    setCsvResponse,
    resetCsvFile,
    setUploadedFilename,
    setCsvFormData,
  };
};

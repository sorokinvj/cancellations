'use client';
import {
  BatchUploadState,
  BATCH_UPLOAD_STEPS,
  BatchUploadAction,
  BATCH_UPLOAD_ACTION_TYPES,
} from '../upload.types';

export const initialState: BatchUploadState = {
  step: BATCH_UPLOAD_STEPS.UPLOAD,
};

export const batchReducer = (
  state: BatchUploadState,
  action: BatchUploadAction,
): BatchUploadState => {
  switch (action.type) {
    case BATCH_UPLOAD_ACTION_TYPES.SET_STEP:
      return {
        ...state,
        step: action.payload,
      };

    case BATCH_UPLOAD_ACTION_TYPES.SET_CSV_RESPONSE:
      return {
        ...state,
        csv: action.payload,
      };

    case BATCH_UPLOAD_ACTION_TYPES.SET_UPLOADED_FILENAME:
      return {
        ...state,
        filename: action.payload,
      };

    case BATCH_UPLOAD_ACTION_TYPES.RESET_CSV_UPLOAD:
      return {
        ...state,
        csv: undefined,
        filename: undefined,
        step: BATCH_UPLOAD_STEPS.UPLOAD,
      };

    case BATCH_UPLOAD_ACTION_TYPES.SET_CSV_FORM_DATA:
      return {
        ...state,
        csvFormData: action.payload,
      };

    default:
      return state;
  }
};

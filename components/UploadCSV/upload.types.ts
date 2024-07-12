export enum BATCH_UPLOAD_STEPS {
  UPLOAD = 0,
  REVIEW = 1,
  SUMMARY = 2,
}

export type CSVResponse = {
  data: string[][];
  status: 'success' | 'failed';
  message: string;
  failed?: {
    rows: number[];
    headers: string[];
  };
};

export type BatchUploadState = {
  filename?: string;
  step: BATCH_UPLOAD_STEPS;
  csv?: CSVResponse;
  csvFormData?: FormData;
};

export const enum BATCH_UPLOAD_ACTION_TYPES {
  SET_STEP = 'SET_STEP',
  SET_CSV_RESPONSE = 'SET_CSV_RESPONSE',
  SET_UPLOADED_FILENAME = 'SET_UPLOADED_FILENAME',
  RESET_CSV_UPLOAD = 'RESET_CSV_UPLOAD',
  SET_CSV_FORM_DATA = 'SET_CSV_FORM_DATA',
}

type SetStepAction = {
  type: BATCH_UPLOAD_ACTION_TYPES.SET_STEP;
  payload: number;
};

type SetCsvAction = {
  type: BATCH_UPLOAD_ACTION_TYPES.SET_CSV_RESPONSE;
  payload: CSVResponse;
};

type SetUploadedFilenameAction = {
  type: BATCH_UPLOAD_ACTION_TYPES.SET_UPLOADED_FILENAME;
  payload: string;
};

type ResetCsvAction = {
  type: BATCH_UPLOAD_ACTION_TYPES.RESET_CSV_UPLOAD;
};

type SetCsvFormDataAction = {
  type: BATCH_UPLOAD_ACTION_TYPES.SET_CSV_FORM_DATA;
  payload: FormData;
};

export type BatchUploadAction =
  | SetStepAction
  | SetCsvAction
  | ResetCsvAction
  | SetUploadedFilenameAction
  | SetCsvFormDataAction;

export interface CreateBatchError {
  rowNumber?: number;
  details?: {
    title?: string;
    detail?: string;
  }[];
}

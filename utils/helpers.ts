export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
}

export const formatSeconds = (durationInSeconds: number | undefined) => {
  if (!durationInSeconds) return `0 m, 0 s`;
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes} m, ${seconds} s`;
};

export function normalizeTimestamp(
  input:
    | number
    | {
        seconds: number;
        nanoseconds: number;
      },
): number {
  if (typeof input === 'number') {
    // Input is already a Unix timestamp in milliseconds
    return input;
  } else {
    // Input is a Timestamp object
    const { seconds, nanoseconds } = input;
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    return milliseconds;
  }
}

function stringifyError(error: unknown) {
  const cache = new Set();
  return JSON.stringify(error, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        // Duplicate reference found, discard key
        return;
      }
      // Store value in our set
      cache.add(value);
    }
    return value;
  });
}

export const parseErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return stringifyError(error);
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

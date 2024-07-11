// components/ui/spinner.tsx
import React from 'react';

const spinnerBaseStyle = {
  width: '1.5rem',
  height: '1.5rem',
  borderWidth: '2px',
};

const Spinner = ({ color = 'gray-900' }) => (
  <div
    className="spinner"
    aria-label="Loading"
    style={{
      ...spinnerBaseStyle,
      borderTopColor: 'transparent', // Always transparent
      borderColor: `rgba(var(--color-${color}), 0.3)`, // Semi-transparent border
    }}
  >
    <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner {
          display: inline-block;
          vertical-align: middle;
          border-style: solid;
          border-radius: 99999px;
          animation: spin 1s linear infinite;
        }
        
        /* Define color variables for border (example with a few colors) */
        :root {
          --color-gray-900: 75, 85, 98;
          --color-indigo-600: 79, 91, 213;
          --color-red-600: 220, 38, 38;
          // Add more colors as needed
        }
      `}
    </style>
  </div>
);

export default Spinner;

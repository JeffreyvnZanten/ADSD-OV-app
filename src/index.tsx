import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Met error handling
const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

/* zonder error handling
const root = createRoot(document.getElementById('root') as HTMLElement); hoi
*/

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
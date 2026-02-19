import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  LogarithmicScale,
  Tooltip,
  Filler,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import App from './App';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  LogarithmicScale,
  Tooltip,
  Filler,
  annotationPlugin,
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { performanceMonitor } from './utils/performance';

// Initialize performance monitoring
performanceMonitor;

// Remove loading spinner and mark app as loaded
const removeLoadingSpinner = () => {
  const spinner = document.querySelector('.loading-spinner');
  if (spinner) {
    spinner.remove();
  }
  document.body.classList.add('app-loaded');
};

// Render the app
const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove loading spinner after initial render
setTimeout(removeLoadingSpinner, 100);

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Report performance metrics after app is fully loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    performanceMonitor.logMetrics();
  }, 1000);
});

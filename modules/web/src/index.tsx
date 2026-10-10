import '@fontsource/alegreya-sans/400.css';
import '@fontsource/alegreya-sans/400-italic.css';
import '@fontsource/alegreya-sans/500.css';
import '@fontsource/alegreya-sans/700.css';
import '@fontsource/alegreya-sans/800.css';
import '@fontsource/yeseva-one';
import '@fontsource-variable/caveat';
import './index.css';
import './stores/configure-mobx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { syncDocumentLanguage } from './services/document-language';
import { watchLayout } from './services/layout';
import { createRootStore } from './stores';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Missing #root element in index.html');
}

const store = createRootStore();

// Development only: the root store as `window.deedsTable`, for poking at it from the console.
if (import.meta.env.DEV) {
  Object.assign(window, { deedsTable: store });
}

syncDocumentLanguage(store.locale);
watchLayout(store.ui.layout);
store.room.open();

createRoot(rootElement).render(
  <StrictMode>
    <App store={store} />
  </StrictMode>,
);

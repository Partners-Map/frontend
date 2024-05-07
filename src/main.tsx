import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App.tsx';
import { persistor, store } from './__data__/store/index.ts';
import { GlobalFonts } from './styles/fonts/index.tsx';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalFonts />
      <App />
    </PersistGate>
  </Provider>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App.tsx';
import { store } from './__data__/store/index.ts';
import { GlobalFonts } from './styles/fonts/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GlobalFonts />
    <App />
  </Provider>
);

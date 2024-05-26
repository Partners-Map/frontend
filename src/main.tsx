import { CssBaseline, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App.tsx';
import { persistor, store } from './__data__/store/index.ts';
import GlobalFonts from './styles/fonts/index.tsx';
import { theme } from './styles/theme/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalFonts />
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

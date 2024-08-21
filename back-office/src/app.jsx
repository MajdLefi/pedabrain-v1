import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <ReduxProvider store={store}>
        <Router />
      </ReduxProvider>
    </ThemeProvider>
  );
}

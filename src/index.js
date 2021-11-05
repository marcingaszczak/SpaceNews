import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter} from 'react-router-dom';
import { ThemeProvider  } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux';

import newTheme from './theme';
import store from './store/store';




ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
    <ThemeProvider theme={newTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </HashRouter>
  </Provider>,
  document.getElementById('root')
);



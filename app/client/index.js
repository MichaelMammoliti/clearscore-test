import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { store } from './store';

import App from './app';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

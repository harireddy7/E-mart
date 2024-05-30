import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

import './bootstrap.min.css';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);

serviceWorker.unregister();

/*

  Breakpoints::

  xs	<576px
  576px <= sm < 768px
  768px <= md < 992px
  992px <= lg < 1200px
 1200px <= xl < 1400px
 1400px <= xxl


*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { appStore } from 'state/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={appStore}>
		<App />
	</Provider>
);

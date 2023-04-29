import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { Provider } from 'react-redux';

// config store redux
import store from './store/store';

// set up axios default
import axiosConfigCommon from './config/axiosConfigCommon';
axiosConfigCommon();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </Provider>,
);

reportWebVitals();

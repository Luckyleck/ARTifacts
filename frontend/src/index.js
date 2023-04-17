import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';

const store = configureStore({});

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

const Root = () => {
  return (
    // <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    // </ModalProvider> */}
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
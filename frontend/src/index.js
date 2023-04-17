import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store/store';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

const Root = () => {
  return (
    // <ModalProvider>
    //   <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    //   {/* </Provider>
    // </ModalProvider> */}
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
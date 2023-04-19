import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './store/store';
import { ModalProvider } from './components/context/Modal';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Root />
    // <React.StrictMode>
    //   <Root />
    // </React.StrictMode>
);
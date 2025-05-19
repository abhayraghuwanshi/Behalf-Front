import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CountryProvider } from './components/navbar/CountryProvider';
import { AuthProvider } from './components/SignIn/AuthContext';
import { CartProvider } from './context/CartContext';
import { MenuProvider } from './context/MenuContext';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <CountryProvider>
    <AuthProvider>
      <MenuProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </MenuProvider>
    </AuthProvider>
  </CountryProvider>



  // </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
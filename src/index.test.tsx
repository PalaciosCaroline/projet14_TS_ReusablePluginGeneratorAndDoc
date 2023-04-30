import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
    );
  
    expect(getByText('Welcome to HRnet Service !')).toBeInTheDocument();
  });
});
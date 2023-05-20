import React, { useMemo } from 'react';
import { render, screen } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import fetchSales from '../../api/fetchSales';
import stateGlobalContext from '../../context/stateGlobalContext';
import { sumItemsValue } from '../../helpers/cartFunctions';
import fetchSellers from '../../api/fetchSellers';
import CheckoutPage from '../../components/Customer/checkout';

jest.mock('../../api/fetchSales');
jest.mock('../../api/fetchSellers');
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

jest.mock('../../helpers/cartFunctions', () => ({
  sumItemsValue: jest.fn(),
}));

describe('CheckoutPage', () => {
  function TestComponent() {
    const setMyArray = jest.fn();
    const contextValue = useMemo(() => ({ setMyArray }), [setMyArray]);

    return (
      <stateGlobalContext.Provider value={ contextValue }>
        <CheckoutPage />
      </stateGlobalContext.Provider>
    );
  }

  let pushMock;

  beforeEach(() => {
    pushMock = jest.fn();
    useHistory.mockReturnValue({ push: pushMock });
  });

  it('Render Checkout Page', async () => {
    const mockSellers = [
      { id: 1, name: 'Seller 1' },
      { id: 2, name: 'Seller 2' },
    ];

    const mockTotalPrice = 80.00;

    const mockSaleId = 12345;
    sumItemsValue.mockReturnValueOnce(mockTotalPrice);
    fetchSellers.mockResolvedValueOnce(mockSellers);
    fetchSales.mockResolvedValueOnce({ data: { saleId: mockSaleId } });

    await act(async () => {
      render(<TestComponent />);
    });

    screen.getByTestId('customer_checkout__button-submit-order');
  });
});

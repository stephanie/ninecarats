import { useEffect } from 'react';
import { useCustomerActions } from './useCustomerActions';
import { useCustomerState } from './useCustomerState';

export function useCustomer() {
  const state = useCustomerState();
  const actions = useCustomerActions();

  // Load customer data from localStorage on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("shopify_customer_token");
      if (token) {
        actions.refreshCustomer();
      } else {
        state.setIsLoading(false);
      }
    } else {
      state.setIsLoading(false);
    }
  }, [actions.refreshCustomer, state.setIsLoading]);

  return {
    // State
    customer: state.customer,
    accessToken: state.accessToken,
    isLoading: state.isLoading,
    addresses: state.addresses,
    orders: state.orders,
    
    // Actions
    login: actions.login,
    signup: actions.signup,
    logout: actions.logout,
    refreshCustomer: actions.refreshCustomer,
    refreshAddresses: actions.refreshAddresses,
    refreshOrders: actions.refreshOrders,
  };
}

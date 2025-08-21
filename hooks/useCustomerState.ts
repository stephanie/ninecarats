import { useCallback, useState } from 'react';

interface Customer {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  acceptsMarketing?: boolean;
  phone?: string;
  defaultAddress?: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
  };
}

interface CustomerAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
  company?: string;
}

interface CustomerOrder {
  id: string;
  name: string;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus: string;
  totalPrice: {
    amount: number;
    currencyCode: string;
  };
  lineItems: Array<{
    title: string;
    quantity: number;
    variant: {
      image?: {
        url: string;
        altText?: string;
      };
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  }>;
}

export function useCustomerState() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);

  const updateCustomer = useCallback((newCustomer: Customer | null) => {
    setCustomer(newCustomer);
  }, []);

  const updateAccessToken = useCallback((token: string | null) => {
    setAccessToken(token);
  }, []);

  const updateIsLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const updateAddresses = useCallback((newAddresses: CustomerAddress[]) => {
    setAddresses(newAddresses);
  }, []);

  const updateOrders = useCallback((newOrders: CustomerOrder[]) => {
    setOrders(newOrders);
  }, []);

  const clearCustomerData = useCallback(() => {
    setCustomer(null);
    setAccessToken(null);
    setAddresses([]);
    setOrders([]);
    setIsLoading(false);
  }, []);

  return {
    // State
    customer,
    accessToken,
    isLoading,
    addresses,
    orders,
    
    // Setters
    setCustomer: updateCustomer,
    setAccessToken: updateAccessToken,
    setIsLoading: updateIsLoading,
    setAddresses: updateAddresses,
    setOrders: updateOrders,
    
    // Actions
    clearCustomerData,
  };
}

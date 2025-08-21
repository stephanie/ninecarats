"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  serverCreateCustomer,
  serverCustomerLogin,
  serverCustomerLogout,
  serverGetCustomer,
  serverGetCustomerOrders,
} from "./CustomerServerActions";

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

interface CustomerContextType {
  customer: Customer | null;
  accessToken: string | null;
  isLoading: boolean;
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshCustomer: () => Promise<void>;
  refreshAddresses: () => Promise<void>;
  refreshOrders: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);

  // Load customer data from localStorage on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("shopify_customer_token");
      if (token) {
        setAccessToken(token);
        // Call refreshCustomer directly here instead of in dependency
        const loadCustomer = async () => {
          try {
            const customerData = await serverGetCustomer(token);
            setCustomer(customerData);
          } catch (error) {
            console.error("Failed to refresh customer data:", error);
            // Token might be expired, clear it
            localStorage.removeItem("shopify_customer_token");
            setAccessToken(null);
            setCustomer(null);
          } finally {
            setIsLoading(false);
          }
        };
        loadCustomer();
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []); // Empty dependency array since this should only run once

  const refreshCustomer = useCallback(async () => {
    if (!accessToken || typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const customerData = await serverGetCustomer(accessToken);
      setCustomer(customerData);
    } catch (error) {
      console.error("Failed to refresh customer data:", error);
      // Token might be expired, clear it
      localStorage.removeItem("shopify_customer_token");
      setAccessToken(null);
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  // Call refreshCustomer when accessToken changes
  useEffect(() => {
    if (accessToken) {
      refreshCustomer();
    }
  }, [accessToken, refreshCustomer]);

  const refreshAddresses = useCallback(async () => {
    if (!accessToken || typeof window === "undefined") return;

    try {
      // const addressesData = await serverGetCustomerAddresses(accessToken);
      setAddresses([]);
    } catch (error) {
      console.error("Failed to refresh addresses:", error);
    }
  }, [accessToken]);

  const refreshOrders = useCallback(async () => {
    if (!accessToken || typeof window === "undefined") return;

    try {
      const ordersData = await serverGetCustomerOrders(accessToken);
      setOrders(ordersData || []);
    } catch (error) {
      console.error("Failed to refresh orders:", error);
    }
  }, [accessToken]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      console.log("Login attempt for:", email);
      const result = await serverCustomerLogin(email, password);

      if (!result || result.customerUserErrors.length > 0) {
        console.log("Login failed:", result?.customerUserErrors);
        return {
          success: false,
          error:
            result?.customerUserErrors[0]?.message ||
            "Login failed. Please try again.",
        };
      }

      if (result.customerAccessToken) {
        const token = result.customerAccessToken.accessToken;
        console.log("Login successful, token received:", token);

        if (typeof window !== "undefined") {
          localStorage.setItem("shopify_customer_token", token);
        }

        setAccessToken(token);

        // Get customer data
        const customerData = await serverGetCustomer(token);
        setCustomer(customerData);

        // Get addresses and orders
        try {
          // const addressesData = await serverGetCustomerAddresses(token);
          setAddresses([]);
        } catch (error) {
          console.error("Failed to refresh addresses:", error);
        }

        try {
          const ordersData = await serverGetCustomerOrders(token);
          setOrders(ordersData || []);
        } catch (error) {
          console.error("Failed to refresh orders:", error);
        }

        return { success: true };
      }

      return {
        success: false,
        error: "Login failed. Please try again.",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "An error occurred during login. Please try again.",
      };
    }
  }, []);

  const signup = useCallback(
    async (
      email: string,
      password: string,
      firstName?: string,
      lastName?: string
    ) => {
      try {
        const result = await serverCreateCustomer(
          email,
          password,
          firstName,
          lastName
        );

        if (!result || result.customerUserErrors.length > 0) {
          return {
            success: false,
            error:
              result?.customerUserErrors[0]?.message ||
              "Account creation failed. Please try again.",
          };
        }

        if (result.customer) {
          return { success: true };
        }

        return {
          success: false,
          error: "Account creation failed. Please try again.",
        };
      } catch (error) {
        console.error("Signup error:", error);
        return {
          success: false,
          error: "An error occurred during account creation. Please try again.",
        };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      if (accessToken) {
        await serverCustomerLogout(accessToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("shopify_customer_token");
      }
      setAccessToken(null);
      setCustomer(null);
      setAddresses([]);
      setOrders([]);
    }
  }, [accessToken]);

  const value: CustomerContextType = {
    customer,
    accessToken,
    isLoading,
    addresses,
    orders,
    login,
    signup,
    logout,
    refreshCustomer,
    refreshAddresses,
    refreshOrders,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}

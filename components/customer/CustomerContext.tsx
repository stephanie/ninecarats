"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  serverCreateCustomer,
  serverCustomerLogin,
  serverCustomerLogout,
  serverGetCustomer,
} from "./CustomerServerActions";

interface Customer {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  defaultAddress?: {
    id: string;
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

interface CustomerContextType {
  customer: Customer | null;
  accessToken: string | null;
  isLoading: boolean;
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
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load customer data from localStorage on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("shopify_customer_token");
      if (token) {
        setAccessToken(token);
        refreshCustomer();
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const refreshCustomer = async () => {
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
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await serverCustomerLogin(email, password);

      if (!result || result.customerUserErrors.length > 0) {
        return {
          success: false,
          error:
            result?.customerUserErrors[0]?.message ||
            "Login failed. Please try again.",
        };
      }

      if (result.customerAccessToken) {
        const token = result.customerAccessToken.accessToken;
        if (typeof window !== "undefined") {
          localStorage.setItem("shopify_customer_token", token);
        }
        setAccessToken(token);
        console.log("accessToken has been set", token);

        // Get customer data
        const customerData = await serverGetCustomer(token);
        setCustomer(customerData);
        console.log("customerData has been set", customerData);

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
  };

  const signup = async (
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
        error: "Account creation failed. Please try again.",
      };
    }
  };

  const logout = async () => {
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
    }
  };

  const value: CustomerContextType = {
    customer,
    accessToken,
    isLoading,
    login,
    signup,
    logout,
    refreshCustomer,
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

import {
    serverCreateCustomer,
    serverCustomerLogin,
    serverCustomerLogout,
    serverGetCustomer,
    serverGetCustomerOrders
} from 'components/customer/CustomerServerActions';
import { useCallback } from 'react';
import { useCustomerState } from './useCustomerState';

export function useCustomerActions() {
  const {
    setCustomer,
    setAccessToken,
    setIsLoading,
    setAddresses,
    setOrders,
    clearCustomerData,
  } = useCustomerState();

  const login = useCallback(async (email: string, password: string) => {
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

        // Get customer data
        const customerData = await serverGetCustomer(token);
        setCustomer(customerData);

        // Get addresses and orders
        try {
        //   const addressesData = await serverGetCustomerAddresses(token);
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
  }, [setCustomer, setAccessToken, setAddresses, setOrders]);

  const signup = useCallback(async (
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
  }, []);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem("shopify_customer_token");
      if (token) {
        await serverCustomerLogout(token);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("shopify_customer_token");
      }
      clearCustomerData();
    }
  }, [clearCustomerData]);

  const refreshCustomer = useCallback(async () => {
    const token = localStorage.getItem("shopify_customer_token");
    if (!token || typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const customerData = await serverGetCustomer(token);
      setCustomer(customerData);
      setAccessToken(token);
    } catch (error) {
      console.error("Failed to refresh customer data:", error);
      // Token might be expired, clear it
      localStorage.removeItem("shopify_customer_token");
      clearCustomerData();
    } finally {
      setIsLoading(false);
    }
  }, [setCustomer, setAccessToken, setIsLoading, clearCustomerData]);

  const refreshAddresses = useCallback(async () => {
    const token = localStorage.getItem("shopify_customer_token");
    if (!token || typeof window === "undefined") return;

    try {
    //   const addressesData = await serverGetCustomerAddresses(token);
      setAddresses([]);
    } catch (error) {
      console.error("Failed to refresh addresses:", error);
    }
  }, [setAddresses]);

  const refreshOrders = useCallback(async () => {
    const token = localStorage.getItem("shopify_customer_token");
    if (!token || typeof window === "undefined") return;

    try {
      const ordersData = await serverGetCustomerOrders(token);
      setOrders(ordersData || []);
    } catch (error) {
      console.error("Failed to refresh orders:", error);
    }
  }, [setOrders]);

  return {
    login,
    signup,
    logout,
    refreshCustomer,
    refreshAddresses,
    refreshOrders,
  };
}

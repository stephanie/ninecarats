"use server";

import {
  customerCreate,
  customerLogin,
  customerLogout,
  getCustomer,
  getCustomerAddresses,
  getCustomerOrders,
} from "lib/shopify/customer";

// Server actions for customer operations
export async function serverCustomerLogin(email: string, password: string) {
  return await customerLogin(email, password);
}

export async function serverCreateCustomer(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) {
  return await customerCreate(email, password, firstName, lastName);
}

export async function serverGetCustomer(accessToken: string) {
  return await getCustomer(accessToken);
}

export async function serverGetCustomerAddresses(accessToken: string) {
  return await getCustomerAddresses(accessToken);
}

export async function serverGetCustomerOrders(accessToken: string) {
  return await getCustomerOrders(accessToken);
}

export async function serverCustomerLogout(accessToken: string) {
  return await customerLogout(accessToken);
}

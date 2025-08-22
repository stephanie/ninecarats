import { shopifyFetch } from './index';

// GraphQL operation types
interface CustomerCreateOperation {
  data: {
    customerCreate: {
      customer: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
      };
      customerUserErrors: Array<{
        code: string;
        field: string;
        message: string;
      }>;
    };
  };
  variables: {
    input: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    };
  };
}

interface CustomerLoginOperation {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      };
      customerUserErrors: Array<{
        code: string;
        field: string;
        message: string;
      }>;
    };
  };
  variables: {
    input: {
      email: string;
      password: string;
    };
  };
}

interface CustomerLogoutOperation {
  data: {
    customerAccessTokenRevoke: {
      deletedAccessToken: string;
      deletedCustomerAccessTokenId: string;
      userErrors: Array<{
        field: string;
        message: string;
      }>;
    };
  };
  variables: {
    customerAccessToken: string;
  };
}

export async function customerLogin(email: string, password: string) {
  try {
    const response = await shopifyFetch<CustomerLoginOperation>({
      query: `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
          customerAccessTokenCreate(input: $input) {
            customerAccessToken {
              accessToken
              expiresAt
            }
            customerUserErrors {
              code
              field
              message
            }
          }
        }
      `,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    return response.body.data.customerAccessTokenCreate;
  } catch (error) {
    console.error('Customer login error:', error);
    throw error;
  }
}

export async function customerCreate(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) {
  try {
    const response = await shopifyFetch<CustomerCreateOperation>({
      query: `
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              id
              email
              firstName
              lastName
            }
            customerUserErrors {
              code
              field
              message
            }
          }
        }
      `,
      variables: {
        input: {
          email,
          password,
          firstName,
          lastName,
        },
      },
    });

    return response.body.data.customerCreate;
  } catch (error) {
    console.error('Customer creation error:', error);
    throw error;
  }
}

export async function getCustomer(accessToken: string) {
  try {
    const response = await shopifyFetch<{ data: { customer: any } }>({
      query: `
        query {
          customer(customerAccessToken: "${accessToken}") {
            id
            firstName
            lastName
            acceptsMarketing
            email
            phone
            numberOfOrders
            defaultAddress {
              id
              firstName
              lastName
              address1
              address2
              city
              province
              country
              zip
            }
          }
        }
      `,
    });
    
    return response.body.data.customer;
  } catch (error) {
    console.error('Get customer error:', error);
    throw error;
  }
}

export async function getCustomerAddresses(accessToken: string) {
  try {
    const response = await shopifyFetch<{ data: { customer: any } }>({
      query: `
        query {
          customer(customerAccessToken: "${accessToken}") {
             addresses(first: 10) {
              edges {
                node {
                  id
                  address1
                  address2
                  city
                  province
                  zip
                  country
                  phone
                  firstName
                  lastName
                  company
                }
              }
            }
          }
        }
      `,
    });

    return response.body.data.customer.addresses.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Get customer addresses error:', error);
    throw error;
  }
}

export async function getCustomerOrders(accessToken: string) {
  try {
    const response = await shopifyFetch<{ data: { customer: any } }>({
      query: `
        query {
          customer(customerAccessToken: "${accessToken}") {
            orders(first: 50) {
              edges {
                node {
                  id
                  name
                  processedAt
                  fulfillmentStatus
                  financialStatus
                  totalPrice {
                    amount
                    currencyCode
                  }
                  lineItems(first: 10) {
                    edges {
                      node {
                        title
                        quantity
                        variant {
                          image {
                            url
                            altText
                          }
                          price {
                            amount
                            currencyCode
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

    return response.body.data.customer.orders.edges.map((edge: any) => ({
      ...edge.node,
      lineItems: edge.node.lineItems.edges.map((lineEdge: any) => lineEdge.node)
    }));
  } catch (error) {
    console.error('Get customer orders error:', error);
    throw error;
  }
}

export async function customerLogout(accessToken: string) {
  try {
    const response = await shopifyFetch<CustomerLogoutOperation>({
      query: `
        mutation customerAccessTokenRevoke($customerAccessToken: String!) {
          customerAccessTokenRevoke(customerAccessToken: $customerAccessToken) {
            deletedAccessToken
            deletedCustomerAccessTokenId
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        customerAccessToken: accessToken,
      },
    });

    return response.body.data.customerAccessTokenRevoke;
  } catch (error) {
    console.error('Customer logout error:', error);
    throw error;
  }
}

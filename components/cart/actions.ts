'use server';

import { TAGS } from 'lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return 'Error adding item to cart';
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart, 'max');
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart, 'max');
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart, 'max');
  } catch (e) {
    console.error(e);
    return 'Error updating item quantity';
  }
}

export async function redirectToCheckout(customerInfo?: {
  email?: string;
  address?: {
    firstName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    country?: string;
    zip?: string;
    phone?: string;
  };
}) {
  let cart = await getCart();
  
  if (!cart) {
    throw new Error('No cart found');
  }
  
  let checkoutUrl = cart.checkoutUrl;
  
  // If customer info is provided, append Shopify checkout parameters
  if (customerInfo) {
    const url = new URL(checkoutUrl);
    
    // Add email if available
    if (customerInfo.email) {
      url.searchParams.set('email', customerInfo.email);
    }
    
    // Add address information if available
    if (customerInfo.address) {
      const { address } = customerInfo;
      
      if (address.firstName) url.searchParams.set('first_name', address.firstName);
      if (address.lastName) url.searchParams.set('last_name', address.lastName);
      if (address.address1) url.searchParams.set('address1', address.address1);
      if (address.address2) url.searchParams.set('address2', address.address2);
      if (address.city) url.searchParams.set('city', address.city);
      if (address.province) url.searchParams.set('province', address.province);
      if (address.country) url.searchParams.set('country', address.country);
      if (address.zip) url.searchParams.set('zip', address.zip);
      if (address.phone) url.searchParams.set('phone', address.phone);
    }
    
    checkoutUrl = url.toString();
  }
  
  redirect(checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set('cartId', cart.id!);
}

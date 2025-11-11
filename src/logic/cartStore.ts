import {atom, map} from 'nanostores'
import {menu} from "../data/menus.ts";


export type CartItem = Record<string, number> // { id1: quantity1, id2: quantity2, ... }

export const isCartOpen = atom(false)
export const cartItems = map<CartItem>({})
export const menuItems = atom<Menu>(menu)

export const addItem = (id: string) => {
    const quantity = cartItems.get()[id] ?? 0;
    cartItems.setKey(id, quantity + 1);
}
export const removeOrDeleteItem = (id: string) => {
    const quantity = cartItems.get()[id] ?? 0;
    if (quantity > 1){
        cartItems.setKey(id, quantity - 1);
    }else {
        cartItems.setKey(id, undefined);
    }
}
export const deleteItem = (id: string) => {
    cartItems.setKey(id, undefined);
}
export const clearCart = () => {
    cartItems.set({});
}
export const toggleIsCartOpen = () => {
    isCartOpen.set(!isCartOpen.get());
}

export const getTotalQuantity = () => {
    return Object.values(cartItems.get()).reduce((sum, quantity) => sum + quantity, 0);
}

// const getMenuItem = (id: string) => {
//     return menuItems.get()[id] || null;
// }

// const state = {
//     orderItems: {} as CartItem,
//     showCart: false,
// }

// const addItem = (id: string) => {
//     const quantity = state.orderItems[id] ?? 0;
//     state.orderItems[id] = quantity + 1;
// }

// const removeOrDeleteItem = (id: string) => {
//     const quantity = state.orderItems[id] ?? 0;
//     if (quantity > 1) {
//         state.orderItems[id] = quantity - 1;
//     } else {
//         delete state.orderItems[id];
//     }
// }


// const deleteItem = (id: string) => {
//     delete state.orderItems[id];
// }

// const toggleCart = () => {
//     state.showCart = !state.showCart;
// }

// const clearCart = () => {
//     state.orderItems = {};
// }


// export const useCart = () => {
//     return {
//         cartItems,
//         menuItems,
//         isCartOpen,
//         addItem,
//         removeOrDeleteItem,
//         deleteItem,
//         toggleIsCartOpen,
//         clearCart,
//     }
// }



//
// const STORAGE_KEY = "chicken_menu_cart_v1";
// let whatsappNumber: string | null = null; // E.g. international format: 34600111222
//
// // Simple listeners registry
// const listeners = new Set<() => void>();
//
// function isBrowser() {
//   return typeof window !== "undefined" && typeof document !== "undefined";
// }
//
// function readCart(): CartItem[] {
//   if (!isBrowser()) return [];
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     if (!raw) return [];
//     const parsed = JSON.parse(raw);
//     if (Array.isArray(parsed)) {
//       return parsed.filter(Boolean);
//     }
//     return [];
//   } catch {
//     return [];
//   }
// }
//
// function writeCart(cart: CartItem[]) {
//   if (!isBrowser()) return;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
// }
//
// function notify() {
//   for (const fn of listeners) {
//     try { fn(); } catch {}
//   }
// }
//
// export function onCartChange(listener: () => void): () => void {
//   listeners.add(listener);
//   return () => listeners.delete(listener);
// }
//
// export function getCart(): CartItem[] {
//   return readCart();
// }
//
// export function setWhatsAppNumber(phone: string) {
//   whatsappNumber = phone.replace(/\s|\+/g, "");
// }
//
// export function addToCart(item: Omit<CartItem, "quantity"> & { quantity?: number }) {
//   const qty = Math.max(1, Math.floor(item.quantity ?? 1));
//   const cart = readCart();
//   const idx = cart.findIndex((i) => i.id === item.id);
//   if (idx >= 0) {
//     cart[idx].quantity += qty;
//   } else {
//     cart.push({ id: item.id, name: item.name, price: item.price, image: (item as any).image, quantity: qty });
//   }
//   writeCart(cart);
//   notify();
// }
//
// export function removeFromCart(id: string) {
//   const cart = readCart().filter((i) => i.id !== id);
//   writeCart(cart);
//   notify();
// }
//
// export function updateQuantity(id: string, delta: number) {
//   const cart = readCart();
//   const idx = cart.findIndex((i) => i.id === id);
//   if (idx === -1) return;
//   cart[idx].quantity += delta;
//   if (cart[idx].quantity <= 0) {
//     cart.splice(idx, 1);
//   }
//   writeCart(cart);
//   notify();
// }
//
// export function setQuantity(id: string, quantity: number) {
//   const q = Math.max(0, Math.floor(quantity));
//   const cart = readCart();
//   const idx = cart.findIndex((i) => i.id === id);
//   if (idx === -1) return;
//   if (q === 0) {
//     cart.splice(idx, 1);
//   } else {
//     cart[idx].quantity = q;
//   }
//   writeCart(cart);
//   notify();
// }
//
// export function clearCart() {
//   writeCart([]);
//   notify();
// }
//
// export function getTotalPriceNumber(): number {
//   const cart = readCart();
//   return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
// }
//
// export function getTotalPrice(): string {
//   return getTotalPriceNumber().toFixed(2);
// }
//
// export function buildWhatsAppMessage(): string {
//   const cart = readCart();
//   if (cart.length === 0) return "Hola, me gustaría hacer un pedido, pero el carrito está vacío.";
//
//   const lines: string[] = [];
//   lines.push("Hola, me gustaría hacer el siguiente pedido:");
//   lines.push("");
//   for (const item of cart) {
//     lines.push(`• ${item.name} x${item.quantity} — €${(item.price * item.quantity).toFixed(2)}`);
//   }
//   lines.push("");
//   lines.push(`Total: €${getTotalPrice()}`);
//   return lines.join("\n");
// }
//
// export function buildWhatsAppUrl(): string {
//   const message = encodeURIComponent(buildWhatsAppMessage());
//   const base = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "https://wa.me/";
//   return `${base}?text=${message}`;
// }
//
// export function sendWhatsAppOrder() {
//   const url = buildWhatsAppUrl();
//   if (isBrowser()) {
//     window.open(url, "_blank");
//   }
//   return url;
// }

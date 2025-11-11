import {For, Show} from "solid-js";
import {useStore} from "@nanostores/solid";
import {addItem, cartItems, deleteItem, isCartOpen, menuItems, removeOrDeleteItem, toggleIsCartOpen} from "../../logic";


interface CartModalProps {
    cartIcon: HTMLElement
    closeIcon: HTMLElement
    addIcon: HTMLElement
    removeIcon: HTMLElement
    trashIcon: HTMLElement
    whatsappIcon: HTMLElement
}


export default function CartModal(props: CartModalProps) {
    const showCart = useStore(isCartOpen)
    const cart = useStore(cartItems)
    const menu = useStore(menuItems)

    function totalPrice() {
        return Object.entries(cart()).reduce((sum, [id, quantity]) => {
            return sum + itemTotalPrice(menu()[id], quantity);
        }, 0);
    }

    function itemTotalPrice(item: MenuItem, quantity: number) {
        return item.price * quantity;
    }

    function cloneIcon(icon: HTMLElement) {
        return icon.cloneNode(true);
    }

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

    const sendWhatsAppOrder = () => {
        const phoneNumber = '+34645420796';
        let message = '*Hola, me gustaría hacer el siguiente Pedido:* \n';

        Object.entries(cart()).forEach(([itemId, itemQuantity]) => {
            const item = menu()[itemId];
            message += `* ${item.title}, ${itemQuantity} raciones => € ${(itemTotalPrice(item, itemQuantity)).toFixed(2)}\n`;
        })
        // cart().forEach(item => {
        //     message += `• ${item.quantity}x ${item.name} - €${(item.price * item.quantity).toFixed(2)}\n`;
        // });

        message += `*TOTAL: € ${totalPrice()}*`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return <Show when={showCart()}>
        <div class="fixed inset-0 bg-black/60 backdrop-blur z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div class="bg-secondary-dark text-white p-4 flex items-center justify-between">
                    <h3 class="text-2xl font-bold flex items-center gap-2">
                        {props.cartIcon}
                        Tu Pedido
                    </h3>
                    <button
                        onClick={toggleIsCartOpen}
                        class="hover:bg-orange-600 p-2 rounded-lg transition-all"
                    >
                        {props.closeIcon}
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto p-6">
                    {Object.keys(cart()).length === 0 ? (
                        <div class="text-center py-12">
                            <p class="text-gray-500 text-lg mb-4">Tu carrito está vacío</p>
                            <button
                                onClick={toggleIsCartOpen}
                                class="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all"
                            >
                                Volver al Menú
                            </button>
                        </div>
                    ) : (
                        <div class="space-y-4">
                            <For each={Object.entries(cart())}>
                                {([id, quantity]) => {
                                    const item = menu()[id];

                                    return <div
                                        class="bg-gray-50 rounded-lg  flex items-center gap-4 flex-col border border-gray-200  shadow-sm md:flex-row hover:bg-gray-100">
                                        <img src={item?.img?.src} alt={item?.title}
                                             class="object-cover w-full rounded-t-lg max-h-42 md:w-48 md:max-h-32 md:rounded-none md:rounded-s-lg"
                                        />

                                        <div class="flex flex-col gap-2 flex-1 items-center md:items-start">
                                            <h4 class="font-bold text-gray-800">{item?.title}</h4>
                                            <p class="text-sm text-gray-600">€{item.price} c/u</p>
                                            <p class="font-bold text-orange-600 text-lg">€ {itemTotalPrice(item, quantity).toFixed(2)}</p>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <button
                                                onClick={() => removeOrDeleteItem(id)}
                                                class="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-all"
                                            >
                                                {cloneIcon(props.removeIcon)}
                                            </button>
                                            <span class="font-bold text-lg w-8 text-center">{quantity}</span>
                                            <button
                                                onClick={() => addItem(id)}
                                                class="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-all"
                                            >
                                                {cloneIcon(props.addIcon)}
                                            </button>
                                        </div>
                                        <div class="text-right">
                                            <button
                                                onClick={() => deleteItem(id)}
                                                class="m-6 text-red-600 hover:text-red-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg px-4 py-2"
                                            >
                                                {cloneIcon(props.trashIcon)}
                                            </button>
                                        </div>
                                    </div>
                                }}
                            </For>
                        </div>
                    )}
                </div>

                {Object.keys(cart()).length > 0 && (
                    <div class="border-t p-6 bg-gray-50 border-gray-300">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-xl font-bold text-gray-800">Total:</span>
                            <span class="text-3xl font-bold text-orange-600">€ {totalPrice().toFixed(2)}</span>
                        </div>
                        <button
                            onClick={() => sendWhatsAppOrder()}
                            class="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            {cloneIcon(props.whatsappIcon)}
                            Enviar Pedido
                        </button>
                    </div>
                )}
            </div>
        </div>

    </Show>
}

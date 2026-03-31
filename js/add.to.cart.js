'use strict';
//Check if cart and item already exist
let storedCart = localStorage.getItem('cart');
let retrievedCart = JSON.parse(storedCart) || [];
let itemInCart = cart.find(item => item.item_id === item_id);
if (itemInCart) {item.quantity += quantity}
else {cart.push(item)}
let cart = JSON.stringify(cart);
localStorage.setItem(cart, cart);



//DataLayer Push
// Have to make sure quantity is read from the event handler before the push occurs
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    event: 'add_to_cart',
    currency: 'USD',
    value: Number(quantity) * parseFloat(price),
    items:[
        {
            item_id: item.dataset.id,
            item_name: item.dataset.name,
            price: parseFloat(item.dataset.price),
            item_category: item.dataset.category,
            quantity: quantity,
        }
    ]
});
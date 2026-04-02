'use strict';

let items = getCartItems();

let value = retrievedCart.reduce((total, item) => {return total + (item.price * item.quantity)}, 0);
};

//DataLayer Push
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
event: 'begin_checkout',
currency: 'USD',
value: value,
items: items });

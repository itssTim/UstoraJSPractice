'use strict';

let items = retrievedCart.map(item => ({
	item_id: item.item_id,
	item_name: item.item_name,
	price: item.price,
	item_category: item.item_category,
quantity: item.quantity,
}));
let value = retrievedCart.reduce((total, item) => {return total + (item.price * item.quantity)}, 0);

//DataLayer Push
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
event: 'begin_checkout',
currency: 'USD',
value: value,
items: items });

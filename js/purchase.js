'use strict';

let transaction_id = window.localStorage.getItem('transaction_id') || crypto.randomUUID();
localStorage.setItem('transaction_id', transaction_id);
let shipping = 10.20;

let items = retrievedCart.map(item => ({
	item_id: item.item_id,
	item_name: item.item_name,
	price: item.price,
	item_category: item.item_category,
quantity: item.quantity,
}));
let value = retrievedCart.reduce((total, item) => {return total + (item.price * item.quantity)}, 0);
let tax = parseFloat(value) * 0.0753;

//DataLayer Push
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
event: 'purchase',
currency: 'USD',
value: value,
items: items,
transaction_id : transaction_id,
tax: tax,
shipping: shipping, });

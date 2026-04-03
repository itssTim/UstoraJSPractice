'use strict';

let item = document.querySelector('#item');
let addButton = document.querySelector('.add_to_cart_button');

let view_item = function(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
    event: 'view_item',
    currency: 'USD',
    value: parseFloat(item.dataset.price),
    items:[
        {
            item_id: item.dataset.item_id,
            item_name: item.dataset.item_name,
            price: parseFloat(item.dataset.price),
            item_category: item.dataset.item_category,
            quantity: 1,
},]})};

view_item();

let add_to_cart = function() {
    let quantity = Number(document.querySelector('.qty').value);

    let items = {
        item_id: item.dataset.item_id,
            item_name: item.dataset.item_name,
            price: parseFloat(item.dataset.price),
            item_category: item.dataset.item_category,
            quantity: quantity,
    };
    updateCart(items);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
    event: 'add_to_cart',
    currency: 'USD',
    value: Number(quantity) * parseFloat(item.dataset.price),
    items:[
        {
            item_id: item.dataset.item_id,
            item_name: item.dataset.item_name,
            price: parseFloat(item.dataset.price),
            item_category: item.dataset.item_category,
            quantity: quantity,
        }
    ]
});
window.location.href = 'cart.html'
};

addButton.addEventListener('click', add_to_cart);

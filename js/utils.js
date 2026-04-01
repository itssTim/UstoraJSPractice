'use strict';

//Check if cart already exists
let checkCart = function(){
    let storedCart = localStorage.getItem('cart');
    return JSON.parse(storedCart) || [];
};

let updateCart = function(item) {
    let retrievedCart = checkCart();
    let itemInCart = retrievedCart.find(cartItem => cartItem.item_id === item.item_id);
    if (itemInCart) {itemInCart.quantity += quantity}
    else {retrievedCart.push(item)}
    let cart = JSON.stringify(retrievedCart);
    localStorage.setItem('cart', cart);
};

let getCartItems = function(item) {
    let items = retrievedCart.map(item => ({
        item_id: item.item_id,
        item_name: item.item_name,
        price: item.price,
        item_category: item.item_category,
        quantity: item.quantity,
}));
};

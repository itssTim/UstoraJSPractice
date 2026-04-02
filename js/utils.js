'use strict';

//Check if cart already exists
let checkCart = function(){
    let storedCart = localStorage.getItem('cart');
    return JSON.parse(storedCart) || [];
};

let updateCart = function(item) {
    let retrievedCart = checkCart();
    let itemInCart = retrievedCart.find(cartItem => cartItem.item_id === item.item_id);
    if (itemInCart) {itemInCart.quantity += item.quantity}
    else {retrievedCart.push(item)}
    let cart = JSON.stringify(retrievedCart);
    localStorage.setItem('cart', cart);
};

let getCartItems = function() {
    let retrievedCart = checkCart();
    let items = retrievedCart.map(cartItem => ({
        item_id: cartItem.item_id,
        item_name: cartItem.item_name,
        price: cartItem.price,
        item_category: cartItem.item_category,
        quantity: cartItem.quantity,
}));
return items;
};

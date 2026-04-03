Items
Categories
Electronics
Samsung Phone
Name - Samsung Phone
SKU - 001
Price - $1100
Category - electronics
Prod img 1

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
event: ‘view_item’,
currency: ‘USD’,
value: 1100.00,
items: [
{item_id: ‘SKU-001’,
item_name: ‘Samsung Phone’,
price: 1100.00,
item_category: ‘Electronics’,
quantity: 1,
}
]
});

Sony Phone
Name - Sony Phone
SKU - 002
Price - $500
Category - electronics
Prod img 4
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
event: ‘view_item’,
currency: ‘USD’,
value: 599.99,
items: [
{item_id: ‘SKU-002’,
item_name: ‘Sony Phone’,
price: 599.99,
item_category: ‘Electronics’,
quantity: 1,
}
]
});

Apple Phone
Name - Apple Phone
SKU - 003
Price - $1200
Category - electronics
Prod img 5
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
event: ‘view_item’,
currency: ‘USD’,
value: 1200.00,
items: [
{item_id: ‘SKU-003’,
item_name: ‘Apple Phone’,
price: 1200.00,
item_category: ‘Electronics’,
quantity: 1,
}
]
});

Accessories
Phone Screen Protector
Name - Phone Screen Protector
SKU - 004
Price - $29.99
Category - Accessory
Prod img 6
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
event: ‘view_item’,
currency: ‘USD’,
value: 29.99,
items: [
{item_id: ‘SKU-004’,
item_name: ‘Phone Screen Protector’,
price: 29.99,
item_category: ‘Accessories’,
quantity: 1,
}
]
});

Variable quantity implementation
Transaction_id
Will be generated and logged to local storage upon thank-you page first load

Page_view
| Tag | Type | Trigger |
|-----|------|---------|
| GA4 Init | Google Tag | All Pages — Initialization |
View_item
| Tag | Type | Trigger |
|-----|------|---------|
| view_item | Google Tag | Some Pages — URL contains ‘-product’ |
Add_to_cart
| Tag | Type | Trigger |
|-----|------|---------|
| add_to_cart | Google Tag | Custom Event — ‘add_to_cart’ |
Begin_checkout
| Tag | Type | Trigger |
|-----|------|---------|
| begin_checkout | Google Tag | Custom Event — ‘begin_checkout’ |
Purchase
| Tag | Type | Trigger |
|-----|------|---------|
| purchase | Google Tag | Some Pages — Custom Event — ‘purchase’ |

add_to_cart
HTML dataset for the following
<div id=’item’ data-item_id='SKU-001' data-item_name="Samsung Phone" data-item_price=1100.00 data-item_category='Electronics'> Samsung Phone </div>

let item = document.querySelector(‘#item’);

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
event: ‘add_to_cart’,
currency: ‘USD’,
value: Number(quantity) * parseFloat(item.dataset.price),
items: [
{item_id: item.dataset.id,
item_name: item.dataset.name,
price: parseFloat(item.dataset.price),
item_category:item.dataset.category,
quantity: quantity,
}
]
});


Utility
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







Product 
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









Checkout and purchase
Checkout
'use strict';


let items = getCartItems();


let orderButton = document.querySelector('.order_button');


let renderOrder = function() {
    document.querySelector(".cart_items").innerHTML = "";


    for (let item of items) {


        let tdProductxQuantity = document.createElement('td');
        tdProductxQuantity.innerHTML = `${item.item_name} x ${item.quantity}`;




        let tdTotal = document.createElement('td');
        let x = item.price * item.quantity;
        tdTotal.innerHTML = `$${x.toFixed(2)}`;


        let tr = document.createElement('tr');
        tr.appendChild(tdProductxQuantity);
        tr.appendChild(tdTotal);


        document.querySelector('.cart_items').appendChild(tr);
    }
   
    let subtotal = items.reduce((total, item) => {return total + (item.price * item.quantity)}, 0);
    let subT = document.querySelector('.cart-subtotal');
    let tdSubtotal = document.createElement('td');
    tdSubtotal.classList.add('amount');
    tdSubtotal.innerHTML = `$${subtotal.toFixed(2)}`;
    subT.appendChild(tdSubtotal);
   
    let taxAmt = parseFloat(subtotal) * 0.0753;
    let tax = document.querySelector('.tax');
    let tdTax = document.createElement('td');
    tdTax.innerHTML = `$${taxAmt.toFixed(2)}`;
    tax.appendChild(tdTax);


    let shipping = 10.20;
    let total = parseFloat(subtotal + taxAmt + shipping);
    let orderTotal = document.querySelector('.order-total');
    let tdOrderTotal = document.createElement('td');
    tdOrderTotal.innerHTML = `$${total.toFixed(2)}`;
    orderTotal.appendChild(tdOrderTotal);


    return total;
};


let total = renderOrder();


//DataLayer Push
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    event: 'begin_checkout',
    currency: 'USD',
    value: parseFloat(total.toFixed(2)),
    items: items });
   
orderButton.addEventListener('click', function(){
    if (items.length === 0) {alert('Your cart is empty!');
    return;}


    else {window.location.href = 'thank-you.html'
    };
});












Purchase page
'use strict';


let transaction_id = window.localStorage.getItem('transaction_id') || crypto.randomUUID();
localStorage.setItem('transaction_id', transaction_id);


let transaction_id_el = document.querySelector('.transaction_id');
transaction_id_el.innerHTML= `Order ID: ${transaction_id}`;


let items = getCartItems();


let shipping = 10.20;


let renderConfirmation = function() {
    document.querySelector(".cart_items").innerHTML = "";


    for (let item of items) {


        let tdProduct = document.createElement('td');
        tdProduct.innerHTML = item.item_name;


        let tdPrice = document.createElement('td');
        tdPrice.innerHTML = item.price;


        let tdQuantity = document.createElement('td');
        tdQuantity.innerHTML = item.quantity;


        let tdTotal = document.createElement('td');
        tdTotal.innerHTML = `${item.price * item.quantity}`;


        let tr = document.createElement('tr');
        tr.appendChild(tdProduct);
        tr.appendChild(tdPrice);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdTotal);


        document.querySelector('.cart_items').appendChild(tr);
    }
   
    let subtotal = items.reduce((total, item) => {return total + (item.price * item.quantity)}, 0);
    let subT = document.querySelector('.cart-subtotal');
    let tdSubtotal = document.createElement('td');
    tdSubtotal.classList.add('amount');
    tdSubtotal.innerHTML = `$${subtotal.toFixed(2)}`;
    subT.appendChild(tdSubtotal);


    let taxAmt = parseFloat(subtotal) * 0.0753;
    let tax = document.querySelector('.tax');
    let tdTax = document.createElement('td');
    tdTax.innerHTML = `$${taxAmt.toFixed(2)}`;
    tax.appendChild(tdTax);


    let total = parseFloat(subtotal + taxAmt + shipping);
    let orderTotal = document.querySelector('.order-total');
    let tdOrderTotal = document.createElement('td');
    tdOrderTotal.innerHTML = `$${total.toFixed(2)}`;
    orderTotal.appendChild(tdOrderTotal);


    return {total, taxAmt};
};


let {total, taxAmt}= renderConfirmation();


window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
event: 'purchase',
currency: 'USD',
value: parseFloat(total.toFixed(2)),
items: items,
transaction_id : transaction_id,
tax: taxAmt,
shipping: shipping, });


localStorage.removeItem('cart');








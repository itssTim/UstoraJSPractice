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
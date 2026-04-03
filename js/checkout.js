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

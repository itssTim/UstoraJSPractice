//    Script for Update Cart, Remove Item button, and Checkout
'use strict';

let items = getCartItems();

let renderCart = function() {
    document.querySelector(".cart_items").innerHTML = "";

    for (item of items) {
        let tdRemove = document.createElement('td');
        let tdRemoveButton = document.createElement('button');
        tdRemoveButton.classList.add('removeButton');
        tdRemove.appendChild(tdRemoveButton);
        tdRemoveButton.innerHTML = 'X';
        tdRemoveButton.setAttribute('data-item_id', `${item.item_id}`)

        let tdProduct = document.createElement('td');
        tdProduct.innerHTML = item.item_name;

        let tdPrice = document.createElement('td');
        tdPrice.innerHTML = item.price;

        let tdQuantity = document.createElement('td');
        tdQuantity.innerHTML = `
        <input type="button" data-item_id='${item.item_id}' class="minus" value="-">
        <input type="number" class="qty" value=${item.quantity} min="1" step="1">
        <input type="button" data-item_id='${item.item_id}' class="plus" value="+">`;

        let tdTotal = document.createElement('td');
        tdTotal.innerHTML = `${item.price * item.quantity}`;

        let tr = document.createElement('tr');
        tr.appendChild(tdRemove);
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
    tdSubtotal.innerHTML = `$${subtotal.toFixed(2)}`
    subT.appendChild(tdSubtotal);
};


document.querySelector('.shop_table').addEventListener('click', function(e){
    let clickedId = e.target.dataset.item_id;

    if (e.target.classList.contains('minus')) {
        let item = items.find(item => item.item_id === clickedId);
        if (item.quantity > 1) {item.quantity -= 1};
        let cart = JSON.stringify(items);
        localStorage.setItem(‘cart’, cart);
        renderCart();

    };
    if (e.target.classList.contains('plus')) {
        let item = items.find(item => item.item_id === clickedId);
        item.quantity += 1;
        let cart = JSON.stringify(items);
        localStorage.setItem(‘cart’, cart);
        renderCart();
    };
    if (e.target.classList.contains('removeButton')) {
        items = items.filter(item => item.item_id !== clickedId);
        let cart = JSON.stringify(items);
        localStorage.setItem(‘cart’, cart);
        renderCart();
    };
});

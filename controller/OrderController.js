import OrderModel from "../model/OrderModel.js";
import CartModel from "../model/CartModel.js";
import {customer_array} from "../db/database.js";
import {item_array} from "../db/database.js";
import {cart_array} from "../db/database.js";

$(document).ready(function () {
    $("#order-nav").on('click', function (event) {
        event.preventDefault();
        loadCustomerId();
        loadItemId();
    });
});

$("#itemOrderId").on('input', function () {
    let selectedItemId = $(this).val();

    let selectedItem = item_array.find(item => item._id == selectedItemId);

    if (true) {
        $('#itemNameOrder').val(selectedItem._itemName);
        $('#OrderPrice').val(selectedItem._price);
    }
});

const loadCustomerId = () => {
    $("#customerOrderId").empty();
    $("#customerOrderId").append('<option value="">Select customer id</option>');

    customer_array.map((customer) => {
        let cusData = `<option value="${customer.id}">${customer.id}</option>`;
        $("#customerOrderId").append(cusData);
    });
}

const loadItemId = () => {
    $("#itemOrderId").empty();
    $("#itemOrderId").append('<option value="">Select item id</option>');

    item_array.map((item) => {
        let itemData = `<option value="${item.id}">${item.id}</option>`;
        $("#itemOrderId").append(itemData);
    });
}

//Add item to cart
$("#addToCart").on('click', function () {
    let customerId = $('#customerOrderId').val();
    let itemId = $('#itemOrderId').val();
    let itemNameOrder = $('#itemNameOrder').val();
    let orderQuantity = $('#OrderQuantity').val();
    let orderItemPrice = $('#OrderPrice').val();

    if(customerId.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid customer Id",
        });
    } else if(itemId.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid item Id",
        });
    }else if(itemNameOrder.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Material",
        });
    }else if(orderQuantity.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid quantity",
        });
    } else if(orderItemPrice.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Price",
        });
    } else {
        let cart = new CartModel(
            customerId,
            itemId,
            itemNameOrder,
            orderQuantity,
            orderItemPrice
        );

        cart_array.push(cart);

        loadCartData();
    }
});

const loadCartData = () => {
    $("#order-tbl-body").empty();
    cart_array.map((item, index) => {
        let cartData = `<tr><td>${item.itemId}</td><td>${item.itemName}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`;
        $("#order-tbl-body").append(cartData);
    });
}


import OrderModel from "../model/OrderModel.js";
import CartModel from "../model/CartModel.js";
import {customer_array} from "../db/database.js";
import {item_array} from "../db/database.js";
import {cart_array} from "../db/database.js";
import {order_array} from "../db/database.js";



$(document).ready(function () {
    $("#order-nav").on('click', function (event) {
        displayDate();
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
    let orderQuantity = parseInt($('#OrderQuantity').val(), 10);
    let orderItemPrice = parseFloat($('#OrderPrice').val());

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
        let existingCartItem = cart_array.find(cart => cart.itemId === itemId);

        if (existingCartItem) {
            existingCartItem.quantity += orderQuantity;
            existingCartItem.price = existingCartItem.quantity * orderItemPrice;
        } else {
            let cart = new CartModel(
                customerId,
                itemId,
                itemNameOrder,
                orderQuantity,
                orderQuantity * orderItemPrice
            );
            cart_array.push(cart);
        }

        $("#netTotal").val(calculateNetTotal());
        loadCartData();
    }
});

const loadCartData = () => {
    $("#order-tbl-body").empty();
    cart_array.map((item, index) => {
        let cartData = `<tr><td>${item.itemId}</td><td>${item.material}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`;
        console.log(cartData);
        $("#order-tbl-body").append(cartData);
    });
}

function displayDate() {
    const dateElement = document.getElementById("currentDate");
    const currentDate = new Date();

    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    dateElement.textContent = `${formattedDate}`;
}

$("#placedOrder").on('click', function () {
    let cusID = $('#customerOrderId').val();
    let date = new Date(); // Current date for the order
    let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    let netTotal = parseFloat($("#netTotal").val());

    if (!cusID || cart_array.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Action",
            text: "Please select a customer and add items to the cart before placing the order.",
        });
        return;
    }

    let newOrderId = order_array.length + 1;

    let order = new OrderModel(
        newOrderId,
        cusID,
        cart_array.itemId,
        formattedDate,
        cart_array.material,
        cart_array.quantity,
        //cart_array.price
        netTotal
    );

    order_array.push(order);

    cart_array.length = 0;
    loadCartData();
    $("#netTotal").val(0);

    Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: `Order ID ${newOrderId} has been placed successfully.`,
    });

    loadOrderDetail();
});

const loadOrderDetail = () => {
    $("#order-history-tbl-body").empty();
    order_array.forEach((order) => {
        let orderData = `
            <tr>
                <td>${order.orderId}</td>
                <td>${order.customerId}</td>
                <td>${order.date}</td>
                <td>${order.total}</td>
            </tr>
        `;
        $("#order-history-tbl-body").append(orderData);
    });
};

const calculateNetTotal = () => {
    let netTotal = 0;

    cart_array.forEach(item => {
        netTotal += item.price;
    });
    return netTotal;
};
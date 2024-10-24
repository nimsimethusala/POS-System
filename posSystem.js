let hero_nav =document.getElementById("hero-nav");
let customer_nav =document.getElementById("customer-nav");
let item_nav =document.getElementById("item-nav");
let order_nav =document.getElementById("order-nav");

let hero = document.getElementById("hero");
let customer = document.getElementById("customer");
let item = document.getElementById("item");
let order = document.getElementById("order");

customer.style.display="none";
item.style.display="none";
order.style.display="none";

hero_nav.addEventListener('click', function (){
    hero.style.display="block";
    customer.style.display="none";
    item.style.display="none";
    order.style.display="none";
});

customer_nav.addEventListener('click', function (){
    hero.style.display="none";
    customer.style.display="block";
    item.style.display="none";
    order.style.display="none";
});

item_nav.addEventListener('click', function (){
    hero.style.display="none";
    customer.style.display="none";
    item.style.display="block";
    order.style.display="none";
});
order_nav.addEventListener('click', function (){
    hero.style.display="none";
    customer.style.display="none";
    item.style.display="none";
    order.style.display="block";
});


let customer_array = [];
let item_array = [];

//Save Customer
$("#save-customer").on('click', function () {
   let cus_id = $('#customerId').val();
   let cus_name = $('#customerName').val();
   let cus_address = $('#address').val();
   let cus_contact = $('#contact').val();
   let cus_email = $('#email').val();

   console.log("id:", cus_id);
   console.log("name:", cus_name);
   console.log("address:", cus_address);
   console.log("contact:", cus_contact);
   console.log("email:", cus_email);

   let customer = {
       cusId: cus_id,
       name: cus_name,
       address: cus_address,
       contact: cus_contact,
       email: cus_email
   };

    customer_array.push(customer);

    let customer_data = `<tr><td>${customer.cusId}</td>
                                    <td>${customer.name}</td>
                                    <td>${customer.address}</td>
                                    <td>${customer.contact}</td>
                                    <td>${customer.email}</td></tr>`;

    $("#cus-tbl-body").append(customer_data);
});

//Save Item
$("#save-item").on('click', function () {
   let item_id = $('#itemId').val();
   let material = $('#material').val();
   let price = $('#price').val();

   console.log("Item  Id: ", item_id);
   console.log("Material: ", material);
   console.log("Price: ", price);

   let item = {
       itemId: item_id,
       material: material,
       price: price
   };

   item_array.push(item);

   let item_data = `<tr><td>${item.itemId}</td><td>${item.material}</td><td>${item.price}</td></tr>`;

   $("#item-tbl-body").append(item_data);
});

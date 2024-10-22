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


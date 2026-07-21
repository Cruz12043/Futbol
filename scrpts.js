/* =====================================
   CONFIGURACIÓN GENERAL
===================================== */


let cart = JSON.parse(localStorage.getItem("cart")) || [];



/* =====================================
   ELEMENTOS DEL DOM
===================================== */


const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");



/* =====================================
   AGREGAR PRODUCTOS AL CARRITO
===================================== */


function addToCart(product){


    const exist = cart.find(
        item => item.id === product.id
    );


    if(exist){


        exist.quantity++;


    }else{


        cart.push({

            ...product,

            quantity:1

        });


    }


    saveCart();

    updateCart();


    showMessage(
        "Producto agregado 🛒"
    );


}





/* =====================================
   ELIMINAR PRODUCTOS
===================================== */


function removeCart(id){


    cart = cart.filter(
        item => item.id !== id
    );


    saveCart();

    updateCart();

}





/* =====================================
   ACTUALIZAR CARRITO
===================================== */


function updateCart(){


    if(!cartItems) return;


    cartItems.innerHTML="";


    let total=0;

    let count=0;



    cart.forEach(product=>{


        total += product.price * product.quantity;

        count += product.quantity;



        cartItems.innerHTML += `

        <div class="cart-item">


            <img src="${product.image}">


            <div>

                <h4>
                ${product.name}
                </h4>


                <p>
                $${product.price}
                x ${product.quantity}
                </p>


                <button 
                onclick="removeCart(${product.id})">

                ❌

                </button>


            </div>


        </div>


        `;


    });



    cartCount.innerHTML=count;


    cartTotal.innerHTML=

    `Total: $${total.toLocaleString()}`;

}




/* =====================================
   GUARDAR CARRITO
===================================== */


function saveCart(){


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


}





/* =====================================
   BOTONES COMPRAR
===================================== */


document.querySelectorAll(".buy-btn")
.forEach(button=>{


button.addEventListener(
"click",

()=>{


const card = 
button.closest(".product-card");



const product={


id:
Date.now(),


name:
card.querySelector("h3").innerText,


price:
Number(

card.querySelector(".price")
.innerText
.replace("$","")

),



image:
card.querySelector("img").src



};



addToCart(product);



});


});





/* =====================================
   ABRIR / CERRAR CARRITO
===================================== */


const cartPanel =
document.querySelector(".cart-panel");



const cartIcon =
document.querySelector(".cart-container");



if(cartIcon){


cartIcon.onclick=()=>{


cartPanel.classList.toggle(
"active"
);


};


}





/* =====================================
   BUSCADOR
===================================== */


const searchInput =
document.querySelector("#search");



if(searchInput){


searchInput.addEventListener(

"keyup",

()=>{


let value =
searchInput.value
.toLowerCase();



document
.querySelectorAll(".product-card")
.forEach(card=>{


let name =
card
.querySelector("h3")
.innerText
.toLowerCase();



if(name.includes(value)){


card.style.display="block";


}else{


card.style.display="none";


}



});



});


}





/* =====================================
   ANIMACIÓN SCROLL
===================================== */


const reveals =
document.querySelectorAll(".reveal");



window.addEventListener(
"scroll",

()=>{


reveals.forEach(element=>{


let windowHeight =
window.innerHeight;



let top =
element
.getBoundingClientRect()
.top;



if(top < windowHeight - 100){


element.classList.add(
"active"
);


}



});


});





/* =====================================
   MENÚ MOBILE
===================================== */


const menuBtn =
document.querySelector(".menu-btn");


const menu =
document.querySelector(".menu");



if(menuBtn){


menuBtn.onclick=()=>{


menu.classList.toggle(
"show"
);


};


}





/* =====================================
   MENSAJE TEMPORAL
===================================== */


function showMessage(text){


const message =
document.createElement("div");



message.className=
"notification";



message.innerHTML=text;



document.body.appendChild(
message
);



setTimeout(()=>{


message.remove();


},2000);



}





/* =====================================
   INICIALIZAR
===================================== */


updateCart();
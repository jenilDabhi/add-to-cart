const btns = document.querySelectorAll('.btn button');

btns.forEach(button => {
    button.addEventListener('click', (event) => {
        let productElement = event.target.closest('.product-item');
        let product = {
            images: productElement.querySelector('.images img').src,
            name: productElement.querySelector('.name h2').textContent,
            price: parseInt(productElement.querySelector('.price h3').textContent.replace('Price: ', '')),
            totalPrice: parseInt(productElement.querySelector('.price h3').textContent.replace('Price: ', '')),
            quantity: 1
        };
        addItemToLocal(product);
    });
});

function addItemToLocal(product) {
    let cartItems = JSON.parse(localStorage.getItem('prdcart')) || [];

    if (!Array.isArray(cartItems)) {
        cartItems = [];
    }

    let existingProduct = cartItems.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
    } else {
        cartItems.push(product);
    }

    localStorage.setItem("prdcart", JSON.stringify(cartItems));
    console.log("Cart Updated:", cartItems);
}


function dispCartItem() {
    let html = '';
    let cartItems = JSON.parse(localStorage.getItem('prdcart')) || [];
    cartItems.forEach(item => {
        html += `
         <div class="cartlist">
        <img src="${item.images}" alt="">
        <h3>${item.name}</h3>
        <h3>${item.price}</h3>
        <h3>${item.quantity}</h3>
        <h3>${item.totalPrice}</h3>    
    </div> 
        `
    });

    document.querySelector(".catrDisplay").innerHTML = html;
}

dispCartItem()

function cartNumberDisplay(){
    let cartNumbers = 0;
    
    let cartItems = JSON.parse(localStorage.getItem('prdcart')) || [];
    cartItems.forEach(item=>{
        cartNumbers = item.quantity +=cartNumbers;
    });
    console.log(cartNumbers);
    document.querySelector('.nav span').textContent = cartNumbers ; 
    
}
cartNumberDisplay()
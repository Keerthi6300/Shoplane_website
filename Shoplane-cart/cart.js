let cartItemFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"))
let cartCountElement = document.getElementById("cart-count");
let cartSection = document.getElementById("cart-section");
let billElement = document.getElementById("bill");

if(cartItemFromLocalStorage != null){
    cartCountElement.innerHTML = cartItemFromLocalStorage.length
    let price = cartItemFromLocalStorage.reduce((acc,item,i)=>{
        return acc + parseFloat(item.productPrice)
    } , 0)
    console.log(price)
    billElement.innerText = price;
}

cartItemFromLocalStorage.map((item,i)=>{
    cartSection.innerHTML += 
    `<div class="product-card">
        <img 
        class="cart-product-image"
        src=${item.productImg}
        />
        <div class="product-details">
        <h4>${item.productName}</h4>
        <h5 style="color: green;"> RS ${item.productPrice}</h5>
        <button 
        onClick = "removeFromCart(${i})"
        id="remove-from-cart-btn">Remove from Cart </button>
        </div>
    </div>`
})

function removeFromCart(index){
    let cartItemFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
    cartItemFromLocalStorage.splice(index , 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItemFromLocalStorage));
    location.reload()
}
let clothingSection = document.getElementById("clothing-section");
let accessoriesSection = document.getElementById("accessories-section");
let cartCountElement = document.getElementById("cart-count")

let cartItemFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

if(cartItemFromLocalStorage != null){
    cartCountElement.innerHTML = cartItemFromLocalStorage.length
}

axios.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
.then( (res)=>{
    let products = res.data;
    products.map((item,i)=>{

        if(item.isAccessory == false){
            clothingSection.innerHTML +=
        `<div class="product-card" onClick = "productClicked('${item.id}')">
        <img 
        class="product-image"
        src=${item.preview}
        />
        <h4>${item.name}</h4>
        <h5>${item.brand}</h5>
        <h5 style="color: green;"> RS ${item.price}</h5>
        </div>`
        }else{
            accessoriesSection.innerHTML += 
        `<div class="product-card" onClick = "productClicked('${item.id}')">
        <img 
        class="product-image"
        src=${item.preview}
        />
        <div class="product-details">
        <h4>${item.name}</h4>
        <h5>${item.brand}</h5>
        <h5 style="color: green;"> RS ${item.price}</h5>
        </div>
        </div>`
        }
    })
})
function productClicked(id){
    location.assign(`http://127.0.0.1:5500/specification.html?p_id=${id}`)
}
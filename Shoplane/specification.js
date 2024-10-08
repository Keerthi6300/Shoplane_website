let p_id = location.search.split("=")[1]
let specificationContainer = document.getElementById("specification-container")
let cartCountElement = document.getElementById("cart-count")

let cartItemFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"))
if(cartItemFromLocalStorage != null){
    cartCountElement.innerHTML = cartItemFromLocalStorage.length
}


axios.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${p_id}`)
.then( (Res)=>{
    let productData = Res.data;
    specificationContainer.innerHTML = `  
     <div id="specification-image-conatiner">
            <img 
            id="specification-image"
            src=${productData.preview}>
        </div>
        <div id="specification-details-conatiner">
            <h1>${productData.name}</h1>
            <h2>${productData.brand}</h2>
            <h2>Price: Rs ${productData.price}</h2>
            <h2>Description</h2>
            <p>${productData.description}</p>
            <h2>Product Preview</h2>
            <div id="product-preview">

            </div>
            <button 
            onClick = "addToCart('${productData.name}','${productData.price}','${productData.preview}')"
            class = "add-to-cart-btn">Add to Cart</button>
        </div>
         `
         let productPreviewSection = document.getElementById("product-preview");
productData.photos.map( (item,i) => {
    productPreviewSection.innerHTML += `
    <div class="product-preview-card">
                    <img 
                    id="img${i}"
                    onClick = "productPreviewClicked('img${i}')"
                    class="product-preview-image ${i == 0 ? `active` : ""}"
                    src="${item}"/>
                </div>
                ` 
})
    
})



function productPreviewClicked(id){
    document.getElementsByClassName("active")[0].classList.remove("active")
    document.getElementById(id).classList.add("active")
    let specificationImage = document.getElementById("specification-image")
    specificationImage.src = document.getElementById(id).src
}

function addToCart(name,price,img){
    let obj = {
        productName : name,
        productPrice : price,
        productImg : img
    }
    let cartItemFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"))
    if(cartItemFromLocalStorage == null){ 
        let cartItems = []
        cartItems.push(obj);
        localStorage.setItem("cartItems" , JSON.stringify(cartItems))
        cartCountElement.innerHTML = cartItems.length
    }else{
    let cartItemFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
    cartItemFromLocalStorage.push(obj)
    localStorage.setItem("cartItems", JSON.stringify(cartItemFromLocalStorage));
    cartCountElement.innerHTML = cartItemFromLocalStorage.length
    }
}


console.log("You are doing well")
// Logic cho phan gia san pham o client 
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const priceInput = document.querySelector(".current-price");
const price = parseInt(priceInput.textContent.substring(1));
const input = document.getElementById("qtyInput");
decreaseBtn.addEventListener("click", ()=>{
    let quantity = parseInt(input.value);
    if(quantity>=1){
        quantity--;
        input.value= quantity;
        let newPrice = price*quantity;
        priceInput.textContent= "$"+newPrice;
    }
    else{
        return;
    }
    
})
increaseBtn.addEventListener("click", ()=>{
      let quantity = parseInt(input.value);
       quantity++;
        input.value= quantity;
        let newPrice = price*quantity;
        priceInput.textContent= "$"+newPrice;
      
})
// het logic phan cap nhat gia san pham o client

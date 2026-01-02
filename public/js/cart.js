console.log("yes");
const inputsQuantity = document.querySelectorAll("input[name='quantity']");
if(inputsQuantity.length>0){
    inputsQuantity.forEach((input)=>{
       input.addEventListener("change", ()=>{
         const itemId =  input.getAttribute("item-id");
        const quantityValue = input.value;
        window.location.href=`/cart/update/${itemId}/${quantityValue}`;
       })
    })
}
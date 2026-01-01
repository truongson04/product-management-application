module.exports.getNewPrice=(productList)=>{
const newProducts = productList.map((items)=>{
    items.priceNew= ((items.price*(100-items.discountPercentage))/100).toFixed(0);
    return items
   })
   return newProducts
}


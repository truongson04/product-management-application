const productCategory = require("../models/product-category.model");
module.exports.getNewPrice=(productList)=>{
const newProducts = productList.map((items)=>{
  if( items.discountPercentage && items.discountPercentage>0){
     items.priceNew= ((items.price*(100-items.discountPercentage))/100).toFixed(0);
    return items;
  }
  else{
    items.priceNew= items.price;
    return items;
  }
   })
   return newProducts
}
// lấy ra sản phẩm thuộc cả danh mục cha và danh mục con 
async function getSubCategory(parentId){
     const categories = await productCategory.find({
       parent_id: parentId,
       status:"active",
       deleted:false
    })
    let allCategories = [...categories];
    for(const category of allCategories){
     const children = await getSubCategory(category.id);
     allCategories= allCategories.concat(children)
    }
    return allCategories
  }


module.exports.getSubCategory = async (parentId)=>{
    
    const categories = await productCategory.find({
       parent_id: parentId,
       status:"active",
       deleted:false
    })
    let allCategories = [...categories];
    for(const category of allCategories){
     const children = await getSubCategory(category.id);
     allCategories= allCategories.concat(children)
    }
    return allCategories
  }
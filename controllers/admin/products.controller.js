const Product = require("../../models/product.models");
const helper = require("../../helper/createTree");
const productCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");
//Display the list
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  let searchingWord = "";
  if (req.query.keyword) {
    searchingWord = req.query.keyword;
    find.title = new RegExp(searchingWord, "i");
  }
  //pagination and position
  let pagination = {
    currentPage: 1,
    limit: 4,
  };
  if (req.query.page) {
    pagination.currentPage = parseInt(req.query.page);
  }
  pagination.skip = (pagination.currentPage - 1) * pagination.limit;
  const totalProducts = await Product.countDocuments(find);
  let totalPage = Math.ceil(totalProducts / pagination.limit);
  pagination.total = totalPage;
  //sorting products logic
  let sort={}
  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey]= req.query.sortValue

  }
  else{
  sort.position="desc";
  }

  const productList = await Product.find(find)
    .sort(sort)
    .limit(pagination.limit)
    .skip(pagination.skip);
  let fillterStatus = [
    {
      name: "Active",
      status: "active",
      class: "",
    },
    {
      name: "Inactive",
      status: "inactive",
      class: "",
    },
    {
      name: "All",
      status: "",
      class: "",
    },
  ];
  if (req.query.status) {
    const index = fillterStatus.findIndex(
      (items) => items.status == req.query.status
    );
    fillterStatus[index].class = "active";
  } else {
    const index = fillterStatus.findIndex((items) => items.status == "");
    fillterStatus[index].class = "active";
  }
  // lấy ra người tạo 
 for(const product of productList){
  const user = await Account.findOne({_id: product.createdBy.account_id});
  if(user){
    product.creator = user.fullName;
  }
  const updated = product.updatedBy[product.updatedBy.length-1];

  if(updated){
    const userUpdated = await Account.findOne({_id: updated.account_id});
  if(userUpdated){
    product.edited = userUpdated.fullName;
    
  }
  }
  
 }
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Product Management",
    products: productList,
    filterStatus: fillterStatus,
    inputValue: searchingWord,
    pagination: pagination,
  });
};
//change the status, change multi status and delete muli items
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  const pageNumber = req.params.page;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Update successfully")
  res.redirect(`/admin/products/?page=${pageNumber}`);
};
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids;
  const page = req.body.page;
  let arr = ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: arr } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: arr } }, { status: "inactive" });
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: arr } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", "Delete successfully");
      break;
    case "change-position":
     for(const items of arr){
      let itemTransform = items.split("__");
      const id = itemTransform[0];
      const position= itemTransform[1];
      await Product.updateOne({_id: id}, {position: position})

     }
      break;
    default:
      break;
  }
  res.redirect(`/admin/products/?page=${page}`);
};
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  const page = req.params.page;
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedBy:{
        account_id: res.locals.user._id,
       deletedAt: new Date(),
       }}
  );
  req.flash("success", "Deleted Successfully")
  res.redirect(`/admin/products?page=${page}`);
};
//create 
module.exports.createItem= async (req, res)=>{
  const categoryList = await productCategory.find({deleted:false});
  const newRecords = helper.createTree(categoryList);
res.render("admin/pages/products/create.pug", {
  pageTitle:"Create new product",
  list: newRecords
});
}
module.exports.createProducts= async(req, res)=>{
  if(!req.body.title){
     req.flash("error", "Please fill in your title")
    res.redirect("/admin/products/create")
   
    
    return ;
  }

if(!req.body.position){
  const countProduct = await Product.countDocuments();
  req.body.position= countProduct+1;

}
req.body.price = parseFloat(req.body.price);
req.body.discount = parseFloat(req.body.discount);
req.body.number = parseFloat(req.body.number);
req.body.createdBy= {
  account_id:res.locals.user._id
}

const newProduct = new Product(req.body);
await newProduct.save();
res.redirect("/admin/products")

}
// go to the edit the product page
module.exports.editItem= async (req, res )=>{
  try{
const find = {
    deleted : false,
    _id:req.params.id
  }
  const product = await Product.findOne(find);
  const categoryList = await productCategory.find({deleted:false});
  const newRecords = helper.createTree(categoryList);
 
   res.render("admin/pages/products/edit", {
    pageTitle:"Edit the product",
    product:product, 
    list : newRecords
   })
  }
  catch(err){
    req.flash("error", "The product is not exit")
    res.redirect("/admin/products")
  }
  
}
module.exports.editProduct = async (req, res)=>{
  if(!req.body.title){
     req.flash("error", "Please fill in your title")
    res.redirect("/admin/products/create")
   
    
    return ;
  }

req.body.price = parseFloat(req.body.price);
req.body.discount = parseFloat(req.body.discount);
req.body.number = parseFloat(req.body.number);
if(req.file){
req.body.thumbnail= `/uploads/${req.file.filename}`;
}
 const updated = 
  {
    account_id: res.locals.user._id,
    updatedAt : new Date()
  }
try{
await Product.updateOne({_id:req.params.id}, {...req.body, $push:{updatedBy:updated}}) // thêm lịch sử edit 
req.flash("success", "Updated successfully")
}
catch(err){

}

res.redirect("/admin/products")
}
module.exports.getDetails= async (req, res)=>{
try{
  const find ={
    _id: req.params.id,
  }
  const product = await Product.findOne(find);
  
  res.render("admin/pages/products/details", {
    pageTitle: product.title,
    product:product
  })
 
}
 catch(err){
    req.flash("error", "Cannot find the product")
    res.redirect("/admin/products")
  }
}
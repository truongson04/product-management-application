console.log("default")
const buttons = document.querySelectorAll("[button-status]")
if(buttons.length>0){
    buttons.forEach((btn)=>{
        
        btn.addEventListener("click",function (){
            const status = this.getAttribute("button-status");
           
            
        let url= new URL(window.location.href);
        if(status){
            url.searchParams.set("status", status);
        }
        else{
            url.searchParams.delete("status");
        }
        window.location.href=url.href;

        })
    })
}
   
const searchButton = document.querySelector(".search-btn");
searchButton.addEventListener("click", (e)=>{
    e.preventDefault(); 
    let url= new URL(window.location.href);
    const keyword = document.querySelector("#form-search").querySelector("input").value
    if(keyword){
         url.searchParams.set("keyword", keyword);
    }
    else{
        url.searchParams.delete("keyword");
    }
    window.location.href=url.href;

    
})
//pagination
const buttonPagination = document.querySelectorAll("[button-paginaion]");
buttonPagination.forEach((buttons)=>{
 buttons.addEventListener("click", ()=>{
   const currentPage= buttons.getAttribute("button-paginaion");
   let url= new URL(window.location.href);
   url.searchParams.set("page", currentPage);
   window.location.href= url.href;
 })
})
//sorting logic 
const sort = document.querySelector("[sort]");
const selectSort= sort.querySelector("select");
const sortClear = document.querySelector("[sort-clear]")

selectSort.addEventListener("change", (e)=>{
    let sortKeyValue= e.target.value.split("-");
    let url= new URL(window.location.href);
    url.searchParams.set("sortKey", sortKeyValue[0]);
    url.searchParams.set("sortValue", sortKeyValue[1]);
    window.location.href= url.href;

})
sortClear.addEventListener("click", ()=>{
    let url= new URL(window.location.href);
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href= url.href;
})
// sủa front end thêm selected cho option của select khi sort
let url = new URL(window.location.href);
const sortKey = url.searchParams.get("sortKey");
const sortValue = url.searchParams.get("sortValue");
if(sortKey && sortValue){
    const sortKeyAndValue= sortKey+"-"+sortValue;
    const selectedOption = sort.querySelector(`option[value=${sortKeyAndValue}]`);
    selectedOption.setAttribute("selected", "true");

}
//  const showAlert = document.querySelector("[show-alert]");
//  if(showAlert){
//     setTimeout(()=>{
//         showAlert.classList.add("d-none");
//     }, 5000)
//  }
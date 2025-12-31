
// show preview image
console.log("ok")
const inputImage = document.querySelector("[data-upload-image]")
const preview = document.querySelector("[data-upload-image-preview]");

inputImage.addEventListener("change", (e)=>{
 const file = e.target.files[0];
if(file){
    preview.src= URL.createObjectURL(file);
    preview.style.height= "200px"
     preview.style.width="200px";

}

})
//show warning alert
const showAlert = document.querySelector("[show-alert]");
 if(showAlert){
    setTimeout(()=>{
        showAlert.classList.add("d-none");
    }, 5000)
 }
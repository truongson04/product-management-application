console.log("reset");
const password = document.getElementById("password");
const passwordCheck = document.getElementById("passwordCheck");
const form = document.querySelector("#formReset");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const showAlert = document.getElementById("check");
    const oldAlert = document.getElementById("alert"); 
    if(oldAlert){
        showAlert.removeChild(oldAlert)
    }
    if(password.value!==passwordCheck.value){
        const alert = document.createElement("h3");
        alert.setAttribute("id", "alert");
        alert.textContent="The password did not match";
        alert.style.color="red";
        showAlert.appendChild(alert);
        return; 
    }
    form.submit();

})
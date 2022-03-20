console.log('inside client side javaScript')



const searchForm = document.querySelector("form")
const searchInput = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const location = searchInput.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
});
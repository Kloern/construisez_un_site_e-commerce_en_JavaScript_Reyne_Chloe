function confirmCommand(){
    const idCommand = document.getElementById("orderId");
    idCommand.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}

confirmCommand();
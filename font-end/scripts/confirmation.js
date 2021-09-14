function displayPriceAndOrderId() {
    const orderId = document.querySelector("#orderId");
    const totalPrice = document.querySelector("#totalPrice");

    orderId.innerText = localStorage.getItem("orderId");
    totalPrice.innerText = JSON.parse(localStorage.getItem("totalPrice")) + "€";
}

displayPriceAndOrderId();
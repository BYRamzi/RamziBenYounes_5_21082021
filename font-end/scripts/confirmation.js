//*** AFFICHAGE DE LA PAGE CONFIRMATION ***//

function displayPriceAndOrderId() {
    const orderId = document.querySelector("#orderId");
    const totalPrice = document.querySelector("#totalPrice");
// Récupération des données du LS : numéro de commande et total
    orderId.innerText = localStorage.getItem("orderId");
    totalPrice.innerText = JSON.parse(localStorage.getItem("totalPrice")) + "€";
}

// Appel de la fonction
displayPriceAndOrderId();
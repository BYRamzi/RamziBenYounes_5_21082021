//*** AFFICHAGE DES PRODUITS DU PANIER ***//

const cart = document.querySelector(".cart-summary");
let arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

function displayCart() {
    //Si panier est vide : affiche un message
    if(arrayProductsInCart === null){
        let ifEmptyCart = cart;
        ifEmptyCart.classList.add(".if-empty-cart")
        ifEmptyCart.innerHTML = "Votre panier est vide.";
        ifEmptyCart.style.textAlign = "center";
    } else {
    //Si le panier n'est pas vide, affiche les produits du local storage
        const productsCartSummary = document.querySelector(".cart-summary__products");
        for (let product in arrayProductsInCart) {
            let productsList = document.createElement("div");
            productsCartSummary.appendChild(productsList);
            productsList.classList.add("products-list");

            let productName = document.createElement("div");
            productsList.appendChild(productName);
            productName.classList.add("product-name");
            productName.innerHTML = arrayProductsInCart[product].name;

            let productQuantity = document.createElement("div");
            productsList.appendChild(productQuantity);
            productQuantity.classList.add("product-quantity");
            productQuantity.innerHTML = arrayProductsInCart[product].quantity;

            let productPrice = document.createElement("div");
            productsList.appendChild(productPrice);
            productPrice.classList.add("product-price");
            // Affichage du prix avec le formatage €
            productPrice.innerHTML = (arrayProductsInCart[product].price * arrayProductsInCart[product].quantity) + "€";
        }
    } 
}


// Calcul du montant total du panier 
function totalCountCart() {
    // Déclaration de variable pour mettre les prix présents dans le panier
    let arrayPriceCart = [];
    let totalPrice = document.querySelector(".total");

    // Recherche des prix présents dans le panier
    let totalPriceProduct = document.querySelectorAll(".product-price");
    for (let price in totalPriceProduct){
        // Ajout des prix dans le tableau
        arrayPriceCart.push(totalPriceProduct[price].innerHTML);
    }

    // Suppression des "undefined" du tableau
    arrayPriceCart = arrayPriceCart.filter((el) => {
        return el != undefined;
    });

    // Transformer en nombre chaque valeur du tableau
    arrayPriceCart = arrayPriceCart.map((x) => parseFloat(x));

    // Addition des valeurs du tableau pour avoir le prix total
    const reducer = (acc, currentVal) => acc + currentVal;
    arrayPriceCart = arrayPriceCart.reduce(reducer);

    // Affichage du prix total en €
    totalPrice.innerText = `Total : ${arrayPriceCart} €`;

    localStorage.setItem("totalPrice", JSON.stringify(arrayPriceCart));
}

// Suppression de tous les produits du panier
function toEmptyCart() {
    // Au clic sur le bouton, tous les produits sont supprimés du panier et du local storage
    const buttonDeleteCart = document.querySelector(".empty-cart");
    buttonDeleteCart.addEventListener("click", () => {
      localStorage.clear();
    });
}

// Formulaire 
function checkform() {
    //Déclaration des variables pour récuperer les éléments inputs dans le DOM 
    let lastName = document.querySelector("#lastname");
    let firstName = document.querySelector("#firstname");
    let address = document.querySelector("#address");
    let city = document.querySelector("#city");
    let email = document.querySelector("#mail");
    const submit = document.querySelector("#submit");

    // Gestion de la conformité du formulaire
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    
    // Ecoute du "click" sur le bouton pour confirmer la commande
    submit.addEventListener("click", (e) => {
        if (!regexName.test(lastName.value) ||
            !regexName.test(firstName.value) ||
            !regexEmail.test(email.value) ||
            !regexAddress.test(address.value) ||
            !regexCity.test(city.value)) {
            alert("Merci de vérifier que tous les champs complétés sont corrects.");
        } else {
            e.preventDefault();
            // création de l'objet contact pour la fiche client
            let products = [];
            let productsBought = JSON.parse(localStorage.getItem("products"));
            productsBought.forEach(p => {
                products.push(p._id);
            })

            // création d'une constante rassemblant formulaire et produits 
            const order = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: mail.value,
                },
                products: products,
            };

            // Envoi de la requete POST pour le backend
            fetch("http://localhost:3000/api/cameras/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("orderId", data.orderId);
                    // envoi vers la page de confirmation
                    document.location.href = "../confirmation/confirmation.html";  
                })
                .catch((erreur) => console.log("erreur : " + erreur));
        }

    });
}

// Appel des fonctions
displayCart();
toEmptyCart();
totalCountCart();
checkform();
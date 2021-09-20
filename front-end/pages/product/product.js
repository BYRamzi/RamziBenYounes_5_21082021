/*** AFFICHAGE DE L'ARTICLE SÉLECTIONNÉ ***/

// Déclaration variables pour accéder à l'argument "id" de l'API
let params = new URL(document.location).searchParams;
let id = params.get("id");

// Déclaration des constantes correspondantes au DOM
const productCardImg = document.querySelector(".img");
const productCardName = document.querySelector(".product-card__infos__title");
const productCardDescription = document.querySelector(".product-card__infos__description");
const productCardPrice = document.querySelector(".product-card__infos__price");
const cameraNumber = document.querySelector("#cameraNumber");
const lenseSelect = document.querySelector("#lense-select");

// Récupération du produit dont on a besoin via son "id"
function getCameras() {
  fetch(`http://localhost:3000/api/cameras/${id}`)
    .then(function (response) {
      return response.json();
    })

    .then(function (resultatAPI) {
      // Dispatch des données reçues via l'API aux bons endroits sur la page
      article = resultatAPI;
      productCardName.innerHTML = article.name;
      productCardImg.src = article.imageUrl;
      productCardDescription.innerText = article.description;

      // Formatage du prix pour l'afficher en euros
      article.price = article.price / 100;
      productCardPrice.innerText = article.price + "€"

      // Création des options de personnalisations des lentilles
      for (let i = 0; i < article.lenses.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.lenses[i];
        lenseSelect.appendChild(option);
      }
    })
    // Création du message d'erreur
    .catch((error) => {
      console.log(error);
      let container = document.querySelector(".container");
      container.innerHTML =
        "Nous n'avons pas réussi à afficher nos caméras. Si le problème persiste, contactez-nous.";
      container.style.textAlign = "center";
      container.style.padding = "280px";
    });
}

// 
function popUpConfirmation() {
  if (window.confirm(`Votre produit a bien été ajouté au panier!
      OK pour aller au panier
      ou ANNULER pour continuer votre shopping!`)) {
      window.location.href = "../cart/cart.html";
  } else {
      window.location.href = "../index/index.html";
  }
}

function addtoCart() {
  const addtoCartBtn = document.querySelector(".add-cart-btn");

  // Ecoute de l'événement au clic
  addtoCartBtn.addEventListener("click", () => {
    // Création des caractéristiques du produit ajouté au panier
    let productAdded = {
      name: productCardName.innerHTML,
      price: parseFloat(productCardPrice.innerHTML),
      quantity: parseFloat(document.querySelector("#cameraNumber").value),
      _id: id,
    }

    let quantity = parseFloat(document.querySelector("#cameraNumber").value);

    // Ajout dans le LS
    let arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

    // S'il n'y a pas de panier, je crée un tableau
    if (!arrayProductsInCart) {
      let arrayProductsInCart = [];
      arrayProductsInCart.push(productAdded);
      localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      popUpConfirmation();

    // Sinon, si j'ai un panier
    // Je vérifie que je n'ai pas d'objet dans le panier avant de l'ajouter
    } else if(!arrayProductsInCart.some(p => p._id === productAdded._id)) {
      arrayProductsInCart.push(productAdded);
      localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      popUpConfirmation();

    // Sinon
    // Si je l'ai dans mon panier, je filtre le produit par son _id et je mets à jour la quantité
    } else {
      arrayProductsInCart
      .filter(p => p._id === productAdded._id)
      .map(productAdded => productAdded.quantity = quantity + productAdded.quantity)
      .push(productAdded);
      localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      popUpConfirmation();
    };
  });
}

// Appel des fonctions
getCameras();
addtoCart();
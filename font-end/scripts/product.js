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
    // Création du message d'erreur
    .catch((error) => {
      let container = document.querySelector(".container");
      container.innerHTML =
        "Nous n'avons pas réussi à afficher nos caméras. Si le problème persiste, contactez-nous.";
      container.style.textAlign = "center";
      container.style.padding = "280px";
    })
    .then(function (resultatAPI) {
      // Dispatch des données reçues via l'API aux bons endroits sur la page
      article = resultatAPI;
      productCardName.innerHTML = article.name;
      productCardImg.src = article.imageUrl;
      productCardDescription.innerText = article.description;

      // Formatage du prix pour l'afficher en euros
      article.price = article.price / 100;
      productCardPrice.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(article.price);

      // Création des options de personnalisations des lentilles
      for (let i = 0; i < article.lenses.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.lenses[i];
        lenseSelect.appendChild(option);
      }
    });
}

// Appel de la fonction
main();

function main() {
  getCameras();
}


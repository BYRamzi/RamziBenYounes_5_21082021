//*** AFFICHAGE DE TOUS LES ARTICLES ***// 

// Récupération des données de l'API
function getArticles() {
    fetch("http://localhost:3000/api/cameras")
      .then(function (res) {
        return res.json();
      })
  
      // Dispatch des données de chaque produit dans le DOM
      .then(function (resultatAPI) {
        const articles = resultatAPI;
        console.log(articles);
        for (let article in articles) {
          // Création d'une div pour chaque produit dans le bloc "products"
          let productCard = document.createElement("div");
          document.querySelector(".products").appendChild(productCard);
          productCard.classList.add("product","col-md-6","col-lg-4");
  
          // Création du lien vers produit.html pour chaque bloc
          let productLink = document.createElement("a");
          productCard.appendChild(productLink);
          productLink.href = `front-end/pages/product/product.html?id=${resultatAPI[article]._id}`;
          productLink.classList.add("product-link","card","h-100","w-100");
  
          // Création d'un bloc pour l'image du produit
          let productImgDiv = document.createElement("div");
          productLink.appendChild(productImgDiv);
          productImgDiv.classList.add("product__img","h-75","w-100");
  
          // Affichage de l'image du produit
          let productImg = document.createElement("img");
          productImgDiv.appendChild(productImg);
          productImg.classList.add("card-img-top","h-100");
          productImg.src = resultatAPI[article].imageUrl;
  
          // Création du bloc pour les infos du produit
          let productInfosDiv = document.createElement("div");
          productLink.appendChild(productInfosDiv);
          productInfosDiv.classList.add("product__infos","card-body","h-25");
  
          // Affichage du titre du produit
          let productInfoTitle = document.createElement("p");
          productInfosDiv.appendChild(productInfoTitle);
          productInfoTitle.classList.add("product__infos__title","card-title");
          productInfoTitle.innerHTML = resultatAPI[article].name;
  
          // Affichage du prix du produit
          let productInfoPrice = document.createElement("p");
          productInfosDiv.appendChild(productInfoPrice);
          productInfoPrice.classList.add("product__infos__price","card-price");
  
          // Modification du prix pour l'afficher en euros
          resultatAPI[article].price = resultatAPI[article].price / 100;
          productInfoPrice.innerText = resultatAPI[article].price + "€"
        }
      })
  
      // Création du message d'erreur
      .catch((error) => {
        let productsContainer = document.querySelector(".products-container");
        productsContainer.innerHTML =
          "Désolés, nous n'avons pas réussi à afficher nos caméras. Réessayez et contactez-nous si le problème persiste";
        productsContainer.style.textAlign = "center";
      });
  }
  
  // Appel de la fonction getArticles
  getArticles();
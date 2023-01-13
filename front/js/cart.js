//récupération du localStorage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

//si panier vide
function getCart(){
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
    for (let produit in produitLocalStorage){
        //insertion de "article"
        const productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);
    
        //insertion de div pour img
        const productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";
        //insertion de l'image
        const imgUrl = document.createElement("img");
        productDivImg.appendChild(imgUrl);
        imgUrl.src = produitLocalStorage[produit].img_produit;
        imgUrl.alt = produitLocalStorage[produit].altImg_produit;
        
        //insertion de div content
        const productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";
    
        //insertion de div price
        const productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        //insertion prix
        const priceProduct = document.createElement("p");
        productItemContentTitlePrice.appendChild(priceProduct);
        priceProduct.innerHTML = produitLocalStorage[produit].prix_produit + " €";

        //insertion du titre h2
        const nameProduct = document.createElement("h2");
        productItemContentTitlePrice.appendChild(nameProduct);
        nameProduct.innerHTML = produitLocalStorage[produit].nom_produit;
    
        //insertion couleur
        const color = document.createElement("p");
        nameProduct.appendChild(color);
        color.innerHTML = produitLocalStorage[produit].couleur_produit;
        color.style.fontSize = "20px";
    
        //insertion de div settings
        const productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";
    
        //insertion de div quantité
        const productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        //insertion quantité
        const productQte = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQte);
        productQte.innerHTML = "Quantité : ";
        const productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = produitLocalStorage[produit].qte_produit;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");
    
        //insertion de div suppression
        const productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
        const productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
    }}
}
getCart();

//modification quantité
function modifyQte() {
    let qteModif = document.querySelectorAll(".itemQuantity");

    for (let j = 0; j < qteModif.length; j++){
        qteModif[j].addEventListener("change" , (event) => {
            event.preventDefault();

            let quantityModif = produitLocalStorage[j].quantite_produit;
            let qteModifValue = qteModif[j].valueAsNumber;

            const resultFind = produitLocalStorage.find((el) => el.qteModifValue !== quantityModif);

            resultFind.quantiteProduit = qteModifValue;
            produitLocalStorage[j].quantiteProduit = resultFind.quantite_produit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        })
    }
}
modifyQte();

//suppression d'un produit
function deleteProduct() {
    let btnSupprimer = document.querySelectorAll(".deleteItem");

    for (let k = 0; k < btnSupprimer.length; k++){
        btnSupprimer[k].addEventListener("click" , (event) => {
            event.preventDefault();

            let idDelete = produitLocalStorage[k].idProduit;
            let colorDelete = produitLocalStorage[k].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            //alert produit supprimé
            alert("Ce produit a bien été supprimé du panier");
        })
    }
}
deleteProduct();

//calcul total quantité panier
//calcul total prix panier

//récupération de l'id du produit
const url = new URL(window.location.href);
const idProduct = url.searchParams.get("id");

const qteSelect = document.querySelector("#quantity");
const colorSelect = document.querySelector("#colors");

//récupération des articles de l'API
fetch("http://localhost:3000/api/products/" + idProduct)
.then(function (res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function (resultatAPI) {
    article = resultatAPI;
    if (article) {
        getPost(article);
    }
})
.catch(function (err) {
    console.log(err);
});

function getPost(article) {
    //récupération de l'image
    const imgUrl = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgUrl);
    imgUrl.src = article.imageUrl;
    imgUrl.alt = article.altTxt;

    //récupération du titre
    const nameProduct = document.getElementById('title');
    nameProduct.innerHTML = article.name;

    //récupération du prix
    const priceProduct = document.getElementById('price');
    priceProduct.innerHTML = article.price;
    
    //récupération de la description
    const descriptionProduct = document.getElementById('description');
    descriptionProduct.innerHTML = article.description;

    //récupération des couleurs
    for (let colors of article.colors) {
        const color = document.createElement('option');
        document.querySelector('#colors').appendChild(color);
        color.value = colors;
        color.innerHTML = colors;
    }
    addCart(article);
}


function addCart(article) {
    const btnAddPanier = document.querySelector("#addToCart");

    //Vérification si dans le panier il y a ces 2 conditions 1 couleur et quantité entre 1 et 100
    btnAddPanier.addEventListener("click", (event)=>{
        if (qteSelect.value > 0 && qteSelect.value <=100 && qteSelect.value != 0){

        //choix de la couleur
        let choixCouleur = colorSelect.value;                
        //choix de la quantité
        let choixQte = qteSelect.value;
        //Récupération des options
        let optionsProduit = {
            id_produit: idProduct,
            couleur_produit: choixCouleur,
            qte_produit: Number(choixQte),
            nom_produit: article.name,
            prix_produit: article.price,
            description_produit: article.description,
            img_produit: article.imageUrl,
            altImg_produit: article.altTxt
        };

        //initialisation du local storage
        let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
        
        function popupConfirmation() {
            if(window.confirm(`Votre commande de ${choixQte} ${article.name} ${choixCouleur} est ajoutée au panier. Pour consulter votre panier, cliquez sur OK`)){
                window.location.href ="cart.html";
            }
        }

        //importation dans le local storage
        //si le panier comporte déjà au moins 1 article
        if (produitLocalStorage) {
            const resultFind = produitLocalStorage.find((el) => el.id_produit === idProduct && el.couleur_produit === choixCouleur);
            //si le produit commandé est déjà dans le panier
            if (resultFind) {
                let newQte =
                parseInt(optionsProduit.qte_produit) + parseInt(resultFind.qte_produit);
                resultFind.qte_produit = newQte;
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                popupConfirmation();
            //si le produit commandé n'est pas dans le panier
            } else {
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                popupConfirmation();
            }
        //si le panier est vide
        } else {
            produitLocalStorage =[];
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            popupConfirmation();
        }
        }
    });
}

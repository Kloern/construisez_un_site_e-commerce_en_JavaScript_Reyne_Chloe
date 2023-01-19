//récupération du localStorage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

//si panier vide
function getCart() {
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        for (let produit in produitLocalStorage) {
            //insertion de "article"
            const productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute(
                "data-id",
                produitLocalStorage[produit].id_produit
            );

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
            productItemContentTitlePrice.className =
                "cart__item__content__titlePrice";
            //insertion prix
            const priceProduct = document.createElement("p");
            productItemContentTitlePrice.appendChild(priceProduct);

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
            productItemContentSettings.appendChild(
                productItemContentSettingsQuantity
            );
            productItemContentSettingsQuantity.className =
                "cart__item__content__settings__quantity";

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
            productItemContentSettingsDelete.className =
                "cart__item__content__settings__delete";
            const productSupprimer = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";
        }
    }
}
getCart();

//modification quantité
function modifyQte() {
    let qteModif = document.querySelectorAll(".itemQuantity");

    for (let j = 0; j < qteModif.length; j++) {
        qteModif[j].addEventListener("change", (event) => {
            event.preventDefault();

            let quantityModif = produitLocalStorage[j].qte_produit;
            let qteModifValue = qteModif[j].valueAsNumber;

            const resultFind = produitLocalStorage.find(
                (el) => el.qteModifValue !== quantityModif
            );

            resultFind.qte_produit = qteModifValue;
            produitLocalStorage[j].qte_produit = resultFind.qte_produit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            location.reload();
        });
    }
}
modifyQte();

//suppression d'un produit
function deleteProduct() {
    let btnSupprimer = document.querySelectorAll(".deleteItem");

    for (let k = 0; k < btnSupprimer.length; k++) {
        btnSupprimer[k].addEventListener("click", (event) => {
            event.preventDefault();

            let idDelete = produitLocalStorage[k].id_produit;
            let colorDelete = produitLocalStorage[k].couleur_produit;

            produitLocalStorage = produitLocalStorage.filter(
                (el) => { el.id_produit !== idDelete || el.couleur_produit !== colorDelete
            });

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            //alert produit supprimé
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        });
    }
}
deleteProduct();

//calcul total quantité panier
//calcul total prix panier
function totaux() {
    //total des quantités
    let elemsQte = document.getElementsByClassName("itemQuantity");
    totalQte = 0;

    for (let i = 0; i < elemsQte.length; i++) {
        totalQte += elemsQte[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById("totalQuantity");
    productTotalQuantity.innerHTML = totalQte;
    console.log(totalQte);

    //prix total
    totalPrice = 0;

    for (let i = 0; i < elemsQte.length; i++) {
        totalPrice += (elemsQte[i].valueAsNumber * produitLocalStorage[i].prix_produit);
    }

    let productTotalPrice = document.getElementById("totalPrice");
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
totaux();


//formulaire regex
function formConfirm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Z]+)+");

    form.firstName.addEventListener("change", function () {
        validFirstName(this);
    });
    form.lastName.addEventListener("change", function () {
        validLastName(this);
    });
    form.address.addEventListener("change", function () {
        validAddress(this);
    });
    form.city.addEventListener("change", function () {
        validCity(this);
    });
    form.email.addEventListener("change", function () {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = "";
        } else {
            firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        }
    };

    //validation du nom
    const validLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = "";
        } else {
            lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        }
    };

    //validation de l'adresse
    const validAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = "";
        } else {
            addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        }
    };

    //validation de la ville
    const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = "";
        } else {
            cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        }
    };

    //validation de l'email
    const validEmail = function (inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = "";
        } else {
            emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
        }
    };
}
formConfirm();


//confirmation de la commande 
function postForm(){
    const btn_commander = document.getElementById("order");

    btn_commander.addEventListener("click", function(event) {
    
        //récupération du formulaire
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //construction du tableau depuis le localStorage
        let id_produit = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            id_produit.push(produitLocalStorage[i].id_produit);
        }

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: id_produit,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}
postForm();
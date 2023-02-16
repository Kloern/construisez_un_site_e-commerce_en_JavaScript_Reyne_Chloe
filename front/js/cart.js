//récupération du localStorage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit")) ?? [];
const positionEmptyCart = document.querySelector("#cart__items");

const productPrices = {};


//si panier vide
function getCart() {
    if (produitLocalStorage.length == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        for(let i=0; i<produitLocalStorage.length; i++) {
            fetch("http://localhost:3000/api/products/" + produitLocalStorage[i].id_produit)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (resultatAPI) {
                productPrices[resultatAPI._id] = resultatAPI.price;
                //insertion de "article"
                const productArticle = document.createElement("article");
                document.querySelector("#cart__items").appendChild(productArticle);
                productArticle.className = "cart__item";
                productArticle.setAttribute("data-id", resultatAPI._id);

                //insertion de div pour img
                const productDivImg = document.createElement("div");
                productArticle.appendChild(productDivImg);
                productDivImg.className = "cart__item__img";
                //insertion de l'image
                const imgUrl = document.createElement("img");
                productDivImg.appendChild(imgUrl);
                imgUrl.src = resultatAPI.imageUrl;
                imgUrl.alt = resultatAPI.altTxt;

                //insertion de div content
                const productItemContent = document.createElement("div");
                productArticle.appendChild(productItemContent);
                productItemContent.className = "cart__item__content";

                //insertion de div price
                const productItemContentTitlePrice = document.createElement("div");
                productItemContent.appendChild(productItemContentTitlePrice);

                //insertion prix
                const priceProduct = document.createElement("p");
                productItemContentTitlePrice.appendChild(priceProduct);
                priceProduct.innerHTML = resultatAPI.price + ' €';

                //insertion du titre h2
                const nameProduct = document.createElement("h2");
                productItemContentTitlePrice.appendChild(nameProduct);
                nameProduct.innerHTML = resultatAPI.name;

                //insertion couleur
                const color = document.createElement("p");
                nameProduct.appendChild(color);
                color.innerHTML = produitLocalStorage[i].couleur_produit;

                //insertion de div settings
                const productItemContentSettings = document.createElement("div");
                productItemContent.appendChild(productItemContentSettings);
                productItemContentSettings.className = "cart__item__content__settings";

                //insertion de div quantitéproductItemContentSettingsDelete
                const productItemContentSettingsQuantity = document.createElement("div");
                productItemContentSettings.appendChild(productItemContentSettingsQuantity);
                productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

                //insertion quantité
                const productQte = document.createElement("p");
                productItemContentSettingsQuantity.appendChild(productQte);
                productQte.innerHTML = "Quantité : ";
                const productQuantity = document.createElement("input");
                productItemContentSettingsQuantity.appendChild(productQuantity);
                productQuantity.value = produitLocalStorage[i].qte_produit;
                productQuantity.className = "itemQuantity";
                productQuantity.setAttribute("type", "number");
                productQuantity.setAttribute("min", "1");
                productQuantity.setAttribute("max", "100");
                productQuantity.setAttribute("name", "itemQuantity");

                // Changement de quantité puis mise à jour de la quantité totale et du prix total
                productQuantity.addEventListener('change', () => {
                    produitLocalStorage[i].qte_produit = parseInt(productQuantity.value);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    totals();
                })
                totals();

                //insertion de div suppression
                const productItemContentSettingsDelete = document.createElement("div");
                productItemContentSettings.appendChild(productItemContentSettingsDelete);
                productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
                const productSupprimer = document.createElement("p");
                productItemContentSettingsDelete.appendChild(productSupprimer);
                productSupprimer.setAttribute('idProduct', produitLocalStorage[i].id_produit);
                productSupprimer.setAttribute('colorProduct', produitLocalStorage[i].couleur_produit);
                productSupprimer.className = "deleteItem";
                productSupprimer.innerHTML = "Supprimer";

                // Suppression d'un article
                productSupprimer.addEventListener('click', (event) => {
                    productArticle.remove();
                    const idProduct = event.target.getAttribute('idProduct');
                    const colorProduct = event.target.getAttribute('colorProduct');
                    //Suppression de l'objet avec filter
                    produitLocalStorage = produitLocalStorage.filter(el => {
                        if(el.id_produit != idProduct) {
                            return true
                        } else if (el.couleur_produit != colorProduct) {
                            return true
                        } else {
                            return false
                        }
                    })
                    //On envoie la variable dans le local storage
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    totals();
                })
                totals();
            })
            .catch(function (err) {
                console.log(err);
            });
        }
    }
}
getCart();


//calcul total quantité panier
//calcul total prix panier
function totals() {
    let productTotalQuantity = document.getElementById("totalQuantity");
    let productTotalPrice = document.getElementById("totalPrice");

    let totalPrice = 0;
    let totalQuantity = 0;


    produitLocalStorage.forEach((produit) => {
        totalQuantity += produit.qte_produit;
    });
    productTotalQuantity.innerHTML = totalQuantity;

    produitLocalStorage.forEach((produit) => {
        totalPrice += produit.qte_produit * productPrices[produit.id_produit];
    });
    productTotalPrice.innerHTML = totalPrice;
}


//formulaire regex
// Ajout des Regex
const form = document.querySelector(".cart__order__form");

const emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
const charRegExp = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");
const addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Z]+)+");

//validation du prénom
const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = "";
        return true;
    }
    firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    return false;

};
form.firstName.addEventListener("change", function () {
    validFirstName(this);
});

//validation du nom
const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = "";
        return true;
    }
    lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    return false;

};
form.lastName.addEventListener("change", function () {
    validLastName(this);
});

//validation de l'adresse
const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = "";
        return true;
    }
    addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    return false;

};
form.address.addEventListener("change", function () {
    validAddress(this);
});

//validation de la ville
const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = "";
        return true;
    }
    cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    return false;
};
form.city.addEventListener("change", function () {
    validCity(this);
});

//validation de l'email
const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = "";
        return true;
    }
    emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    return false;

};
form.email.addEventListener("change", function () {
    validEmail(this);
});

//envoie du formulaire
function postForm(){
    const btn_commander = document.getElementById("order");

    btn_commander.addEventListener("click", function(event) {
        event.preventDefault();
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

        if (validFirstName(inputName) && validLastName(inputLastName) && validAddress(inputAdress) && validCity(inputCity) && validEmail(inputMail)) {
            fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then(data => {
                localStorage.setItem('orderId', data.orderId);
                document.location.href = 'confirmation.html?id='+ data.orderId;
            })
            .catch((err) => {
                alert ("Problème avec fetch : " + err.message);
            });
        }

    })
}
postForm();

//récupération de l'id du produit
const url = new URL(window.location.href);
const idProduct = url.searchParams.get("id");

//récupération des articles de l'API
fetch("http://localhost:3000/api/products/" + idProduct)
.then(function (res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    console.log(value);

    //récupération de l'image
    const imageAlt = document.createElement("img");
    imageAlt.setAttribute("src", value.imageUrl);
    imageAlt.setAttribute("alt", value.altTxt);
    const img = document.querySelector(".item__img");
    img.appendChild(imageAlt);

    //récupération du titre
    const nameProduct = document.querySelector("#title");
    nameProduct.innerText = value.name;
    
    //récupération du prix
    const priceProduct = document.querySelector("#price");
    priceProduct.innerText = value.price;

    //récupération de la description
    const descriptionProduct = document.querySelector("#description");
    descriptionProduct.innerText = value.description;

    //récupération des couleurs
    const colorsProduct = document.querySelector("#colors");
    colorsProduct.innerText = value.colors;
    for (let i = 0; i < value.colorsProduct.length; i++) {
        const color = document.createElement("option");
        color.setAttribute("value", value.colorsProduct[i]);
        color.innerText = value.colorsProduct[i];
        colorsProduct.appendChild(colorsProduct);
    }
})
.catch(function (err) {
    console.log(err);
});

//récupération couleur et quantité
const colorsProduct = document.querySelector("#colors");
const colors = "";
colorsProduct.addEventListener("input", function (e) {
    colors = e.target.value;
});

let number = 0;
document.querySelector("#quantity").addEventListener("input", function (e) {
    number = e.target.value;
});


//stockage de la quantité, de la couleur et de l'id dans le local storage
document.querySelector("#addToCart").addEventListener("click", function () {
    if (check(number, color)) {
        const item = constructItem(id, color);
        const kanapCart = getCart ();

        if (kanapCart[item] > 0) {
            kanapCart[item] = Number(kanapCart[item]) + Number(number);
        } else {
            kanapCart[item] = number;
        }

        saveCart(kanapCart);
    }
});

//vérification si une couleur est selectionée et si quantité valide
function check(number, color) {
    return number > 0 && Number.isInteger(+number) && !color == "";
}

//définission du format de l'élément a enregistrer dans le local storage
function constructItem(id, color) {
    return [id, color];
}

//renvoi Json ou un tableau vide s'il y en a pas
function getCart() {
    const cart = localStorage.getItem("kanapCart");
    if (cart != null) {
        return JSON.parse(cart);
    } else {
        return {};
    }
}

//sauvegarde de la carte dans le localstorage
function saveCart(cart) {
    localStorage.setItem("kanapCart", JSON.stringify(cart));
}
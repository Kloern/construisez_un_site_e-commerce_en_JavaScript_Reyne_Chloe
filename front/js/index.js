//homepage
// todo list card

fetch('http://localhost:3000/api/products')
    .then(function (result) {
        if (result.ok) {
            return result.json()
        }
    })
    .then(function (products) {
        products.map(function(el, i) {
            items.innerHTML += `<a href="./product.html?id=${el._id}">
            <article>
              <img src="${el.imageUrl}" alt="${el.altTxt}">
              <h3 class="productName">${el.name}</h3>
              <p class="productDescription">${el.description}</p>
            </article>
            </a>`
        })
    });


//déclaration des variables DOM
//déclaration des variables du fichier JSON
const tableau = function () {
    console.log();
    console.error();
    console.warn();
}

// le chemin relatif de mon fichier JSON 
// URL('./back/models/product.js')


// déclaration des variables du fichier JSON à insérer dans ma fonction fetch


const colors = products.colors[''];
const id = products._id;
const name = products.name;
const price = products.price;
const imageUrl = products.imageUrl;
const description = products.description;
const altTxt = products.altTxt;



// déclaration des variables DOM index.html de l52 à l58
const card = document.getElementsByClassName('items');

// créer une fonction qui exporte la card sur la page description


// creer les exports


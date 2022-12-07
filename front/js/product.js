// déclaration des variables du fichier JSON à insérer dans ma fonction fetch
fetch('http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926')
    .then(function (result) {
        if (result.ok) {
            return result.json()
        }
    })
    .then(function (products) {
        products.get(function(el, i) {
            items.innerHTML += `<a href="./product.html?id=107fb5b75607497b96722bda5b504926">
            <article>
              <img src="kanap01.jpeg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap Sinopé</h3>
              <p class="productDescription">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              "altTxt": "Photo d'un canapé bleu, deux places</p>
            </article>
            </a>`
        })
    });
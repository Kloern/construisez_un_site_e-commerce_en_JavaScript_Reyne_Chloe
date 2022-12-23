//homepage
// todo list card
const card = document.getElementsByClassName("items");

fetch("http://localhost:3000/api/products")
  .then(function (result) {
    if (result.ok) {
      return result.json();
    }
  })
  .then(function(value) {
    console.log(value);
    const section = document.querySelector("#items");

    for (let i = 0; i < value.length; i++) {
        const articleNew = document.createElement("article");

        const imageAlt = document.createElement("img");
        imageAlt.setAttribute("src", value[i].imageUrl);
        imageAlt.setAttribute("alt", value[i].altTxt);
        const img = document.querySelector(".item_img");
        articleNew.appendChild(imageAlt);

        const title = document.createElement("h3");
        title.setAttribute("class", "productName");
        title.innerText = value[i].name;
        articleNew.appendChild(title);

        const description = document.createElement("p");
        description.setAttribute("class", "productDescription");
        description.innerText = value[i].description;
        articleNew.appendChild(description);

        const lien = document.createElement("a");
        lien.setAttribute("href", "./product.html?id=" + value[i]._id);
        lien.appendChild(articleNew);
        section.appendChild(lien);
    }
  })
  .catch(function (err) {
    console.log(err);
  })

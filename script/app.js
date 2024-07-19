//BACKEND BILAN ISHLASH

//GET
//POST
//PUT
//DELETE

//fetch()
//axios()

//API => Application Programming Interface


//FETCH

// const repsonse = fetch("'https://fakestoreapi.com/products");

// console.log(repsonse);

const $result = document.querySelector("#result");

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => renderProducts(data))

const renderProducts = (data) => {
    data.forEach(product => {
        const $div = document.createElement("div");
        $div.className = "card";
        $div.innerHTML = `
            <img width="300" src="${product.image}" />
            <h3>${product.title}</h3>
            <p>${product.description.slice(0, 70)}</p>
            <strong>$${product.price}</strong>
            <button data-product-id="${product.id}" class="delete">Delete</button>
        `
        $result.appendChild($div);
    })
}

const handleProductActions = (e) => {
    if(e.target.classList.contains("delete")) {
        const id = e.target.dataset.productId;
        const userAgree = confirm("Are you sure delete this product?");
        if(userAgree) {
            fetch(`https://fakestoreapi.com/products/${id}`, {method:"DELETE"})
                .then(response => response.json())
                .then(data => renderProducts(data))
        }
    }
}

$result.addEventListener("click", handleProductActions);
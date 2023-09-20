
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var updateIndex;


var productsContainer = []

// lw kant be null = mfesh ay products 3andi
if (localStorage.getItem("products")) {
    productsContainer = JSON.parse(localStorage.getItem("products"))
    console.log("This is ", productsContainer);
    displayProduct(productsContainer)
}

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value
    }

    productsContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productsContainer))
    displayProduct(productsContainer);
}

function displayProduct(arr) {
    var cartoona = ``;
    for (var i = 0; i < arr.length; i++) {
        cartoona += `<tr>
            <td>${i + 1}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].category}</td>
            <td>${arr[i].description}</td>
            <td><button class="btn btn-outline-warning" onclick="setFormForUpdate(${i})" >Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
          </tr>`
    }

    document.getElementById("tableBody").innerHTML = cartoona
}


function deleteProduct(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer))
    displayProduct(productsContainer);
}

function searchProducts(term) {
    var searchedProducts = []
    for (var i = 0; i < productsContainer.length; i++) {
        console.log(productsContainer[i].name.toLowerCase().includes(term.toLowerCase()));
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchedProducts.push(productsContainer[i])
        }
    }

    displayProduct(searchedProducts)
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}

function setFormForUpdate(index) {
    addBtn.classList.replace("d-block", "d-none");
    updateBtn.classList.replace("d-none", "d-block");

    productNameInput.value = productsContainer[index].name;
    productPriceInput.value = productsContainer[index].price;
    productCategoryInput.value = productsContainer[index].category;
    productDescriptionInput.value = productsContainer[index].description;

    updateIndex = index;

}

function updateProduct() {
    productsContainer[updateIndex].name = productNameInput.value;
    productsContainer[updateIndex].price = productPriceInput.value;
    productsContainer[updateIndex].category = productCategoryInput.value;
    productsContainer[updateIndex].description = productDescriptionInput.value;

    clearForm()

    updateBtn.classList.replace("d-block", "d-none");
    addBtn.classList.replace("d-none", "d-block");

    localStorage.setItem("products", JSON.stringify(productsContainer))

    displayProduct(productsContainer);


}
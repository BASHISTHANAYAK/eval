// function for displaying data on page
let Products_Container = document.querySelector(".Products_Container");
let TotalProducts = document.getElementById("TotalProducts");
let TotalAmount = document.getElementById("TotalAmount");

let userDataFromLs = JSON.parse(localStorage.getItem("userCart")) || [];
displayData(userDataFromLs);
function displayData(arr) {
  Products_Container.innerHTML = "";

  if (userDataFromLs.length >= 1) {
    let totalPrice = userDataFromLs.reduce((acc, el) => acc + el.price, 0);
    setTimeout(() => {
      TotalProducts.innerText = `Total number of Products : ${userDataFromLs.length}`;
      TotalAmount.innerText = `Cart total amount : ${totalPrice}`;
    }, 2000);
  }

  arr.forEach((obj) => {
    let aProductDiv = document.createElement("div");
   
    let productImg = document.createElement("img");
    productImg.src = obj.img;

    let category = document.createElement("p");
    category.innerText = `Category: ${obj.category}`;

    let brand = document.createElement("p");
    brand.innerText = `Brand: ${obj.brand}`;

    let details = document.createElement("p");
    details.innerText = `Details: ${obj.details}`;

    let price = document.createElement("p");
    price.innerText = `Price: ${obj.price}`;

    let addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Remove";
    addToCartButton.classList.add("addToCartButton");
    addToCartButton.addEventListener("click", function () {
      //   console.log("clicked cart id-", obj.id);
      let newData = userDataFromLs.filter((ob) => ob.id != obj.id);

      console.log(newData);
      localStorage.setItem("userCart", JSON.stringify(newData));
      //   displayData(newData);
      window.location.reload();
    });

    aProductDiv.append(
      productImg,
      category,
      brand,
      details,
      price,
      addToCartButton
    );
    Products_Container.append(aProductDiv);
  });
}

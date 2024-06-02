let Products_Container = document.querySelector(".Products_Container");

let baseApi =
  "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products?page=1&limit=6";

// data fetching function
async function fetchData(api, sortPrice = "", filter = "") {
  try {
    let res = await fetch(`${api}${sortPrice}${filter}`);
    let { data } = await res.json();
    console.log(data);
    // calling displayData function
    if (data) {
      pagination(16);
      displayData(data);
    }
  } catch (error) {
    console.log(error);
  }
}
fetchData(baseApi);
// function for displaying data on page
function displayData(arr) {
  Products_Container.innerHTML = "";
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
    addToCartButton.innerText = "Add to Cart";
    addToCartButton.classList.add("addToCartButton");
    addToCartButton.addEventListener("click", function () {
      //   console.log("clicked cart id-", obj.id);
      let cartData = JSON.parse(localStorage.getItem("userCart")) || [];
      cartData.push(obj);
      localStorage.setItem("userCart", JSON.stringify(cartData));
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

// sorting functionality
let Sort_by_price = document.getElementById("Sort_by_price");
Sort_by_price.addEventListener("change", sortingByPrice);

let Sort_by_category = document.getElementById("Sort_by_category");
Sort_by_category.addEventListener("change", sortingByCategory);

// sorting By Price
function sortingByPrice() {
  let Sort_by_price_VALUE = Sort_by_price.value;
  console.log(Sort_by_price_VALUE);
  //&sort=price&order=asc&filter=Laptop
  if (Sort_by_price_VALUE && Sort_by_category.value == "") {
    fetchData(baseApi, `&sort=price&order=${Sort_by_price_VALUE}`);
  } else if (Sort_by_price_VALUE && Sort_by_category.value) {
    fetchData(
      baseApi,
      `&sort=price&order=${Sort_by_price_VALUE}`,
      `&filter=${Sort_by_category.value}`
    );
  } else if (Sort_by_category.value && Sort_by_price_VALUE == "") {
    fetchData(baseApi, "", `&filter=${Sort_by_category.value}`);
  } else {
    fetchData(baseApi);
  }
}

//sorting by category
function sortingByCategory() {
  let Sort_by_category_VALUE = Sort_by_category.value;
  console.log(Sort_by_category_VALUE);
  if (Sort_by_category_VALUE && Sort_by_price.value == "") {
    fetchData(baseApi, "", `&filter=${Sort_by_category_VALUE}`);
  } else if (Sort_by_category_VALUE && Sort_by_price.value) {
    fetchData(
      baseApi,
      `&sort=price&order=${Sort_by_price.value}`,
      `&filter=${Sort_by_category_VALUE}`
    );
  } else if (Sort_by_price.value && Sort_by_category_VALUE == "") {
    fetchData(baseApi, `&sort=price&order=${Sort_by_price_VALUE}`, "");
  } else {
    fetchData(baseApi);
  }
}

// pagination functionality
let footer = document.getElementById("footer");
function pagination(length) {
  footer.innerHTML = "";
  let total_button = Math.ceil(length / 6);
  for (let i = 1; i <= total_button; i++) {
    let pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.addEventListener("click", function () {
      console.log(i);
      let paginationApi = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products?page=${i}&limit=6`;

      if (Sort_by_category.value && Sort_by_price.value == "") {
        fetchData(paginationApi, "", `&filter=${Sort_by_category.value}`);
      } else if (Sort_by_category.value && Sort_by_price.value) {
        fetchData(
          paginationApi,
          `&sort=price&order=${Sort_by_price.value}`,
          `&filter=${Sort_by_category.value}`
        );
      } else if (Sort_by_price.value && Sort_by_category.value == "") {
        fetchData(
          paginationApi,
          `&sort=price&order=${Sort_by_price.value}`,
          ""
        );
      } else {
        fetchData(paginationApi);
      }
    });
    footer.append(pageButton);
  }
}

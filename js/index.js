"use strict";

// FETCH JSON DATA
const url =
  "https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json";

let json;
let selectedValue;

const getPizzaData = async () => {
  const response = await fetch(url);
  return response.json();
};

(async () => {
  try {
    json = await getPizzaData();
    sortJson();
    addToCart();
    removeFromCart();
  } catch (error) {
    console.log(error);
  }
})();

// GET SELECTED VALUE
document.querySelector("#sortBy").addEventListener("change", (e) => {
    selectedValue = e.target.value;
    sortJson();
    addToCart();
});

// SORTING PIZZAS
const sortJson = () => {
  if (
    selectedValue === undefined ||
    selectedValue === "" ||
    selectedValue === "title-ASC"
  ) {
    json.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (selectedValue === "title-DESC") {
    json.sort((a, b) => b.title.localeCompare(a.title));
  }
  if (selectedValue === "price-ASC") {
    json = json.sort((a, b) => a.price - b.price);
  }
  if (selectedValue === "price-DESC") {
    json.sort((a, b) => b.price - a.price);
  }
  renderData();
};

// RENDER DATA
const renderData = () => {
  const html = json
    .map(({ title, id, price, image, ingredients }) => {
      return `
    <article class="product">
      <div class="photo">
          <img class="photo__img" src=${image} alt=${title}>
      </div>
      <div class="description">    
          <h2 class="description__title">${title}</h2>
          <p class="description__ingredients">${ingredients.join(", ")}</p>
          <p class="description__price">${price}0 zł</p>
          <button type="submit" class="description__btn" id="addBtn" data-id="${id}">zamów</button>
      </div>
        </article>
    `;
    })
    .join(" ");
  document.querySelector(".products").innerHTML = html;
};

// SHOW CART POPUP SMALL SCREEN
const toggleCart = () => {
  document.querySelector("#cart").classList.toggle("cart--hidden");
  document.querySelector("#products").classList.toggle("cart--hidden");
  document.querySelector("#showCart").classList.toggle("cart--hidden");
  document.querySelector("#hideCart").classList.toggle("cart--hidden");
};

document.querySelector("#showCart").addEventListener("click", toggleCart);
document.querySelector("#hideCart").addEventListener("click", toggleCart);

// RENDER PRODUCTS IN CART
const renderCartProducts = () => {
  const cartProducts = cart
    .map(({ title, price, quantity, id }) => {
      return `
          <div class="cart__content"> 
              <div class="flex__container">
                  <h3 class="cart__title">${title}</h3>
                  <h3 class="cart__price">${price} zł</h3>
              </div>
              <div class="flex__container">
                  <p class="cart__quantity">ilość:</p>
                  <p class="cart__quantity">${quantity} szt.</p>
              </div>
              <button
              type="button" class="description__btn description__btn--delete" data-id="${id} id="removeBtn">usuń</button> 
          </div> 
          `;
    })
    .join(" ");

  document.querySelector(".cart__product").innerHTML = cartProducts;
};

// TOGGLE CART VIEW
const toggleCartView = () => {
  document.querySelector(".cart__product").classList.toggle("hidden");
  document.querySelector(".cart__noOrder").classList.toggle("hidden");
  document.querySelector(".cart__btn").classList.toggle("hidden");
};

// LOCAL STORAGE
const localStorageCart = localStorage.getItem("cart");

// SAVE TO LOCAL STORAGE
const saveToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// CART ARRAY
let cart = localStorageCart ? JSON.parse(localStorageCart) : [];

if (cart.length > 0) {
  toggleCartView();
  renderCartProducts();
}

// ADD TO CART
const addToCart = () => {
  document.querySelectorAll("#addBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (cart.length >= 0 && cart.length < 1) {
        toggleCartView();
      }
      const clickedId = parseInt(e.target.dataset.id);
      const checkedProducts = json.find((product) => product.id === clickedId);
      if (cart.some((product) => product.id === clickedId)) {
        cart.forEach((product) => {
          if (product.id === clickedId) {
            product.quantity++;
          }
        });
      } else {
        cart.push({ ...checkedProducts, quantity: 1 });
      }
      updateCart();
    });
  });
};

// REMOVE FROM CART
const removeFromCart = () => {
  document.querySelector(".cart").addEventListener("click", (e) => {
    if (e.target.classList.contains("description__btn--delete")) {
      const clickedId = parseInt(e.target.dataset.id);
      cart.map((product) => {
        if (product.id === clickedId) {
          if (product.quantity > 1) {
            product.quantity--;
          } else {
            cart = cart.filter((product) => product.id !== clickedId);
          }
        }
      });
      updateCart();
    }
  });
};

// TOTAL PRICE
const renderTotalPrice = () => {
  let totalPrice = 0;
  cart.reduce((total, product) => {
    return (totalPrice = total + product.price * product.quantity);
  }, 0);

  if (totalPrice === 0) {
    toggleCartView();
  }
  document.querySelector("#subtotal").innerHTML = `${totalPrice.toFixed(2)} zł`;
};

// TOTAL QUANTITY
const getTotalQuantity = () => {
  let totalQuantity = 0;
  cart.reduce((total, product) => {
    return (totalQuantity = total + product.quantity);
  }, 0);

  document.querySelector(
    "#showCart"
  ).innerHTML = `Moje zamówienie: ${totalQuantity}`;
};

// UPDATE CART
const updateCart = () => {
  renderTotalPrice();
  renderCartProducts();
  saveToLocalStorage();
  getTotalQuantity();
};

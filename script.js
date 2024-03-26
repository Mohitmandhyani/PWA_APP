document.addEventListener("DOMContentLoaded", function () {
  // Request notification permission from the user
  Notification.requestPermission().then(function(permission) {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied.");
    }
  });

  // Fetch products from an external source
  fetch("products.json")
    .then((response) => response.json())
    .then((products) => {
      const productContainer = document.querySelector(".product-list");

      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="images/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.log("Error fetching products:", error);
    });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log(
        "Service worker registration successful:",
        registration.scope
      );
    })
    .catch(function (error) {
      console.log("Service worker registration failed:", error);
    });
}

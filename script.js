// Smooth scroll and button animation setup
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log("Lumina Nabi website loaded successfully.");


// ----- SIGN UP -----
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const phone = document.getElementById("phone").value.trim();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
      alert("This email is already registered!");
      return;
    }

    users[email] = { firstName, lastName, email, password, phone };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "signin.html";
  });
}

// ----- SIGN IN -----
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[email]) {
      alert("No account found with this email!");
      return;
    }

    if (users[email].password !== password) {
      alert("Incorrect password!");
      return;
    }

    localStorage.setItem("loggedInUser", email);
    alert("Welcome, " + users[email].firstName + "!");
    window.location.href = "index.html";
  });
}

// ----- AUDIO -----
const audio = document.getElementById('bgAudio');
const playButton = document.getElementById('playButton');
const progressBar = document.getElementById('progressBar');

let isPlaying = false;

playButton.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play();
    playButton.querySelector('.play-icon').style.display = 'none';
    playButton.querySelector('.pause-icon').style.display = 'inline';
  } else {
    audio.pause();
    playButton.querySelector('.play-icon').style.display = 'inline';
    playButton.querySelector('.pause-icon').style.display = 'none';
  }
  isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

//---- CART ----

const products = document.querySelectorAll('.collection');
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const closeModal = document.querySelector('.close');
const addToCartBtn = document.getElementById('addToCart');
const cartCount = document.getElementById('cart-count');

let selectedProduct = {};

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCount.textContent = cart.length;
}

products.forEach(product => {
  product.addEventListener('click', () => {
    selectedProduct = {
      name: product.dataset.name,
      price: product.dataset.price,
      image: product.dataset.image
    };
    modalImage.src = selectedProduct.image;
    modalName.textContent = selectedProduct.name;
    modalPrice.textContent = `₱ ${selectedProduct.price}`;
    modal.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};

addToCartBtn.addEventListener('click', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(selectedProduct);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${selectedProduct.name} added to cart!`);
  modal.style.display = 'none';
});

updateCartCount();

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

// ----- INDEX (Welcome + Logout) -----
document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const authButtons = document.getElementById("authButtons");
  const userSection = document.getElementById("userSection");
  const welcomeUser = document.getElementById("welcomeUser");
  const logoutBtn = document.getElementById("logoutBtn");

  if (email && users[email]) {
    if (authButtons) authButtons.style.display = "none";
    if (userSection) userSection.style.display = "flex";
    if (welcomeUser) welcomeUser.textContent = "Welcome, " + users[email].firstName + "!";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("You’ve logged out successfully.");
      window.location.reload();
    });
  }
});

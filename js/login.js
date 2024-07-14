// Get elements
const form = document.forms.user_login;
const { user_email: userEmail, user_password: userPassword } = form.elements;
const API_LOGIN = "http://localhost:9090/login";
const showPasswordBtn = document.querySelector(".show-password");

const token = localStorage.getItem("token");
if (token) {
  location.href = "../index.html";
}

const saveToLocalStorage = (setKey, setValue) => {
  window.localStorage.setItem(setKey, setValue);
};

const redirectTo = (url, delay = 3000) => {
  setTimeout(() => {
    location.href = url;
  }, delay);
};

const validateInputs = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!userEmail.value.trim() || !emailPattern.test(userEmail.value)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (!userPassword.value) {
    alert("Please enter your password.");
    return false;
  }
  return true;
};

const handleRequest = async (dataObj) => {
  try {
    let response = await fetch(API_LOGIN, {
      method: "POST",
      body: JSON.stringify(dataObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log("Response status:", response.status);
    if (!response.ok) throw new Error("Failed to login");
    const data = await response.json();
    if (data.token) {
      saveToLocalStorage("token", data.token);
      redirectTo("../index.html", 3000);
    }
  } catch (error) {
    console.log("ERROR on catch", error);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateInputs()) {
    return;
  }

  const userData = {
    email: userEmail.value,
    password: userPassword.value,
  };

  handleRequest(userData);

  userEmail.value = "";
  userPassword.value = "";
});

showPasswordBtn.addEventListener("mousedown", () => {
  userPassword.type = "text";
});

showPasswordBtn.addEventListener("mouseup", () => {
  userPassword.type = "password";
});

showPasswordBtn.addEventListener("mouseleave", () => {
  userPassword.type = "password";
});

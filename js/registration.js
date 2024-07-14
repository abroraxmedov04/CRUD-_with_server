// get elements
const form = document.forms.register_form;
const {
  user_name: userName,
  user_surname: userSurname,
  user_email: userEmail,
  user_password: userPassword,
  user_age: userAge,
} = form.elements;
const showPasswordBtn = document.querySelector(".show-password");

let API_REGISTER = "http://localhost:9090/register";

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
  const agePattern = /^\d+$/;

  if (!userName.value.trim()) {
    alert("Please enter your first name.");
    return false;
  }
  if (!userSurname.value.trim()) {
    alert("Please enter your last name.");
    return false;
  }
  if (!userEmail.value.trim() || !emailPattern.test(userEmail.value)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (!userPassword.value) {
    alert("Please enter your password.");
    return false;
  }
  if (!userAge.value.trim() || !agePattern.test(userAge.value)) {
    alert("Please enter a valid age.");
    return false;
  }
  return true;
};

let handleRequest = async (dataObj) => {
  try {
    let response = await fetch(API_REGISTER, {
      method: "POST",
      body: JSON.stringify(dataObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log("Response status:", response.status);
    if (!response.ok) throw new Error("Failed to register");
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

  let userData = {
    last_name: userSurname.value.trim(),
    frist_name: userName.value.trim(),
    email: userEmail.value,
    password: userPassword.value,
    age: userAge.value,
  };

  handleRequest(userData);

  userName.value = "";
  userSurname.value = "";
  userEmail.value = "";
  userPassword.value = "";
  userAge.value = "";
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

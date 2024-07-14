const addIncomeBtn = document.querySelector(".add-income-btn");
const modal = document.querySelector("#modal");
const form = document.forms.income_add_form;
const API_INCOME_POST = "http://localhost:9090/add-income";
const incomeList = document.querySelector(".income-lists");
const incomeItemTemplate = document.querySelector(".income-list-item").content;
const GET_INCOMES_API = "http://localhost:9090/get-incomes";
const token = localStorage.getItem("token");

if (!token) {
  location.href = "../login.html";
}

const logoutBtn = document
  .querySelector(".log-out-btn")
  .addEventListener("click", () => {
    window.localStorage.removeItem("token");
    location.reload();
  });

const {
  income_title: userIncomeTitle,
  income_amount: userIncomeAmount,
  income_category: userIncomeCategory,
  income_description: userIncomeDescription,
  income_date: userIncomeDate,
  close_modal: closeModal,
} = form.elements;

addIncomeBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

const addIncome = async (dataObj) => {
  try {
    let response = await fetch(API_INCOME_POST, {
      method: "POST",
      body: JSON.stringify(dataObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: token,
      },
    });
    if (!response.ok) throw new Error("Failed to post data");
    const data = await response.json();
    getIncomes(GET_INCOMES_API);
    console.log(data);
  } catch (error) {
    console.log("ERROR:", error);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const incomeData = {
    title: userIncomeTitle.value.trim(),
    amount: userIncomeAmount.value,
    category: userIncomeCategory.value.trim(),
    description: userIncomeDescription.value.trim(),
    date: userIncomeDate.value,
  };

  addIncome(incomeData);
  modal.classList.add("hidden");

  userIncomeTitle.value = "";
  userIncomeAmount.value = "";
  userIncomeCategory.value = "";
  userIncomeDescription.value = "";
  userIncomeDate.value = "";
});

const renderData = (dataObj, node) => {
  node.innerHTML = "";
  dataObj.forEach((item) => {
    let clone = incomeItemTemplate.cloneNode(true);
    clone.querySelector(".title").textContent = item.title;
    clone.querySelector(".category").textContent = item.category;
    clone.querySelector(".amount").textContent = `+${item.amount}$`;
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    });
    clone.querySelector(".date-income").textContent = formattedDate;
    clone.querySelector(".delete-income").dataset.deleteId = item.id;
    node.appendChild(clone);
  });
};

let getIncomes = async (url) => {
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        token: token,
      },
    });
    if (!response.ok) throw new Error("Failed to get data");
    const data = await response.json();
    console.log(data);
    let totalIncome = data.reduce((acc, item) => acc + item.amount, 0);
    total_amount.textContent = `$${totalIncome}`;
    income_length.textContent = data.length;
    renderData(data, incomeList);
  } catch (error) {
    console.log("ERROR:", error);
  }
};

getIncomes(GET_INCOMES_API);

const handleDelete = async (id) => {
  try {
    let response = await fetch(`http://localhost:9090/delete-income/${id}`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    console.log("Income deleted successfully");
    getIncomes(GET_INCOMES_API);
  } catch (error) {
    console.log("ERROR deleting income:", error);
  }
};

incomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-income")) {
    const id = e.target.dataset.deleteId;
    console.log("Deleting income with ID:", id);
    handleDelete(id);
    getIncomes(GET_INCOMES_API);
  }
});

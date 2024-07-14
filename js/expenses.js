const addExpensesBtn = document.querySelector(".add-expence-btn");
const modal = document.querySelector("#modal-expense");
const form = document.forms.expense_add_form;
const list = document.querySelector(".expense-lists");
const ItemTemplate = document.querySelector(
  ".expense-list-item-template"
).content;
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

addExpensesBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

const {
  expense_title: userExpenseTitle,
  expense_amount: userExpenseAmount,
  expense_category: userExpenseCategory,
  expense_description: userExpenseDescription,
  expense_date: userExpenseDate,
  close_modal: closeModal,
} = form.elements;

closeModal.addEventListener("click", () => modal.classList.add("hidden"));

const addNewExpense = async (obj) => {
  try {
    let response = await fetch("http://localhost:9090/add-expense", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: token,
      },
    });

    if (!response.ok) throw new Error("FAILED to add expense");

    let data = await response.json();

    console.log(data);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newObj = {
    title: userExpenseTitle.value.trim(),
    amount: userExpenseAmount.value,
    category: userExpenseCategory.value,
    description: userExpenseDescription.value.trim(),
    date: userExpenseDate.value,
  };

  addNewExpense(newObj);
  renderData();
  modal.classList.add("hidden");
});

const renderList = (obj, node) => {
  node.innerHTML = "";
  obj.forEach((item) => {
    let clone = ItemTemplate.cloneNode(true);
    clone.querySelector(".title").textContent = item.title;
    clone.querySelector(".category").textContent = item.category;
    clone.querySelector(".amount").textContent = `-${item.amount}$`;
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
    clone.querySelector(".delete-expences").dataset.deleteId = item.id;
    node.appendChild(clone);
  });
};

const renderData = async () => {
  try {
    let response = await fetch("http://localhost:9090/get-expenses", {
      method: "GET",
      headers: {
        token: token,
      },
    });
    if (!response.ok) throw new Error("FAILED to add expense");
    let data = await response.json();
    let totalIncome = data.reduce((acc, item) => acc + item.amount, 0);
    total_amount.textContent = `-${totalIncome}$`;
    income_length.textContent = data.length;
    renderList(data, list);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

renderData();

const handleDelete = async (id) => {
  try {
    let response = await fetch(`http://localhost:9090/delete-expense/${id}`, {
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
    renderData();
  } catch (error) {
    console.log("ERROR deleting income:", error);
  }
};

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-expences")) {
    const id = e.target.dataset.deleteId;
    console.log("Deleting income with ID:", id);
    handleDelete(id);
    renderData();
  }
});

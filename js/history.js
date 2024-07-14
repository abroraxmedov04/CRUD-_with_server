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

const list = document.querySelector(".income-lists");
const incomeItemTemplate = document.querySelector(".income-list-item").content;

const renderData = (dataObj, node) => {
  node.innerHTML = "";
  dataObj.forEach((item) => {
    let clone = incomeItemTemplate.cloneNode(true);
    clone.querySelector(".title").textContent = item.title;
    clone.querySelector(".category").textContent = item.category;
    clone.querySelector(".type").textContent = item.type;
    const amountElement = clone.querySelector(".amount");
    amountElement.textContent =
      item.type == "income" ? `+${item.amount}$` : `-${item.amount}$`;
    amountElement.style.color = item.type == "income" ? "green" : "red";
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
    node.appendChild(clone);
  });
};

const getIncomes = async () => {
  try {
    let response = await fetch("http://localhost:9090/get-incomes", {
      method: "GET",
      headers: {
        token: token,
      },
    });
    if (!response.ok) throw new Error("Failed to get data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR:", error);
    return [];
  }
};

const getExpenses = async () => {
  try {
    let response = await fetch("http://localhost:9090/get-expenses", {
      method: "GET",
      headers: {
        token: token,
      },
    });
    if (!response.ok) throw new Error("Failed to get data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR:", error);
    return [];
  }
};

const getAllData = async () => {
  try {
    const incomes = await getIncomes();
    const expenses = await getExpenses();
    const combinedData = [...incomes, ...expenses];
    console.log("Combined Data:", combinedData);
    renderData(combinedData, list);
  } catch (error) {
    console.log("ERROR in getting combined data:", error);
  }
};

getAllData();

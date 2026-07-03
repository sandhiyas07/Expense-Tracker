let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    const list = document.getElementById("list");
    const balance = document.getElementById("balance");
    const income = document.getElementById("income");
    const expense = document.getElementById("expense");

    list.innerHTML = "";

    let total = 0;
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction, index) => {
        total += transaction.amount;

        if (transaction.amount > 0) {
            incomeTotal += transaction.amount;
        } else {
            expenseTotal += transaction.amount;
        }

        const li = document.createElement("li");
        li.innerHTML = `
            ${transaction.text} : ₹${transaction.amount}
            <button class="delete" onclick="deleteTransaction(${index})">X</button>
        `;
        list.appendChild(li);
    });

    balance.textContent = total;
    income.textContent = "₹" + incomeTotal;
    expense.textContent = "₹" + Math.abs(expenseTotal);

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    const text = document.getElementById("text").value.trim();
    const amount = Number(document.getElementById("amount").value);

    if (text === "" || document.getElementById("amount").value === "") {
        alert("Please enter description and amount.");
        return;
    }

    transactions.push({
        text: text,
        amount: amount
    });

    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";

    updateUI();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

updateUI();
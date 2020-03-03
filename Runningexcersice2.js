let Expense = [{ name: "Tyrion", topic: "Wine", date: "2020-01-23", amount: 64, currency: "EURO"}];

async function getExpense(url){
    let response = await fetch(url);
    let myJson = await response.json();
    myJson.expenses.forEach(element => {
        Expense.push(element); 
    });
    console.log(Expense);
    addRow("listExpense", Expense);
}


function addRow(id, array){
//we have access to the HTML document, and it is easy accesible by tableElem.
let elem = document.getElementById(id);
array.forEach(element => {
    let tr = document.createElement("tr");
    elem.appendChild(tr);
    elem.lastChild.innerHTML = `<th> ${element.name} </th>
                            <th> ${element.topic} </th>
                            <th> ${element.date} </th>
                            <th> ${element.amount} </th>
                            <th> ${element.currency} </th>`;
    console.log(element);
    });
}

getExpense("http://127.0.0.1:3000/expenses");
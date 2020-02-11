let Expense = ["Tyrion", "Wine", 69, "Eur", "20/04"];

//we have access to the HTML document, and it is easy accesible by tableElem.
let tr = document.createElement("tr");
let th = document.createElement("th");
let elem = document.getElementById("listExpense");
elem.appendChild(tr);
elem.lastChild.innerHTML = `<th> ${Expense[0]} </th>
                            <th> ${Expense[1]} </th>
                            <th> ${Expense[2]} </th>
                            <th> ${Expense[3]} </th>
                            <th> ${Expense[4]} </th>`;



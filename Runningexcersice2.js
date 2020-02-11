let Expense = ["Tyrion", "Wine", 69, "Eur", "20/04"];


function addRow(id, array){
//we have access to the HTML document, and it is easy accesible by tableElem.
let tr = document.createElement("tr");
let elem = document.getElementById(id);
elem.appendChild(tr);
elem.lastChild.innerHTML = `<th> ${array[0]} </th>
                            <th> ${array[1]} </th>
                            <th> ${array[2]} </th>
                            <th> ${array[3]} </th>
                            <th> ${array[4]} </th>`;
}

addRow("listExpense", Expense);

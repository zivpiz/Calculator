import CalcHandler from "./calcHandler";

const arithmeticOps = ['+', '-', '/', '*'];

const createNumTable = () => {
    let table = document.createElement("table");
    table.setAttribute("id", "numTable");
    table.setAttribute("cellspacing", "0");

    for (let i = 0; i <= 3; i++) {
        let row = document.createElement("tr");
        for (let j = 1; j <= 3; j++) {
            let cell = document.createElement("td");

            let cellNum = i === 0 ? "0" : ((i - 1) * 3 + j).toString();
            let cellButton = document.createElement("button")
            cellButton.setAttribute("id", cellNum);
            cellButton.appendChild(document.createTextNode(cellNum));
            cell.appendChild(cellButton);


            //In case of 0 we want to set colspan to 3 and break
            if (i === 0) {
                cell.setAttribute("colspan", "3");
                row.appendChild(cell);
                break;
            }
            row.appendChild(cell);
        }
        table.prepend(row);
    }
    return table;
};

const appendArithmeticOperations = (allOpsDiv) => {
    arithmeticOps.forEach((op)=> {
        let opDiv = document.createElement("button");
        opDiv.appendChild(document.createTextNode(op));
        opDiv.setAttribute("id", op);
        allOpsDiv.appendChild(opDiv);
    });
};


export default function initializeCalc(){
    document.querySelector("#numbers").appendChild(createNumTable());
    let allOpsDiv = document.querySelector("#ops");
    appendArithmeticOperations(allOpsDiv);
    const handler = new CalcHandler();
    return handler;
}


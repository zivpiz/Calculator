import {CalcHandler} from "./calcHandler";

const arithmeticOps = ['+', '-', '/', '*'];
const allActions = ['c', 'ce', '='];


const createActions = (calcHandler) => {
    let actionsDiv = document.createElement("div");
    actionsDiv.setAttribute("id", "actions");
    allActions.forEach((action) => {
        let actionButton = document.createElement("button");
        actionButton.appendChild(document.createTextNode(action.toUpperCase()));
        actionButton.setAttribute("id", action);
        actionButton.onclick = () => {
            calcHandler.actionListener(action)
        };
        actionsDiv.appendChild(actionButton);
    });

    return actionsDiv;
};

const createNumbers = (calcHandler) => {
    let table = document.createElement("table");
    table.setAttribute("id", "numTable");
    table.setAttribute("cellspacing", "0");

    for (let i = 0; i <= 3; i++) {
        let row = document.createElement("tr");
        for (let j = 1; j <= 3; j++) {
            let cell = document.createElement("td");

            let cellNum = i === 0 ? "0" : ((i - 1) * 3 + j).toString();
            let cellButton = document.createElement("button");
            cellButton.setAttribute("id", cellNum);
            cellButton.appendChild(document.createTextNode(cellNum));
            cellButton.onclick = () => {
                calcHandler.numbersListener(cellNum)
            };
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

    let numbersDiv = document.createElement("div");
    numbersDiv.setAttribute("id", "numbers");
    numbersDiv.appendChild(table);
    return numbersDiv;
};

const createOps = (calcHandler) => {
    let opsDiv = document.createElement("div");
    opsDiv.setAttribute("id", "ops");
    appendArithmeticOperations(opsDiv, calcHandler);
    return opsDiv
};

const appendArithmeticOperations = (allOpsDiv, calcHandler) => {
    arithmeticOps.forEach((op) => {
        let opButton = document.createElement("button");
        opButton.appendChild(document.createTextNode(op));
        opButton.setAttribute("id", op);
        opButton.onclick = () => {
            calcHandler.opsListener(op)
        };
        allOpsDiv.appendChild(opButton);
    });
};


const populateCalculator = (calcElement) => {
    let displayDiv = document.createElement("div");
    let calcHandler = new CalcHandler(displayDiv);
    displayDiv.setAttribute("id", "displayBar");
    displayDiv.appendChild(document.createTextNode('0'));

    let calcButtonsDiv = document.createElement("div");
    calcButtonsDiv.setAttribute("id", "calc-buttons");

    let actionsDiv = createActions(calcHandler);
    let numbersDiv = createNumbers(calcHandler);
    let opsDiv = createOps(calcHandler);

    [actionsDiv, numbersDiv, opsDiv].forEach((div) => {
        calcButtonsDiv.appendChild(div);
    });

    calcElement.appendChild(displayDiv);
    calcElement.appendChild(calcButtonsDiv)

};

export default function initializeCalc() {
    let allCalcs = document.querySelectorAll(".calculator");
    allCalcs.forEach((calcElement) => {
        populateCalculator(calcElement);
    });
}


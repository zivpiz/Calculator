import {ARITHMETIC_OPS, DIGITS, ALL_ACTIONS} from "./constants";
import {createDisplayAndHandler} from "./staticMethods";

export default class CalculatorInitializer {

    constructor(doc) {
        const allCalcs = doc.querySelectorAll(".calculator");
        allCalcs.forEach((calcElement) => {
            this._initializeCalc(calcElement);
        });
    }

    _initializeCalc(calcElement) {
        const calcHandler = createDisplayAndHandler(calcElement);
        this._createButtonsDiv(calcHandler, calcElement);
    };

    _createButtonsDiv(calcHandler, calcElement) {
        const calcButtonsDiv = document.createElement("div");
        calcButtonsDiv.setAttribute("class", "calc-buttons");

        const actionsDiv = this._createActions(calcHandler);
        const digitsDiv = this._createDigits(calcHandler);
        const opsDiv = this._createOps(calcHandler);
        [actionsDiv, digitsDiv, opsDiv].forEach(div => calcButtonsDiv.appendChild(div));
        calcElement.appendChild(calcButtonsDiv);
    };

    _createActions(calcHandler) {
        const actionsDiv = document.createElement("div");
        actionsDiv.setAttribute("class", "actions");
        Object.keys(ALL_ACTIONS).forEach((key) => {
            const actionButton = document.createElement("button");
            actionButton.appendChild(document.createTextNode(ALL_ACTIONS[key].toUpperCase()));
            actionButton.setAttribute("class", ALL_ACTIONS[key]);
            actionButton.onclick = () => {
                calcHandler.actionListener(ALL_ACTIONS[key])
            };
            actionsDiv.appendChild(actionButton);
        });

        return actionsDiv;
    };

    _createDigits(calcHandler) {
        const tableElement = document.createElement("table");
        tableElement.setAttribute("class", "digitTable");
        tableElement.setAttribute("cellspacing", "0");

        this._createDigitTable(calcHandler, tableElement);

        const digitsDiv = document.createElement("div");
        digitsDiv.setAttribute("class", "digits");
        digitsDiv.appendChild(tableElement);
        return digitsDiv;
    };

    _createDigitTable(calcHandler, tableElement) {
        for (let i = 0; i < DIGITS.length; i++) {
            const rowElement = document.createElement("tr");
            this._createDigitTableRow(calcHandler, rowElement, DIGITS[i]);
            tableElement.appendChild(rowElement);
        }
    };

    _createDigitTableRow(calcHandler, rowElement, rowDigitArray) {
        for (let i = 0; i < rowDigitArray.length; i++) {
            const cell = document.createElement("td");
            const cellDigit = rowDigitArray[i];

            const cellButton = document.createElement("button");
            cellButton.setAttribute("class", cellDigit);
            cellButton.appendChild(document.createTextNode(cellDigit));
            cellButton.onclick = () => {
                calcHandler.digitsListener(cellDigit)
            };
            cell.appendChild(cellButton);
            cell.setAttribute("colspan", 3 / rowDigitArray.length);

            rowElement.appendChild(cell);
        }
    };

    _createOps(calcHandler) {
        const opsDiv = document.createElement("div");
        opsDiv.setAttribute("class", "ops");
        this._appendArithmeticOperations(opsDiv, calcHandler);
        return opsDiv
    };

    _appendArithmeticOperations(allOpsDiv, calcHandler) {
        Object.keys(ARITHMETIC_OPS).forEach((key) => {
            const opButton = document.createElement("button");
            opButton.appendChild(document.createTextNode(ARITHMETIC_OPS[key]));
            opButton.setAttribute("class", ARITHMETIC_OPS[key]);
            opButton.onclick = () => {
                calcHandler.opsListener(ARITHMETIC_OPS[key])
            };
            allOpsDiv.appendChild(opButton);
        });
    };
}

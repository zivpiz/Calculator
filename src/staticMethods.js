import CalcHandler from "./calcHandler";
import {OP_TO_FUNC} from "./constants";


export const calculate = (num1, num2, operator)=> {
    if (!OP_TO_FUNC.hasOwnProperty(operator))
        throw new Error("Invalid Operator.");
    return OP_TO_FUNC[operator](num1, num2);
};

export const createDisplayAndHandler = (calcElement)=> {
    const displayDiv = document.createElement("div");
    const calcHandler = new CalcHandler(displayDiv);
    displayDiv.setAttribute("class", "displayBar");
    calcElement.appendChild(displayDiv);
    return calcHandler;
};


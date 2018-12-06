import CalcHandler from '../src/calcHandler';
import {ALL_ACTIONS, ARITHMETIC_OPS} from "../src/constants";

let displayDiv, calcHandler;

describe("Test Action Handler", () => {

    beforeEach(() => {
        displayDiv = document.createElement("div");
        calcHandler = new CalcHandler(displayDiv);
        calcHandler.accValue = 3;
        calcHandler.displayedNow = 5;
        calcHandler.operator = ARITHMETIC_OPS.PLUS;
        calcHandler.showNewDisplay = false;
        calcHandler.isFirstOperand = false;
        calcHandler.isDoubleOperator = true;
    });

    test("Test Clear", () => {
        expect(displayDiv.innerHTML).toBe("5");
        calcHandler.actionListener(ALL_ACTIONS.CLEAR);

        expect(displayDiv.innerHTML).toBe("0");
        expect(calcHandler.displayedNow).toBe(0);
        expect(calcHandler.accValue).toBe(3);
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.PLUS);
        expect(calcHandler.showNewDisplay).toBeTruthy();
        expect(calcHandler.isFirstOperand).toBeFalsy();
        expect(calcHandler.isDoubleOperator).toBeTruthy();
    });

    test("Test Clear All", () => {
        expect(displayDiv.innerHTML).toBe("5");
        calcHandler.actionListener(ALL_ACTIONS.CLEAR_ALL);

        expect(displayDiv.innerHTML).toBe("0");
        expect(calcHandler.displayedNow).toBe(0);
        expect(calcHandler.accValue).toBe(0);
        expect(calcHandler.operator).toBe(null);
        expect(calcHandler.showNewDisplay).toBeTruthy();
        expect(calcHandler.isFirstOperand).toBeTruthy();
        expect(calcHandler.isDoubleOperator).toBeFalsy();
    });

    test("Test Equals for 2 operands", () => {
        expect(displayDiv.innerHTML).toBe("5");
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(displayDiv.innerHTML).toBe("8");
        expect(calcHandler.displayedNow).toBe(8);
        expect(calcHandler.accValue).toBe(8);
        expect(calcHandler.showNewDisplay).toBeTruthy();
        expect(calcHandler.isFirstOperand).toBeTruthy();
        expect(calcHandler.isDoubleOperator).toBeFalsy();
    });

    test("Test Equals for 1 operands", () => {
        expect(displayDiv.innerHTML).toBe("5");
        calcHandler.isFirstOperand = true;
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(displayDiv.innerHTML).toBe("5");
        expect(calcHandler.displayedNow).toBe(5);
        expect(calcHandler.accValue).toBe(5);
        expect(calcHandler.showNewDisplay).toBeTruthy();
        expect(calcHandler.isFirstOperand).toBeTruthy();
        expect(calcHandler.isDoubleOperator).toBeFalsy();
    });

    test("Invalid Action throws exception", () => {
        const wrongAction = () =>
            calcHandler.actionListener("random text");
        expect(wrongAction).toThrow();
    });
});

describe("Test Digits Handler", () => {

    beforeEach(() => {
        displayDiv = document.createElement("div");
        calcHandler = new CalcHandler(displayDiv);
        calcHandler.accValue = 2;
        calcHandler.displayedNow = 8;
        calcHandler.operator = ARITHMETIC_OPS.PLUS;
        calcHandler.showNewDisplay = false;
        calcHandler.isFirstOperand = false;
        calcHandler.isDoubleOperator = true;
    });

    test("Normal case, append digit to current num", () => {
        expect(displayDiv.innerHTML).toBe("8");
        calcHandler.digitsListener("4");

        expect(displayDiv.innerHTML).toBe("84");
        expect(calcHandler.displayedNow).toBe(84);
        expect(calcHandler.accValue).toBe(2);
        expect(calcHandler.showNewDisplay).toBeFalsy();
        expect(calcHandler.isDoubleOperator).toBeFalsy();
    });

    test("Show new display is on, replace current display", () => {
        expect(displayDiv.innerHTML).toBe("8");
        calcHandler.showNewDisplay = true;
        calcHandler.digitsListener("4");

        expect(displayDiv.innerHTML).toBe("4");
        expect(calcHandler.displayedNow).toBe(4);
        expect(calcHandler.accValue).toBe(2);
        expect(calcHandler.showNewDisplay).toBeFalsy();
        expect(calcHandler.isDoubleOperator).toBeFalsy();
    });

    test("Current display is 0 - replace", () => {
        calcHandler.displayedNow = 0;
        calcHandler.digitsListener("1");

        expect(displayDiv.innerHTML).toBe("1");
        expect(calcHandler.displayedNow).toBe(1);
        expect(calcHandler.accValue).toBe(2);
        expect(calcHandler.showNewDisplay).toBeFalsy();
        expect(calcHandler.isDoubleOperator).toBeFalsy();
    });

    test("Invalid digit throws exception - /", () => {
        const wrongDigit = () =>
            calcHandler.digitsListener("/");
        expect(wrongDigit).toThrow();
    });

    test("Invalid digit throws exception - :", () => {
        const wrongDigit = () =>
            calcHandler.digitsListener(":");
        expect(wrongDigit).toThrow();
    });
});

describe("Test Ops Handler", () => {

    beforeEach(() => {
        displayDiv = document.createElement("div");
        calcHandler = new CalcHandler(displayDiv);
        calcHandler.accValue = 4;
        calcHandler.displayedNow = 10;
        calcHandler.operator = ARITHMETIC_OPS.MINUS;
        calcHandler.showNewDisplay = false;
        calcHandler.isFirstOperand = false;
        calcHandler.isDoubleOperator = false;
    });

    test("Double operator - update op and return", () => {
        expect(displayDiv.innerHTML).toBe("10");
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        calcHandler.isDoubleOperator = true;
        calcHandler.opsListener(ARITHMETIC_OPS.PLUS);

        expect(displayDiv.innerHTML).toBe("10");
        expect(calcHandler.displayedNow).toBe(10);
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.PLUS);
        expect(calcHandler.accValue).toBe(4);
        expect(calcHandler.isDoubleOperator).toBeTruthy();

    });

    test("new display, zero and minus - display minus on screen", () => {
        expect(displayDiv.innerHTML).toBe("10");
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        calcHandler.showNewDisplay = true;
        calcHandler.displayedNow = 0;
        calcHandler.opsListener(ARITHMETIC_OPS.MINUS);

        expect(displayDiv.innerHTML).toBe("-");
        expect(calcHandler.displayedNow).toBe("-");
        expect(calcHandler.accValue).toBe(4);
        expect(calcHandler.showNewDisplay).toBeFalsy();
        expect(calcHandler.isDoubleOperator).toBeTruthy();

    });

    test("First operand - save acc value", () => {
        expect(displayDiv.innerHTML).toBe("10");
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        calcHandler.isFirstOperand = true;
        calcHandler.opsListener(ARITHMETIC_OPS.DIV);

        expect(displayDiv.innerHTML).toBe("10");
        expect(calcHandler.displayedNow).toBe(10);
        expect(calcHandler.accValue).toBe(10);
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.DIV);
        expect(calcHandler.showNewDisplay).toBeTruthy();
        expect(calcHandler.isDoubleOperator).toBeTruthy();
        expect(calcHandler.isFirstOperand).toBeFalsy();
    });

    test("Second operand - _calculate with last operator", () => {
        expect(displayDiv.innerHTML).toBe("10");
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        calcHandler.opsListener(ARITHMETIC_OPS.MULT);

        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MULT);
        expect(displayDiv.innerHTML).toBe("-6");
        expect(calcHandler.displayedNow).toBe(-6);
        expect(calcHandler.accValue).toBe(-6);
        expect(calcHandler.showNewDisplay).toBeTruthy();
        expect(calcHandler.isDoubleOperator).toBeTruthy();
        expect(calcHandler.isFirstOperand).toBeFalsy();
    });

    test("Invalid operator throws exception", () => {
        const wrongOp = () =>
            calcHandler.opsListener("text");
        expect(wrongOp).toThrow();
    });
});

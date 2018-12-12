import CalcHandler from '../src/calcHandler';
import {ALL_ACTIONS, ARITHMETIC_OPS} from "../src/constants";

let displayDiv, calcHandler;

describe("Test Action Handler", () => {

    beforeEach(() => {
        displayDiv = document.createElement("div");
        calcHandler = new CalcHandler(displayDiv);
        calcHandler.accValue = 3;
        calcHandler.inputNum = 5;
        calcHandler.operator = ARITHMETIC_OPS.MINUS;
        calcHandler.shouldBlockOperators = true;
    });

    test("Test Clear", () => {
        calcHandler.actionListener(ALL_ACTIONS.CLEAR);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.accValue).toBe(3);
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        expect(calcHandler.shouldBlockOperators).toBeTruthy();
    });

    test("Test Clear All", () => {
        calcHandler.actionListener(ALL_ACTIONS.CLEAR_ALL);

        expect(calcHandler.accValue).toBe(0);
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.PLUS);
        expect(calcHandler.shouldBlockOperators).toBeFalsy();
    });

    test("Test Equals", () => {
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.accValue).toBe(-2);
        expect(calcHandler.shouldBlockOperators).toBeFalsy();
    });

    test("Test Equals when inputNum is null", () => {
        calcHandler.inputNum = null;
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.accValue).toBe(3);
        expect(calcHandler.shouldBlockOperators).toBeFalsy();
    });

    test("Test Equals with no operator", () => {
        calcHandler.operator = null;
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.accValue).toBe(5);
        expect(calcHandler.shouldBlockOperators).toBeFalsy();
    });

    test("Test Equals with no operator when inputNum is null", () => {
        calcHandler.operator = null;
        calcHandler.inputNum = null;
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.accValue).toBe(3);
        expect(calcHandler.shouldBlockOperators).toBeFalsy();
    });

    test("Test Division by 0 - resets calculator", () => {
        calcHandler.operator = ARITHMETIC_OPS.DIV;
        calcHandler.inputNum = 0;
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.accValue).toBe(0);
        expect(calcHandler.shouldBlockOperators).toBeFalsy();
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.PLUS);
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
        calcHandler.inputNum = 8;
        calcHandler.operator = ARITHMETIC_OPS.PLUS;
        calcHandler.shouldBlockOperators = true;
    });

    test("Normal case, append digit to current num", () => {
        calcHandler.digitsListener("4");

        expect(displayDiv.innerHTML).toBe("84");
        expect(calcHandler.inputNum).toBe(84);
        expect(calcHandler.accValue).toBe(2);
        expect(calcHandler.shouldBlockOperators).toBeFalsy();
    });

    test("current inputNum is null, start a new num", () => {
        calcHandler.inputNum = null;
        calcHandler.digitsListener("4");

        expect(calcHandler.inputNum).toBe(4);
        expect(calcHandler.accValue).toBe(2);
        expect(calcHandler.shouldBlockOperators).toBeFalsy();
    });

    test("Current display is 0 - replace", () => {
        calcHandler.inputNum = 0;
        calcHandler.digitsListener("1");

        expect(calcHandler.inputNum).toBe(1);
        expect(calcHandler.accValue).toBe(2);
        expect(calcHandler.shouldBlockOperators).toBeFalsy();
    });

    test("Invalid digit throws exception - /", () => {
        const wrongDigit = () =>
            calcHandler.digitsListener("/");
        expect(wrongDigit).toThrow();
    });

    test("Invalid digit throws exception - :", () => {
        const wrongDigit = () =>
            calcHandler.digitsListener("c");
        expect(wrongDigit).toThrow();
    });
});

describe("Test Ops Handler", () => {

    beforeEach(() => {
        displayDiv = document.createElement("div");
        calcHandler = new CalcHandler(displayDiv);
        calcHandler.accValue = 4;
        calcHandler.inputNum = 10;
        calcHandler.operator = ARITHMETIC_OPS.MINUS;
        calcHandler.shouldBlockOperators = false;
    });

    test("Double operator - update op and return", () => {
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        calcHandler.shouldBlockOperators = true;
        calcHandler.opsListener(ARITHMETIC_OPS.PLUS);

        expect(calcHandler.inputNum).toBe(10);
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.PLUS);
        expect(calcHandler.accValue).toBe(4);
        expect(calcHandler.shouldBlockOperators).toBeTruthy();

    });

    test("inputNum is 0/null and minus - display minus on screen", () => {
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        calcHandler.inputNum = 0;
        calcHandler.opsListener(ARITHMETIC_OPS.MINUS);

        expect(displayDiv.innerHTML).toBe("-");
        expect(calcHandler.inputNum).toBe("-");
        expect(calcHandler.accValue).toBe(4);
        expect(calcHandler.shouldBlockOperators).toBeTruthy();
    });

    test("operation - calculate with last operator", () => {
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        calcHandler.opsListener(ARITHMETIC_OPS.MULT);

        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MULT);
        expect(displayDiv.innerHTML).toBe("-6");
        expect(calcHandler.accValue).toBe(-6);
        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.shouldBlockOperators).toBeTruthy();
    });

    test("Invalid operator throws exception", () => {
        const wrongOp = () =>
            calcHandler.opsListener("text");
        expect(wrongOp).toThrow();
    });
});

describe("Test Update Display", () => {

    beforeEach(() => {
        displayDiv = document.createElement("div");
        calcHandler = new CalcHandler(displayDiv);
        calcHandler.accValue = 4;
        calcHandler.inputNum = 10;
        calcHandler.operator = ARITHMETIC_OPS.MINUS;
        calcHandler.shouldBlockOperators = false;
    });

    test("Input number is null - display accValue", () => {
        displayDiv.innerHTML = 0;
        calcHandler.inputNum = null;
        calcHandler._updateDisplay();

        expect(displayDiv.innerHTML).toBe("4");
    });

    test("Input number is'nt null - display accValue", () => {
        displayDiv.innerHTML = 0;
        calcHandler._updateDisplay();

        expect(displayDiv.innerHTML).toBe("10");
    });

    test("Required number is already on display - refresh and keep it", done => {
        displayDiv.innerHTML = 10;
        calcHandler._updateDisplay();

        const func = () => {
            expect(displayDiv.innerHTML).toBe("10");
            done();
        };
        setTimeout(func, 100);
    });
});

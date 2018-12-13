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
    });

    test("Test Clear", () => {
        calcHandler.actionListener(ALL_ACTIONS.CLEAR);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.accValue).toBe(3);
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
    });

    test("Test Clear All", () => {
        calcHandler.actionListener(ALL_ACTIONS.CLEAR_ALL);

        expect(calcHandler.accValue).toBe(0);
        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.PLUS);
    });

    test("Test Equals", () => {
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.operator).toBe(null);
        expect(calcHandler.accValue).toBe(-2);
    });

    test("Test Equals when inputNum is null", () => {
        calcHandler.inputNum = null;
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.operator).toBe(null);
        expect(calcHandler.accValue).toBe(3);
    });

    test("Test Equals with no operator", () => {
        calcHandler.operator = null;
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.accValue).toBe(5);
    });

    test("Test Equals with no operator when inputNum is null", () => {
        calcHandler.operator = null;
        calcHandler.inputNum = null;
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.accValue).toBe(3);
    });

    test("Test Division by 0 - resets calculator", () => {
        calcHandler.operator = ARITHMETIC_OPS.DIV;
        calcHandler.inputNum = 0;
        calcHandler.actionListener(ALL_ACTIONS.EQUALS);

        expect(calcHandler.inputNum).toBe(null);
        expect(calcHandler.accValue).toBe(0);
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
    });

    test("Normal case, append digit to current num", () => {
        calcHandler.digitsListener("4");

        expect(displayDiv.innerHTML).toBe("84");
        expect(calcHandler.inputNum).toBe(84);
        expect(calcHandler.accValue).toBe(2);
    });

    test("current inputNum is null, start a new num", () => {
        calcHandler.inputNum = null;
        calcHandler.digitsListener("4");

        expect(calcHandler.inputNum).toBe(4);
        expect(calcHandler.accValue).toBe(2);
    });

    test("Current display is 0 - replace", () => {
        calcHandler.inputNum = 0;
        calcHandler.digitsListener("1");

        expect(calcHandler.inputNum).toBe(1);
        expect(calcHandler.accValue).toBe(2);
    });

    test("Invalid digit throws exception - /", () => {
        const wrongDigit = () =>
            calcHandler.digitsListener("/");
        expect(wrongDigit).toThrow();
    });

    test("Invalid digit throws exception - c", () => {
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
    });

    test("inputNum is 0 and minus - display minus on screen", () => {
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        calcHandler.inputNum = 0;
        calcHandler.opsListener(ARITHMETIC_OPS.MINUS);

        expect(calcHandler.inputNum).toBe("-");
        expect(calcHandler.accValue).toBe(4);
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.PLUS);
    });

    test("inputNum is null and minus - display minus on screen", () => {
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        calcHandler.inputNum = null;
        calcHandler.opsListener(ARITHMETIC_OPS.MINUS);

        expect(calcHandler.inputNum).toBe("-");
        expect(calcHandler.accValue).toBe(4);
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.PLUS);
    });

    test("operation - calculate with last operator", () => {
        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MINUS);
        calcHandler.opsListener(ARITHMETIC_OPS.MULT);

        expect(calcHandler.operator).toBe(ARITHMETIC_OPS.MULT);
        expect(calcHandler.accValue).toBe(-6);
        expect(calcHandler.inputNum).toBe(null);
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

    test("Required number is already on display - refresh and keep it (async)", done => {
        displayDiv.innerHTML = 10;
        calcHandler._updateDisplay();

        const func = () => {
            expect(displayDiv.innerHTML).toBe("10");
            done();
        };
        setTimeout(func, 100);
    });
});

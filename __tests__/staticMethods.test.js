import {createDisplayAndHandler, calculate} from "../src/staticMethods";
import CalcHandler from '../src/calcHandler.js';

jest.mock('../src/calcHandler.js');

describe("Test createDisplayAndHandler", () => {
    test("Make sure displayBar and calcHandler are created", () => {
        const calcElem = document.createElement("div");
        expect(calcElem.childNodes.length).toBe(0);
        createDisplayAndHandler(calcElem);

        expect(calcElem.childNodes.length).toBe(1);
        expect(CalcHandler).toHaveBeenCalledTimes(1);

    });
});

describe("Calculation Tests", () => {
    describe("Plus", () => {
        test("Plain addition - 5 + 20 = 25", () => {
            expect(calculate(5, 20, '+')).toBe(25);
        });
        test("Addition where second num is floats", () => {
            expect(calculate(3, 1.5, '+')).toBe(4.5);
        });
        test("Addition where first num is neg & second num is float", () => {
            expect(calculate(-6, 0.3, '+')).toBe(-5.7);
        });
    });

    describe("Minus", () => {
        test("Plain subtraction: 10 - 2 = 8", () => {
            expect(calculate(10, 2, '-')).toBe(8);
        });
        test("Other way: 2 - 10 = -8", () => {
            expect(calculate(2, 10, '-')).toBe(-8);
        });
        test("Subtraction where first num is float", () => {
            expect(calculate(10.7, 0, '-')).toBe(10.7);
        });
        test("Subtraction where first num is neg & second num is float", () => {
            expect(calculate(-6, 0.3, '-')).toBe(-6.3);
        });
    });

    describe("Divide", () => {
        test("Plain division: 10 / 2 = 5", () => {
            expect(calculate(10, 2, '/')).toBe(5);
        });
        test("Other way: 2 / 10 = 0.2", () => {
            expect(calculate(2, 10, '/')).toBe(0.2);
        });
        test("Division where first num is float", () => {
            expect(calculate(10.7, 1, '/')).toBe(10.7);
        });
        test("Division where second num is float", () => {
            expect(calculate(-3, 0.5, '/')).toBe(-6);
        });
    });

    describe("Mult", () => {
        test("Plain mult: 10 * 2 = 20", () => {
            expect(calculate(10, 2, '*')).toBe(20);
        });
        test("Mult where first num is float", () => {
            expect(calculate(10.7, 1, '*')).toBe(10.7);
        });

        test("Mult where second num is float", () => {
            expect(calculate(-6, 0.5, '*')).toBe(-3);
        });
    });

    describe("Errors", () => {
        test("Some string as operator - throws an error", () => {
            const calculateString = () =>
                calculate(10, 2, 'plus');
            expect(calculateString).toThrow();
        });
    });
});


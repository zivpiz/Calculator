import {ALL_ACTIONS, ARITHMETIC_OPS, DIGITS} from "../src/constants";
import CalculatorInitializer from '../src/calculatorInitializer.js';
import * as staticMethods from '../src/staticMethods.js';

jest.mock('../src/staticMethods.js');

const {JSDOM} = require("jsdom");
const documentMock = new JSDOM('<!DOCTYPE html><html lang="en-US"><body><section id="sandbox"><div id="calc-1" class="calculator">' +
    '</div><div id="calc-2" class="calculator"></div><div id="calc-3" class="calculator"></div></section></body></html>').window.document;
let init;


describe("Test constructor", () => {
    let spyInitCalc;

    beforeEach(() =>
        spyInitCalc = jest.spyOn(CalculatorInitializer.prototype, '_initializeCalc').mockImplementation(() => true)
    );

    test("Make sure initializeCalc is called for each .calculator", () => {
        expect(spyInitCalc).toHaveBeenCalledTimes(0);
        const allCalcs = documentMock.querySelectorAll(".calculator");
        expect(allCalcs.length).toBeGreaterThan(0);
        init = new CalculatorInitializer(documentMock);
        expect(spyInitCalc).toHaveBeenCalledTimes(allCalcs.length);
    });

    afterEach(() => spyInitCalc.mockRestore());
});

describe("Test _initializeCalc", () => {
    let spyButtons;

    beforeEach(() =>
        spyButtons = jest.spyOn(CalculatorInitializer.prototype, '_createButtonsDiv').mockImplementation(() => true)
    );

    test("Make sure both display and button creators are called", () => {
        expect(staticMethods.createDisplayAndHandler).toHaveBeenCalledTimes(0);
        expect(spyButtons).toHaveBeenCalledTimes(0);
        init._initializeCalc('mockCalc');
        expect(staticMethods.createDisplayAndHandler).toHaveBeenCalledTimes(1);
        expect(spyButtons).toHaveBeenCalledTimes(1);
    });

    afterEach(() => spyButtons.mockRestore());
});

describe("Test _createButtonsDiv", () => {
    let spyActions, spyDigits, spyOps;

    beforeEach(() => {
        spyActions = jest.spyOn(CalculatorInitializer.prototype, '_createActions');
        spyDigits = jest.spyOn(CalculatorInitializer.prototype, '_createDigits');
        spyOps = jest.spyOn(CalculatorInitializer.prototype, '_createOps');
    });

    test("Make sure both display and button creators are called", () => {
        expect(spyActions).toHaveBeenCalledTimes(0);
        expect(spyDigits).toHaveBeenCalledTimes(0);
        expect(spyOps).toHaveBeenCalledTimes(0);
        const calcElem = document.createElement("div");
        expect(calcElem.childNodes.length).toBe(0);
        init._createButtonsDiv('mockHandler', calcElem);

        expect(spyActions).toHaveBeenCalledTimes(1);
        expect(spyDigits).toHaveBeenCalledTimes(1);
        expect(spyOps).toHaveBeenCalledTimes(1);
        expect(calcElem.childNodes.length).toBe(1);
        expect(calcElem.childNodes[0].childNodes.length).toBe(3);
    });

    afterEach(() => {
        spyActions.mockRestore();
        spyDigits.mockRestore();
        spyOps.mockRestore();
    });
});

describe("Test _createOps", () => {
    let spyAppend;

    beforeEach(() =>
        spyAppend = jest.spyOn(CalculatorInitializer.prototype, '_appendArithmeticOperations')
    );

    test("Make sure _appendArithmeticOperations is called", () => {
        expect(spyAppend).toHaveBeenCalledTimes(0);
        init._createOps('mockHandler');
        expect(spyAppend).toHaveBeenCalledTimes(1);
    });

    afterEach(() => spyAppend.mockRestore());
});

describe("Test _appendArithmeticOperations", () => {
    let mockHandler, allOpsElem, opsLength;

    beforeEach(() => {
        mockHandler = {opsListener: jest.fn()};
        allOpsElem = document.createElement("div");
        opsLength = Object.keys(ARITHMETIC_OPS).length;
    });

    test("Make sure all buttons are created", () => {
        expect(allOpsElem.childNodes.length).toBe(0);
        init._appendArithmeticOperations(allOpsElem, mockHandler);
        for (let i = 0; i < opsLength; i++)
            allOpsElem.childNodes[i].click();
        expect(allOpsElem.childNodes.length).toBe(opsLength);
        expect(mockHandler.opsListener).toHaveBeenCalledTimes(opsLength);
        Object.keys(ARITHMETIC_OPS).forEach(key => {
            expect(mockHandler.opsListener).toHaveBeenCalledWith(ARITHMETIC_OPS[key]);
        });
    });
});

describe("Test _createDigits", () => {
    let spyDigitTable;

    beforeEach(() =>
        spyDigitTable = jest.spyOn(CalculatorInitializer.prototype, '_createDigitTable')
    );

    test("Make sure _createDigitTable is called", () => {
        expect(spyDigitTable).toHaveBeenCalledTimes(0);
        init._createDigits('mockHandler');
        expect(spyDigitTable).toHaveBeenCalledTimes(1);
    });

    afterEach(() => spyDigitTable.mockRestore());
});

describe("Test _createDigitTable", () => {
    let spyRow, tableElement;

    beforeEach(() => {
        spyRow = jest.spyOn(CalculatorInitializer.prototype, '_createDigitTableRow');
        tableElement = document.createElement("div");
    });

    test("Make sure _createDigitTableRow is called", () => {
        expect(spyRow).toHaveBeenCalledTimes(0);
        expect(tableElement.childNodes.length).toBe(0);
        init._createDigitTable('mockHandler', tableElement);
        expect(spyRow).toHaveBeenCalledTimes(DIGITS.length);
        expect(tableElement.childNodes.length).toBe(DIGITS.length);
    });

    afterEach(() => spyRow.mockRestore());
});

describe("Test _createDigitTableRow", () => {
    let mockHandler, rowElem, rowDigitArr;

    beforeEach(() => {
        mockHandler = {digitsListener: jest.fn()};
        rowElem = document.createElement("div");
        rowDigitArr = ['1', '2', '3'];
    });

    test("Make sure a row is created properly", () => {
        expect(rowElem.childNodes.length).toBe(0);
        init._createDigitTableRow(mockHandler, rowElem, rowDigitArr);
        for (let i = 0; i < rowDigitArr.length; i++)
            rowElem.childNodes[i].childNodes[0].click();
        expect(rowElem.childNodes.length).toBe(rowDigitArr.length);
        expect(mockHandler.digitsListener).toHaveBeenCalledTimes(rowDigitArr.length);
        for (let i = 0; i < rowDigitArr; i++)
            expect(mockHandler.digitsListener).toHaveBeenCalledWith(rowDigitArr[i]);
    });
});

describe("Test _createActions", () => {
    let mockHandler, actionsDiv, actionsLength;

    beforeEach(() => {
        mockHandler = {actionListener: jest.fn()};
        actionsDiv = init._createActions(mockHandler);
        actionsLength = Object.keys(ALL_ACTIONS).length;
    });

    test("Make sure all actions are created", () => {
        for (let i = 0; i < actionsLength; i++)
            actionsDiv.childNodes[i].click();
        expect(actionsDiv.childNodes.length).toBe(actionsLength);
        expect(mockHandler.actionListener).toHaveBeenCalledTimes(actionsLength);
        Object.keys(ALL_ACTIONS).forEach(key => {
            expect(mockHandler.actionListener).toHaveBeenCalledWith(ALL_ACTIONS[key]);
        });
    });
});

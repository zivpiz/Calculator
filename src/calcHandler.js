import {ARITHMETIC_OPS, ALL_ACTIONS} from "./constants";
import {calculate} from "./staticMethods";

export default class CalcHandler {

    constructor(displayBarElement) {
        this.displayBarElement = displayBarElement;
        this._resetCalc();
        this._updateDisplay();
    }

    actionListener(action) {
        switch (action) {
            case ALL_ACTIONS.CLEAR:
                this._clearAction();
                break;
            case ALL_ACTIONS.CLEAR_ALL:
                this._resetCalc();
                break;
            case ALL_ACTIONS.EQUALS:
                this._equalsAction();
                this.shouldBlockOperators = false;
                break;
            default:
                throw new Error("Invalid Action.");
        }
        this._updateDisplay();
    }

    digitsListener(digit) {
        if (digit < '0' || digit > '9')
            throw new Error("Invalid Digit.");
        if (!this.inputNum)
            this.inputNum = +digit;
        else this.inputNum = +(this.inputNum + '' + digit);
        this.shouldBlockOperators = false;
        this._updateDisplay();
    }

    opsListener(op) {
        if (Object.values(ARITHMETIC_OPS).indexOf(op) <= -1)
            throw new Error("Invalid Operator.");
        if (this.shouldBlockOperators)
            this.operator = op;
        else if (!this.inputNum && op === '-')
            this._opsNewMinus();
        else this._opsCalculate(op);
        this.shouldBlockOperators = true;
        this._updateDisplay();
    }

    _opsNewMinus(){
        this.inputNum = '-';
        this.operator = ARITHMETIC_OPS.PLUS;
    }

    _opsCalculate(op){
        this._equalsAction();
        this.operator = op;
    }
    _clearAction() {
        this.inputNum = null;
    }

    _equalsAction() {
        if (this.operator === null) {
            this._equalsWithNoOperator();
            return;
        }
        if (this.inputNum !== null)
            this.accValue = calculate(this.accValue, this.inputNum, this.operator);
        this.inputNum = null;
        this.operator = null;
        if (!isFinite(this.accValue)) {
            alert("Calculation Error. Resetting Calculator.");
            this._resetCalc();
        }
    }

    _equalsWithNoOperator() {
        if (this.inputNum !== null)
            this.accValue = this.inputNum;
        this.inputNum = null;
        this._updateDisplay();
    }

    _resetCalc() {
        this.inputNum = null;
        this.accValue = 0;
        this.operator = ARITHMETIC_OPS.PLUS;
        this.shouldBlockOperators = false;
    }

    _updateDisplay() {
        const newDisplay = this.inputNum !== null ? this.inputNum : this.accValue;
        if (+this.displayBarElement.innerHTML === newDisplay || this.displayBarElement.innerHTML === newDisplay)
            this._flashDisplay(newDisplay);
        else this.displayBarElement.innerHTML = newDisplay;
    }

    _flashDisplay(newDisplay) {
        this.displayBarElement.innerHTML = '';
        setTimeout(() => this.displayBarElement.innerHTML = newDisplay, 50);
    }
}


const {ALL_ACTIONS, OP_TO_FUNC} = require('./constants');
import {calculate} from "./staticMethods";

export default class CalcHandler {

    constructor(displayBarElement) {
        this.displayBarElement = displayBarElement;
        this._resetCalc();
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
                break;
            default:
                throw new Error("Invalid Action.");
        }
    }

    digitsListener(digit) {
        if (digit < '0' || digit > '9')
            throw new Error("Invalid Digit.");
        if (this.showNewDisplay) {
            this.displayedNow = digit;
            this.showNewDisplay = false;
        }
        else if (this.displayedNow === '0' || this.displayedNow === 0)
            this.displayedNow = digit;
        else this.displayedNow = this.displayedNow + '' + digit;
        this.isDoubleOperator = false;
    }

    opsListener(op) {
        if (!OP_TO_FUNC.hasOwnProperty(op))
            throw new Error("Invalid Operator.");
        if (this.isDoubleOperator) {
            this._updateDisplay();
            this.operator = op;
            return;
        }
        if (this.showNewDisplay && (this.displayedNow === '0' || this.displayedNow === 0) && op === '-') {
            this.displayedNow = '-';
            this.showNewDisplay = false;
            this.isDoubleOperator = true;
            return;
        }
        if (this.isFirstOperand) {
            this.accValue = this.displayedNow;
            this._updateDisplay();
        }
        else {
            this.accValue = calculate(this.accValue, this.displayedNow, this.operator);
            this.displayedNow = this.accValue;
        }
        this.operator = op;
        this.showNewDisplay = true;
        this.isFirstOperand = false;
        this.isDoubleOperator = true;
    }

    _resetCalc() {
        this.accValue = 0;
        this.displayedNow = 0;
        this.operator = null;
        this.showNewDisplay = true;
        this.isFirstOperand = true;
        this.isDoubleOperator = false;
    }

    get displayedNow() {
        return this._displayedNow;
    }

    set displayedNow(displayedNow) {
        if (displayedNow !== '-' && !isFinite(displayedNow)) {
            alert("Calculation Error. Resetting Calculator.");
            this._resetCalc();
            return;
        }
        this._displayedNow = (displayedNow === '-') ? displayedNow : +displayedNow;
        this._updateDisplay();
    }

    _updateDisplay() {
        if (this.displayBarElement.innerHTML === this._displayedNow)
            this._flashDisplay();
        else this.displayBarElement.innerHTML = this._displayedNow;
    }

    _flashDisplay() {
        this.displayBarElement.innerHTML = '';
        setTimeout(() => {
            this.displayBarElement.innerHTML = this._displayedNow;
        }, 50)

    }



    _clearAction() {
        this.displayedNow = 0;
        this.showNewDisplay = true;
    }

    _equalsAction() {
        if (this.isFirstOperand) {
            this.accValue = this.displayedNow;
            this._updateDisplay();
        }
        else {
            this.accValue = calculate(this.accValue, this.displayedNow, this.operator);
            this.displayedNow = this.accValue;
        }
        this.showNewDisplay = true;
        this.isFirstOperand = true;
        this.isDoubleOperator = false;
    }
}


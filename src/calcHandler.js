const opToFunc = {
    '+': (x, y) => {
        return parseFloat(x) + parseFloat(y)
    },
    '-': (x, y) => {
        return parseFloat(x) - parseFloat(y)
    },
    '/': (x, y) => {
        return parseFloat(x) / parseFloat(y)
    },
    '*': (x, y) => {
        return parseFloat(x) * parseFloat(y)
    }
};

const calculate = (num1, num2, operator) =>{
    return opToFunc[operator](num1, num2);
};


class CalcHandler {
    constructor(displayBarElement) {
        this.displayBarElement = displayBarElement;
        this.resetCalc();
    }

    //Using a setter to activate updateDisplay() every time we set a new display number.
    set onDisplay(onDisplay) {
        //If we encountered NaN or Infinity
        if(onDisplay !== '-' && !isFinite(onDisplay)) {
            alert("Calculation Error. Resetting calculator.");
            this.resetCalc();
            return;
        }
        this._onDisplay = onDisplay;
        this.updateDisplay();
    }

    get onDisplay() {
        return this._onDisplay;
    }

    updateDisplay() {
        //Using == to match nums & strings
        if (this.displayBarElement.innerHTML == this._onDisplay)
            this.flashDisplay();
        else this.displayBarElement.innerHTML = this._onDisplay;
    }

    //Using setTimeout to "flash" the number on screen
    flashDisplay() {
        this.displayBarElement.innerHTML = '';
        setTimeout(()=> {this.displayBarElement.innerHTML = this._onDisplay;}, 50)

    }

    resetCalc() {
        this.accValue = 0;
        this.onDisplay = 0;
        this.operator = null;
        this.newDisplayFlag = true;
        this.firstOperandFlag = true;
        this.doubleOperatorFlag = false;
    }

    actionListener(action) {
        switch (action) {
            case "c":
                this.onDisplay = 0;
                this.newDisplayFlag = true;
                break;
            case "ce":
                this.resetCalc();
                break;
            case "=":
                if (this.firstOperandFlag) {
                    this.accValue = this.onDisplay;
                    this.updateDisplay();
                }
                else {
                    this.accValue = opToFunc[this.operator](this.accValue, this.onDisplay);
                    this.onDisplay = this.accValue;
                }
                this.newDisplayFlag = true;
                this.firstOperandFlag = true;
                this.doubleOperatorFlag = false;
        }
    }

    numbersListener(digit) {
        if (this.newDisplayFlag) {
            this.onDisplay = digit;
            this.newDisplayFlag = false;
        }
        else (this.onDisplay === '0' || this.onDisplay === 0) ? this.onDisplay = digit : this.onDisplay = this.onDisplay + '' + digit;
        this.doubleOperatorFlag = false;
    }

    opsListener(op) {
        if (this.doubleOperatorFlag){
            this.updateDisplay();
            return;
        }
        if ((this.onDisplay === '0' || this.onDisplay === 0) && op === '-') {
            this.onDisplay = '-';
            this.newDisplayFlag = false;
            this.doubleOperatorFlag = true;
            return;
        }
        if (this.firstOperandFlag)
            this.accValue = this.onDisplay;
        else {
            this.accValue = opToFunc[this.operator](this.accValue, this.onDisplay);
            this.onDisplay = this.accValue;
        }
        this.operator = op;
        this.newDisplayFlag = true;
        this.firstOperandFlag = false;
        this.doubleOperatorFlag = true;
    }
}

module.exports.calculate = calculate;
module.exports.CalcHandler = CalcHandler;

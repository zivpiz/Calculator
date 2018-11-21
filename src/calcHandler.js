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

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

export default class CalcHandler {
    constructor() {
        this.displayBarElement = document.querySelector("#displayBar");
        this.resetCalc();

        document.querySelector("#actions").addEventListener("click", this.actionListener.bind(this));
        document.querySelector("#numbers").addEventListener("click", this.numbersListener.bind(this));
        document.querySelector("#ops").addEventListener("click", this.opsListener.bind(this));
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

    //Using sleep to "flash" the number on screen
    flashDisplay() {
        this.displayBarElement.innerHTML = '';
        sleep(50).then(()=>{
            this.displayBarElement.innerHTML = this._onDisplay;
        });
    }

    resetCalc() {
        this.accValue = 0;
        this.onDisplay = 0;
        this.operator = null;
        this.newDisplayFlag = true;
        this.firstOperandFlag = true;
        this.doubleOperatorFlag = false;
    }

    actionListener(event) {
        const {target} = event;
        switch (target.id) {
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

    numbersListener(event) {
        const {target} = event;
        if (!target.matches("button"))
            return;
        if (this.newDisplayFlag) {
            this.onDisplay = target.id;
            this.newDisplayFlag = false;
        }
        else (this.onDisplay === '0' || this.onDisplay === 0) ? this.onDisplay = target.id : this.onDisplay = this.onDisplay + '' + target.id;
        this.doubleOperatorFlag = false;
    }

    opsListener(event) {
        const {target} = event;
        if (!target.matches("button"))
            return;
        if (this.doubleOperatorFlag){
            this.updateDisplay();
            return;
        }
        if ((this.onDisplay === '0' || this.onDisplay === 0) && target.id === '-') {
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
        this.operator = target.id;
        this.newDisplayFlag = true;
        this.firstOperandFlag = false;
        this.doubleOperatorFlag = true;
    }
}


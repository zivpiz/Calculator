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
        this._onDisplay = onDisplay;
        this.updateDisplay();
    }

    get onDisplay() {
        return this._onDisplay;
    }


    updateDisplay() {
        this.displayBarElement.innerHTML = '';
        this.displayBarElement.innerHTML = this._onDisplay;
    }

    resetCalc() {
        this.accValue = 0;
        this.onDisplay = 0;
        this.operator = null;
        this.newDisplayFlag = true;
        this.firstOperandFlag = true;
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
                }
                else {
                    this.accValue = opToFunc[this.operator](this.accValue, this.onDisplay);
                    this.onDisplay = this.accValue;
                }
                this.newDisplayFlag = true;
                this.firstOperandFlag = true;
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
    }

    opsListener(event) {
        const {target} = event;
        if (!target.matches("button"))
            return;
        if ((this.onDisplay === '0' || this.onDisplay === 0) && target.id === '-') {
            this.onDisplay = '-';
            this.newDisplayFlag = false;
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
    }
}


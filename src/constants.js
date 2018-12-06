export const ARITHMETIC_OPS = {
    PLUS: '+',
    MINUS: '-',
    DIV: '/',
    MULT: '*'
};

export const ALL_ACTIONS = {
    CLEAR: 'c',
    CLEAR_ALL: 'ce',
    EQUALS: '='
};
export const DIGITS = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['0']];

export const OP_TO_FUNC = {
    [ARITHMETIC_OPS.PLUS]: (x, y) => x + y,
    [ARITHMETIC_OPS.MINUS]: (x, y) => x - y,
    [ARITHMETIC_OPS.DIV]: (x, y) => x / y,
    [ARITHMETIC_OPS.MULT]: (x, y) => x * y
};


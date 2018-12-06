module.exports = function () {
    return {
        files: [
            'src/**/*.js'
        ],

        tests: [
            '__tests__/**/*.test.js'
        ],

        testFramework: 'jest',

        debug: true
    };
};
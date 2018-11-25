const {calculate} = require('./calcHandler');



test('adds 1 + 2 to equal 3', () => {
    expect(calculate(1, 2, '+')).toBe(3);
});

describe("Calculator Tests", ()=>{
   describe("Plus", ()=>{
       test("Plain addition - 5 + 20 = 25", ()=>{
           expect(calculate(5, 20, '+')).toBe(25);
       });
       test("Addition where first num is string", ()=>{
           expect(calculate('3', 20, '+')).toBe(23);
       });
       test("Addition where second num is string", ()=>{
           expect(calculate(-25, '20', '+')).toBe(-5);
       });
       test("Addition where both nums are strings", ()=>{
           expect(calculate('300', '20', '+')).toBe(320);
       });
       test("Addition where both nums are floats as strings", ()=>{
           expect(calculate('300.3', '20.5', '+')).toBe(320.8);
       });

       test("Addition where first num is float", ()=>{
           expect(calculate(10.7, 0, '+')).toBe(10.7);
       });

       test("Addition where second num is float", ()=>{
           expect(calculate(-6, 0.3, '+')).toBe(-5.7);
       });

       test("Addition where both nums are floats", ()=>{
           expect(calculate(10.7, 0.3, '+')).toBe(11);
       });
       
       test("Addition with a real string - be falsy (NaN)", ()=>{
           expect(calculate('hey', 0, '+')).toBeFalsy();
       });
       
   });

    describe("Minus", ()=>{
        test("Plain subtraction: 100 - 20 = 80", ()=>{
            expect(calculate(100, 20, '-')).toBe(80);
        });
        test("Other way: 20 - 100 = -80", ()=>{
            expect(calculate(20, 100, '-')).toBe(-80);
        });
        test("Subtraction where second num is string", ()=>{
            expect(calculate(25, '20', '-')).toBe(5);
        });
        test("Subtraction where both nums are strings: '0' - '-20' = 20 ", ()=>{
            expect(calculate('0', '-20', '-')).toBe(20);
        });
        test("Subtraction where both nums are floats as strings", ()=>{
            expect(calculate('300.3', '20.3', '-')).toBe(280);
        });
        test("Subtraction where first num is float", ()=>{
            expect(calculate(10.7, 0, '-')).toBe(10.7);
        });

        test("Subtraction where second num is float", ()=>{
            expect(calculate(-6, 0.3, '-')).toBe(-6.3);
        });

        test("Subtraction where both nums are floats", ()=>{
            expect(calculate(10.3, 0.3, '-')).toBe(10);
        });

        test("Subtraction with a real string - be falsy (NaN)", ()=>{
            expect(calculate('shgfd7sdf', 14, '-')).toBeFalsy();
        });
    });

    describe("Divide", ()=>{
        test("Plain division: 100 / 20 = 5", ()=>{
            expect(calculate(100, 20, '/')).toBe(5);
        });
        test("Other way: 20 / 100 = 0.2", ()=>{
            expect(calculate(20, 100, '/')).toBe(0.2);
        });
        test("Division where second num is string", ()=>{
            expect(calculate(40, '20', '/')).toBe(2);
        });
        test("Division where both nums are strings: '0' / '-20' = -0 ", ()=>{
            expect(calculate('0', '-20', '/')).toBe(-0);
        });
        test("Division where both nums are floats as strings", ()=>{
            expect(calculate('300.5', '1.5', '/')).toBe(200 +(1/3));
        });
        test("Division where first num is float", ()=>{
            expect(calculate(10.7, 1, '/')).toBe(10.7);
        });

        test("Division where second num is float", ()=>{
            expect(calculate(-6, 0.3, '/')).toBe(-20);
        });

        test("Division where both nums are floats", ()=>{
            expect(calculate(300.5, '1.5', '/')).toBe(200 + (1/3));
        });

        test("Division with a real string - be falsy (NaN)", ()=>{
            expect(calculate(10.7, 'w0', '/')).toBeFalsy();
        });
    });
    
    describe("Mult", ()=>{
        test("Plain mult: 100 * 20 = 2000", ()=>{
            expect(calculate(100, 20, '*')).toBe(2000);
        });
        test("Other way: 20 * 100 = 2000", ()=>{
            expect(calculate(20, 100, '*')).toBe(2000);
        });
        test("Mult where second num is string", ()=>{
            expect(calculate(40, '20', '*')).toBe(800);
        });
        test("Mult where both nums are strings: '0' * '-20' = -0 ", ()=>{
            expect(calculate('0', '-20', '*')).toBe(-0);
        });
        test("Mult where both nums are floats as strings", ()=>{
            expect(calculate('300.5', '1.5', '*')).toBe(450.75);
        });
        test("Mult where first num is float", ()=>{
            expect(calculate(10.7, 1, '*')).toBe(10.7);
        });

        test("Mult where second num is float", ()=>{
            expect(calculate(-6, 0.5, '*')).toBe(-3);
        });

        test("Mult where both nums are floats", ()=>{
            expect(calculate(300.5, '1.5', '*')).toBe(450.75);
        });

        test("Mult with a real string - be falsy (NaN)", ()=>{
            expect(calculate(30, 'hey', '*')).toBeFalsy();
        });
    });
});


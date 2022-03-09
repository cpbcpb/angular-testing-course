// describe defines a test suite

import { TestBed } from "@angular/core/testing";
import { any } from "cypress/types/bluebird";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

// here named as calculator service, same name as the service we are testing
describe('CalculatorService', () => {
// same name as service we want to test is the name of the test

// before each is done before each of the specifications
// inline function
let calculator: CalculatorService,
loggerSpy: any;

beforeEach(()=> {
  // this way each test is independent.  Can be executed in any order - if the order of the tests matter, that is bad.
  // tests should be well isolated.
  console.log('Calling beforeEach');
  loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

  TestBed.configureTestingModule({
    providers: [
      CalculatorService,
      {provide: LoggerService, useValue: loggerSpy},
    ]
  })

  // // create instance of the service I am testing
  // calculator = new CalculatorService(loggerSpy);
  calculator = TestBed.get(CalculatorService);
})


// now here is a group of specifications (Tests)

  // the it sentence should describe the functional feature of the application.
  it('should add 2 numbers', () => {
    console.log('add test');
    // can have the method log return a value with this.
    // loggerSpy.log.and.returnValue();
    // pending is a utility function that indicates to jasmine that the test is not yet
    // ready to be executed.
    // pending();

    // Setup Phase

    // const logger = new LoggerService();
    // spyOn(logger, 'log');

    // Execution Phase
    const result = calculator.add(2,2);

    // Test Assertion Phase (fail or pass)
    // expect is a assert utility from Jasmine. the expect(result).to*** has a lot of options
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', () => {
    console.log('Subtract test');
    // pending is a utility function that indicates to jasmine that the test is not yet
    // ready to be executed.
    // pending();

    // Setup Phase

    // create instance of the service I am testing

    // Jasmine will replace some of the functions with a new function, new method will call original
    // functionality plus keep track of how many times the function has been called.
    // spyOn(logger, 'log');

    // Execution Phase
    const result = calculator.subtract(2,2);

    // Test Assertion Phase (fail or pass)
    // expect is a assert utility from Jasmine. the expect(result).to*** has a lot of options
    expect(result).toBe(0, "unexpected subtraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    // 
  });

});

// to run the test, use '$ ng test'
// this opens it in hot reload mode, where it will reload each time saved.
// to avoid hot reload, use 'ng test --no-watch'
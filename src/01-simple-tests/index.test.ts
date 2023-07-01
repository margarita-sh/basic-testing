import {simpleCalculator, Action} from './index'

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
	const calculatorInput = {
		a: 1,
		b: 2,
		action: Action.Add
	  };
    expect(simpleCalculator(calculatorInput)).toBe(3);
  });

  test('should substract two numbers', () => {
	const calculatorInput = {
		a: 5,
		b: 1,
		action: Action.Subtract
	  };
	  expect(simpleCalculator(calculatorInput)).toBe(4);
  });

  test('should multiply two numbers', () => {
	const calculatorInput = {
		a: 2,
		b: 3,
		action: Action.Multiply
	  };
	  expect(simpleCalculator(calculatorInput)).toBe(6);
  });

  test('should divide two numbers', () => {
	const calculatorInput = {
		a: 4,
		b: 2,
		action: Action.Divide
	  };
	  expect(simpleCalculator(calculatorInput)).toBe(2);
  });

  test('should exponentiate two numbers', () => {
	const calculatorInput = {
		a: 4,
		b: 2,
		action: Action.Exponentiate
	  };
	  expect(simpleCalculator(calculatorInput)).toBe(16);
  });

  test('should return null for invalid action', () => {
	const calculatorInput = {
		a: 4,
		b: 2,
		action: 'invalid Action'
	  };
	  expect(simpleCalculator(calculatorInput)).toBe(null);
  });

  test('should return null for invalid arguments', () => {
	const calculatorInput = {
		a: '4',
		b: 2,
		action: Action.Exponentiate
	  };
	  expect(simpleCalculator(calculatorInput)).toBe(null);
  });
});

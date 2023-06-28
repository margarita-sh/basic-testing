import { simpleCalculator, Action } from './index';

const testCases = [
	{ a: 1, b: 2, action: Action.Add, expected: 3 },
	{ a: 2, b: 2, action: Action.Add, expected: 4 },
	{ a: 3, b: 2, action: Action.Add, expected: 5 },
	{ a: 3, b: 2, action: Action.Subtract, expected: 1 },
	{ a: 3, b: 2, action: Action.Multiply, expected: 6 },
	{ a: 6, b: 2, action: Action.Divide, expected: 3 },
	{ a: 6, b: 2, action: Action.Exponentiate, expected: 36},
];

describe('simpleCalculator', () => {
	testCases.forEach((testCase) => {
		const { a, b, action, expected } = testCase;
		test(`should return ${expected} when performing ${action} operation on ${a} and ${b}`, () => {
			const rawInput = { a, b, action };
			const result = simpleCalculator(rawInput);
			expect(result).toBe(expected);
		});
	});
});

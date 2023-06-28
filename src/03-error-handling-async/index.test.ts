import { throwError, resolveValue, throwCustomError, rejectCustomError } from './index';

describe('resolveValue', () => {
	test('should resolve provided value', async () => {
		resolveValue(5).then((value) => {
			expect(value).toBe(5)
		});
	});
});
describe('throwError', () => {
	test('should throw error with provided message', () => {
		expect.assertions(1);
		expect(() => throwError('Syntax error')).toThrow('Syntax error');
	}
	);

	test('should throw error with default message if message is not provided', () => {
		expect.assertions(1);
		expect(() => throwError()).toThrow('Oops!');
	});
});

describe('throwCustomError', () => {
	test('should throw custom error', () => {
		expect.assertions(1);
		expect(() => throwCustomError()).toThrow('This is my awesome custom error!');
	});
});

describe('rejectCustomError', () => {
	test('should reject custom error', async () => {
		await expect(rejectCustomError()).rejects.toThrow('This is my awesome custom error!');
	});
});

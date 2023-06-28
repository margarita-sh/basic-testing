import { readFileAsynchronously } from '.';
import path from 'path';
import fs  from 'fs';
jest.mock('path');


describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
  });

  test('should call callback only after timeout', () => {
    // Write your test here
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
  });
});

describe('readFileAsynchronously', () => {

  test('should call join with pathToFile', async () => {
	const pathToFile = 'test.txt';
    const fullPath = '/path/to/test.txt';

    const joinMock = jest.spyOn(path, 'join').mockReturnValue(fullPath);

    await readFileAsynchronously(pathToFile);

    expect(joinMock).toHaveBeenCalledWith(__dirname, pathToFile);
    joinMock.mockRestore();
  });

  test('should return null if file does not exist', async () => {
	const pathToFile = 'test.txt';
    const joinMock = jest.fn().mockReturnValue(undefined);

    jest.mock('path', () => ({
      join: joinMock,
    }));

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
	const pathToFile = 'test.txt';
	const fullPath = '/path/to/test.txt';
	const fileContent = 'Example file content';
  
	jest.spyOn(fs, 'existsSync').mockReturnValue(true);
	jest.spyOn(path, 'join').mockReturnValue(fullPath);
	jest.spyOn(fs.promises, 'readFile').mockResolvedValue('Example file content');
	const result = await readFileAsynchronously(pathToFile);
  
	expect(result).toBe(fileContent);
	
  });
});

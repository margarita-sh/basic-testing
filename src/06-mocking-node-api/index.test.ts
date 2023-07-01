import { readFileAsynchronously,  doStuffByTimeout, doStuffByInterval} from '.';
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
	const callback = jest.fn();
    const timeout = 1000;

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
	const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
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
	const callback = jest.fn();
	const interval = 1000;
	
	jest.spyOn(global, 'setInterval');
	
    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenLastCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
	const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(3);
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

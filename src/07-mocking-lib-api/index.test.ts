import { throttledGetDataFromApi } from './index';
import axios, { AxiosInstance } from 'axios';

jest.mock('axios');
describe('throttledGetDataFromApi', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});
	
	let mockResponse: {data: string};
	let axiosInstance: AxiosInstance;
	let relativePath: string;
	
	beforeEach(() => {
		 mockResponse = { data: 'mocked data' };
		 axiosInstance = { get: jest.fn().mockResolvedValue(mockResponse) } as any as AxiosInstance;
		jest.spyOn(axios, 'create').mockReturnValue(axiosInstance);
		 relativePath = '/posts';
	});
	afterAll(() => {
		jest.useRealTimers();
	});
	test('should create instance with provided base url', async () => {
		const baseURL = 'https://jsonplaceholder.typicode.com';

		await throttledGetDataFromApi(relativePath);
		jest.runAllTimers();
		expect(axios.create).toHaveBeenCalledWith({
			baseURL: baseURL,
		});
	});

	test('should perform request to correct provided url', async () => {

		await throttledGetDataFromApi(relativePath);
		jest.runAllTimers();

		expect(axiosInstance.get).toHaveBeenCalledWith(relativePath);

	});

	test('should return response data', async () => {
		   const result = await throttledGetDataFromApi(relativePath);
		   jest.runAllTimers();
		   expect(result).toEqual(mockResponse.data);
	});
});

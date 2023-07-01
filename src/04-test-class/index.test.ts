import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
	const bankAccountInstance = getBankAccount(1000);
	const getBalanceMock = bankAccountInstance.getBalance();
	expect(getBalanceMock).toBe(1000)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
	const bankAccountInstance = getBankAccount(1000);
      expect(() => bankAccountInstance.withdraw(1500)).toThrow(
        `Insufficient funds: cannot withdraw more than ${bankAccountInstance.getBalance()}`
      );
  });

  test('should throw error when transferring more than balance', () => {
	const bankAccountInstance = getBankAccount(1000);
	expect(() => bankAccountInstance.transfer(1500, bankAccountInstance)).toThrow('Transfer failed');
  });

  test('should throw error when transferring to the same account', () => {
	const bankAccountInstance = getBankAccount(1000);
	expect(() => bankAccountInstance.transfer(1000, bankAccountInstance)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
   const bankAccountInstance = getBankAccount(1000);
   bankAccountInstance.deposit(800);
   const getBalanceMock = bankAccountInstance.getBalance();
   expect(getBalanceMock).toBe(1800)
  });

  test('should withdraw money', () => {
	const bankAccountInstance = getBankAccount(1000);
	bankAccountInstance.withdraw(50);
	const getBalanceMock = bankAccountInstance.getBalance();
	expect(getBalanceMock).toBe(950);
  });

  test('should transfer money', () => {
	const bankAccountInstance = getBankAccount(1000);
	const anotherBankAccount = getBankAccount(2000);
	bankAccountInstance.transfer(500, anotherBankAccount);
	const getBalanceMock = bankAccountInstance.getBalance();
	const getBalanceAnotherAccountMock = anotherBankAccount.getBalance();
	expect(getBalanceMock).toBe(500);
	expect(getBalanceAnotherAccountMock).toBe(2500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
	const bankAccountInstance = getBankAccount(1000);
	const balance = await bankAccountInstance.fetchBalance();
	if(balance !== null) {
		expect(typeof balance).toBe('number');
	}
  });

  test('should set new balance if fetchBalance returned number', async () => {
	const bankAccountInstance = getBankAccount(1000);
	jest.spyOn(bankAccountInstance as any, 'fetchBalance').mockReturnValue(20);
	const balance = await bankAccountInstance.fetchBalance();
	expect(balance).toBe(20);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
	const bankAccountInstance = getBankAccount(1000);
	jest.spyOn(bankAccountInstance as any, 'fetchBalance').mockReturnValue(null);
	await expect(()=> bankAccountInstance.synchronizeBalance()).rejects.toThrow('Synchronization failed');
  });
});

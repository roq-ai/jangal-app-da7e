import queryString from 'query-string';
import { BankInterface, BankGetQueryInterface } from 'interfaces/bank';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBanks = async (query?: BankGetQueryInterface): Promise<PaginatedInterface<BankInterface>> => {
  return fetcher('/api/banks', {}, query);
};

export const createBank = async (bank: BankInterface) => {
  return fetcher('/api/banks', { method: 'POST', body: JSON.stringify(bank) });
};

export const updateBankById = async (id: string, bank: BankInterface) => {
  return fetcher(`/api/banks/${id}`, { method: 'PUT', body: JSON.stringify(bank) });
};

export const getBankById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/banks/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteBankById = async (id: string) => {
  return fetcher(`/api/banks/${id}`, { method: 'DELETE' });
};

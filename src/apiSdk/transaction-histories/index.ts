import queryString from 'query-string';
import { TransactionHistoryInterface, TransactionHistoryGetQueryInterface } from 'interfaces/transaction-history';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTransactionHistories = async (
  query?: TransactionHistoryGetQueryInterface,
): Promise<PaginatedInterface<TransactionHistoryInterface>> => {
  return fetcher('/api/transaction-histories', {}, query);
};

export const createTransactionHistory = async (transactionHistory: TransactionHistoryInterface) => {
  return fetcher('/api/transaction-histories', { method: 'POST', body: JSON.stringify(transactionHistory) });
};

export const updateTransactionHistoryById = async (id: string, transactionHistory: TransactionHistoryInterface) => {
  return fetcher(`/api/transaction-histories/${id}`, { method: 'PUT', body: JSON.stringify(transactionHistory) });
};

export const getTransactionHistoryById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/transaction-histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteTransactionHistoryById = async (id: string) => {
  return fetcher(`/api/transaction-histories/${id}`, { method: 'DELETE' });
};

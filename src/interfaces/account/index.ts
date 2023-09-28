import { TransactionHistoryInterface } from 'interfaces/transaction-history';
import { BankInterface } from 'interfaces/bank';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AccountInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  bank_name?: string;
  roq_user_id?: string;
  account_number?: string;
  account_balance: number;
  account_type?: string;
  transaction_history_transaction_history_reciever_account_numberToaccount?: TransactionHistoryInterface[];
  transaction_history_transaction_history_sender_account_numberToaccount?: TransactionHistoryInterface[];
  bank?: BankInterface;
  user?: UserInterface;
  _count?: {
    transaction_history_transaction_history_reciever_account_numberToaccount?: number;
    transaction_history_transaction_history_sender_account_numberToaccount?: number;
  };
}

export interface AccountGetQueryInterface extends GetQueryInterface {
  id?: string;
  bank_name?: string;
  roq_user_id?: string;
  account_number?: string;
  account_type?: string;
}
